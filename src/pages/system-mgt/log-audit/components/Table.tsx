import React from 'react';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ logAudit, dispatch, openDetailModal }) => {
  const { tableRef } = logAudit;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 64,
    },
    { title: '操作者ID', align: 'center', dataIndex: 'userId' },
    { title: '操作模块', align: 'center', dataIndex: 'model', hideInSearch: true },
    { title: '操作方法', align: 'center', dataIndex: 'operationMethod', hideInSearch: true },
    // { title: '操作内容', align: 'center', dataIndex: 'sketch', hideInSearch: true },
    { title: '操作时间', align: 'center', dataIndex: 'operationTime', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'receiptId',
      width: 220,
      fixed: 'right',
      render: (dom, logData) => [
        <a key={`${logData.id}detail`} onClick={() => openDetailModal(logData)}>
          查看
        </a>,
      ],
    },
  ];

  const getList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'logAudit/getList',
        payload: { ...params },
        resolve,
      });
    });

  const exportLog = () => {
    // const bookIds = selectedRowKeys.join(',');
    message.loading({ content: '文件导出，请稍后……', key: 'importsAddressBook' });
    dispatch({
      type: 'sensitiveMgt/exportLog',
    });
    message.destroy('error++');
  };

  return (
    <ProTable
      rowKey="dictTypeId"
      headerTitle="日志列表"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getList(params)}
      toolBarRender={() => [
        <Button
          type="primary"
          onClick={() => {
            exportLog();
          }}
        >
          导出
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ logAudit, global }) => ({
  logAudit,
  enums: global.enums,
}))(Table);

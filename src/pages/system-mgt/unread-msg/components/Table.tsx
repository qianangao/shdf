import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import moment from 'moment';

const Table = ({ logAudit, dispatch, openDetailModal, enums }) => {
  const { tableRef } = logAudit;

  const formatterTime = val => {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
  };

  const columns = [
    {
      title: '消息ID',
      dataIndex: 'messageId',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'messageType',
      hideInSearch: true,
      valueEnum: enums.un_read_type,
    },
    { title: '名称', align: 'center', dataIndex: 'sendUserName', hideInSearch: true },
    // { title: '操作内容', align: 'center', dataIndex: 'sketch', hideInSearch: true },
    {
      title: '时间',
      align: 'center',
      dataIndex: 'lastUpdateTime',
      hideInSearch: true,
      render: formatterTime,
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'readStatus',
      valueEnum: enums.reading_state,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
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
        type: 'unReadMsg/getList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="未读消息列表"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getList(params)}
      columns={columns}
    />
  );
};

export default connect(({ logAudit, global }) => ({
  logAudit,
  enums: global.enums,
}))(Table);

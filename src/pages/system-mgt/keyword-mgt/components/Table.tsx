import React from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
// import { checkAuthority } from '@/utils/authority';

const Table = ({ keywrod, dispatch, openModifyModal }) => {
  const { tableRef } = keywrod;
  const deletewd = params => {
    const { keyWordId } = params;
    /* eslint-disable no-new */
    new Promise(resolve => {
      dispatch({
        type: 'keywrod/deletekw',
        payload: { keyWordId },
        resolve,
      });
    });
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 64,
    },
    { title: '关键字', align: 'center', dataIndex: 'keyWord' },
    { title: '创建人  ', align: 'center', dataIndex: 'createUser' },
    { title: '创建时间', align: 'center', dataIndex: 'createTime', valueType: 'date' },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 220,
      fixed: 'right',
      render: (dom, logData) => [
        <a
          key={`${logData.id}up`}
          onClick={() => openModifyModal(logData)}
          // hidden={!checkAuthority('sm/km/update')}
        >
          编辑
        </a>,
        // <a key={`${logData.id}detail`} onClick={() => useWord(logData)}>
        //   使用
        // </a>,
        <a
          key={`${logData.id}up`}
          onClick={() => deletewd(logData)}
          // hidden={!checkAuthority('sm/km/delete')}
        >
          删除
        </a>,
      ],
    },
  ];

  const getList = params =>
    /* eslint-disable no-new */
    new Promise(resolve => {
      dispatch({
        type: 'keywrod/getList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="关键字使用"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      rowClassName={getSecrecyRowClassName}
      request={async params => getList(params)}
      toolBarRender={() => [
        <Button
          type="primary"
          onClick={() => openModifyModal()}
          // hidden={!checkAuthority('sm/km/add')}
        >
          新增
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ keywrod, global }) => ({
  keywrod,
  enums: global.enums,
}))(Table);

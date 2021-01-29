import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableRead = ({ enums, dispatch }) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'recordId',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
      width: 64,
    },
    { title: '来文标题', align: 'center', dataIndex: 'receiptTitle' },
    {
      title: '来文文号',
      align: 'center',
      dataIndex: 'receiptId',
    },
    {
      title: '分发日期',
      align: 'center',
      type: 'dateTime',
      dataIndex: 'createTime',
    },
    {
      title: '接收处室',
      align: 'center',
      dataIndex: 'readingOrg',
      hideInSearch: true,
    },
    {
      title: '处理人',
      align: 'center',
      dataIndex: 'lastUpdateUser',
      hideInSearch: true,
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'readingState',
      valueEnum: enums.subject_secrecy_level,
      hideInSearch: true,
    },
    {
      title: '处理时间',
      align: 'center',
      dataIndex: 'lastUpdateTime',
      hideInSearch: true,
    },
  ];

  const getReadList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'receivingMgt/getReceivingReadList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      // actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getReadList(params)}
      columns={columns}
    />
  );
};

export default connect(({ receivingMgt, global }) => ({
  receivingMgt,
  enums: global.enums,
}))(TableRead);

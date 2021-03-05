import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smDictionaryMgt, dispatch }) => {
  const { tableRef } = smDictionaryMgt;

  const columns = [
    {
      title: '公告标题',
      dataIndex: 'name',
      align: 'center',
    },
    { title: '发布人', align: 'center', dataIndex: 'createUser' },
    { title: '状态', align: 'center', dataIndex: 'state' },
    { title: '发布时间', align: 'center', dataIndex: 'startTime' },
  ];

  const getDictList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'home/getNoticeList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="通知公告"
      actionRef={tableRef}
      size="small"
      search={false}
      request={async params => getDictList(params)}
      pagination={false}
      columns={columns}
    />
  );
};

export default connect(({ smDictionaryMgt, global }) => ({
  smDictionaryMgt,
  enums: global.enums,
}))(Table);

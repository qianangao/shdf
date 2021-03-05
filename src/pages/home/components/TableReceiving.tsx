import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smDictionaryMgt, dispatch }) => {
  const { tableRef } = smDictionaryMgt;

  const columns = [
    {
      title: '文档标题',
      dataIndex: 'name',
      align: 'center',
    },
    { title: '文号', align: 'center', dataIndex: 'docNo' },
    { title: '状态', align: 'center', dataIndex: 'state' },
    { title: '办理时间', align: 'center', dataIndex: 'startTime' },
  ];

  const getDictList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'home/getReceivingList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="收文"
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

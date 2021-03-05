import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smDictionaryMgt, dispatch }) => {
  const { tableRef } = smDictionaryMgt;

  const columns = [
    {
      title: '业务类型',
      dataIndex: 'type',
      align: 'center',
    },
    { title: '名称', align: 'center', dataIndex: 'name' },
    { title: '状态', align: 'center', dataIndex: 'state' },
    { title: '开始时间', align: 'center', dataIndex: 'startTime' },
  ];

  const getAgencyList = () =>
    new Promise(resolve => {
      dispatch({
        type: 'home/getAgencyList',
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="待办"
      actionRef={tableRef}
      size="small"
      search={false}
      request={async params => getAgencyList(params)}
      pagination={false}
      columns={columns}
    />
  );
};

export default connect(({ smDictionaryMgt, global }) => ({
  smDictionaryMgt,
  enums: global.enums,
}))(Table);

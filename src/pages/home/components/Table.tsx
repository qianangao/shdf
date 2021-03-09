import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ dispatch }) => {
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

  const getAgencyList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'home/getAgencyList',
        payload: {
          ...params,
          pageSize: 10,
        },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="待办"
      size="small"
      search={false}
      pagination={{ simple: true }}
      request={async params => getAgencyList(params)}
      columns={columns}
    />
  );
};

export default connect(({ home, global }) => ({
  home,
  enums: global.enums,
}))(Table);

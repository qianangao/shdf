import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ dispatch }) => {
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
      headerTitle="收文"
      size="small"
      search={false}
      options={false}
      pagination={{ simple: true }}
      request={async params => getDictList(params)}
      columns={columns}
    />
  );
};

export default connect(({ home, global }) => ({
  home,
  enums: global.enums,
}))(Table);

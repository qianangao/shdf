import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ dispatch }) => {
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
      headerTitle="通知公告"
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

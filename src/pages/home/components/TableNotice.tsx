import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { SoundFilled } from '@ant-design/icons';
import moment from 'moment';

const Table = ({ dispatch }) => {
  const formatterTime = val => {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
  };

  const columns = [
    {
      title: '公告标题',
      dataIndex: 'name',
      align: 'center',
    },
    { title: '发布人', align: 'center', dataIndex: 'createUser' },
    { title: '状态', align: 'center', dataIndex: 'state' },
    {
      title: '发布时间',
      align: 'center',
      dataIndex: 'startTime',
      render: formatterTime,
    },
  ];

  const getDictList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'home/getNoticeList',
        payload: {
          ...params,
        },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle={
        <div>
          <SoundFilled style={{ color: '#FC9637' }} /> 通知公告{' '}
        </div>
      }
      size="small"
      search={false}
      options={false}
      pagination={{ simple: true, defaultPageSize: 10 }}
      request={async params => getDictList(params)}
      columns={columns}
    />
  );
};

export default connect(({ home, global }) => ({
  home,
  enums: global.enums,
}))(Table);

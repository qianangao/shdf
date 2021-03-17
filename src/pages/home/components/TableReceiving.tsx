import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { ProfileFilled } from '@ant-design/icons';
import moment from 'moment';

const Table = ({ dispatch }) => {
  const formatterTime = val => {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
  };

  const columns = [
    {
      title: '文档标题',
      dataIndex: 'name',
      align: 'center',
    },
    { title: '文号', align: 'center', dataIndex: 'docNo' },
    { title: '状态', align: 'center', dataIndex: 'state' },
    {
      title: '办理时间',
      align: 'center',
      dataIndex: 'startTime',
      render: formatterTime,
    },
  ];

  const getDictList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'home/getReceivingList',
        payload: {
          ...params,
        },
        resolve,
      });
    });

  const goDetail = () => {
    // history.push(`/synergy-office/receiving-mgt?id=${id}&type=modify`) import { connect, history } from 'umi';
  };

  return (
    <ProTable
      rowKey="id"
      onRow={record => {
        return {
          onClick: () => {
            goDetail(record.receiptId);
          },
        };
      }}
      headerTitle={
        <div>
          <ProfileFilled style={{ color: '#6DA76C' }} /> 收文
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

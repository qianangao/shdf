import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { BellFilled } from '@ant-design/icons';
import { routerRedux } from 'dva/router';
import moment from 'moment';

const Table = ({ dispatch }) => {
  const formatterTime = val => {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
  };

  const columns = [
    {
      title: '业务类型',
      dataIndex: 'type',
      align: 'center',
    },
    { title: '名称', align: 'center', dataIndex: 'name' },
    { title: '状态', align: 'center', dataIndex: 'state' },
    {
      title: '开始时间',
      align: 'center',
      render: formatterTime,
      dataIndex: 'startTime',
    },
  ];

  const getAgencyList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'home/getAgencyList',
        payload: {
          ...params,
        },
        resolve,
      });
    });

  const goDetail = () => {
    dispatch(
      routerRedux.push({
        // pathname:`/synergy-office/receiving-mgt?id=${id}&type=modify`,
      }),
    );
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle={
        <div>
          {' '}
          <BellFilled style={{ color: 'red' }} /> 待办
        </div>
      }
      onRow={record => {
        return {
          onClick: () => {
            goDetail(record.id);
          }, // 点击行
        };
      }}
      size="small"
      search={false}
      options={false}
      pagination={{ simple: true, defaultPageSize: 10 }}
      request={async params => getAgencyList(params)}
      columns={columns}
    />
  );
};

export default connect(({ home, global }) => ({
  home,
  enums: global.enums,
}))(Table);

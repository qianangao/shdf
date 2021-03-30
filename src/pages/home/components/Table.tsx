import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect, history } from 'umi';
import { BellFilled } from '@ant-design/icons';
import moment from 'moment';
import {getSecrecyRowClassName} from "@/utils/secrecy";

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

  const goDetail = item => {
    const { id } = item;
    switch (item.type) {
      case '线索':
        history.push(`/thread-mgt/thread-mgt0?id=${id}&type=modify`);
        break;
      case '案件':
        history.push(`/case-mgt/vocational-work?id=${id}&type=modify`);
        break;
      case '敏感事件':
        history.push(`/sensitive-event-mgt/sensitive-event?id=${id}&type=modify`);
        break;
      case '专项行动':
        history.push(`/engineering-mgt/special-project?id=${id}&type=modify`);
        break;
      case '联防工程':
        history.push(`/engineering-mgt/joint-defense-engineering?id=${id}&type=modify`);
        break;
      default:
        break;
    }
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
            goDetail(record);
          }, // 点击行
        };
      }}
      style={{ cursor: 'pointer' }}
      size="small"
      rowClassName={getSecrecyRowClassName}
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

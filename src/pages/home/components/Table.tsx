import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { BellFilled } from '@ant-design/icons';

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
        },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle={
        <div>
          {' '}
          <BellFilled style={{ color: 'red' }} /> 待办
        </div>
      }
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

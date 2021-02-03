import React from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TaskProgressTable = ({ specialAction, openModifyModal, dispatch }) => {
  const { tableRef } = specialAction;

  const getChildrenTaskList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/getChildrenTaskList',
        payload: { ...params },
        resolve,
      });
    });

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '省份/进度', align: 'center', dataIndex: 'userName', hideInSearch: true },
    { title: '阶段反馈1', align: 'center', dataIndex: 'userDept', hideInSearch: true },
    { title: '阶段反馈2', align: 'center', dataIndex: 'job', hideInSearch: true },
    { title: '阶段反馈3', align: 'center', dataIndex: 'phoneNumber', hideInSearch: true },
    { title: '阶段反馈4', align: 'center', dataIndex: 'userDept', hideInSearch: true },
    { title: '阶段反馈5', align: 'center', dataIndex: 'job', hideInSearch: true },
    { title: '总结反馈', align: 'center', dataIndex: 'phoneNumber', hideInSearch: true },
  ];

  return (
    <div>
      <ProTable
        search={false}
        rowKey="bookId"
        actionRef={tableRef}
        scroll={{ x: 'max-content' }}
        request={async params => getChildrenTaskList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => openModifyModal()}>
            导出
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ specialAction }) => ({
  specialAction,
}))(TaskProgressTable);

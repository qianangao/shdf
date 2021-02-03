import React from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const FeedbackTable = ({ specialAction, openModifyModal, dispatch }) => {
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
    { title: '名称', align: 'center', dataIndex: 'userName', hideInSearch: true },
    { title: '开始日期', align: 'center', dataIndex: 'userDept', hideInSearch: true },
    { title: '截止日期', align: 'center', dataIndex: 'job', hideInSearch: true },
    { title: '反馈要求', align: 'center', dataIndex: 'phoneNumber', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a key={`${data.bookId}up`}>删除</a>,
        <a key={`${data.bookId}Select`}>选择</a>,
      ],
    },
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
            新增
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ specialAction }) => ({
  specialAction,
}))(FeedbackTable);

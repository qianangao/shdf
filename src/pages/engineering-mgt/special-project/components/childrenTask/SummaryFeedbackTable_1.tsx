import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
// import ActionDeacription from './EditAction/ActionDeacription';
// import { getSpecialActionTree } from '../service';

const SummaryFeedbackTable = ({ specialAction, openAddModal, dispatch }) => {
  const { feedTableRef } = specialAction;
  // const [form] = ActionDeacription.useForm();

  const FeedbackRequestList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/FeedbackRequestList',
        payload: { ...params },
        resolve,
      });
    });

  const confirmDelete = id =>
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/deleteChildrenTaskList',
        payload: id,
        resolve,
      });
    });

  const columns = [
    { title: '序号', align: 'center', dataIndex: 'id', hideInSearch: true },
    { title: '名称', align: 'center', dataIndex: 'feedbackName', hideInSearch: true },
    { title: '开始日期', align: 'center', dataIndex: 'startDate', hideInSearch: true },
    { title: '截止日期', align: 'center', dataIndex: 'endDate', hideInSearch: true },
    { title: '反馈要求', align: 'center', dataIndex: 'feedbackRequire', hideInSearch: true },
    // {visible &&
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (dom, data, index) => (
        <Popconfirm
          title="你确定要删除该反馈要求吗？"
          onConfirm={() => confirmDelete(index + 1)}
          okText="是"
          cancelText="否"
        >
          <Button type="link" size="small" disabled={disabled}>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <ProTable
        search={false}
        rowKey="id"
        headerTitle="反馈要求"
        actionRef={feedTableRef}
        scroll={{ x: 'max-content' }}
        request={async params => FeedbackRequestList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => openAddModal({ visible: true })}>
            新增子任务
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ specialAction }) => ({
  // actionForm:specialAction.actionForm,
  specialAction,
}))(SummaryFeedbackTable);

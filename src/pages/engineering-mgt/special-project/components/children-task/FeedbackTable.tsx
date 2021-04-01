import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';

const FeedbackTable = ({ specialAction, dispatch }) => {
  const { feedTableRef } = specialAction;

  const getChildrenTaskList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/FeedbackRequestList',
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
    { title: '名称', align: 'center', dataIndex: 'feedbackName', hideInSearch: true },
    { title: '开始日期', align: 'center', dataIndex: 'startDate', hideInSearch: true },
    { title: '截止日期', align: 'center', dataIndex: 'endDate', hideInSearch: true },
    { title: '反馈要求', align: 'center', dataIndex: 'feedbackRequire', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [<a key={`${data.taskId}Select`}>选择</a>],
    },
  ];

  return (
    <div>
      <ProTable
        search={false}
        rowKey="feedbackId"
        actionRef={feedTableRef}
        scroll={{ x: 'max-content' }}
        rowClassName={getSecrecyRowClassName}
        request={async params => getChildrenTaskList(params)}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ specialAction }) => ({
  specialAction,
}))(FeedbackTable);

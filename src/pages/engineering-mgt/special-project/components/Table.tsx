import React from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import ActionDeacription from './EditAction/ActionDeacription';
// import { getSpecialActionTree } from '../service';

const Table = ({
  specialAction,
  openAddModal,
  openDownModal,
  openModifyModal,
  openAddSpecialModal,
  openFeedbackModal,
  dispatch,
  enums,
}) => {
  const { tableRef, actionForm } = specialAction;
  const [form] = ActionDeacription.useForm();

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
    { title: '子任务名称', align: 'center', dataIndex: 'taskName', hideInSearch: true },
    {
      title: '年度',
      align: 'center',
      dataIndex: 'taskYear',
      hideInSearch: true,
    },
    { title: '开始日期', align: 'center', dataIndex: 'startDate', hideInSearch: true },
    { title: '截止日期', align: 'center', dataIndex: 'endDate', hideInSearch: true },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'taskState',
      hideInSearch: true,
      valueEnum: enums.special_task_state,
    },
    { title: '任务描述', align: 'center', dataIndex: 'taskDescription', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.taskId}view`}
          onClick={() => openModifyModal({ id: data.taskId, disabled: true, visible: false })}
        >
          查看
        </a>,
        <a
          key={`${data.taskId}up`}
          onClick={() => openModifyModal({ id: data.taskId, disabled: false })}
        >
          修改
        </a>,
        <a key={`${data.taskId}down`} onClick={() => openDownModal()}>
          下发
        </a>,
        <a key={`${data.bookId}back`} onClick={() => openFeedbackModal(id)}>
          反馈
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ActionDeacription form={form} openAddSpecialModal={openAddSpecialModal} />
      {actionForm.actionYear && (
        <ProTable
          search={false}
          rowKey="taskId"
          headerTitle="子任务"
          actionRef={tableRef}
          scroll={{ x: 'max-content' }}
          request={async params => getChildrenTaskList(params)}
          toolBarRender={_ => [
            <Button type="primary" onClick={() => openAddModal({ visible: true })}>
              新增子任务
            </Button>,
          ]}
          columns={columns}
        />
      )}
    </div>
  );
};

export default connect(({ specialAction, global }) => ({
  // actionForm:specialAction.actionForm,
  specialAction,
  enums: global.enums,
}))(Table);

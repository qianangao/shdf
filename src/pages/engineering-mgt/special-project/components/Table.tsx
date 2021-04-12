import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';
import ActionDescription from './describe-action/ActionDescription';

const Table = ({
  specialAction,
  openAddModal,
  openDownModal,
  openModifyModal,
  specialActionModal,
  annualSpecialActionModal,
  openFeedbackModal,
  dispatch,
  enums,
}) => {
  const { tableRef, actionForm } = specialAction;
  const [form] = ActionDescription.useForm();
  const getChildrenTaskList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/getChildrenTaskList',
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
    // {
    //   title: '序号',
    //   dataIndex: 'index',
    //   valueType: 'index',
    //   align: 'center',
    //   fixed: 'left',
    //   width: 64,
    // },
    { title: '子任务名称', align: 'center', dataIndex: 'taskName', hideInSearch: true },
    { title: '开始日期', align: 'center', dataIndex: 'startDate', hideInSearch: true },
    { title: '截止日期', align: 'center', dataIndex: 'endDate', hideInSearch: true },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'taskState',
      hideInSearch: true,
      valueEnum: enums.special_task_state,
    },
    {
      title: '年度',
      align: 'center',
      dataIndex: 'taskYear',
      hideInSearch: true,
    },
    {
      title: '任务描述',
      align: 'center',
      dataIndex: 'taskDescription',
      width: 180,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 260,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.taskId}view`}
          onClick={() => openModifyModal({ id: data.taskId, disabled: true, visible: false })}
          hidden={!checkAuthority('em/sa/taskDetail')}
        >
          查看
        </a>,
        <a
          key={`${data.taskId}up`}
          onClick={() => openModifyModal({ id: data.taskId, disabled: false })}
          hidden={!checkAuthority('em/sa/taskUpdate')}
        >
          {data.taskState === 0 && '修改'}
        </a>,
        <a
          key={`${data.taskId}down`}
          onClick={() => openDownModal(data.taskId)}
          hidden={!checkAuthority('em/sa/taskDeploy')}
        >
          {data.taskState === 0 && '下发'}
        </a>,
        <a
          key={`${data.taskId}back`}
          onClick={() => openFeedbackModal(data.taskId)}
          hidden={!checkAuthority('em/sa/taskFeedback')}
        >
          {data.taskState === 1 && '反馈'}
        </a>,
        <Popconfirm
          title="你确定要删除该子任务吗？"
          onConfirm={() => confirmDelete(data.taskId)}
          okText="是"
          cancelText="否"
        >
          <a key={`${data.taskId}del`} hidden={!checkAuthority('em/sa/taskDelete')}>
            {data.taskState === 0 && '删除'}
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      <ActionDescription
        form={form}
        specialActionModal={specialActionModal}
        annualSpecialActionModal={annualSpecialActionModal}
      />
      {actionForm.actionYear && (
        <ProTable
          search={false}
          rowKey="taskId"
          headerTitle="子任务"
          actionRef={tableRef}
          rowClassName={getSecrecyRowClassName}
          scroll={{ x: 'max-content' }}
          request={async params => getChildrenTaskList(params)}
          toolBarRender={_ => [
            <Button
              type="primary"
              hidden={!checkAuthority('em/sa/taskAdd')}
              onClick={() => openAddModal({ visible: true })}
            >
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
  specialAction,
  enums: global.enums,
}))(Table);

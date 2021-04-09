import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
// import { checkAuthority } from '@/utils/authority';
import EngineeringDescription from './engineering-info/EngineeringDescription';

const Table = ({
  defenseEngineering,
  dispatch,
  enums,
  feedbackModal,
  defenseEngineeringModal,
  annualDefenseEngineeringModal,
  modifyProjectTaskModal,
  addProjectTaskModal,
  tempProvinceModal,
  engineeringForm,
  downModal,
}) => {
  const { tableRef } = defenseEngineering;

  const confirmDelete = id =>
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/deleteProjectTask',
        payload: { taskId: id },
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
      dataIndex: 'taskStatus',
      hideInSearch: true,
      valueEnum: enums.special_task_state,
    },
    { title: '任务描述', align: 'center', dataIndex: 'taskContent', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 240,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.taskId}view`}
          onClick={() =>
            modifyProjectTaskModal({ id: data.taskId, disabled: true, visible: false })
          }
          // hidden={!checkAuthority('em/dep/task/detail')}
        >
          查看
        </a>,
        <a
          key={`${data.taskId}up`}
          onClick={() => modifyProjectTaskModal({ id: data.taskId, disabled: false, add: true })}
          // hidden={!checkAuthority('em/dep/task/update')}
        >
          {data.taskStatus === 0 && '修改'}
        </a>,
        <a
          key={`${data.taskId}down`}
          onClick={() => downModal(data.taskId)}
          // hidden={!checkAuthority('em/dep/task/deploy')}
        >
          {data.taskStatus === 0 && '下发'}
        </a>,
        <a
          key={`${data.taskId}back`}
          onClick={() => feedbackModal(data.taskId)}
          // hidden={!checkAuthority('em/dep/task/feedback')}
        >
          {data.taskStatus === 1 && '反馈'}
        </a>,
        <Popconfirm
          title="你确定要删除该反馈要求吗？"
          onConfirm={() => confirmDelete(data.taskId)}
          okText="是"
          cancelText="否"
        >
          <a
            key={`${data.taskId}del`}
            //  hidden={!checkAuthority('em/dep/task/delete')}
          >
            {data.taskStatus === 0 && '删除'}
          </a>
        </Popconfirm>,
      ],
    },
  ];

  const getEngineeringList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/getEngineeringList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <div>
      <EngineeringDescription
        defenseEngineeringModal={defenseEngineeringModal}
        annualDefenseEngineeringModal={annualDefenseEngineeringModal}
        tempProvinceModal={tempProvinceModal}
      />
      {engineeringForm.startTime && (
        <ProTable
          rowKey="taskId"
          headerTitle="项目任务"
          search={false}
          actionRef={tableRef}
          rowClassName={getSecrecyRowClassName}
          scroll={{ x: 'max-content' }}
          request={async params => getEngineeringList(params)}
          columns={columns}
          toolBarRender={_ => [
            <Button
              type="primary"
              onClick={() => addProjectTaskModal()}
              // hidden={!checkAuthority('em/dep/task/add')}
            >
              新增子任务
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default connect(({ defenseEngineering, global }) => ({
  defenseEngineering,
  engineeringForm: defenseEngineering.engineeringForm,
  enums: global.enums,
}))(Table);

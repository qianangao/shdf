import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import EngineeringDescription from './engineeringInfo/EngineeringDescription';

const Table = ({ dictionaryMgt, dispatch, enums, openAddEngineeringModal }) => {
  const { tableRef } = dictionaryMgt;
  // engineeringForm
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
    // {
    //   title: '年度',
    //   align: 'center',
    //   dataIndex: 'taskYear',
    //   hideInSearch: true,
    // },
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
      width: 240,
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
          onClick={() => openModifyModal({ id: data.taskId, disabled: false, FeedbackDetailModal })}
        >
          {data.taskState === 0 && '修改'}
        </a>,
        <a key={`${data.taskId}down`} onClick={() => openDownModal()}>
          {data.taskState === 0 && '下发'}
        </a>,
        <a key={`${data.taskId}back`} onClick={() => openFeedbackModal(data.taskId)}>
          {data.taskState === 2 && '反馈'}
        </a>,
        <Popconfirm
          title="你确定要删除该反馈要求吗？"
          onConfirm={() => confirmDelete(data.taskId)}
          okText="是"
          cancelText="否"
        >
          <a key={`${data.taskId}del`}>{data.taskState === 0 && '删除'}</a>
        </Popconfirm>,
      ],
    },
  ];

  const getEngineeringList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getEngineeringList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <div>
      <EngineeringDescription openAddEngineeringModal={openAddEngineeringModal} />
      {/* { engineeringForm.actionYear && ( */}
      <ProTable
        rowKey="taskId"
        headerTitle="项目任务"
        search={false}
        actionRef={tableRef}
        rowSelection={[]}
        scroll={{ x: 'max-content' }}
        request={async params => getEngineeringList(params)}
        columns={columns}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => openAddModal({ visible: true })}>
            新增任务
          </Button>,
        ]}
      />
      {/* )} */}
    </div>
  );
};

export default connect(({ dictionaryMgt, global }) => ({
  dictionaryMgt,
  enums: global.enums,
}))(Table);

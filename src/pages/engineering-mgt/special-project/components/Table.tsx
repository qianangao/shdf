import React, { useRef, useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import ActionForm from './EditAction/ActionForm';
import { getSpecialActionTree } from '../service';

const Table = ({
  specialAction,
  openAddModal,
  openDownModal,
  openModifyModal,
  openAddSpecialModal,
  openFeedbackModal,
  dispatch,
}) => {
  const { tableRef } = specialAction;
  const [form] = ActionForm.useForm();
  const formRef = useRef();

  // useEffect(() => {
  //   dispatch({
  //     type:'specialAction/getSpecialActionTree',

  //   })
  // })

  useEffect(() => {
    getSpecialActionTree({}).then(data => {
      if (data.error) {
        return;
      }
      new Promise(resolve => {
        dispatch({
          type: 'specialAction/getSpecialAction',
          payload: { actionId: data[0].key },
          resolve,
        });
      }).then(res => {
        form.setFieldsValue({ ...res });
      });
    });
  }, []);

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
    { title: '状态', align: 'center', dataIndex: 'taskState', hideInSearch: true },
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
          key={`${data.bookId}view`}
          onClick={() => openModifyModal({ id: data.bookId, disabled: true })}
        >
          查看
        </a>,
        <a
          key={`${data.bookId}up`}
          onClick={() => openModifyModal({ id: data.bookId, disabled: false })}
        >
          修改
        </a>,
        <a key={`${data.bookId}down`} onClick={() => openDownModal()}>
          下发
        </a>,
        <a key={`${data.bookId}back`} onClick={() => openFeedbackModal(data.bookId)}>
          反馈
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ActionForm form={form} openAddSpecialModal={openAddSpecialModal} />
      <ProTable
        search={false}
        rowKey="taskId"
        headerTitle="子任务"
        actionRef={tableRef}
        formRef={formRef}
        scroll={{ x: 'max-content' }}
        request={async params => getChildrenTaskList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => openAddModal()}>
            新增子任务
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ specialAction, global }) => ({
  specialAction,
  enums: global.enums,
}))(Table);

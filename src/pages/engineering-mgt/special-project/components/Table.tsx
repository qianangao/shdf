import React, { useRef } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import ActionForm from './ActionForm';

const Table = ({ specialAction, openModifyModal, dispatch }) => {
  const { tableRef } = specialAction;
  const [form] = ActionForm.useForm();
  const formRef = useRef();

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
    { title: '子任务名称', align: 'center', dataIndex: 'userName', hideInSearch: true },
    {
      title: '年度',
      align: 'center',
      dataIndex: 'gender',
      hideInSearch: true,
    },
    { title: '开始日期', align: 'center', dataIndex: 'userDept', hideInSearch: true },
    { title: '截止日期', align: 'center', dataIndex: 'job', hideInSearch: true },
    { title: '状态', align: 'center', dataIndex: 'phoneNumber', hideInSearch: true },
    { title: '任务描述', align: 'center', dataIndex: 'officeTelephone', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a key={`${data.bookId}up`} onClick={() => openModifyModal(data.bookId)}>
          修改
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ActionForm form={form} />
      <ProTable
        search={false}
        rowKey="bookId"
        headerTitle="子任务"
        actionRef={tableRef}
        formRef={formRef}
        scroll={{ x: 'max-content' }}
        request={async params => getChildrenTaskList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => openModifyModal()}>
            新增子任务
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ specialAction }) => ({
  specialAction,
}))(Table);

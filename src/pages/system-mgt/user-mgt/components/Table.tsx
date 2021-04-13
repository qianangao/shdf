import React, { useRef } from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';

const Table = ({
  userMgt,
  openModifyModal,
  openDetailModal,
  openRoleTableModal,
  // openAddRoleModal,
  dispatch,
}) => {
  const { tableRef } = userMgt;
  const formRef = useRef();
  // const uploadLgbListRef = useRef();
  const deleteUser = userId => {
    dispatch({
      type: 'userMgt/deleteUser',
      payload: userId,
    });
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    // { title: '序号', align: 'center', dataIndex: 'index', hideInSearch: true },
    { title: '姓名', align: 'center', dataIndex: 'userName' },
    { title: '编码', align: 'center', dataIndex: 'userCode', hideInSearch: true },
    { title: '状态', align: 'center', dataIndex: 'userStatus' },
    { title: '电子邮箱', align: 'center', dataIndex: 'email' },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 300,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.userId}detail`}
          onClick={() => openDetailModal(data.userId)}
          hidden={!checkAuthority('sm/um/detail')}
        >
          查看
        </a>,
        <a
          key={`${data.userId}up`}
          onClick={() => openModifyModal(data.userId)}
          hidden={!checkAuthority('sm/um/detail')}
        >
          编辑
        </a>,
        <Popconfirm
          key={`${data.userId}del`}
          title="确认删除该人员信息吗？"
          placement="topRight"
          onConfirm={() => deleteUser(data.userId)}
        >
          <a hidden={!checkAuthority('sm/um/delete')}>删除</a>
        </Popconfirm>,
        <a
          key={`${data.userId}up`}
          onClick={() => openRoleTableModal(data.userId)}
          hidden={!checkAuthority('sm/um/role')}
        >
          角色
        </a>,
      ],
    },
  ];

  const getUserList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'userMgt/getUserList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <div>
      <ProTable
        rowKey="userId"
        headerTitle="人员列表"
        actionRef={tableRef}
        formRef={formRef}
        rowClassName={getSecrecyRowClassName}
        rowSelection={[]}
        scroll={{ x: 'max-content' }}
        request={async params => getUserList(params)}
        toolBarRender={_ => [
          <Button
            type="primary"
            onClick={() => openModifyModal()}
            hidden={!checkAuthority('sm/um/add')}
          >
            新增
          </Button>,
          // <Button type="primary" onClick={() => openAddRoleModal()}>
          //   新增角色
          // </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ userMgt, global }) => ({
  userMgt,
  enums: global.enums,
}))(Table);

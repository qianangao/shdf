import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smRoleMgt, modifyRoleModal, authorityModal, dispatch }) => {
  const { tableRef } = smRoleMgt;

  const getRoleList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smRoleMgt/getRoleList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteRoles = roleId => {
    dispatch({
      type: 'smRoleMgt/deleteRoles',
      payload: {
        roleId,
      },
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
    { title: '角色名称', align: 'center', dataIndex: 'name' },
    { title: '角色描述', align: 'center', dataIndex: 'remark', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 240,
      fixed: 'right',
      render: (dom, roleData) => [
        // roleData.onlyRead && (
        <a key={`${roleData.roleId}up`} onClick={() => modifyRoleModal(roleData.roleId)}>
          修改
        </a>,

        //   <a key={`${roleData.id}deal`} onClick={() => assginModal(roleData.roleId)}>
        //   分配用户
        // </a>,
        <Popconfirm
          key={`${roleData.roleId}del`}
          title="确认删除该角色吗？该操作不可恢复"
          placement="topRight"
          onConfirm={() => deleteRoles(roleData.roleId)}
        >
          <a>删除</a>
        </Popconfirm>,
        // ),
        <a key={`${roleData.roleId}manag`} onClick={() => authorityModal(roleData.roleId)}>
          权限管理
        </a>,
      ],
    },
  ];

  return (
    <ProTable
      rowKey="roleId"
      headerTitle="角色信息"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getRoleList(params)}
      toolBarRender={_ => [
        <Button type="primary" onClick={() => modifyRoleModal()}>
          新增
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ smRoleMgt }) => ({
  smRoleMgt,
}))(Table);

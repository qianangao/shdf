import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
// import { checkAuthority } from '@/utils/authority';

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
        roleData.onlyRead === 1 && (
          <a
            key={`${roleData.roleId}up`}
            onClick={() => modifyRoleModal(roleData.roleId)}
            // hidden={!checkAuthority('sm/rm/update')}
          >
            修改
          </a>
        ),
        roleData.onlyRead === 1 && (
          <Popconfirm
            key={`${roleData.roleId}del`}
            title="确认删除该角色吗？该操作不可恢复"
            placement="topRight"
            onConfirm={() => deleteRoles(roleData.roleId)}
          >
            <a
              key={`${roleData.roleId}del`}
              // hidden={!checkAuthority('sm/rm/delete')}
            >
              删除
            </a>
          </Popconfirm>
        ),
        <a
          key={`${roleData.roleId}manag`}
          onClick={() => authorityModal(roleData.roleId)}
          // hidden={!checkAuthority('sm/rm/authority')}
        >
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
      rowClassName={getSecrecyRowClassName}
      request={async params => getRoleList(params)}
      toolBarRender={_ => [
        <Button
          type="primary"
          onClick={() => modifyRoleModal()}
          // hidden={!checkAuthority('sm/rm/add')}
        >
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

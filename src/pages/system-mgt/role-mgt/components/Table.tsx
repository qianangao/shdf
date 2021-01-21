import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smRoleMgt, openModifyModal, dispatch }) => {
  const { tableRef } = smRoleMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '角色名称', align: 'center', dataIndex: 'roleName' },
    { title: '角色描述', align: 'center', dataIndex: 'remark' },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, roleData) => [
        roleData.isEdit === 1 && (
          <a key={`${roleData.id}up`} onClick={() => openModifyModal(roleData)}>
            编辑
          </a>
        ),
        roleData.isEdit === 1 && (
          <Popconfirm
            key={`${roleData.id}del`}
            title="确认删除该角色吗？该操作不可恢复"
            placement="topRight"
            onConfirm={() => deleteRoles([roleData.id])}
          >
            <a>删除</a>
          </Popconfirm>
        ),
      ],
    },
  ];

  const getRoleList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smRoleMgt/getRoleList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteRoles = ids => {
    dispatch({
      type: 'smRoleMgt/deleteRoles',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="角色信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getRoleList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择单位？该操作不可恢复',
                onOk: () => {
                  deleteRoles(selectedRowKeys);
                },
              });
            }}
          >
            批量删除
          </Button>
        ),
      ]}
      columns={columns}
    />
  );
};

export default connect(({ smRoleMgt }) => ({
  smRoleMgt,
}))(Table);

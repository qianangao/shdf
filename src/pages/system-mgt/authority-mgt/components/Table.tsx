import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ authorityMgt, authModal, dispatch }) => {
  const { tableRef } = authorityMgt;

  const columns = [
    // {
    //   title: '序号',
    //   dataIndex: 'index',
    //   valueType: 'index',
    //   align: 'center',
    //   fixed: 'left',
    //   width: 64,
    // },
    { title: '资源名称', align: 'center', dataIndex: 'permessionName', hideInSearch: true },
    { title: '资源权限', align: 'center', dataIndex: 'permessionResource', hideInSearch: true },
    { title: '权限类型', align: 'center', dataIndex: 'permessionType', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 240,
      fixed: 'right',
      render: (dom, roleData) => [
        <a key={`${roleData.permessionId}up`} onClick={() => authModal(roleData.permessionId)}>
          修改
        </a>,
        <Popconfirm
          key={`${roleData.permessionId}del`}
          title="确认删除该权限吗？该操作不可恢复"
          placement="topRight"
          onConfirm={() => deleteAuth(roleData.permessionId)}
        >
          <a>删除</a>
        </Popconfirm>,
        <a
          key={`${roleData.permessionId}add`}
          onClick={() => authModal({ id: roleData.permessionId, visible: true })}
        >
          新建子资源
        </a>,
      ],
    },
  ];

  const getRoleList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'authorityMgt/getAuthList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteAuth = ids => {
    dispatch({
      type: 'authorityMgt/deleteAuth',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="roleId"
      headerTitle="权限信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getRoleList(params)}
      toolBarRender={_ => [
        <Button type="primary" onClick={() => authModal()}>
          新增
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ authorityMgt }) => ({
  authorityMgt,
}))(Table);

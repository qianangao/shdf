import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { checkAuthority } from '@/utils/authority';

const Table = ({ authorityMgt, authModal, dispatch, enums }) => {
  const { tableRef } = authorityMgt;
  const deleteAuth = permessionId => {
    dispatch({
      type: 'authorityMgt/deleteAuth',
      payload: {
        permessionId,
      },
    });
  };
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
    {
      title: '权限类型',
      align: 'center',
      dataIndex: 'permessionType',
      hideInSearch: true,
      valueEnum: enums.system_permession,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 240,
      fixed: 'right',
      render: (dom, roleData) => [
        <a
          key={`${roleData.permessionId}up`}
          hidden={!checkAuthority('am/update')}
          onClick={() => authModal({ id: roleData.permessionId })}
        >
          修改
        </a>,
        <Popconfirm
          key={`${roleData.permessionId}del`}
          title="确认删除该权限吗？该操作不可恢复"
          placement="topRight"
          onConfirm={() => deleteAuth(roleData.permessionId)}
        >
          <a hidden={!checkAuthority('am/delete')}>删除</a>
        </Popconfirm>,
        <a
          key={`${roleData.permessionId}add`}
          hidden={!checkAuthority('am/newChild')}
          onClick={() =>
            authModal({
              name: roleData.permessionName,
              parentId: roleData.permessionId,
              visible: true,
            })
          }
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

  return (
    <ProTable
      search={false}
      rowKey="permessionId"
      headerTitle="权限信息"
      actionRef={tableRef}
      // rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getRoleList(params)}
      toolBarRender={_ => [
        <Button type="primary" onClick={() => authModal()} hidden={!checkAuthority('am/add')}>
          新增
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ authorityMgt, global }) => ({
  authorityMgt,
  enums: global.enums,
}))(Table);

import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openModifyModal, enums, dispatch }) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '单位名称', align: 'center', dataIndex: 'organizationName' },
    {
      title: '单位性质',
      align: 'center',
      dataIndex: 'dictOrganizationType',
      valueEnum: enums.dictOrganizationType,
      hideInSearch: true,
    },
    {
      title: '父单位名称',
      align: 'center',
      dataIndex: 'parentOrganizationName',
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, orgData) => [
        <a key={`${orgData.id}up`} onClick={() => openModifyModal(orgData)}>
          编辑
        </a>,
        <Popconfirm
          key={`${orgData.id}del`}
          title="确认删除该组织吗？该操作不可恢复"
          placement="topRight"
          onConfirm={() => deleteOrgs([orgData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getOrgList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'orgTree/getOrgList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteOrgs = ids => {
    dispatch({
      type: 'orgTree/deleteOrgs',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="组织信息"
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getOrgList(params)}
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
                  deleteOrgs(selectedRowKeys);
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

export default connect(({ orgTree, global }) => ({
  orgTree,
  enums: global.enums,
}))(Table);

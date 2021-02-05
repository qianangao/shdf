import React from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  caseMgt,
  openDistributeModal,
  openModifyModal,
  openDetailModal,
  openAddModal,
  openReadListModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = caseMgt;
  const columns = [
    {
      title: '案件名称',
      dataIndex: 'receiptCode',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '案件编号', align: 'center', dataIndex: 'receiptTitle' },
    {
      title: '案件类型',
      align: 'center',
      dataIndex: 'docNo',
      valueEnum: enums.dictOrganizationType,
    },
    {
      title: '案件来源',
      align: 'center',
      dataIndex: 'docUnit',
    },
    {
      title: '案件地域',
      align: 'center',
      dataIndex: 'urgentLevel',
      valueEnum: enums.urgent_level,
      hideInSearch: true,
    },
    {
      title: '办理状态',
      align: 'center',
      dataIndex: 'receiptData',
      hideInSearch: true,
    },
    {
      title: '办理操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'receiptId',
      width: 180,
      fixed: 'right',
      render: (dom, receivingData) => [
        <a key={`${receivingData.id}up`} onClick={() => openDetailModal(receivingData)}>
          查看
        </a>,
        <a key={`${receivingData.id}up`} onClick={() => openModifyModal(receivingData)}>
          修改
        </a>,
        <a key={`${receivingData.id}up`} onClick={() => openReadListModal(receivingData)}>
          处理情况
        </a>,
        <a key={`${receivingData.id}up`} onClick={() => openDistributeModal(receivingData)}>
          分发
        </a>,
      ],
    },
    {
      title: '备案督办状态',
      align: 'center',
      dataIndex: 'receiptData',
      hideInSearch: true,
    },
    {
      title: '备案督办操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'receiptId',
      width: 80,
      fixed: 'right',
      render: (dom, receivingData) => [
        <a key={`${receivingData.id}up`} onClick={() => openDetailModal(receivingData)}>
          查看
        </a>,
        <a key={`${receivingData.id}up`} onClick={() => openModifyModal(receivingData)}>
          修改
        </a>,
      ],
    },
  ];

  const getReceivingList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'caseMgt/getReceivingList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteOrgs = ids => {
    dispatch({
      type: 'caseMgt/deleteOrgs',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      actionRef={tableRef}
      rowKey="receiptId"
      headerTitle="案件列表"
      // rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getReceivingList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
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

export default connect(({ caseMgt, global }) => ({
  caseMgt,
  enums: global.enums,
}))(Table);

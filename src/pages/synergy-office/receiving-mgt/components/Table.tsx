import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { checkAuthority } from '@/utils/authority';

const Table = ({
  receivingMgt,
  openDistributeModal,
  openModifyModal,
  openDetailModal,
  openAddModal,
  openReadListModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = receivingMgt;

  const deleteReceiving = id => {
    dispatch({
      type: 'receivingMgt/deleteReceiving',
      payload: {
        id,
      },
    });
  };

  const columns = [
    {
      title: '收文编号',
      dataIndex: 'receiptCode',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
    },
    { title: '来文标题', align: 'center', dataIndex: 'receiptTitle' },
    {
      title: '来文文号',
      align: 'center',
      dataIndex: 'docNo',
      valueEnum: enums.dictOrganizationType,
    },
    {
      title: '来文单位',
      align: 'center',
      dataIndex: 'docUnit',
    },
    {
      title: '紧急程度',
      align: 'center',
      dataIndex: 'urgentLevel',
      valueEnum: enums.urgent_level,
      hideInSearch: true,
    },
    {
      title: '收文日期',
      align: 'center',
      dataIndex: 'receiptData',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'receiptId',
      width: 220,
      fixed: 'right',
      render: (dom, receivingData) => [
        <a key={`${receivingData.receiptId}add`} onClick={() => openDetailModal(receivingData)}>
          查看
        </a>,
        <a
          // TODO 按钮权限demo
          hidden={!checkAuthority('rm/update')}
          key={`${receivingData.receiptId}up`}
          onClick={() => openModifyModal(receivingData)}
        >
          修改
        </a>,
        <a key={`${receivingData.receiptId}read`} onClick={() => openReadListModal(receivingData)}>
          阅读情况
        </a>,
        <a key={`${receivingData.receiptId}dis`} onClick={() => openDistributeModal(receivingData)}>
          分发
        </a>,
        <Popconfirm
          key={`${receivingData.receiptId}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteReceiving(receivingData.receiptId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getReceivingList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'receivingMgt/getReceivingList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      actionRef={tableRef}
      rowKey="receiptId"
      headerTitle="收文列表"
      // rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getReceivingList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          收文登记
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择单位？该操作不可恢复',
                onOk: () => {
                  deleteReceiving(selectedRowKeys);
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

export default connect(({ receivingMgt, global }) => ({
  receivingMgt,
  enums: global.enums,
}))(Table);

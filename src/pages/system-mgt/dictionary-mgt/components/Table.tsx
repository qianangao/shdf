import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smDictionaryMgt, openModifyModal, openMaintainModal, dispatch }) => {
  const { tableRef } = smDictionaryMgt;

  const deleteDict = id => {
    dispatch({
      type: 'receivingMgt/deleteReceiving',
      payload: {
        id,
      },
    });
  };

  const columns = [
    {
      title: '字典代码',
      dataIndex: 'dictTypeCode',
      align: 'center',
      width: 64,
    },
    { title: '类型名称', align: 'center', dataIndex: 'dictTypeName' },
    { title: '备注', align: 'center', dataIndex: 'dictTypeDesc', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'receiptId',
      width: 220,
      fixed: 'right',
      render: (dom: any, receivingData: { receiptId: any }) => [
        <a key={`${receivingData.receiptId}up`} onClick={() => openModifyModal(receivingData)}>
          修改
        </a>,
        <a key={`${receivingData.receiptId}up`} onClick={() => openMaintainModal(receivingData)}>
          维护
        </a>,
        <Popconfirm
          key={`${receivingData.receiptId}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteDict(receivingData.receiptId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getDictList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smDictionaryMgt/getDictList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteDicts = ids => {
    dispatch({
      type: 'smDictionaryMgt/deleteDicts',
      payload: { ids },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="字典信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getDictList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择字典信息？该操作不可恢复',
                onOk: () => {
                  deleteDicts(selectedRowKeys);
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

export default connect(({ smDictionaryMgt, global }) => ({
  smDictionaryMgt,
  enums: global.enums,
}))(Table);

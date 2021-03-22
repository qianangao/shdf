import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smDictionaryMgt, openModifyModal, changeTypeId, dispatch }) => {
  const { tableRef } = smDictionaryMgt;

  const columns = [
    {
      title: '类型编码',
      dataIndex: 'dictTypeCode',
      align: 'center',
    },
    { title: '类型名称', align: 'center', dataIndex: 'dictTypeName' },
    { title: '作用域', align: 'center', dataIndex: 'dictScope' },
    { title: '备注', align: 'center', dataIndex: 'dictTypeDesc', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'dictTypeId',
      width: 80,
      fixed: 'right',
      render: (dom: any, receivingData: { dictTypeId: any }) => [
        <a key={`${receivingData.dictTypeId}up`} onClick={() => openModifyModal(receivingData)}>
          修改
        </a>,
        <Popconfirm
          key={`${receivingData.dictTypeId}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteTypes([receivingData.dictTypeId])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getFieldList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smDictionaryMgt/getTypeList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteTypes = ids => {
    dispatch({
      type: 'smDictionaryMgt/deleteTypes',
      payload: { ids },
    });
  };

  return (
    <ProTable
      rowKey="dictTypeId"
      headerTitle="字典信息"
      actionRef={tableRef}
      columnsStyle={{ cursor: 'pointer' }}
      scroll={{ x: 'max-content' }}
      onRow={record => {
        return {
          onClick: () => {
            changeTypeId(record.dictTypeId);
          },
        };
      }}
      request={async params => getFieldList(params)}
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
                  deleteTypes(selectedRowKeys);
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

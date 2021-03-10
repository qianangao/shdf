import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const FieldTable = ({ smDictionaryMgt, openAddFieldModal, openFieldModal, dispatch }) => {
  const { fieldTableRef } = smDictionaryMgt;

  const deleteDictType = (id: any) => {
    dispatch({
      type: 'smDictionaryMgt/deleteReceiving',
      payload: {
        id,
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
    { title: '字典代码', align: 'center', dataIndex: 'dictTypeCode', hideInSearch: true },
    { title: '类型名称', align: 'center', dataIndex: 'dictTypeName', hideInSearch: true },
    { title: '字段名称', align: 'center', dataIndex: 'dictName', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',

      render: (dom, dictData) => [
        <a key={`${dictData.id}up`} onClick={() => openFieldModal(dictData, 1)}>
          编辑
        </a>,
        <Popconfirm
          key={`${dictData.receiptId}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteDictType(dictData.receiptId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getFieldList = (params: { pageSize?: number | undefined; current?: number | undefined }) =>
    new Promise(resolve => {
      dispatch({
        type: 'smDictionaryMgt/getFieldList',
        payload: { ...params, dictTypeId: dictData.dictTypeId },
        resolve,
      });
    });

  const deleteFields = (ids: React.ReactText[]) => {
    dispatch({
      type: 'smDictionaryMgt/deleteFields',
      payload: { idsDictionary: ids },
    });
  };

  return (
    <ProTable
      rowKey="code"
      headerTitle="字段信息"
      actionRef={fieldTableRef}
      search={false}
      destroyOnClose
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getFieldList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddFieldModal(dictData)}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择字段？该操作不可恢复',
                onOk: () => {
                  deleteFields(selectedRowKeys);
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

export default connect(({ smDictionaryMgt }) => ({
  smDictionaryMgt,
}))(FieldTable);

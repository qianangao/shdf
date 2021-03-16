import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const FieldTable = ({ smDictionaryMgt, openDictModifyModal, dictTypeId, dispatch }) => {
  const { fieldTableRef } = smDictionaryMgt;

  const columns = [
    { title: '字典编码', align: 'center', dataIndex: 'dictCode', hideInSearch: true },
    { title: '字典名称', align: 'center', dataIndex: 'dictName', hideInSearch: true },
    { title: '排序', align: 'center', dataIndex: 'dictSort', hideInSearch: true },
    { title: '备注', align: 'center', dataIndex: 'dictDesc', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'dictId',
      width: 180,
      fixed: 'right',

      render: (dom: any, dictData: { dictId: any }) => [
        <a key={`${dictData.dictId}up`} onClick={() => openDictModifyModal(dictData, 1)}>
          编辑
        </a>,
        <Popconfirm
          key={`${dictData.dictId}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteFields([dictData.dictId])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getFieldList = (params: { pageSize?: number | undefined; current?: number | undefined }) =>
    new Promise(resolve => {
      dispatch({
        type: 'smDictionaryMgt/getDictList',
        payload: { ...params, dictTypeId },
        resolve,
      });
    });

  const deleteFields = (ids: React.ReactText[]) => {
    dispatch({
      type: 'smDictionaryMgt/deleteDicts',
      payload: { ids },
    });
  };

  return (
    <ProTable
      rowKey="code"
      headerTitle="字段信息"
      actionRef={fieldTableRef}
      search={false}
      destroyOnClose
      scroll={{ x: 'max-content' }}
      request={async params => getFieldList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openDictModifyModal(dictTypeId)}>
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

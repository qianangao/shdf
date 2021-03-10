import React from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const FieldTable = ({ smDictionaryMgt, dictData, openFieldModal, dispatch }) => {
  const { fieldTableRef } = smDictionaryMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '字典代码', align: 'center', dataIndex: 'name', hideInSearch: true },
    { title: '类型名称', align: 'center', dataIndex: 'chineseName', hideInSearch: true },
    { title: '字段名称', align: 'center', dataIndex: 'remarks', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, orgData) => [
        <a key={`${orgData.id}up`} onClick={() => openFieldModal(orgData)}>
          编辑
        </a>,
      ],
    },
  ];

  const getFieldList = () =>
    new Promise(resolve => {
      dispatch({
        type: 'smDictionaryMgt/getFieldList',
        payload: { chineseName: dictData.chineseName },
        resolve,
      });
    });

  const deleteFields = ids => {
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
        <Button type="primary" onClick={() => openFieldModal(dictData)}>
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

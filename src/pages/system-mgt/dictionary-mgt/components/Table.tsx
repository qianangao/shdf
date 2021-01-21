import React from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smDictionaryMgt, openMaintainModal, openAddDictModal, dispatch }) => {
  const { tableRef } = smDictionaryMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '字典名称', align: 'center', dataIndex: 'name' },
    { title: '字段类型', align: 'center', dataIndex: 'chineseName', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, orgData) => [
        <a key={`${orgData.id}up`} onClick={() => openMaintainModal(orgData)}>
          维护
        </a>,
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
        <Button type="primary" onClick={() => openAddDictModal()}>
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

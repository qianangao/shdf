import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';

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
        <a
          key={`${receivingData.dictTypeId}up`}
          onClick={e => {
            openModifyModal(receivingData);
            e.stopPropagation();
          }}
          hidden={!checkAuthority('sm/dim/updateType')}
        >
          修改
        </a>,
        <Popconfirm
          key={`${receivingData.dictTypeId}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={e => deleteTypes([receivingData.dictTypeId], e)}
          onCancel={e => e.stopPropagation()}
        >
          <a hidden={!checkAuthority('sm/dim/deleteType')} onClick={e => e.stopPropagation()}>
            删除
          </a>
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

  const deleteTypes = (ids, e) => {
    dispatch({
      type: 'smDictionaryMgt/deleteTypes',
      payload: { ids },
    });
    e.stopPropagation();
  };

  return (
    <ProTable
      rowKey="dictTypeId"
      headerTitle="字典类型列表"
      actionRef={tableRef}
      rowClassName={getSecrecyRowClassName}
      columnsStyle={{ cursor: 'pointer' }}
      scroll={{ x: 'max-content' }}
      style={{ cursor: 'pointer' }}
      onRow={record => {
        return {
          onClick: () => {
            changeTypeId(record.dictTypeId);
          },
        };
      }}
      request={async params => getFieldList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button
          type="primary"
          onClick={() => openModifyModal()}
          hidden={!checkAuthority('sm/dim/addType')}
        >
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

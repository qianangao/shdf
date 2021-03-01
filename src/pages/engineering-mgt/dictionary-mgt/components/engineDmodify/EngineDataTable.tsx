import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

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
    // {
    //   title: '上报省份',
    //   dataIndex: 'receiptCode',
    //   align: 'center',
    //   fixed: 'left',
    //   width: 64,
    // },
    {
      title: '上报省份',
      dataIndex: 'receiptCode',
      // filters: true,
      // onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
        },
        closed: {
          text: '已解决',
        },
        processing: {
          text: '解决中',
        },
      },
    },
    {
      title: '上报日期',
      align: 'center',
      dataIndex: 'receiptData',
      valueType: 'date',
 
       hideInSearch: true,
    },
    {
      title: '上报日期',
      align: 'center',
      dataIndex: 'receiptData',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },  
      // hideInSearch: true,
    },
    { title: '非法出版物数量', align: 'center', dataIndex: 'receiptTitle', hideInSearch: true, },
    {
      title: '宣传品数量',
      align: 'center',
      dataIndex: 'docNo',
      valueEnum: enums.dictOrganizationType,
      hideInSearch: true,
    },
    {
      title: '删除网络信息数量',
      align: 'center',
      dataIndex: 'docUnit',
      hideInSearch: true,
    },
    {
      title: '查办工程案件的数量',
      align: 'center',
      dataIndex: 'urgentLevel',
      valueEnum: enums.urgent_level,
      hideInSearch: true,
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
      headerTitle="工程数据"
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

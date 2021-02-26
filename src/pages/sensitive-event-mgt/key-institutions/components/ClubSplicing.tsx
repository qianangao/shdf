import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { Button } from 'antd';

const TableCaseHandle = ({ dispatch, id, sensitiveMgt, openClubSplicingModal }) => {
  const { tableHandleRef } = sensitiveMgt;
  const columns = [
    {
      title: '线索编号',
      dataIndex: 'recordId',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '线索名称',
      align: 'center',
      hideInSearch: true,
      dataIndex: 'receiptId',
    },
    {
      title: '线索类型',
      align: 'center',
      type: 'dateTime',
      hideInSearch: true,
      dataIndex: 'createTime',
    },
    {
      title: '被举报人',
      align: 'center',
      dataIndex: 'readingOrg',
      hideInSearch: true,
    },
    {
      title: '被举报机构',
      align: 'center',
      dataIndex: 'lastUpdateTime',
      hideInSearch: true,
    },
    {
      title: '发生地域',
      align: 'center',
      dataIndex: 'lastUpdateTime',
      hideInSearch: true,
    },
  ];

  const getCaseHandleList = params =>
    new Promise(resolve => {
      params.id = id;
      dispatch({
        type: 'sensitiveMgt/getCaseHandleList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      actionRef={tableHandleRef}
      scroll={{ x: 'max-content' }}
      search={false}
      options={false}
      request={async params => getCaseHandleList(params)}
      columns={columns}
      toolBarRender={_ => [
        <Button type="primary" onClick={() => openClubSplicingModal()}>
          线索串并联
        </Button>,
      ]}
    />
  );
};

export default connect(({ sensitiveMgt, global, loading }) => ({
  sensitiveMgt,
  loading: loading.models.sensitiveMgt,
  enums: global.enums,
}))(TableCaseHandle);

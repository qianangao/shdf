import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { Button } from 'antd';

const TableCaseHandle = ({ dispatch, id, sensitiveMgt, openAssociationModal, isDetail }) => {
  const { tableClubRef } = sensitiveMgt;
  const columns = [
    {
      title: '线索编号',
      dataIndex: 'clueNumber',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '线索名称',
      align: 'center',
      hideInSearch: true,
      dataIndex: 'clueName',
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
        type: 'sensitiveMgt/getClubList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      actionRef={tableClubRef}
      scroll={{ x: 'max-content' }}
      search={false}
      options={false}
      pagination={{ pageSizeOptions: ['5'], defaultPageSize: 5, simple: true }}
      request={async params => getCaseHandleList(params)}
      columns={columns}
      toolBarRender={_ => [
        isDetail === 1 ? null : (
          <Button type="primary" onClick={() => openAssociationModal()}>
            线索串并联
          </Button>
        ),
      ]}
    />
  );
};

export default connect(({ sensitiveMgt, global, loading }) => ({
  sensitiveMgt,
  loading: loading.models.sensitiveMgt,
  enums: global.enums,
}))(TableCaseHandle);

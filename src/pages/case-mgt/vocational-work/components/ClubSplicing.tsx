import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { Button } from 'antd';

const TableCaseHandle = ({ dispatch, id, caseMgt, openAssociationModal, isDetail }) => {
  const { tableClubRef } = caseMgt;
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
      dataIndex: 'clueType',
    },
    {
      title: '被举报人',
      align: 'center',
      dataIndex: 'reportName',
      hideInSearch: true,
    },
    {
      title: '被举报机构',
      align: 'center',
      dataIndex: 'reportPostcode',
      hideInSearch: true,
    },
    {
      title: '发生地域',
      align: 'center',
      dataIndex: 'relatedPublications',
      hideInSearch: true,
    },
  ];

  const getCaseClubList = params =>
    new Promise(resolve => {
      params.id = id;
      dispatch({
        type: 'caseMgt/getClubList',
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
      toolBarRender={_ => [
        isDetail === 1 ? null : (
          <Button type="primary" onClick={() => openAssociationModal()}>
            线索串并联
          </Button>
        ),
      ]}
      request={async params => getCaseClubList(params)}
      columns={columns}
    />
  );
};

export default connect(({ caseMgt, global, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
  enums: global.enums,
}))(TableCaseHandle);

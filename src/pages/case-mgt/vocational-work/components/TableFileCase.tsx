import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableFileCase = ({ dispatch, id, caseMgt }) => {
  const { tableHandleRef } = caseMgt;
  const columns = [
    {
      title: '文件id',
      dataIndex: 'fileId',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '文件名称',
      hideInSearch: true,
      dataIndex: 'fileName',
    },
  ];

  const getCaseHandleFile = params =>
    new Promise(resolve => {
      params.id = id;
      dispatch({
        type: 'caseMgt/getCaseHandleFile',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      actionRef={tableHandleRef}
      rowKey="fileId"
      headerTitle="附件列表"
      scroll={{ x: 'max-content' }}
      search={false}
      options={false}
      showHeader={false}
      request={async params => getCaseHandleFile(params)}
      columns={columns}
    />
  );
};

export default connect(({ caseMgt, global, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
  enums: global.enums,
}))(TableFileCase);
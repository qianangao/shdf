import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableFileCase = ({ dispatch, id, caseMgt }) => {
  const { tableFileRef } = caseMgt;
  const columns = [
    {
      title: '名称',
      dataIndex: 'fileName',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '上传时间',
      hideInSearch: true,
      dataIndex: 'createTime',
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
      actionRef={tableFileRef}
      rowKey="fileId"
      headerTitle="附件列表"
      search={false}
      options={false}
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

import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableFileCase = ({ dispatch, id, sensitiveMgt }) => {
  const { tableFileRef } = sensitiveMgt;
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
        type: 'sensitiveMgt/getCaseHandleFile',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      actionRef={tableFileRef}
      rowKey="fileId"
      headerTitle="附件列表"
      scroll={{ x: 'max-content' }}
      search={false}
      options={false}
      request={async params => getCaseHandleFile(params)}
      columns={columns}
    />
  );
};

export default connect(({ sensitiveMgt, global, loading }) => ({
  sensitiveMgt,
  loading: loading.models.sensitiveMgt,
  enums: global.enums,
}))(TableFileCase);

import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';

const Table = ({ documentMgt, openDetailModal, dispatch, enums }) => {
  const { tableRef } = documentMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    {
      title: '公文ID',
      dataIndex: 'documentId',
      align: 'center',
      width: 140,
      hideInSearch: true,
    },

    { title: '公文标题', align: 'center', dataIndex: 'documentTitle' },
    { title: '发布人', align: 'center', dataIndex: 'publishUser' },
    {
      title: '保存时间',
      align: 'center',
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'readingState',
      valueEnum: enums.notice_receive,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 280,
      fixed: 'right',
      render: (dom: any, data: any) => [
        <a
          hidden={!checkAuthority('so/dm/rec/detail')}
          key={`${data.documentId}detail`}
          onClick={() => openDetailModal(data.documentId, data.documentStatus, 'publish')}
        >
          查看
        </a>,
      ],
    },
  ];

  const getReceiveList = (params: {
    pageSize?: number | undefined;
    current?: number | undefined;
  }) =>
    new Promise(resolve => {
      dispatch({
        type: 'documentMgt/getReceiveList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="documentId"
      headerTitle="公文列表"
      rowClassName={getSecrecyRowClassName}
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getReceiveList(params)}
      columns={columns}
    />
  );
};

export default connect(({ documentMgt, global }) => ({
  documentMgt,
  enums: global.enums,
}))(Table);

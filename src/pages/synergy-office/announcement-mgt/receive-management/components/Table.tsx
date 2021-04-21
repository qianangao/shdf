import React from 'react';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { checkAuthority } from '@/utils/authority';

const Table = ({ soAnnouncementMgt, openDetailModal, replyModal, dispatch, enums }) => {
  const { tableRef } = soAnnouncementMgt;

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
      title: '公告ID',
      dataIndex: 'noticeId',
      align: 'center',
      width: 140,
      hideInSearch: true,
    },

    { title: '公告标题', align: 'center', dataIndex: 'noticeTitle' },
    { title: '发布人', align: 'center', dataIndex: 'createUser' },
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
          key={`${data.noticeId}detail`}
          onClick={() => openDetailModal(data.readingId, data.readingState, 'receive')}
          hidden={!checkAuthority('so/am/rem/det')}
        >
          查看
        </a>,
        data && data.readingState === 0 && (
          <a
            key={`${data.noticeId}reply`}
            onClick={() => replyModal(data.readingId)}
            hidden={!checkAuthority('so/am/rem/reply')}
          >
            回复
          </a>
        ),
      ],
    },
  ];

  const getReceiveList = (params: {
    pageSize?: number | undefined;
    current?: number | undefined;
  }) =>
    new Promise(resolve => {
      dispatch({
        type: 'soAnnouncementMgt/getReceiveList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="readingId"
      headerTitle="公告列表"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      rowClassName={getSecrecyRowClassName}
      request={async params => getReceiveList(params)}
      columns={columns}
    />
  );
};

export default connect(({ soAnnouncementMgt, global }) => ({
  soAnnouncementMgt,
  enums: global.enums,
}))(Table);

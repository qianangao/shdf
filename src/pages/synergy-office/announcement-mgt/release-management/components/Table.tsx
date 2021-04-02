import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { connect } from 'umi';

const Table = ({
  soAnnouncementMgt,
  openModifyModal,
  handleSituationModal,
  detailModal,
  commitExamineModal,
  dispatch,
  enums,
}) => {
  const { tableRef } = soAnnouncementMgt;

  const createButton = (data: { noticeId: any; noticeStatus: any }) => {
    const CHECK = (
      <a
        key={`${data.noticeId}detail`}
        onClick={() => detailModal(data.noticeId, data.noticeStatus, 'publish')}
      >
        查看
      </a>
    );
    const EDIT = (
      <a key={`${data.noticeId}up`} onClick={() => openModifyModal(data.noticeId)}>
        编辑
      </a>
    );
    const PUBLISH = (
      <Popconfirm
        key={`${data.noticeId}publish`}
        title="确认发布该公告信息吗？"
        placement="topRight"
        onConfirm={() => publishAnnouncement(data.noticeId)}
      >
        <a>发布</a>
      </Popconfirm>
    );
    const DELETE = (
      <Popconfirm
        key={`${data.noticeId}del`}
        title="确认删除该公告信息吗？"
        placement="topRight"
        onConfirm={() => deleteAnnouncement(data.noticeId)}
      >
        <a>删除</a>
      </Popconfirm>
    );
    const COMMIT_EXAMINE = (
      <a key={`${data.noticeId}commit`} onClick={() => commitExamineModal(data.noticeId)}>
        提交审核
      </a>
    );
    const EXAMINE = (
      <a
        key={`${data.noticeId}examine`}
        onClick={() => detailModal(data.noticeId, data.noticeStatus, 'examine')}
      >
        审核
      </a>
    );
    const TREATMENT = (
      <a key={`${data.noticeId}treatment`} onClick={() => handleSituationModal(data.noticeId)}>
        处理情况
      </a>
    );
    const ROLLBACK = (
      <Popconfirm
        key={`${data.noticeId}rollback`}
        title="确认撤回该公告信息吗？"
        placement="topRight"
        onConfirm={() => rollbackOrCloseAnnouncement(data.noticeId, 0)}
      >
        <a>撤回</a>
      </Popconfirm>
    );
    const CLOSE = (
      <Popconfirm
        key={`${data.noticeId}close`}
        title="确认关闭该公告信息吗？"
        placement="topRight"
        onConfirm={() => rollbackOrCloseAnnouncement(data.noticeId, 1)}
      >
        <a>关闭</a>
      </Popconfirm>
    );

    switch (data.noticeStatus) {
      case -3:
        return [CHECK, EDIT, COMMIT_EXAMINE, PUBLISH];
      case -1:
        return [CHECK, EDIT, COMMIT_EXAMINE];
      case 0:
        return [CHECK, EDIT, COMMIT_EXAMINE, PUBLISH, DELETE];
      case 1:
        return [CHECK, EXAMINE];
      case 3:
        return [CHECK, PUBLISH];
      case 5:
        return [CHECK, TREATMENT, ROLLBACK, CLOSE];
      case 7:
        return [CHECK, TREATMENT];
      case 9:
        return [CHECK];
      default:
        return [CHECK];
    }
  };

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
    { title: '发布人', align: 'center', dataIndex: 'publishUser' },
    {
      title: '发布时间',
      align: 'center',
      dataIndex: 'publishTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'noticeStatus',
      valueEnum: enums.notice_status,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 280,
      fixed: 'right',
      render: (dom: any, data: any) => createButton(data),
    },
  ];

  const publishAnnouncement = (noticeId: any) => {
    dispatch({
      type: 'soAnnouncementMgt/publishAnnouncement',
      payload: { noticeId, visibleRange: [] },
    });
  };

  const rollbackOrCloseAnnouncement = (noticeId: any, handleType: any) => {
    dispatch({
      type: 'soAnnouncementMgt/rollbackOrCloseAnnouncement',
      payload: { noticeId, handleType },
    });
  };

  const deleteAnnouncement = (noticeId: any) => {
    dispatch({
      type: 'soAnnouncementMgt/deleteAnnouncement',
      payload: { noticeId },
    });
  };

  const getAnnouncementList = (params: {
    pageSize?: number | undefined;
    current?: number | undefined;
  }) =>
    new Promise(resolve => {
      dispatch({
        type: 'soAnnouncementMgt/getAnnouncementList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="noticeId"
      headerTitle="公告列表"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      rowClassName={getSecrecyRowClassName}
      request={async params => getAnnouncementList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择字典信息？该操作不可恢复',
                onOk: () => {},
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

export default connect(({ soAnnouncementMgt, global }) => ({
  soAnnouncementMgt,
  enums: global.enums,
}))(Table);

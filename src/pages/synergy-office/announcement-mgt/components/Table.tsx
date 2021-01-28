import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ soAnnouncementMgt, openModifyModal, dispatch }) => {
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
      width: 120,
      hideInSearch: true,
    },

    { title: '公告标题', align: 'center', dataIndex: 'noticeTitle' },
    { title: '发布人', align: 'center', dataIndex: 'createUser' },
    {
      title: '保存时间',
      align: 'center',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'noticeStatus',
      valueEnum: {
        '0': { text: '草稿' },
        '1': { text: '审核中' },
        '3': { text: '已通过' },
        '-1': { text: '已驳回' },
        '5': { text: '已发布' },
        '-3': { text: '已撤回' },
        '7': { text: '已关闭' },
        '9': { text: '已接收' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom: any, data: { orgId: any; noticeId: any }) => [
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          查看
        </a>,
        <a key={`${data.orgId}up`} onClick={() => openModifyModal(data)}>
          编辑
        </a>,

        <Popconfirm
          key={`${data.orgId}del`}
          title="确认发布该公告信息吗？"
          placement="topRight"
          onConfirm={() => publishAnnouncement(data.noticeId)}
        >
          <a>发布</a>
        </Popconfirm>,
        <Popconfirm
          key={`${data.orgId}del`}
          title="确认删除该公告信息吗？"
          placement="topRight"
          onConfirm={() => deleteAnnouncement(data.noticeId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const publishAnnouncement = (noticeId: any) => {
    dispatch({
      type: 'soAnnouncementMgt/publishAnnouncement',
      payload: { noticeId, visibleRange: [] },
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
      // rowSelection={[]}
      scroll={{ x: 'max-content' }}
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

export default connect(({ soAnnouncementMgt }) => ({
  soAnnouncementMgt,
}))(Table);

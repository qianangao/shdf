import React from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import {getSecrecyRowClassName} from "@/utils/secrecy";

const Table = ({
  documentMgt,
  openModifyModal,
  handleSituationModal,
  detailModal,
  dispatch,
  enums,
}) => {
  const { tableRef } = documentMgt;

  const createButton = (data: { documentId: any; documentStatus: any }) => {
    const CHECK = (
      <a
        key={`${data.documentId}detail`}
        onClick={() => detailModal(data.documentId, data.documentStatus, 'publish')}
      >
        查看
      </a>
    );
    const EDIT = (
      <a key={`${data.documentId}up`} onClick={() => openModifyModal(data.documentId)}>
        编辑
      </a>
    );
    const PUBLISH = (
      <Popconfirm
        key={`${data.documentId}publish`}
        title="确认发布该公告信息吗？"
        placement="topRight"
        onConfirm={() => publishAnnouncement(data.documentId)}
      >
        <a>发布</a>
      </Popconfirm>
    );
    const DELETE = (
      <Popconfirm
        key={`${data.documentId}del`}
        title="确认删除该公告信息吗？"
        placement="topRight"
        onConfirm={() => deleteAnnouncement(data.documentId)}
      >
        <a>删除</a>
      </Popconfirm>
    );
    const TREATMENT = (
      <a key={`${data.documentId}treatment`} onClick={() => handleSituationModal(data.documentId)}>
        处理情况
      </a>
    );
    const ROLLBACK = (
      <Popconfirm
        key={`${data.documentId}rollback`}
        title="确认撤回该公告信息吗？"
        placement="topRight"
        onConfirm={() => rollbackOrCloseAnnouncement(data.documentId, 0)}
      >
        <a>撤回</a>
      </Popconfirm>
    );
    const CLOSE = (
      <Popconfirm
        key={`${data.documentId}close`}
        title="确认关闭该公告信息吗？"
        placement="topRight"
        onConfirm={() => rollbackOrCloseAnnouncement(data.documentId, 1)}
      >
        <a>关闭</a>
      </Popconfirm>
    );

    switch (data.documentStatus) {
      case -3:
        return [CHECK, EDIT,  PUBLISH];
      case -1:
        return [CHECK, EDIT];
      case 0:
        return [CHECK, EDIT, PUBLISH, DELETE];
      case 1:
        return [CHECK];
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
      title: '公文ID',
      dataIndex: 'documentId',
      align: 'center',
      width: 140,
      hideInSearch: true,
    },

    { title: '公文标题', align: 'center', dataIndex: 'documentTitle' },
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
      dataIndex: 'documentStatus',
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

  const publishAnnouncement = (id: any) => {
    dispatch({
      type: 'documentMgt/publishAnnouncement',
      payload: { id, visibleRange: [] },
    });
  };

  const rollbackOrCloseAnnouncement = (documentId: any, handleType: any) => {
    dispatch({
      type: 'documentMgt/rollbackOrCloseAnnouncement',
      payload: { documentId, handleType },
    });
  };

  const deleteAnnouncement = (id: any) => {
    dispatch({
      type: 'documentMgt/deleteAnnouncement',
      payload: { id },
    });
  };

  const getAnnouncementList = (params: {
    pageSize?: number | undefined;
    current?: number | undefined;
  }) =>
    new Promise(resolve => {
      dispatch({
        type: 'documentMgt/getAnnouncementList',
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

export default connect(({ documentMgt, global }) => ({
  documentMgt,
  enums: global.enums,
}))(Table);

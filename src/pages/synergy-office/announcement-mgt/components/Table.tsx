import React from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ soAnnouncementMgt, openModifyModal, dispatch }) => {
  const { tableRef } = soAnnouncementMgt;

  // useEffect(() => {
  //   // getAnnouncementList(tableType)
  //   dispatch({
  //     type: 'soAnnouncementMgt/tableReload',
  //   });
  // }, []);

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
        ANNOUNCEMENT1: { text: '草稿' },
        ANNOUNCEMENT2: { text: '审核中' },
        ANNOUNCEMENT3: { text: '已通过' },
        ANNOUNCEMENT4: { text: '已驳回' },
        ANNOUNCEMENT5: { text: '已发布' },
        ANNOUNCEMENT6: { text: '已撤回' },
        ANNOUNCEMENT7: { text: '已关闭' },
        ANNOUNCEMENT8: { text: '已接收' },
      },
      render: (dom, data) => (
        <>
          {data.noticeStatus === 2 ? <span>待发布</span> : ''}
          {data.noticeStatus === 3 ? <span>待审核</span> : ''}
          {data.noticeStatus === 5 ? <span>审核通过</span> : ''}
          {data.noticeStatus === 6 ? <span>审核未通过</span> : ''}
        </>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          查看
        </a>,
        <a key={`${data.orgId}up`} onClick={() => openModifyModal(data)}>
          编辑
        </a>,

        // <Popconfirm
        //   key={`${data.orgId}del`}
        //   title="确认删除该重点机构吗？"
        //   placement="topRight"
        //   onConfirm={() => deleteKeyInstiton(data.orgId)}
        // >
        //   <a>删除</a>
        // </Popconfirm>,
      ],
    },
  ];

  const getAnnouncementList = params =>
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

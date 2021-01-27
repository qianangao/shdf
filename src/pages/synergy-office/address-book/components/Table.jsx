import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import UploadInput from '@/components/UploadInput';

const Table = ({ emAddressBook, openModifyModal, dispatch }) => {
  const { tableRef } = emAddressBook;

  const deleteAddressBook = orgId => {
    dispatch({
      type: 'emAddressBook/deleteAddressBook',
      payload: { orgId },
    });
  };

  const columns = [
    { title: '姓名', align: 'center', dataIndex: 'userName' },
    { title: '性别', align: 'center', dataIndex: 'gender', hideInSearch: true },
    {
      title: '所属部门',
      align: 'center',
      dataIndex: 'userDept',
      // valueEnum: {
      //   付小小: { text: '付小小' },
      //   曲丽丽: { text: '曲丽丽' },
      //   林东东: { text: '林东东' },
      //   陈帅帅: { text: '陈帅帅' },
      //   兼某某: { text: '兼某某' },
      // },
    },
    { title: '当前职务', align: 'center', dataIndex: 'job', hideInSearch: true },
    { title: '手机号', align: 'center', dataIndex: 'phoneNumber', hideInSearch: true },
    { title: '办公电话', align: 'center', dataIndex: 'officeTelephone', hideInSearch: true },
    { title: '邮箱', align: 'center', dataIndex: 'mailbox', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a key={`${data.bookId}up`} onClick={() => openModifyModal(data)}>
          修改
        </a>,
        <Popconfirm
          key={`${data.bookId}del`}
          title="确认删除该重点机构吗？"
          placement="topRight"
          onConfirm={() => deleteAddressBook(data.orgId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getAddressBook = params =>
    new Promise(resolve => {
      dispatch({
        type: 'emAddressBook/getAddressBook',
        payload: { ...params },
        resolve,
      });
    });

  const templateDownload = () => {
    dispatch({
      type: 'emAddressBook/templateDownload',
    });
  };

  const exportAddressBook = ids => {
    dispatch({
      type: 'emAddressBook/exportAddressBook',
      payload: ids,
    });
  };
  return (
    <ProTable
      rowKey="orgId"
      headerTitle="人员列表"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getAddressBook(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        <Button onClick={() => templateDownload()}>模板下载</Button>,
        <UploadInput type="excel" />,
        selectedRowKeys && selectedRowKeys.length && (
          <Button type="primary" onClick={() => exportAddressBook(selectedRowKeys)}>
            导出
          </Button>
        ),
      ]}
      columns={columns}
    />
  );
};

export default connect(({ emAddressBook }) => ({
  emAddressBook,
}))(Table);

import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ emKeyInstitutions, openModifyModal, dispatch }) => {
  const { tableRef } = emKeyInstitutions;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },

    { title: '机构中文名', align: 'center', dataIndex: 'orgName' },
    { title: '机构英文名', align: 'center', dataIndex: 'orgNameEn', hideInSearch: true },
    { title: '机构代码', align: 'center', dataIndex: 'orgCode', hideInSearch: true },
    { title: '机构分类', align: 'center', dataIndex: 'category', hideInSearch: true },
    { title: '所在地区', align: 'center', dataIndex: 'area', hideInSearch: true },
    { title: '简介说明', align: 'center', dataIndex: 'description', hideInSearch: true },
    { title: '中文地址', align: 'center', dataIndex: 'address', hideInSearch: true },
    { title: '英文地址', align: 'center', dataIndex: 'addressEn', hideInSearch: true },
    { title: '联系人员', align: 'center', dataIndex: 'contacts', hideInSearch: true },
    { title: '联系电话', align: 'center', dataIndex: 'phone', hideInSearch: true },
    { title: '传真号码', align: 'center', dataIndex: 'fax', hideInSearch: true },
    { title: '电子邮件', align: 'center', dataIndex: 'email', hideInSearch: true },
    { title: '网站地址', align: 'center', dataIndex: 'website', hideInSearch: true },
    { title: '法定代表', align: 'center', dataIndex: 'legalPerson', hideInSearch: true },
    { title: '管理人员', align: 'center', dataIndex: 'management', hideInSearch: true },
    {
      title: '成立日期',
      align: 'center',
      dataIndex: 'establishDate',
      valueType: 'date',
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a key={`${data.orgId}up`} onClick={() => openModifyModal(data)}>
          编辑
        </a>,
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          查看
        </a>,
        <Popconfirm
          key={`${data.orgId}del`}
          title="确认删除该重点机构吗？"
          placement="topRight"
          onConfirm={() => deleteKeyInstiton(data.orgId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getKeyInstitons = params =>
    new Promise(resolve => {
      dispatch({
        type: 'emKeyInstitutions/getKeyInstitons',
        payload: { ...params },
        resolve,
      });
    });

  const deleteKeyInstiton = orgId => {
    dispatch({
      type: 'emKeyInstitutions/deleteKeyInstiton',
      payload: { orgId },
    });
  };

  return (
    <ProTable
      rowKey="orgId"
      headerTitle="重点机构"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getKeyInstitons(params)}
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

export default connect(({ emKeyInstitutions, global }) => ({
  emKeyInstitutions,
  enums: global.enums,
}))(Table);

import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ kdBanPublishMgt, openModifyModal, enums, dispatch }) => {
  const { tableRef } = kdBanPublishMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '中文名称', align: 'center', dataIndex: 'orgName' },
    { title: '作者及编著者', align: 'center', dataIndex: 'orgNameEn' },
    {
      title: '保密级别',
      align: 'center',
      dataIndex: 'subjectSecrecyLevel',
      valueEnum: enums.subject_secrecy_level,
      hideInTable: true,
    },
    { title: '出版机构', align: 'center', dataIndex: 'orgCode' },
    { title: '鉴定机构', align: 'center', dataIndex: 'orgNameEn' },
    {
      title: '出版日期',
      align: 'center',
      dataIndex: 'establishDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '鉴定日期',
      align: 'center',
      dataIndex: 'establishDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '鉴定类型',
      align: 'center',
      dataIndex: 'subjectSecrecyLevel',
      valueEnum: enums.subject_secrecy_level,
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
        <a key={`${data.orgId}auth`} onClick={() => {}}>
          授权
        </a>,
        <Popconfirm
          key={`${data.orgId}del`}
          title="确认删除该重点人物吗？"
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
        type: 'kdBanPublishMgt/getKeyInstitons',
        payload: { ...params },
        resolve,
      });
    });

  const deleteKeyInstiton = orgId => {
    dispatch({
      type: 'kdBanPublishMgt/deleteKeyInstiton',
      payload: { orgId },
    });
  };

  return (
    <ProTable
      rowKey="orgId"
      headerTitle="非法出版物"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getKeyInstitons(params)}
      toolBarRender={_ => [
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        <Button onClick={() => {}}>模板下载</Button>,
        <Button onClick={() => {}}>导入</Button>,
        <Button onClick={() => {}}>导出</Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ kdBanPublishMgt, global }) => ({
  kdBanPublishMgt,
  enums: global.enums,
}))(Table);

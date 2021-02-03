import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  emClueManagement,
  openModifyModal,
  openImportModal,
  openExportModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = emClueManagement;
  // 列表项的配置
  const columns = [
    { title: '线索编号', align: 'center', dataIndex: 'clueId', valueType: 'index', width: 100 },
    { title: '线索名称', align: 'center', dataIndex: 'clueName' },
    {
      title: '保密等级',
      align: 'center',
      valueEnum: enums.subject_secrecy_level,
      hideInTable: true,
    },
    {
      title: '线索类型',
      align: 'center',
      dataIndex: 'clueType',
      valueEnum: enums.subject_secrecy_level,
    },
    {
      title: '线索来源',
      align: 'center',
      dataIndex: 'clueSource',
      valueEnum: enums.subject_secrecy_level,
    },
    {
      title: '地域',
      align: 'center',
      dataIndex: 'reportedObjectAddress',
      valueEnum: enums.subject_secrecy_level,
      hideInSearch: true,
    },

    {
      title: '线索状态',
      align: 'center',
      dataIndex: 'clueRemarks',
      valueEnum: enums.subject_secrecy_level,
      labelWidth: '60',
    },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 300,
      render: (dom, data) => [
        <a key={`${data.orgId}up`} onClick={() => openModifyModal(data)}>
          查看
        </a>,
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          修改
        </a>,
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          授权
        </a>,
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          主办
        </a>,
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          转办
        </a>,
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          结束
        </a>,
        <a key={`${data.orgId}detail`} onClick={() => {}}>
          日志
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
  // 获取所有线索
  const getAllClues = params =>
    new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/getAllClues',
        payload: { ...params },
        resolve,
      });
    });
  // 模板下载
  const templateDownload = () => {
    dispatch({
      type: 'emAddressBook/templateDownload',
    });
  };
  return (
    <ProTable
      rowKey="clueId"
      headerTitle="线索列表"
      actionRef={tableRef}
      scroll={{ x: 1600 }}
      rowSelection={[]}
      request={async params => getAllClues(params)}
      toolBarRender={_ => [
        <Button type="primary">线索串并联</Button>,
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        <Button type="primary" onClick={() => templateDownload()}>
          模板下载
        </Button>,
        <Button type="primary" onClick={() => openImportModal()}>
          导入
        </Button>,
        <Button type="primary" onClick={() => openExportModal()}>
          导出
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ emClueManagement, global }) => ({
  emClueManagement,
  enums: global.enums,
}))(Table);

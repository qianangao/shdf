import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ kdBanPublishMgt, openModifyModal, openAuthModal, enums, dispatch }) => {
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
    { title: '中文名称', align: 'center', dataIndex: 'name' },
    { title: '作者及编著者', align: 'center', dataIndex: 'author' },
    {
      title: '保密级别',
      align: 'center',
      dataIndex: 'subjectSecrecyLevel',
      valueEnum: enums.subject_secrecy_level,
      hideInTable: true,
    },
    { title: '出版机构', align: 'center', dataIndex: 'organization' },
    { title: '鉴定机构', align: 'center', dataIndex: 'appraisalInstitution' },
    {
      title: '出版日期',
      align: 'center',
      dataIndex: 'publicationDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '鉴定日期',
      align: 'center',
      dataIndex: 'appraisalDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '鉴定类型',
      align: 'center',
      dataIndex: 'appraisalType',
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
        <a key={`${data.publicationId}detail`} onClick={() => openModifyModal(data.publicationId)}>
          查看
        </a>,
        <a key={`${data.publicationId}up`} onClick={() => openModifyModal(data.publicationId)}>
          编辑
        </a>,
        <a key={`${data.publicationId}auth`} onClick={() => openAuthModal(data.publicationId)}>
          授权
        </a>,
        <Popconfirm
          key={`${data.publicationId}del`}
          title="确认删除该非法出版物吗？"
          placement="topRight"
          onConfirm={() => deleteBanPublish(data.publicationId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getKeyBanPublishList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'kdBanPublishMgt/getKeyBanPublishList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteBanPublish = publicationId => {
    dispatch({
      type: 'kdBanPublishMgt/deleteBanPublish',
      payload: { publicationId },
    });
  };

  return (
    <ProTable
      rowKey="publicationId"
      headerTitle="非法出版物"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getKeyBanPublishList(params)}
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

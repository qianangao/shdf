import React from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const BanPublishTable = ({
  dictionaryMgt,
  relevancyModal,
  openBanPublishDetailModal,
  dispatch,
  enums,
}) => {
  const { tableRef } = dictionaryMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 64,
    },
    { title: '中文名称', align: 'center', dataIndex: 'name', hideInSearch: true },
    { title: '作者及编著者', align: 'center', dataIndex: 'author', hideInSearch: true },
    { title: '书刊号', align: 'center', dataIndex: 'isbnIssn' },
    { title: '出版机构', align: 'center', dataIndex: 'organization', hideInSearch: true },
    {
      title: '出版日期',
      align: 'center',
      dataIndex: 'publicationDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'category',
      valueEnum: enums.illegal_dict,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 80,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.publicationId}view`}
          onClick={() => openBanPublishDetailModal(data.publicationId)}
        >
          查看
        </a>,
      ],
    },
  ];

  const getEngineeringBanPublishList = params =>
    dictionaryMgt.projectId &&
    dictionaryMgt.projectId !== '' &&
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getEngineeringBanPublishList',
        payload: { ...params, id: dictionaryMgt.projectId },
        resolve,
      });
    });

  return (
    <div>
      <ProTable
        rowKey="publicationId"
        actionRef={tableRef}
        rowSelection={false}
        scroll={{ x: 'max-content' }}
        request={async params => getEngineeringBanPublishList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => relevancyModal('选择非法出版物', 0)}>
            关联非法出版物
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ dictionaryMgt, global }) => ({
  dictionaryMgt,
  enums: global.enums,
}))(BanPublishTable);

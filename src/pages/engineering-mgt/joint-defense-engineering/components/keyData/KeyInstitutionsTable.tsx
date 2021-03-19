import React from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const KeyInstitutionsTable = ({
  defenseEngineering,
  relevancyModal,
  openInstitutionDetailModal,
  dispatch,
}) => {
  const { tableRef } = defenseEngineering;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 64,
    },
    { title: '机构中文名', align: 'center', dataIndex: 'orgName', hideInSearch: true },
    { title: '机构代码', align: 'center', dataIndex: 'code' },
    { title: '联系人员', align: 'center', dataIndex: 'contacts', hideInSearch: true },
    {
      title: '中文地址',
      align: 'center',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: '成立时间',
      align: 'center',
      dataIndex: 'establishDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '机构类型',
      align: 'center',
      dataIndex: 'category',
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 80,
      fixed: 'right',
      render: (dom: any, data: { orgId: any }) => [
        <a key={`${data.orgId}detail`} onClick={() => openInstitutionDetailModal(data.orgId)}>
          查看
        </a>,
      ],
    },
  ];

  const getEngineeringKeyInstitutionsList = params =>
    defenseEngineering.projectId &&
    defenseEngineering.projectId !== '' &&
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/getEngineeringKeyInstitutionsList',
        payload: { ...params, id: defenseEngineering.projectId },
        resolve,
      });
    });

  return (
    <div>
      <ProTable
        rowKey="orgId"
        actionRef={tableRef}
        rowSelection={false}
        scroll={{ x: 'max-content' }}
        request={async params => getEngineeringKeyInstitutionsList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => relevancyModal('选择机构', 2)}>
            关联机构
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ defenseEngineering }) => ({
  defenseEngineering,
}))(KeyInstitutionsTable);

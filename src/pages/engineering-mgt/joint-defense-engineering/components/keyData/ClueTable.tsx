import React from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const ClueTable = ({
  defenseEngineering,
  relevancyModal,
  openClueDetailModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = defenseEngineering;

  // 列表项的配置
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 64,
    },
    { title: '线索名称', align: 'center', dataIndex: 'clueName' },
    { title: '线索编号', align: 'center', dataIndex: 'clueNumber', hideInSearch: true },
    {
      title: '线索类型',
      align: 'center',
      dataIndex: 'clueType',
      hideInSearch: true,
      valueEnum: enums.clue_type,
    },
    {
      title: '线索来源',
      align: 'center',
      hideInSearch: true,
      dataIndex: 'clueSource',
      valueEnum: enums.clue_source,
    },
    {
      title: '地域',
      align: 'center',
      dataIndex: 'region',
      valueEnum: enums.subject_secrecy_level,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 80,
      dataIndex: 'id',
      render: (dom: any, data: any) => [
        <a
          key={`${data.clueId}detail`}
          onClick={() => openClueDetailModal(data.clueId, data.sourceClueId)}
        >
          查看
        </a>,
      ],
    },
  ];
  // 获取所有线索
  const getEngineeringClueList = (params: any) =>
    defenseEngineering.projectId &&
    defenseEngineering.projectId !== '' &&
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/getEngineeringClueList',
        payload: { ...params, id: defenseEngineering.projectId },
        resolve,
      });
    });

  return (
    <>
      <ProTable
        rowKey="clueId"
        headerTitle="线索列表"
        actionRef={tableRef}
        scroll={{ x: 'max-content' }}
        rowSelection={false}
        request={async params => getEngineeringClueList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => relevancyModal('选择线索', 3)}>
            关联线索
          </Button>,
        ]}
        columns={columns}
      />
    </>
  );
};

export default connect(({ defenseEngineering, global }) => ({
  defenseEngineering,
  enums: global.enums,
}))(ClueTable);

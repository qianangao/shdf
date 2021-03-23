import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ defenseEngineering, openModifyModal, dispatch }) => {
  const { tableRef } = defenseEngineering;
  const [projectId, setProjectId] = useState('');
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    { title: '上报省份', align: 'center', dataIndex: 'reportProvince' },
    {
      title: '上报日期',
      align: 'center',
      dataIndex: 'reportDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '宣传品数量',
      align: 'center',
      dataIndex: 'publicityMaterialsNumber',
      hideInSearch: true,
    },
    {
      title: '查办案件工程数量',
      align: 'center',
      dataIndex: 'investigationHandlingCaseNumber',
      hideInSearch: true,
    },
    {
      title: '删除网络信息数量',
      align: 'center',
      dataIndex: 'networkInformationNumber',
      hideInSearch: true,
    },
    {
      title: '非法出版数量',
      align: 'center',
      dataIndex: 'illegalPublicationNumber',
      hideInSearch: true,
    },
  ];
  useEffect(() => {
    if (defenseEngineering.projectId) {
      setProjectId(defenseEngineering.projectId);
    }
  });
  const getReceivingList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/getEngineList',
        payload: {
          ...params,
          projectId,
        },
        resolve,
      });
    });

  return (
    <div>
      <ProTable
        actionRef={tableRef}
        rowKey="receiptId"
        headerTitle="工程数据"
        scroll={{ x: 'max-content' }}
        request={async params => getReceivingList(params)}
        toolBarRender={() => [
          <Button type="primary" onClick={() => openModifyModal()}>
            {defenseEngineering.yearOrtot !== 'null' ? '新增' : ''}
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ defenseEngineering, global }) => ({
  defenseEngineering,
  enums: global.enums,
}))(Table);

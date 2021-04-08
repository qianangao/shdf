import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';

const Table = ({ defenseEngineering, openModifyModal, dispatch }) => {
  const { tableRef, engineEditshow } = defenseEngineering;
  const [projectId, setProjectId] = useState('');
  const deleteData = params => {
    /* eslint-disable no-new */
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/deleteEngineData',
        payload: {
          dataId: params.dataId ? params.dataId : '',
        },
        resolve,
      });
    });
  };
  const report = params =>
    /* eslint-disable no-new */
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/reportEngineData',
        payload: {
          dataId: params,
        },
        resolve,
      });
    });

  const involve = [
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
      title: '涉疆',
      align: 'center',
      dataIndex: 'sjnum',
      hideInSearch: true,
    },
    {
      title: '涉藏',
      align: 'center',
      dataIndex: 'sznum',
      hideInSearch: true,
    },
    {
      title: '涉宗教',
      align: 'center',
      dataIndex: 'szjnum',
      hideInSearch: true,
    },
    {
      title: '涉其他',
      align: 'center',
      dataIndex: 'qtnum',
      hideInSearch: true,
    },
    {
      title: '上报状态',
      align: 'center',
      dataIndex: 'isReport',
      hideInSearch: true,
      render: text => <span>{text === 0 ? '未上报' : '已上报'}</span>,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 220,
      fixed: 'right',
      render: (dom, logData) => [
        <a onClick={() => openModifyModal(logData)}>查看</a>,
        <a onClick={() => openModifyModal(logData)}>{engineEditshow === 0 ? '编辑' : ''}</a>,
        <a onClick={() => report(logData.dataId)}>
          {logData.isReport === 0 && defenseEngineering.yearOrtot !== 'null' ? '上报' : ''}
        </a>,
        <a onClick={() => deleteData(logData)}>{engineEditshow === 0 ? '删除' : ''}</a>,
      ],
    },
  ];
  useEffect(() => {
    if (defenseEngineering.projectId) {
      setProjectId(defenseEngineering.projectId);
    }
  });
  const getReceivingList = params =>
    /* eslint-disable no-new */
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
        rowClassName={getSecrecyRowClassName}
        toolBarRender={() => [
          <Button type="primary" onClick={() => openModifyModal()}>
            {defenseEngineering.yearOrtot !== 'null' ? '新增' : ''}
          </Button>,
        ]}
        columns={involve}
      />
    </div>
  );
};

export default connect(({ defenseEngineering, global }) => ({
  defenseEngineering,
  enums: global.enums,
}))(Table);

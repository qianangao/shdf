import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ defenseEngineering, openModifyModal, dispatch }) => {
  const { tableRef } = defenseEngineering;
  const [projectId, setProjectId] = useState('');
  let status = true;
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
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 220,
      fixed: 'right',
      render: (dom, logData) => [
        <a onClick={() => openModifyModal(logData)}>查看</a>,
        <a onClick={() => openModifyModal(logData)}>编辑</a>,
        <a>上报</a>,
        <a onClick={() => deleteData(logData)}>删除</a>,
      ],
    },
  ];
  const columns1 = [
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
  const getChange = () => {
    status = !status;
    tableRef.current.reloadAndRest();
  };

  return (
    <div>
      {status ? (
        <ProTable
          actionRef={tableRef}
          rowKey="receiptId"
          headerTitle="工程数据"
          scroll={{ x: 'max-content' }}
          request={async params => getReceivingList(params)}
          style={{ display: status ? 'block' : 'none' }}
          toolBarRender={() => [
            <Button type="primary" onClick={() => openModifyModal()}>
              {defenseEngineering.yearOrtot !== 'null' ? '新增' : ''}
            </Button>,
            <Button onClick={() => getChange()}>切换</Button>,
          ]}
          columns={columns}
        />
      ) : (
        <ProTable
          actionRef={tableRef}
          rowKey="receiptId"
          headerTitle="工程数据"
          scroll={{ x: 'max-content' }}
          style={{ display: status ? 'none' : 'block' }}
          request={async params => getReceivingList(params)}
          toolBarRender={() => [
            <Button type="primary" onClick={() => openModifyModal()}>
              {defenseEngineering.yearOrtot !== 'null' ? '新增' : ''}
            </Button>,
            <Button onClick={() => getChange()}>切换</Button>,
          ]}
          columns={columns1}
        />
      )}
    </div>
  );
};

export default connect(({ defenseEngineering, global }) => ({
  defenseEngineering,
  enums: global.enums,
}))(Table);

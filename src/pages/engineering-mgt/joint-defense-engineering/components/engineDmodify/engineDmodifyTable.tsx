import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';

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
        <a onClick={() => openModifyModal(logData)} hidden={!checkAuthority('em/dep/en/detail')}>
          查看
        </a>,
        <a onClick={() => openModifyModal(logData)} hidden={!checkAuthority('em/dep/en/update')}>
          {engineEditshow === 0 ? '编辑' : ''}
        </a>,
        <a onClick={() => report(logData.dataId)} hidden={!checkAuthority('em/dep/en/deploy')}>
          {logData.isReport === 0 && defenseEngineering.yearOrtot !== 'null' ? '上报' : ''}
        </a>,
        <a onClick={() => deleteData(logData)} hidden={!checkAuthority('em/dep/en/delete')}>
          {engineEditshow === 0 ? '删除' : ''}
        </a>,
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
          <Button
            type="primary"
            onClick={() => openModifyModal()}
            hidden={!checkAuthority('em/dep/en/add')}
          >
            {defenseEngineering.yearOrtot !== 'null' ? '新增' : ''}
          </Button>,
        ]}
        columns={columns}
      />

      {/* {status ? (
        <ProTable
          actionRef={tableRef}
          rowKey="receiptId"
          headerTitle="工程数据"
          scroll={{ x: 'max-content' }}
          request={async params => getReceivingList(params)}
          style={{ display: status ? 'block' : 'none' }}
          rowClassName={getSecrecyRowClassName}
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
      )} */}
    </div>
  );
};

export default connect(({ defenseEngineering, global }) => ({
  defenseEngineering,
  enums: global.enums,
}))(Table);

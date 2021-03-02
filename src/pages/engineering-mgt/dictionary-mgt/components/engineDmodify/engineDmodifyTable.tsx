import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ dictionaryMgt, openModifyModal, dispatch }) => {
  const { tableRef } = dictionaryMgt;
  const [projectId, setProjectId] = useState('');
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    { title: '上报省份', align: 'center', dataIndex: 'reportProvince', hideInSearch: true },
    {
      title: '上报日期',
      align: 'center',
      dataIndex: 'reportDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '上报日期',
      align: 'center',
      dataIndex: 'reportDate',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            reportDateStart: value[0],
            reportDateEnd: value[1],
          };
        },
      },
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
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   align: 'center',
    //   dataIndex: 'id',
    //   width: 180,
    //   fixed: 'right',
    //   render: (dom, data) => [
    //     <a key={`${data.infoId}up`} onClick={() => openDetailModifyModal(data.infoId)}>
    //       查看
    //     </a>,
    //     <a key={`${data.infoId}up`} onClick={() => openModifyModal(data.infoId)}>
    //       编辑
    //     </a>,
    //     <a key={`${data.infoId}up`} onClick={() => releaseInfoAn(data.infoId)}>
    //       {data.infoPublish == 0 ? '发布' : ''}
    //     </a>,
    //   ],
    // },
  ];
  useEffect(() => {
    if (dictionaryMgt.projectId) {
      setProjectId(dictionaryMgt.projectId);
    }
  });
  const getReceivingList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getEngineList',
        payload: {
          projectId,
          projectPid: '1000',
          year: '2021',
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
        toolBarRender={(_, {}) => [
          <Button type="primary" onClick={() => openModifyModal()}>
            新增
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
}))(Table);

import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { Button } from 'antd';
import {getSecrecyRowClassName} from "@/utils/secrecy";

const TableCaseHandle = ({ dispatch, id, caseMgt, openCaseHandleModal, isDetail }) => {
  const { tableHandleRef } = caseMgt;
  const columns = [
    {
      title: '办理阶段',
      dataIndex: 'handleStage',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '经办人',
      hideInSearch: true,
      dataIndex: 'handleAccount',
    },
    {
      title: '办理时间',
      align: 'center',
      type: 'dateTime',
      hideInSearch: true,
      dataIndex: 'createTime',
    },
    {
      title: '办理进展',
      align: 'center',
      dataIndex: 'handleProgress',
      hideInSearch: true,
    },
    {
      title: '完整案情',
      align: 'center',
      dataIndex: 'handleContent',
      hideInSearch: true,
    },
  ];

  const getCaseHandleList = params =>
    new Promise(resolve => {
      params.id = id;
      dispatch({
        type: 'caseMgt/getCaseHandleList',
        payload: {
          ...params,
        },
        resolve,
      });
    });

  return (
    <ProTable
      actionRef={tableHandleRef}
      rowKey="transmitId"
      headerTitle="案件办理"
      rowClassName={getSecrecyRowClassName}
      search={false}
      options={false}
      pagination={{ pageSizeOptions: ['5'], defaultPageSize: 5, simple: true }}
      request={async params => getCaseHandleList(params)}
      columns={columns}
      toolBarRender={_ => [
        isDetail === 1 ? null : (
          <Button type="primary" onClick={() => openCaseHandleModal()}>
            新增
          </Button>
        ),
      ]}
    />
  );
};

export default connect(({ caseMgt, global, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
  enums: global.enums,
}))(TableCaseHandle);

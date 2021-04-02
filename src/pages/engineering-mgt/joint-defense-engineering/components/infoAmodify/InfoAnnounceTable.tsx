import React from 'react';
import { Button, Modal, Tabs } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import Bar from '@/components/Charts/BarChart/index';

const { TabPane } = Tabs;

const Table = ({ defenseEngineering, openModifyModal, dispatch, openDetailModifyModal }) => {
  const { tableRef, engineEditshow } = defenseEngineering;
  const { tableRef1 } = defenseEngineering;
  const releaseInfoAn = params =>
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/releaseInfoAn',
        payload: { id: params },
        resolve,
      });
    });
  const deleteReceiving = id => {
    dispatch({
      type: 'receivingMgt/deleteReceiving',
      payload: {
        id,
      },
    });
  };
  const deleteData = (params: any) =>
    /* eslint-disable no-new */
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/deleteInfoAn',
        payload: {
          infoId: params,
        },
        resolve,
      });
    });
  const report = (params: any) =>
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
    {
      title: '信息名称',
      dataIndex: 'infoName',
    },
    {
      title: '上报日期',
      align: 'center',
      dataIndex: 'reportDate',
      valueType: 'date',
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
      title: '上报日期',
      align: 'center',
      dataIndex: 'reportDate',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            reportDateStart: value[0].format('YYYY-MM-DD'),
            reportDateEnd: value[1].format('YYYY-MM-DD'),
          };
        },
      },
    },
    { title: '上报省份', align: 'center', dataIndex: 'reportProvince', hideInSearch: true },
    {
      title: '是否发布',
      align: 'center',
      hideInSearch: true,
      render: (dom, data) => [<span>{data.infoPublish === 0 ? '未发布' : '已发布'}</span>],
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a key={`${data.infoId}up`} onClick={() => openDetailModifyModal(data.infoId)}>
          查看
        </a>,
        <a onClick={() => report(data.infoId)}>
          {data.isReport === 0 && defenseEngineering.yearOrtot !== 'null' ? '上报' : ''}
        </a>,
        <a key={`${data.infoId}up`} onClick={() => openModifyModal(data.infoId)}>
          {engineEditshow === 0 ? '编辑' : ''}
        </a>,
        <a key={`${data.infoId}up`} onClick={() => releaseInfoAn(data.infoId)}>
          {data.infoPublish === 0 ? '发布' : ''}
        </a>,
        <a key={`${data.infoId}up`} onClick={() => deleteData(data.infoId)}>
          {engineEditshow === 0 ? '删除' : ''}
        </a>,
      ],
    },
  ];

  const columnsStatistics = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    { title: '上报省份', align: 'center', dataIndex: 'reportProvince' },
    {
      title: '信息填报数量',
      dataIndex: 'informationFillInNum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '信息发布数量',
      dataIndex: 'informationReleaseNum',
      hideInSearch: true,
      align: 'center',
    },
  ];

  const getReceivingList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/getInfoAnList',
        payload: { ...params },
        resolve,
      });
    });
  const getInfoStatistics = params =>
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/getInfoStatistics',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <div>
      <Tabs defaultActiveKey="1a3" type="card" size="large" centered>
        <TabPane tab="各省信息报送" key="1a3">
          <ProTable
            actionRef={tableRef}
            rowKey="receiptId"
            headerTitle="工程数据"
            scroll={{ x: 'max-content' }}
            rowClassName={getSecrecyRowClassName}
            request={async params => getReceivingList(params)}
            toolBarRender={(_, { selectedRowKeys }) => [
              <Button type="primary" onClick={() => openModifyModal()}>
                新增
              </Button>,
              selectedRowKeys && selectedRowKeys.length && (
                <Button
                  onClick={() => {
                    Modal.confirm({
                      title: '确认删除所选择单位？该操作不可恢复',
                      onOk: () => {
                        deleteReceiving(selectedRowKeys);
                      },
                    });
                  }}
                >
                  批量删除
                </Button>
              ),
            ]}
            columns={columns}
          />
        </TabPane>
        <TabPane tab="信息数据统计" key="221a">
          <ProTable
            actionRef={tableRef1}
            rowKey="receiptId1"
            scroll={{ x: 'max-content' }}
            request={async params => getInfoStatistics(params)}
            columns={columnsStatistics}
          />
          <Bar dispatch={dispatch} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(({ defenseEngineering, global }) => ({
  defenseEngineering,
  enums: global.enums,
}))(Table);

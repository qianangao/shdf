import React from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { Tabs } from 'antd';
import Bar from '@/components/Charts/Bar/index';

const { TabPane } = Tabs;

const Table = ({ dictionaryMgt, openModifyModal, dispatch, openDetailModifyModal }) => {
  const { tableRef } = dictionaryMgt;
  const { tableRef1 } = dictionaryMgt;
  const { infoStatistics } = dictionaryMgt;
  const deleteReceiving = id => {
    dispatch({
      type: 'receivingMgt/deleteReceiving',
      payload: {
        id,
      },
    });
  };
  const data111 = [
    {
      name: 'London',
      'Jan.': 18.9,
      'Feb.': 28.8,
      'Mar.': 39.3,
      'Apr.': 81.4,
      May: 47,
      'Jun.': 20.3,
      'Jul.': 24,
      'Aug.': 35.6,
    },
    {
      name: 'Berlin',
      'Jan.': 12.4,
      'Feb.': 23.2,
      'Mar.': 34.5,
      'Apr.': 99.7,
      May: 52.6,
      'Jun.': 35.5,
      'Jul.': 37.4,
      'Aug.': 42.4,
    },
  ];
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
      // filters: true,
      // onFilter: true,
      // valueType: 'select',
      // valueEnum: {
      //   all: { text: '全部', status: 'Default' },
      //   open: {
      //     text: '未解决',
      //   },
      //   closed: {
      //     text: '已解决',
      //   },
      //   processing: {
      //     text: '解决中',
      //   },
      // },
    },
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
      // hideInSearch: true,
    },
    { title: '上报省份', align: 'center', dataIndex: 'reportProvince', hideInSearch: true },
    {
      title: '是否发布',
      align: 'center',
      hideInSearch: true,
      render: (dom, data) => [<span>{data.infoPublish == 0 ? '未发布' : '已发布'}</span>],
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
        <a key={`${data.infoId}up`} onClick={() => openModifyModal(data.infoId)}>
          编辑
        </a>,
        <a key={`${data.infoId}up`} onClick={() => releaseInfoAn(data.infoId)}>
          {data.infoPublish == 0 ? '发布' : ''}
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
        type: 'dictionaryMgt/getInfoAnList',
        payload: { ...params },
        resolve,
      });
    });
  const getInfoStatistics = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getInfoStatistics',
        payload: { ...params },
        resolve,
      });
    });
  const releaseInfoAn = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/releaseInfoAn',
        payload: { id: params },
        resolve,
      });
    });

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" size="large" centered>
        <TabPane tab="各省信息报送" key="1">
          <ProTable
            actionRef={tableRef}
            rowKey="receiptId"
            headerTitle="工程数据"
            // rowSelection={[]}
            scroll={{ x: 'max-content' }}
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
        <TabPane tab="信息数据统计" key="2">
          <ProTable
            actionRef={tableRef1}
            rowKey="receiptId1"
            // headerTitle="信息数据统计"
            // rowSelection={[]}
            scroll={{ x: 'max-content' }}
            request={async params => getInfoStatistics(params)}
            columns={columnsStatistics}
          />
          <Bar data={data111}></Bar>
          {/* <div style={{ width: '200px', height: '200px' }}>
            <Chart padding="auto" autoFit height={500} data={data111}>
              <LineAdvance position="year*value" />
            </Chart>
          </div> */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(({ dictionaryMgt, global }) => ({
  dictionaryMgt,
  enums: global.enums,
}))(Table);

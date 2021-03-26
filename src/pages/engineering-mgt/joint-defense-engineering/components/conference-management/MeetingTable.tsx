import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const MeetingTable = ({ defenseEngineering, meetingModal, dispatch }) => {
  const { meetingTableRef } = defenseEngineering;
  const deleteMeeting = meetingId => {
    dispatch({
      type: 'defenseEngineering/deleteMeeting',
      payload: meetingId,
    });
  };
  const columns = [
    {
      title: '序号',
      render: (text, render, index) => `${index + 1}`,
      width: 64,
      align: 'center',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
    },
    { title: '会议主题', align: 'center', dataIndex: 'meetingTheme' },
    {
      title: '会议地点',
      align: 'center',
      dataIndex: 'meetingPlace',
      hideInSearch: true,
    },
    {
      title: '会议日期',
      align: 'center',
      dataIndex: 'startTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '会议日期',
      align: 'center',
      dataIndex: 'startTime',
      valueType: 'dateRange',
      hideInTable: true,
    },
    { title: '举办单位', align: 'center', dataIndex: 'organizer', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.meetingId}view`}
          onClick={() => meetingModal({ meetingId: data.meetingId, disabled: true })}
        >
          查看
        </a>,
        <a key={`${data.meetingId}up`} onClick={() => meetingModal({ meetingId: data.meetingId })}>
          编辑
        </a>,
        <Popconfirm
          key={`${data.meetingId}del`}
          title="确认删除该会议信息吗？"
          placement="topRight"
          onConfirm={() => deleteMeeting(data.meetingId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getMeetingList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/getMeetingList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <div>
      <ProTable
        rowKey="meetingId"
        headerTitle="会议信息"
        actionRef={meetingTableRef}
        // rowSelection={[]}
        scroll={{ x: 'max-content' }}
        request={async params => getMeetingList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => meetingModal()}>
            新增
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
}))(MeetingTable);

import React from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';

const MeetingTable = ({ defenseEngineering, meetingModal, status, dispatch }) => {
  const { meetingTableRef } = defenseEngineering;
  const deleteMeeting = meetingId => {
    dispatch({
      type: 'defenseEngineering/deleteMeeting',
      payload: meetingId,
    });
  };

  const handleReport = params => {
    dispatch({
      type: 'defenseEngineering/exportMeeting',
      payload: params,
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
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.meetingId}view`}
          onClick={() => meetingModal({ meetingId: data.meetingId, disabled: true })}
          hidden={!checkAuthority('em/dep/rm/detail')}
        >
          查看
        </a>,
        <a
          key={`${data.meetingId}up`}
          onClick={() => meetingModal({ meetingId: data.meetingId })}
          hidden={!checkAuthority('em/dep/rm/update')}
        >
          {(data.isReport === 0 && '编辑') || (status && status === '0' && '编辑')}
        </a>,
        <Popconfirm
          key={`${data.meetingId}del`}
          title="确认删除该会议信息吗？"
          placement="topRight"
          onConfirm={() => deleteMeeting(data.meetingId)}
        >
          <a key={`${data.meetingId}del`} hidden={!checkAuthority('em/dep/rm/delete')}>
            {' '}
            {(data.isReport === 0 && '删除') || (status && status === '0' && '删除')}
          </a>
        </Popconfirm>,
        <a
          key={`${data.meetingId}report`}
          onClick={() => handleReport({ meetingId: data.meetingId })}
          hidden={!checkAuthority('em/dep/rm/deploy')}
        >
          {data.isReport === 0 && '上报'}
        </a>,
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
        rowClassName={getSecrecyRowClassName}
        scroll={{ x: 'max-content' }}
        request={async params => getMeetingList(params)}
        toolBarRender={_ => [
          <Button
            type="primary"
            onClick={() => meetingModal()}
            hidden={!checkAuthority('em/dep/rm/add')}
          >
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
  status: defenseEngineering.status,
  enums: global.enums,
}))(MeetingTable);

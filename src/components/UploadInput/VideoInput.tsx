/* eslint-disable */
import React, { useRef, useState } from 'react';

import { connect } from 'umi';

import ReactPlayer from 'react-player';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';

const VideoInput = ({ dispatch, originNode, file, type }) => {
  const tableRef = useRef({});
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    {
      title: '关键点',
      dataIndex: 'point',
      align: 'center',
    },
    {
      title: '起始时间',
      align: 'center',
      dataIndex: 'startTime',
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom: any, data: { personId: any }) => [
        <a key={`${data.personId}detail`} onClick={() => seekToPoisintion(data.startTime)}>
          播放
        </a>,
        <Popconfirm
          key={`${data.personId}del`}
          title="确认删除该关键点吗？"
          placement="topRight"
          onConfirm={() => {}}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const ref = (mPlayer: React.SetStateAction<null>) => setPlayer(mPlayer);
  const seekToPoisintion = (time: any) => {
    player && player.seekTo(time);
    if (!playing) setPlaying(true);
  };

  const deletePoint = pointId => {
    dispatch({
      type: 'emClueManagement/deleteBanPublish',
      payload: { pointId },
    });
  };

  const tempData = [
    { point: '关键点一', startTime: '20' },
    { point: '关键点二', startTime: '30' },
    { point: '关键点三', startTime: '40' },
  ];

  return (
    <>
      {type === 'video' ? (
        <div>
          <div
            style={{
              border: 'solid 1px #eee',
              margin: '15px 10px',
              width: '70%',
              alignItems: 'center',
            }}
          >
            {originNode}
          </div>
          {file && file.status === 'done' && (
            <div>
              <ReactPlayer
                ref={ref}
                playing={playing}
                url="https://vd3.bdstatic.com/mda-mbqh9tzys738g16h/sc/cae_h264_clips/1614226578/mda-mbqh9tzys738g16h.mp4"
                width="70%"
                height={240}
                controls
              />
              <ProTable
                style={{ width: '70%' }}
                search={false}
                toolBarRender={(_, { selectedRowKeys }) => [
                  <Button type="primary" onClick={() => {}}>
                    新增关键点
                  </Button>,
                  <Button type="primary" onClick={() => deletePoint(selectedRowKeys)}>
                    删除关键点
                  </Button>,
                ]}
                options={false}
                pagination={false}
                rowKey="clueId"
                headerTitle="视频关键点"
                actionRef={tableRef}
                scroll={{ x: 'max-content' }}
                dataSource={tempData}
                columns={columns}
              />
            </div>
          )}
        </div>
      ) : (
        originNode
      )}
    </>
  );
};

export default connect(({ emClueManagement }) => ({
  processListData: emClueManagement.processListData,
}))(VideoInput);

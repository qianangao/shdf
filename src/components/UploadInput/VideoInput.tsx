import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import Icon from '@ant-design/icons';
import AddVideoPointModal from '@/components/UploadInput/AddVideoPointModal';
import { formatTimeStrToSeconds } from '@/utils/format';

const VideoInput = ({ originNode, file, fileList, type, callback }) => {
  const tableRef = useRef({});
  const addPointModelRef = useRef({});
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const PlaySvg = () => (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1168"
      width="200"
      height="200"
    >
      <path
        d="M853.333333 981.333333H170.666667c-70.4 0-128-57.6-128-128V170.666667c0-70.4 57.6-128 128-128h682.666666c70.4 0 128 57.6 128 128v682.666666c0 70.4-57.6 128-128 128zM170.666667 128c-23.466667 0-42.666667 19.2-42.666667 42.666667v682.666666c0 23.466667 19.2 42.666667 42.666667 42.666667h682.666666c23.466667 0 42.666667-19.2 42.666667-42.666667V170.666667c0-23.466667-19.2-42.666667-42.666667-42.666667H170.666667z"
        fill="#4E4E4E"
        p-id="1169"
      />
      <path
        d="M369.066667 772.266667c-36.266667 0-64-27.733333-64-64V315.733333c0-36.266667 27.733333-64 64-64 10.666667 0 23.466667 2.133333 32 8.533334l328.533333 196.266666c29.866667 19.2 40.533333 57.6 21.333333 87.466667-6.4 8.533333-12.8 17.066667-21.333333 21.333333l-328.533333 196.266667c-8.533333 8.533333-19.2 10.666667-32 10.666667z m21.333333-420.266667v317.866667L657.066667 512l-266.666667-160z"
        fill="#FF9813"
        p-id="1170"
      />
    </svg>
  );
  const PlayIcon = props => <Icon component={PlaySvg} {...props} />;

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
      dataIndex: 'pointName',
      align: 'center',
    },
    {
      title: '起始时间',
      align: 'center',
      dataIndex: 'pointStartTime',
    },
    {
      title: '播放',
      align: 'center',
      render: (dom: any, data: { pointStartTime: any }) => [
        <a key={`${data.pointStartTime}detail`} onClick={() => seekToPosition(data.pointStartTime)}>
          <PlayIcon style={{ fontSize: '28px' }} />
        </a>,
      ],
    },
  ];

  const ref = (mPlayer: React.SetStateAction<null>) => setPlayer(mPlayer);
  const seekToPosition = (time: any) => {
    player && player.seekTo(formatTimeStrToSeconds(time));
    if (!playing) setPlaying(true);
  };

  const deletePoint = (selected: string | any[]) => {
    if (selected && selected.length > 0) {
      const index = fileList.indexOf(file);
      const points: any[] = [];
      file.keyPointInfo &&
        file.keyPointInfo.forEach((item: { pointStartTime: any }) => {
          if (!selected.includes(item.pointStartTime)) {
            points.push(item);
          }
        });
      callback && callback(index, points);
      setSelectedRowKeys([]);
    } else {
      message.info('请选择需要删除的关键点！');
    }
  };

  const showAddPoint = () => {
    addPointModelRef.current.showModal();
  };

  const callbackPoint = (point: any) => {
    const index = fileList.indexOf(file);
    if (file.keyPointInfo) {
      callback && callback(index, [...file.keyPointInfo, point]);
    } else {
      callback && callback(index, [point]);
    }
  };

  return (
    <>
      {type === 'video' ? (
        <div>
          <div
            style={{
              border: 'solid 1px #eee',
              margin: '15px 10px',
              paddingBottom: '8px',
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
                url={file.url}
                width="70%"
                height={240}
                controls
              />
              <div
                style={{
                  margin: '15px 10px',
                  width: '70%',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}
              >
                <Button type="primary" onClick={() => showAddPoint()}>
                  新增关键点
                </Button>
                <Button
                  style={{ margin: '0px 20px' }}
                  type="primary"
                  onClick={() => deletePoint(selectedRowKeys)}
                >
                  删除关键点
                </Button>
              </div>
              {file.keyPointInfo && file.keyPointInfo.length > 0 && (
                <ProTable
                  style={{ width: '70%' }}
                  search={false}
                  rowSelection={{
                    onChange: keys => {
                      setSelectedRowKeys(keys);
                    },
                    selectedRowKeys,
                  }}
                  options={false}
                  pagination={false}
                  rowKey="pointStartTime"
                  actionRef={tableRef}
                  scroll={{ x: 'max-content' }}
                  dataSource={file.keyPointInfo ? file.keyPointInfo : []}
                  columns={columns}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        originNode
      )}
      <AddVideoPointModal actionRef={addPointModelRef} callbackPoint={callbackPoint} />
    </>
  );
};

export default VideoInput;

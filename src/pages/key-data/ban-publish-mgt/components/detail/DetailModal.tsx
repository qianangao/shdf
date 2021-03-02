import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr, formatTimeStrToSeconds } from '@/utils/format';
import ReactPlayer from 'react-player';
import ProTable from '@ant-design/pro-table';
import Icon from '@ant-design/icons';

const DetailModal = ({ dispatch, actionRef, loading, banPublishDetail, enums }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const tableRef = useRef({});
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  const showModal = (id: any) => {
    setModalVisible(true);
    dispatch({
      type: 'kdBanPublishMgt/getBanPublishDetail',
      payload: { publicationId: id },
    });
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = (): void => {
    dispatch({
      type: 'kdBanPublishMgt/removeBanPublish',
    });
    setModalVisible(false);
  };

  const handleOk = (): void => {
    hideModal();
  };

  const fileList = (files: { url: string | undefined; fileName: React.ReactNode }[]) => {
    if (files && files.length > 0) {
      const views = files.map((item: { url: string | undefined; fileName: React.ReactNode }) => {
        return (
          <a href={item.url} style={{ display: 'block' }}>
            {item.fileName}
          </a>
        );
      });

      return (
        <Descriptions.Item label="相关附件">
          <div style={{ marginBottom: 20 }}>{views}</div>
        </Descriptions.Item>
      );
    }
    return (
      <Descriptions.Item label="相关附件">
        <div style={{ marginBottom: 20 }}>无</div>
      </Descriptions.Item>
    );
  };

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

  const videoList = (videos: any[]) => {
    const views = videos.map(item => {
      return (
        <div>
          <div
            style={{
              border: 'solid 1px #eee',
              marginBottom: 15,
              padding: '3px 8px',
              width: '70%',
              alignItems: 'center',
            }}
          >
            <a>{item.videoName}</a>
          </div>
          <ReactPlayer
            ref={ref}
            playing={playing}
            url={item.videoUrl}
            width="70%"
            height={240}
            controls
          />
          {item.keyPointInfo && item.keyPointInfo.length > 0 && (
            <ProTable
              style={{ width: '70%' }}
              search={false}
              rowSelection={false}
              options={false}
              pagination={false}
              rowKey="pointStartTime"
              actionRef={tableRef}
              scroll={{ x: 'max-content' }}
              dataSource={item.keyPointInfo ? item.keyPointInfo : []}
              columns={columns}
            />
          )}
        </div>
      );
    });

    return (
      <Descriptions.Item label="相关附件" span={2}>
        <div style={{ marginBottom: 20 }}>{views}</div>
      </Descriptions.Item>
    );
  };

  return (
    <Modal
      title="非法出版物详情"
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Spin spinning={loading}>
        <Descriptions title="基本信息" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item label="中文名称">{banPublishDetail.name}</Descriptions.Item>
          <Descriptions.Item label="英文名称">{banPublishDetail.nameEnglish}</Descriptions.Item>
          <Descriptions.Item label="作者及编著者">{banPublishDetail.author}</Descriptions.Item>
          <Descriptions.Item label="出版机构">{banPublishDetail.organization}</Descriptions.Item>
          <Descriptions.Item label="发行商">{banPublishDetail.publisher}</Descriptions.Item>
          <Descriptions.Item label="书刊号">{banPublishDetail.isbnIssn}</Descriptions.Item>
          <Descriptions.Item label="定价">{banPublishDetail.price}</Descriptions.Item>
          <Descriptions.Item label="出版日期">
            {formatDateStr(banPublishDetail.publicationDate, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="类别">
            {enums.illegal_dict && enums.illegal_dict[banPublishDetail.category]}
          </Descriptions.Item>
          <Descriptions.Item label="关键词">{banPublishDetail.keyword}</Descriptions.Item>
          <Descriptions.Item label="保密等级">
            {enums.subject_secrecy_level &&
              enums.subject_secrecy_level[banPublishDetail.secrecyLevel]}
          </Descriptions.Item>
          <Descriptions.Item label="所属联防工程">{banPublishDetail.actionId}</Descriptions.Item>
          <Descriptions.Item label="简介说明" span={3}>
            {banPublishDetail.description}
          </Descriptions.Item>
          <Descriptions.Item label="备注说明" span={3}>
            {banPublishDetail.remarks}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="鉴定结果" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item label="鉴定机构">
            {banPublishDetail.appraisalInstitution}
          </Descriptions.Item>
          <Descriptions.Item label="鉴定类型">
            {enums.illegal_appraisalType &&
              enums.illegal_appraisalType[banPublishDetail.appraisalType]}
          </Descriptions.Item>
          <Descriptions.Item label="鉴定日期">
            {formatDateStr(banPublishDetail.appraisalDate, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="鉴定结论">
            {banPublishDetail.appraisalConclusion}
          </Descriptions.Item>
          <Descriptions.Item label="特征描述">
            {banPublishDetail.featureDescription}
          </Descriptions.Item>
        </Descriptions>
        {((banPublishDetail.fileInfoList && banPublishDetail.fileInfoList.length > 0) ||
          (banPublishDetail.videoInfoList && banPublishDetail.videoInfoList.length > 0)) && (
          <Descriptions title="相关资料" column={{ xxl: 3, xl: 3, lg: 3, md: 1, sm: 1, xs: 1 }}>
            {fileList(banPublishDetail.fileInfoList)}
            {banPublishDetail.videoInfoList.length > 0 && videoList(banPublishDetail.videoInfoList)}
          </Descriptions>
        )}
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, kdBanPublishMgt, global }) => ({
  loading: loading.models.kdBanPublishMgt,
  banPublishDetail: kdBanPublishMgt.banPublishDetail,
  enums: global.enums,
}))(DetailModal);

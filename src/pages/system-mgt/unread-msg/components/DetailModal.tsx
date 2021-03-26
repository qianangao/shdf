import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const LogDetailDataModal = ({ dispatch, actionRef }) => {
  const [detailData, setDetailData] = useState(null);

  const [detailDataModalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    if (items && items !== 'undefined') {
      setDetailData(items);
    } else {
      setDetailData(null);
    }
    setModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }
    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    dispatch({
      type: 'unReadMsg/getNewNum',
      payload: {
        id: 'admin',
      },
    });
    setModalVisible(false);
  };

  return (
    <Modal
      title="未读消息详情"
      centered
      width="900vw"
      style={{ paddingBottom: 0 }}
      visible={detailDataModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={3}>
        <Descriptions.Item label="消息ID">
          {detailData ? detailData.messageId : null}
        </Descriptions.Item>
        <Descriptions.Item label="发送者名称">
          {detailData ? detailData.sendUserName : null}
        </Descriptions.Item>
        <Descriptions.Item label="类型">
          {detailData ? detailData.messageType : null}
        </Descriptions.Item>
        <Descriptions.Item label="名称">
          {detailData ? detailData.sendUserName : null}
        </Descriptions.Item>
        <Descriptions.Item label="时间">
          {detailData ? detailData.lastUpdateTime : null}
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          {detailData ? detailData.businessType : null}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="内容">
          {detailData ? detailData.messageContent : null}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ logAudit, loading, global }) => ({
  detailDataModalVisible: false,
  logAudit,
  loading: loading.models.logAudit,
  enums: global.enums,
}))(LogDetailDataModal);

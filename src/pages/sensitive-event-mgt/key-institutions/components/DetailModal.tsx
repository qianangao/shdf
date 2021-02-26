import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const CaresDetailModal = ({ dispatch, sensitiveMgt, actionRef }) => {
  const [detailModalVisible, setModalVisible] = useState(false);
  const { detailData } = sensitiveMgt;

  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'sensitiveMgt/getDetail',
      payload: {
        id: items.eventId,
      },
    });
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
    setModalVisible(false);
    dispatch({
      type: 'sensitiveMgt/save',
      payload: {
        detailData: {},
      },
    });
  };

  return (
    <Modal
      title="收文详情"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      visible={detailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={3}>
        <Descriptions.Item label="报送单位">{detailData.reportUnit}</Descriptions.Item>
        <Descriptions.Item label="报送时间">{detailData.reportTime}</Descriptions.Item>
        <Descriptions.Item label="敏感事件名称">{detailData.eventName}</Descriptions.Item>
        <Descriptions.Item label="敏感事件编号">{detailData.eventCode}</Descriptions.Item>
        <Descriptions.Item label="线索来源">{detailData.eventSource}</Descriptions.Item>
        <Descriptions.Item label="办理部门">{detailData.investigateDept}</Descriptions.Item>
        <Descriptions.Item label="重要程度">{detailData.importantDegree}</Descriptions.Item>
        <Descriptions.Item label="保密等级">{detailData.secrecyLevel}</Descriptions.Item>
        <Descriptions.Item label="立案时间">{detailData.caseTime}</Descriptions.Item>
        <Descriptions.Item label="紧急程度">{detailData.urgencyDegree}</Descriptions.Item>
        <Descriptions.Item label="事件类型">{detailData.eventType}</Descriptions.Item>
        <Descriptions.Item label="事件性质">{detailData.eventNature}</Descriptions.Item>
        <Descriptions.Item label="专项行动">{detailData.charge}</Descriptions.Item>
        <Descriptions.Item label="传播渠道">{detailData.spreadWay}</Descriptions.Item>
        <Descriptions.Item label="传播形式">{detailData.spreadForm}</Descriptions.Item>
        <Descriptions.Item label="涉案平台类型">{detailData.platformType}</Descriptions.Item>
        <Descriptions.Item label="涉案数量">{detailData.caseNumber}</Descriptions.Item>
        <Descriptions.Item label="涉案金额">{detailData.caseMoney}</Descriptions.Item>
        <Descriptions.Item label="抓获人数">{detailData.capturePersonNum}</Descriptions.Item>
        <Descriptions.Item label="刑事拘留人数">{detailData.detainPersonNum}</Descriptions.Item>
        <Descriptions.Item label="逮捕人数">{detailData.arrestPersonNum}</Descriptions.Item>
        <Descriptions.Item label="判处被告人数量">
          {detailData.defendantPersonNum}
        </Descriptions.Item>
        <Descriptions.Item label="判处被告单位数量">
          {detailData.defendantUnitNum}
        </Descriptions.Item>
        <Descriptions.Item label="最高刑期">{detailData.highestPrisonTerm}</Descriptions.Item>
        <Descriptions.Item label="发生地域">{detailData.belongRegional}</Descriptions.Item>
      </Descriptions>
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="简要案情">{detailData.briefCase}</Descriptions.Item>
        <Descriptions.Item label="行政处理结果">{detailData.punishResult}</Descriptions.Item>
        <Descriptions.Item label="案件办理结果">{detailData.convictionsResult}</Descriptions.Item>
        {/* <Descriptions.Item label="附   件">{detailData.fileList}</Descriptions.Item> */}
      </Descriptions>
    </Modal>
  );
};

export default connect(({ sensitiveMgt, loading }) => ({
  sensitiveMgt,
  loading: loading.models.sensitiveMgt,
}))(CaresDetailModal);

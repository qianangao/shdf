import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const CaresDetailModal = ({ dispatch, sensitiveMgt, actionRef }) => {
  const [recordDetailModalVisible, setModalVisible] = useState(false);
  const { recordDetailData } = sensitiveMgt;

  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'sensitiveMgt/getRecordDetail',
      payload: {
        id: items.caseId,
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
        recordDetailData: {},
      },
    });
  };

  return (
    <Modal
      title="备案信息"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      visible={recordDetailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="申请时间">{recordDetailData.applyTime}</Descriptions.Item>
        <Descriptions.Item label="申请人">{recordDetailData.applyUser}</Descriptions.Item>
        <Descriptions.Item label="申请备注">{recordDetailData.applyRemarks}</Descriptions.Item>
      </Descriptions>
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="审批时间">{recordDetailData.approvalTime}</Descriptions.Item>
        <Descriptions.Item label="审批人">{recordDetailData.approvalUser}</Descriptions.Item>
        <Descriptions.Item label="审批备注">{recordDetailData.approvalOpinion}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ sensitiveMgt, loading }) => ({
  sensitiveMgt,
  loading: loading.models.sensitiveMgt,
}))(CaresDetailModal);

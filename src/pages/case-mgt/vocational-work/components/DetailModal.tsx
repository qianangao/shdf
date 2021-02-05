import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const CaresDetailModal = ({ dispatch, caseMgt, actionRef }) => {
  const [caresId] = useState('');

  const [DetailModalVisible, setModalVisible] = useState(false);
  const { receivingDetailData } = caseMgt;

  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'caseMgt/getDetail',
      payload: {
        id: items.receiptId,
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
  useEffect(() => {
    if (caresId) {
      dispatch({
        type: 'oaCaresNext/getCaresDetail',
        payload: { id: caresId },
      });
    }
  }, [caresId]);

  const hideModal = () => {
    setModalVisible(false);

    // dispatch({
    //   type: 'oaCaresNext/save',
    //   payload: {
    //     DetailModalVisible: false,
    //   },
    // });
  };

  return (
    <Modal
      title="收文详情"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      visible={DetailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={2}>
        <Descriptions.Item label="办  理  类  型">
          {receivingDetailData.handleType}
        </Descriptions.Item>
        <Descriptions.Item label="来  文  单  位">{receivingDetailData.docUnit}</Descriptions.Item>
        <Descriptions.Item label="来  文  文  号">{receivingDetailData.docNo}</Descriptions.Item>
        <Descriptions.Item label="收  文  日  期">
          {receivingDetailData.receiptData}
        </Descriptions.Item>
        <Descriptions.Item label="信  封  编  号">
          {receivingDetailData.envelopeCode}
        </Descriptions.Item>
        <Descriptions.Item label="紧  急  程  度">
          {receivingDetailData.urgentLevel}
        </Descriptions.Item>
        <Descriptions.Item label="密             级">
          {receivingDetailData.secrecyLevel}
        </Descriptions.Item>
        <Descriptions.Item label="保  密  期  限">
          {receivingDetailData.secrecyDuration}
        </Descriptions.Item>
        <Descriptions.Item label="文  件  份  数">{receivingDetailData.fileNum}</Descriptions.Item>
        <Descriptions.Item label="成  文  日  期">
          {receivingDetailData.finishTime}
        </Descriptions.Item>
        <Descriptions.Item label="办  理   时   限">
          {receivingDetailData.handleDuration}
        </Descriptions.Item>
        <Descriptions.Item label="收   文  编  号">
          {receivingDetailData.receiptCode}
        </Descriptions.Item>
        <Descriptions.Item label="来  文   标   题">
          {receivingDetailData.receiptTitle}
        </Descriptions.Item>
        <Descriptions.Item label="备    注">{receivingDetailData.remarks}</Descriptions.Item>
        <Descriptions.Item label="批   示">{receivingDetailData.instructions}</Descriptions.Item>
        {/* <Descriptions.Item label="附   件">{receivingDetailData.fileList}</Descriptions.Item> */}
      </Descriptions>
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  DetailModalVisible: false,
  caseMgt,
  loading: loading.models.caseMgt,
}))(CaresDetailModal);

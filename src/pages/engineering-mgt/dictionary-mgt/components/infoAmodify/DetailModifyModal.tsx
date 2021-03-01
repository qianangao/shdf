import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const ModifyModal = ({ dispatch, dictionaryMgt, actionRef, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { infnAnObj } = dictionaryMgt;
  const showModal = infoId => {
    // 获取详情
    dispatch({
      type: 'dictionaryMgt/getInfoDetail',
      payload: infoId.toString(),
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
      type: 'dictionaryMgt/save',
      payload: {
        infnAnObj: {},
      },
    });
  };

  return (
    <Modal
      title={'信息详情'}
      centered
      width="580px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          返回
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={2}>
        <Descriptions.Item label="信息名称">{infnAnObj.infoName}</Descriptions.Item>
        <Descriptions.Item label="上报省份">{infnAnObj.reportProvince}</Descriptions.Item>
        <Descriptions.Item label="是否发布">
          {infnAnObj.infoPublish == 0 ? '未发布' : '已发布'}
        </Descriptions.Item>
        <Descriptions.Item label="上报日期">{infnAnObj.reportDate}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default connect(({ dictionaryMgt, loading }) => ({
  dictionaryMgt,
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);

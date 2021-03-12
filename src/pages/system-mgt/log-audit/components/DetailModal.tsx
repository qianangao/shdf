import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const logDetailModal = ({ actionRef }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [detail, setDetail] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [DetailModalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    if (items && items !== 'undefined') {
      setDetail(items);
    } else {
      setDetail(null);
    }
    setModalVisible(true);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  };

  return (
    <Modal
      title="收文详情"
      centered
      width="900vw"
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
      <Descriptions size="middle" column={3}>
        <Descriptions.Item label="操作者ID">{detail.userId}</Descriptions.Item>
        <Descriptions.Item label="操作模块">{detail.model}</Descriptions.Item>
        <Descriptions.Item label="操作方法">{detail.operationMethod}</Descriptions.Item>
        <Descriptions.Item label="操作内容">{detail.sketch}</Descriptions.Item>
        <Descriptions.Item label="操作时间">{detail.operationTime}</Descriptions.Item>
        {/* <Descriptions.Item label="备    注">{receivingDetailData.remarks}</Descriptions.Item> */}
      </Descriptions>
    </Modal>
  );
};

export default connect(({ receivingMgt, loading, global }) => ({
  DetailModalVisible: false,
  receivingMgt,
  loading: loading.models.receivingMgt,
  enums: global.enums,
}))(logDetailModal);

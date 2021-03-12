import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const LogDetailDataModal = ({ actionRef }) => {
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
    setModalVisible(false);
  };

  return (
    <Modal
      title="收文详情"
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
        <Descriptions.Item label="操作者ID">
          {detailData ? detailData.userId : null}
        </Descriptions.Item>
        {/* <Descriptions.Item label="操作模块">{detailData.model}</Descriptions.Item> */}
        {/* <Descriptions.Item label="操作方法">{detailData.operationMethod}</Descriptions.Item> */}
        {/* <Descriptions.Item label="操作内容">{detailData.sketch}</Descriptions.Item> */}
        {/* <Descriptions.Item label="操作时间">{detailData.operationTime}</Descriptions.Item> */}
        {/* <Descriptions.Item label="备    注">{receivingdetailDataData.remarks}</Descriptions.Item> */}
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

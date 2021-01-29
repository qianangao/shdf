import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Spin } from 'antd';
import DetailInfoForm from './DetailInfoForm';

const ModifyModal = ({ dispatch, actionRef, loading, soAnnouncementMgt }) => {
  const { announcementData } = soAnnouncementMgt;
  const [form]: any = DetailInfoForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (items: any) => {
    setDetailData(items || null);
    setModalVisible(true);
  };

  const getAnnouncementDetail = (params: any) =>
    dispatch({
      type: 'soAnnouncementMgt/getAnnouncementDetail',
      payload: { noticeId: params },
    });

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  useEffect(() => {
    if (announcementData) form.setFieldsValue({ ...announcementData });
  }, [announcementData]);

  useEffect(() => {
    if (detailData) getAnnouncementDetail(detailData.noticeId);
  }, [detailData]);

  const hideModal = (): void => {
    setModalVisible(false);
    form.resetFields();
    setDetailData(null);
  };

  const handleOk = (): void => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: `soAnnouncementMgt/${detailData ? 'updateAnnouncement' : 'addAnnouncement'}`,
            payload: {
              ...values,
              includeFile: 0,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="查看公告"
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
        <DetailInfoForm form={form} />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, soAnnouncementMgt }) => ({
  loading: loading.models.soAnnouncementMgt,
  soAnnouncementMgt,
}))(ModifyModal);

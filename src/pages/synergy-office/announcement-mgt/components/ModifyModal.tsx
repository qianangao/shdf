import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import InstitutionForm from './InstitutionForm';

const ModifyModal = ({ dispatch, actionRef, loading, soAnnouncementMgt }) => {
  const { tableRef, announcementData } = soAnnouncementMgt;
  const [form]: any = InstitutionForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (items: any) => {
    form.resetFields();
    setDetailData(items || null);
    // if (items) form.setFieldsValue({ ...items });
    setModalVisible(true);
  };

  const getAnnouncemenDetails = (params: any) =>
    dispatch({
      type: 'soAnnouncementMgt/getAnnouncementDetail',
      payload: { noticeId: params },
    });

  useEffect((): void => {
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
    if (detailData) getAnnouncemenDetails(detailData.noticeId);
  }, [detailData]);

  const hideModal = (): void => {
    setModalVisible(false);
    // form.resetFields();
  };

  const handleOk = (): void => {
    form
      .validateFields()
      .then(values => {
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
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={detailData ? '编辑公告' : '新建公告'}
      centered
      actionRef={tableRef}
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
      <InstitutionForm form={form} />
    </Modal>
  );
};

export default connect(({ loading, soAnnouncementMgt }) => ({
  loading: loading.models.soAnnouncementMgt,
  soAnnouncementMgt,
}))(ModifyModal);

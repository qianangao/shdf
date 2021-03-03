import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MeetingForm from './MeetingForm';

const MeetingModal = ({ dispatch, actionRef, loading }) => {
  const [form] = MeetingForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const showModal = data => {
    if (data) {
      if (data.disabled) setDisabled(data.disabled);
      if (data.meetingId) {
        setDetailData(data.meetingId || null);
        updateData(data.meetingId);
      }
    }
    setModalVisible(true);
  };

  const updateData = meetingId => {
    if (meetingId) {
      new Promise(resolve => {
        dispatch({
          type: 'dictionaryMgt/getMeetingDetail',
          payload: meetingId.toString(),
          resolve,
        });
      }).then(res => {
        if (res) {
          const fileInfoList =
            res.fileInfoList &&
            res.fileInfoList.map(item => {
              return {
                url: item.url,
                uid: item.fileId,
                name: item.fileName,
                status: 'done',
              };
            });
          form.setFieldsValue({ ...res, fileIds: fileInfoList });
        }
      });
    }
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
    form.resetFields();
  };

  const handleOk = () => {
    if (disabled) {
      hideModal();
    } else {
      form
        .validateFields()
        .then(values => {
          const fileIds =
            values.fileIds &&
            values.fileIds.map(item => {
              return item.uid;
            });
          return new Promise(resolve => {
            dispatch({
              type: `dictionaryMgt/${detailData ? 'updateMeeting' : 'addMeeting'}`,
              payload: {
                ...values,
                fileIds,
                meetingId: detailData && detailData.toString(),
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
    }
  };

  return (
    <Modal
      title="会议信息"
      centered
      width="580px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <MeetingForm form={form} disabled={disabled} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(MeetingModal);

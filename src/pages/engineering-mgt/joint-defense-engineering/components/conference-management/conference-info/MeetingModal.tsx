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
        setDetailData(data.meetingId);
        updateData(data.meetingId);
      }
    }
    setModalVisible(true);
  };

  const updateData = meetingId => {
    if (meetingId) {
      new Promise(resolve => {
        dispatch({
          type: 'defenseEngineering/getMeetingDetail',
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
                secrecyLevel: item.secrecyLevel,
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
    setDisabled(false);
    form.resetFields();
  };

  const handleOk = () => {
    if (disabled) {
      hideModal();
    } else {
      form
        .validateFields()
        .then(values => {
          let tempLevel = '';
          const fileIds =
            values.fileIds &&
            values.fileIds.map(item => {
              if (tempLevel < item.secrecyLevel) {
                tempLevel = item.secrecyLevel;
              }
              return item.uid;
            });
          if (tempLevel > values.secrecyLevel) {
            message.error('附件密级不能大于该数据密级！');
            return '';
          }
          return new Promise(resolve => {
            dispatch({
              type: `defenseEngineering/${detailData ? 'updateMeeting' : 'addMeeting'}`,
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

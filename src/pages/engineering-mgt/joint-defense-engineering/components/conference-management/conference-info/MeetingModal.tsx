import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MeetingForm from './MeetingForm';

const MeetingModal = ({ dispatch, actionRef, loading }) => {
  const [form] = MeetingForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const [files, setFiles] = useState([]);

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
          // const file  =
          // res.fileInfoList &&
          // res.fileInfoList.map(item => {
          //   return item.fileId
          // });
          // console.log("file",file);

          // setFiles([...file])
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

  // const  newArr = A.filter(function (item) {

  // const getNewArr =(a,b) =>{
  //   a.filter((item)=> {
  //     return b.every( (item1) => {
  //         return item != item1;
  //     })
  // })
  // }
  const handleOk = () => {
    if (disabled) {
      hideModal();
    } else {
      form
        .validateFields()
        .then(values => {
          //  const removeFileIds = []
          const fileIds =
            values.fileIds &&
            values.fileIds.map(item => {
              return item.uid;
            });
          // console.log("fileIds",fileIds);

          // removeFileIds = getNewArr(files,fileIds)
          // console.log("removeFileIds",removeFileIds);
          // if(detailData) values.removeFileIds = removeFileIds
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

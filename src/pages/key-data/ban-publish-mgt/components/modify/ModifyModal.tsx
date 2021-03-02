import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Spin } from 'antd';
import BanPublishForm from './banPublishForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = BanPublishForm.useForm();
  const [publicationId, setPublicationId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setPublicationId(id || undefined);
    setModalVisible(true);
  };

  useEffect(() => {
    if (publicationId) {
      getBanPublishDetail(publicationId);
    }
  }, [publicationId]);

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
    setPublicationId(undefined);
    form.resetFields();
  };

  const getBanPublishDetail = (id: any) => {
    new Promise(resolve => {
      dispatch({
        type: 'kdBanPublishMgt/getBanPublishDetail',
        payload: { publicationId: id },
        resolve,
      });
    })
      .then(data => {
        if (data) {
          const fields = {
            ...data,
            files:
              data.fileInfoList &&
              data.fileInfoList.map(item => {
                return {
                  url: item.url,
                  uid: item.fileId,
                  name: item.fileName,
                  status: 'done',
                };
              }),
            video:
              data.videoInfoList &&
              data.videoInfoList.map((item: any) => {
                return {
                  url: item.videoUrl,
                  uid: item.videoId,
                  name: item.videoName,
                  keyPointInfo: item.keyPointInfo,
                  status: 'done',
                };
              }),
          };
          form.setFieldsValue(fields);
        }
      })
      .catch(_ => {});
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        const fileIds =
          values.files &&
          values.files.map((item: { uid: any }) => {
            return item.uid;
          });
        const videoInfoList =
          values.video &&
          values.video.map((item: any) => {
            return {
              videoUrl: item.url,
              videoId: item.uid,
              videoName: item.name,
              keyPointInfo: item.keyPointInfo,
            };
          });
        return new Promise(resolve => {
          dispatch({
            type: `kdBanPublishMgt/${publicationId ? 'updateBanPublish' : 'addBanPublish'}`,
            payload: {
              ...values,
              fileIds,
              videoInfoList,
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
      title={publicationId ? '非法出版物编辑' : '非法出版物录入'}
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
        <BanPublishForm form={form} />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.kdBanPublishMgt,
}))(ModifyModal);

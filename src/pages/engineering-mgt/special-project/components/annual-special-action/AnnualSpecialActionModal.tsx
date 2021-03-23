import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AnnualSpecialActionForm from './AnnualSpecialActionForm';

const SpecialActionModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AnnualSpecialActionForm.useForm();
  const [actionForm, setActionForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const updateData = data => {
    const fileInfoList =
      data.fileInfoList &&
      data.fileInfoList.map(item => {
        return {
          url: item.url,
          uid: item.fileId,
          name: item.fileName,
          status: 'done',
        };
      });
    form.setFieldsValue({ ...data, fileIds: fileInfoList });
  };

  const showModal = item => {
    if (item) {
      setIsShow(false);
      setActionForm(item);
      updateData(item);
    } else {
      setIsShow(true);
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
    setActionForm(null);
    setIsShow(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          const fileIds =
            values.fileIds &&
            values.fileIds.map(item => {
              return item.uid;
            });
          if (actionForm) {
            values.actionId = actionForm.actionId;
          }
          dispatch({
            type: `specialAction/${actionForm ? 'editSpecialAction' : 'addSpecialAction'}`,
            payload: {
              ...values,
              fileIds,
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
      title={actionForm ? '编辑年度专项行动' : '新增年度专项行动'}
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
      <AnnualSpecialActionForm form={form} isShow={isShow} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(SpecialActionModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AuthForm from './AuthForm';

const AuthModal = ({ dispatch, loading, actionRef }) => {
  const [form] = AuthForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [parentId, setParentId] = useState('');

  const showModal = item => {
    if (item) {
      if (item.visible) setVisible(item.visible);
      if (item.id) {
        setDetailData(item.id);
        updateData(item.id);
      }
      if (item.name) {
        form.setFieldsValue({ parentName: item.name });
      }
      if (item.parentId) {
        setParentId(item.parentId);
      }
      if (item.visible) {
        setTitle('新增子资源');
      }
      if (item.id) {
        setTitle('编辑资源');
      }
    } else {
      setTitle('新增资源');
    }
    setModalVisible(true);
  };
  const updateData = permessionId => {
    new Promise(resolve => {
      dispatch({
        type: 'authorityMgt/getAuthDetail',
        payload: { permessionId },
        resolve,
      });
    }).then(res => {
      if (res) form.setFieldsValue({ ...res });
    });
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
    setTitle('');
    setVisible(false);
    setParentId('');
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if (visible) {
          values.parentId = parentId;
        }
        delete values.parentName;
        return new Promise(resolve => {
          dispatch({
            type: `authorityMgt/${detailData ? 'updateAuth' : 'addAuth'}`,
            payload: {
              ...values,
              permessionId: detailData && detailData.toString(),
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
      title={title}
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
      <AuthForm form={form} visible={visible} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(AuthModal);

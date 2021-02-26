import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Spin } from 'antd';
import InstitutionForm from './InstitutionForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = InstitutionForm.useForm();
  const [orgId, setOrgId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setOrgId(id || undefined);
    setModalVisible(true);
  };

  useEffect(() => {
    if (orgId) {
      getInstitutionDetail(orgId);
    }
  }, [orgId]);

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
    setOrgId(undefined);
    form.resetFields();
  };

  const getInstitutionDetail = (id: any) => {
    new Promise(resolve => {
      dispatch({
        type: 'kdKeyInstitutionsMgt/getKeyInstitutionsDetail',
        payload: { orgId: id },
        resolve,
      });
    })
      .then(data => {
        if (data) {
          form.setFieldsValue(data);
        }
      })
      .catch(_ => {});
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: `kdKeyInstitutionsMgt/${orgId ? 'updateKeyInstitutions' : 'addKeyInstitutions'}`,
            payload: {
              ...values,
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
      title={orgId ? '编辑机构信息' : '新增重点机构'}
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
        <InstitutionForm form={form} />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.kdKeyInstitutionsMgt,
}))(ModifyModal);

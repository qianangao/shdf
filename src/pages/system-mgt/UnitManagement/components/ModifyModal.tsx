import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Spin } from 'antd';
import AddressBookForm from './AddressBookForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AddressBookForm.useForm();
  const [orgId, setOrgId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  // const [orgPid, setOrgPid] = useState(undefined);

  const showModal = (id: any) => {
    setOrgId(id || undefined);
    // setOrgPid(pid || undefined);
    setModalVisible(true);
  };

  useEffect(() => {
    if (orgId) {
      getOrgListDetail(orgId);
    }
  }, [orgId]);

  useEffect(() => {
    form.setFieldsValue((form.orgName = 1));
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setOrgId(undefined);
    // setOrgPid(undefined);
    setModalVisible(false);
    form.resetFields();
  };

  const getOrgListDetail = (id: any) => {
    new Promise(resolve => {
      dispatch({
        type: 'guanli/getOrgListDetail',
        payload: { orgId: id },
        resolve,
      });
    })
      .then(data => {
        if (data) {
          form.setFieldsValue({
            ...data,
            orgObj: {
              name: data.orgName,
              id: data.orgPid,
            },
          });
        }
      })
      .catch(_ => {});
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        values.orgPid = values.orgObj.id;
        // values.orgOrder = parseInt(values.orgOrder)
        return new Promise(resolve => {
          dispatch({
            type: `guanli/${orgId ? 'updateOrgList' : 'addOrgList'}`,
            payload: {
              ...values,
              // orgPid,
              orgPid: values.orgObj.id,
              // orgName: values.orgId.name,
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
      title={orgId ? '??????' : '??????'}
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
        height: 'calc(85vh - 108px)',
        overflow: 'auto',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Spin spinning={loading}>
        <AddressBookForm form={form} />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.guanli,
}))(ModifyModal);

import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './form/EvaluateFeedbackForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = OrgInfoForm.useForm();
  const [applyCaseModalVisible, setModalVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const showModal = items => {
    // 获取详情
    if (items) {
      setDetailData(items);
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
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        values.id = detailData.caseId;
        return new Promise(resolve => {
          dispatch({
            type: `caseMgt/evaluateFeedback`,
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
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="评价反馈"
      centered
      width={580}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={applyCaseModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm form={form} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
}))(ModifyModal);

import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import OrgInfoForm from './form/RecordApprovalForm';

const ModifyModal = ({ dispatch, actionRef, loading, caseMgt }) => {
  const [form] = OrgInfoForm.useForm();
  const [superviseApprovalModalVisible, setModalVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const { recordDetailData } = caseMgt;
  const showModal = items => {
    // 获取详情
    if (items) {
      // 获取详情
      dispatch({
        type: 'caseMgt/getSuperviseDetail',
        payload: {
          id: items.caseId,
        },
      });
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
  };

  const doRollBack = type => {
    form
      .validateFields()
      .then(values => {
        values.id = detailData.caseId;
        values.approvalResult = type;
        return new Promise(resolve => {
          dispatch({
            type: `caseMgt/superviseApproval`,
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

  const handleOk = () => {
    doRollBack(1);
  };

  const handleRollBack = () => {
    doRollBack(0);
  };

  return (
    <Modal
      title="督办审批"
      centered
      width={780}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={superviseApprovalModalVisible}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
      footer={[
        <Button onClick={handleRollBack}>不通过</Button>,
        <Button type="primary" onClick={handleOk}>
          通过
        </Button>,
      ]}
    >
      <OrgInfoForm form={form} orgInfoData={recordDetailData} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
}))(ModifyModal);

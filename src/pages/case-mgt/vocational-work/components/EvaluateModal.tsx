import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Radio } from 'antd';
import OrgInfoForm from './form/EvaluateForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = OrgInfoForm.useForm();
  const [applyCaseModalVisible, setModalVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [evaluateLevel, setEvaluateLevel] = React.useState(1);

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
        values.evaluateLevel = evaluateLevel;
        return new Promise(resolve => {
          dispatch({
            type: `caseMgt/evaluate`,
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

  const onChange = e => {
    setEvaluateLevel(e.target.value);
  };

  return (
    <Modal
      title="评价"
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
      <Descriptions title="您对本次案件办理的整体表现评价（请用0-10分来评价）" />
      <Radio.Group name="evaluateLevel" onChange={onChange} value={evaluateLevel}>
        <Radio value={1}>1</Radio>
        <Radio value={2}>2</Radio>
        <Radio value={3}>3</Radio>
        <Radio value={4}>4</Radio>
        <Radio value={5}>5</Radio>
        <Radio value={6}>6</Radio>
        <Radio value={7}>7</Radio>
        <Radio value={8}>8</Radio>
        <Radio value={9}>9</Radio>
        <Radio value={10}>10</Radio>
      </Radio.Group>
      <Descriptions title=" " />
      <OrgInfoForm form={form} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
}))(ModifyModal);

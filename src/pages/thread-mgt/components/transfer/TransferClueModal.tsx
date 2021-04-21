import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { message, Modal } from 'antd';
import TransferClueForm from './TransferClueForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = TransferClueForm.useForm();
  const [circulationType, setCirculationType] = useState('2');
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    setDetailData(items || null);
    if (items) {
      form.setFieldsValue({ ...items });
    }
    setModalVisible(true);
  };

  const fieldChangeHander = (label, value) => {
    if (label === 'circulationType') {
      setCirculationType(value);
      form.setFieldsValue({ unitList: [] }); // 切换类型清空单位
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
    setCirculationType('');
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        const choosetime = new Date(Date.parse(values.deadline.replace(/-/g, '/'))).getTime();
        const timeline = new Date().getTime();
        if (timeline > choosetime) {
          message.warning('选择时间必须大于当前时间');
          return;
        }
        hideModal();
        /* eslint-disable no-new */
        new Promise(resolve => {
          dispatch({
            type: `emClueManagement/transferAssociation`,
            payload: {
              ...values,
              circulationId: detailData.sourceClueId,
              clueId: detailData.clueId,
              unitList: values.unitList.map(item => item.id),
            },
            resolve,
          });
        });
      })
      // .then(() => {})
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });
  };
  return (
    <Modal
      title="线索转办"
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
      <TransferClueForm
        form={form}
        fieldChangeHander={fieldChangeHander}
        optType={circulationType}
      />
    </Modal>
  );
};
export default connect(({ loading, emClueManagement }) => ({
  loading: loading.models.emClueManagement,
  emClueManagement,
}))(ModifyModal);

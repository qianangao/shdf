import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './ReceivingForm';

const ModifyModal = ({ dispatch, actionRef, loading, receivingMgt }) => {
  const [form] = OrgInfoForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const { receivingDetailData } = receivingMgt;
  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'receivingMgt/getDetail',
      payload: {
        id: items.receiptId,
      },
    });
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
        return new Promise(resolve => {
          let filesStr = '';
          if (values.files && values.files.length > 0) {
            const ids = values.files.map(item => {
              return item.uid;
            });
            filesStr = ids.join(',');
            delete values.files;
          }
          values.fileIds = filesStr;
          dispatch({
            type: 'receivingMgt/update',
            payload: {
              ...values,
            },
            resolve,
          });
        });
      })
      .then(() => {
        setModalVisible(false);
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="编辑收文登记"
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm
        form={form}
        orgInfoData={receivingDetailData}
        id={receivingDetailData.receiptId}
      />
    </Modal>
  );
};

export default connect(({ receivingMgt, loading }) => ({
  receivingMgt,
  loading: loading.models.receivingMgt,
}))(ModifyModal);

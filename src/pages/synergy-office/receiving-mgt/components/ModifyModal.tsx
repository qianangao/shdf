import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './ReceivingForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = OrgInfoForm.useForm();
  const [receivingDetailData, setOrgInfoData] = useState(null);
  const [modifyModalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'receivingMgt/getDetail',
      payload: {
        id: items.receiptId,
      },
    });
    setOrgInfoData(items || null);
    if (items) form.setFieldsValue({ ...items });
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
            values.files.forEach(item => {
              filesStr += `${item.uid},`;
            });
            filesStr = filesStr.substr(0, filesStr.length - 1);
          }
          delete values.files;
          values.fileIds = filesStr;
          // 打印上传信号
          // console.log(values ,'values--1')
          dispatch({
            type: 'receivingMgt/update',
            payload: {
              ...values,
            },
            resolve,
          });
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
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
      title="编辑收文登记"
      centered
      width={780}
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
      <OrgInfoForm form={form} orgInfoData={receivingDetailData} />
    </Modal>
  );
};

export default connect(({ receivingMgt, loading }) => ({
  receivingMgt,
  loading: loading.models.receivingMgt,
}))(ModifyModal);

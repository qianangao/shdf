import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './ReceivingForm';

const ModifyModal = ({ modifyModalVisible, dispatch, actionRef, loading, receivingMgt }) => {
  const [form] = OrgInfoForm.useForm();
  // const [ modifyModalVisible,setModalVisible] = useState(false);
  const { receivingDetailData } = receivingMgt;

  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'receivingMgt/getDetail',
      payload: {
        id: items.receiptId,
      },
    });
    dispatch({
      type: 'receivingMgt/save',
      payload: {
        modifyModalVisible: true,
      },
    });

    // setModalVisible(true);
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
    dispatch({
      type: 'receivingMgt/save',
      payload: {
        modifyModalVisible: false,
      },
    });
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
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
      width={680}
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
  modifyModalVisible: receivingMgt.modifyModalVisible,
  loading: loading.models.receivingMgt,
}))(ModifyModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AnnualDefenseEngineeringForm from './AnnualDefenseEngineeringForm';

const AnnualDefenseEngineeringModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AnnualDefenseEngineeringForm.useForm();
  const [defenseForm, setDefenseForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const updateData = data => {
    const fileInfoList =
      data.fileInfoList &&
      data.fileInfoList.map(item => {
        return {
          url: item.url,
          uid: item.fileId,
          name: item.fileName,
          status: 'done',
        };
      });
    form.setFieldsValue({ ...data, fileIds: fileInfoList });
  };

  const showModal = item => {
    if (item) {
      if (item.engineeringForm) {
        setDefenseForm(item.engineeringForm);
        updateData(item.engineeringForm);
      }
    } else {
      // 新增年度工程数据时，isShow为true
      setIsShow(true);
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
    setDefenseForm(null);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          const fileIds =
            values.fileIds &&
            values.fileIds.map(item => {
              return item.uid;
            });
          if (defenseForm) {
            values.projectId = defenseForm.projectId;
          }
          dispatch({
            type: `defenseEngineering/${defenseForm ? 'editEngineering' : 'addEngineering'}`,
            payload: {
              ...values,
              fileIds,
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
      title={defenseForm ? '编辑年度联防工程' : '新增年度联防工程'}
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <AnnualDefenseEngineeringForm form={form} isShow={isShow} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(AnnualDefenseEngineeringModal);

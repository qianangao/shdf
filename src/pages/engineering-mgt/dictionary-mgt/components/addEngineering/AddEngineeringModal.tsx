import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddEngineeringForm from './AddEngineeringForm';

const AddEngineeringModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AddEngineeringForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [title, setTitle] = useState('');
  // const [titles, setTitles] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [editVisible, setEditVisible] = useState(true);

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
      if (item.year) {
        setTitle('重要项目');
        // setEditVisible(true);
      }
      // else if (item.engineeringForm) {
      // setEditVisible(false);
      // if (item.engineeringForm.actionYear) {
      //   setTitle('编辑年度专项行动');
      // } else {
      //   setTitle('编辑专项行动');
      // }
      // }
    } else {
      setTitle('工程基本信息');
    }
    // setDetailData(item || null);
    if (item) {
      if (item.year || item.engineeringForm.actionYear) setVisible(true);
      if (item.engineeringForm) updateData(item.engineeringForm);
    }
    setModalVisible(true);
    // if (item) {
    //   if (item.engineeringForm) {
    //     setTitles('editSpecialAction');
    //   } else {
    //     setTitles('addAnnualSpecialAction');
    //   }
    // } else {
    //   setTitles('addSpecialAction');
    // }
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
    setDetailData(null);
    setVisible(false);
    setTitle('');
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
          if (detailData && detailData.engineeringForm) {
            values.actionId = detailData.engineeringForm.actionId;
          }
          dispatch({
            type: `specialAction/${
              titles
              // detailData
              //   ? detailData.engineeringForm
              //     ? 'editSpecialAction'
              //     : 'addAnnualSpecialAction'
              //   : 'addSpecialAction'
            }`,
            payload: {
              ...values,
              fileIds,
            },
            resolve,
          });
        });
      })
      .then(() => {
        // dispatch({
        //   type:'specialAction/getSpecialActionTree',
        //   payload:{
        //     actionName: ''
        //   }
        // })
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={title}
      centered
      width="60vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      {/* visible={visible} editVisible={editVisible}  */}
      <AddEngineeringForm form={form} visible={visible} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(AddEngineeringModal);

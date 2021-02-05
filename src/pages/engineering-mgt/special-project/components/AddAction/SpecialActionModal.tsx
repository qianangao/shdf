import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddSpecialActionForm from './AddSpecialActionForm';

const SpecialActionModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AddSpecialActionForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [title, setTitle] = useState('');
  const [titles, setTitles] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const updateData = data => {
    form.setFieldsValue({ ...data });
  };

  const showModal = item => {
    if (item) {
      if (item.year) {
        setTitle('新增年度专项行动');
      } else if (item.actionForm) {
        if (item.actionForm.actionYear) {
          setTitle('编辑年度专项行动');
        } else {
          setTitle('编辑专项行动');
        }
      }
    } else {
      setTitle('新增专项行动');
    }
    setDetailData(item || null);
    if (item) {
      if (item.year || item.actionForm.actionYear) setVisible(true);
      if (item.actionForm) updateData(item.actionForm);
    }
    setModalVisible(true);
    if (item) {
      if (item.actionForm) {
        setTitles('editSpecialAction');
      } else {
        setTitles('addAnnualSpecialAction');
      }
    } else {
      setTitles('addSpecialAction');
    }
  };

  // const updateData = bookId => {
  //   if (bookId) {
  //     new Promise(resolve => {
  //       dispatch({
  //         type: 'emAddressBook/getAddressBookDetail',
  //         payload: bookId.toString(),
  //         resolve,
  //       });
  //     }).then(res => {
  //       if (res) form.setFieldsValue({ ...res });
  //     });
  //   }
  // };
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
            values.files &&
            values.files.map(item => {
              return item.uid;
            });
          if (detailData && detailData.actionForm) {
            values.actionId = detailData.actionForm.actionId;
          }
          dispatch({
            type: `specialAction/${
              titles
              // detailData
              //   ? detailData.actionForm
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
      <AddSpecialActionForm form={form} visible={visible} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(SpecialActionModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddEngineeringForm from './AddEngineeringForm';

const AddEngineeringModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AddEngineeringForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [title, setTitle] = useState('');
  const [titles, setTitles] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

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
      if (item.add) {
        setEditVisible(true);
        setAdd(true);
      }
      if (item.edit) {
        setEditVisible(edit);
        setEdit(true);
      }
      if (item.year) {
        setTitle('重要项目');
      }
    } else {
      setTitle('工程基本信息');
    }
    setDetailData(item || null);
    if (item) {
      if (item.year || (item.engineeringForm && item.engineeringForm.startTime)) setVisible(true);
      if (item.engineeringForm) updateData(item.engineeringForm);
    }
    setModalVisible(true);
    if (item) {
      if (item.engineeringForm) {
        setTitles('editEngineering');
      } else {
        setTitles('addEngineering');
      }
    } else {
      setTitles('addEngineering');
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
            values.projectId = detailData.engineeringForm.projectId;
          }
          dispatch({
            type: `dictionaryMgt/${titles}`,
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
      title={title}
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
      <AddEngineeringForm
        form={form}
        visible={visible}
        add={add}
        edit={edit}
        editVisible={editVisible}
      />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(AddEngineeringModal);

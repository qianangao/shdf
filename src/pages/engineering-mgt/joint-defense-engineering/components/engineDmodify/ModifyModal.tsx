import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddressBookForm from './AddThreadForm';

const ModifyModal = ({ dispatch, actionRef, loading, defenseEngineering }) => {
  const [form] = AddressBookForm.useForm();
  const [projectId, setProjectId] = useState('');
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const updateData = infoId => {
    if (infoId) {
      new Promise(resolve => {
        dispatch({
          type: 'defenseEngineering/getInfoDetail',
          payload: infoId.toString(),
          resolve,
        });
      }).then(data => {
        if (data) {
          const fields = {
            ...data,
            fileShow:
              data.files &&
              data.files.map(item => {
                return {
                  url: item.url,
                  uid: item.fileId,
                  name: item.fileName,
                  status: 'done',
                };
              }),
          };
          form.setFieldsValue(fields);
        }
      });
    }
  };
  const showModal = infoId => {
    setDetailData(infoId || null);
    updateData(infoId);
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
  useEffect(() => {
    if (defenseEngineering.projectId) {
      setProjectId(defenseEngineering.projectId);
    }
  });

  const hideModal = () => {
    setModalVisible(false);
    setProjectId('');
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const fileIds =
          values.fileShow &&
          values.fileShow.map(item => {
            return item.uid;
          });
        return new Promise(resolve => {
          dispatch({
            type: `defenseEngineering/addEngineData`,
            payload: {
              ...values,
              fileIds,
              projectId,
              detailData,
              projectPid: defenseEngineering.projectPid ? defenseEngineering.projectPid : '10001',
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
      title="新增工程数据"
      centered
      width="580px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <AddressBookForm form={form} />
    </Modal>
  );
};

export default connect(({ defenseEngineering, loading }) => ({
  defenseEngineering,
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);

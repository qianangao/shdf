import React, { useState, useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { Modal, Spin } from 'antd';
import AddThreadForm from './AddThreadForm';

const useQuery = () => new URLSearchParams(useLocation().search);

const ModifyModal = ({ dispatch, actionRef, loading, emClueManagement }) => {
  const query = useQuery();
  const { code } = emClueManagement;
  const [form] = AddThreadForm.useForm();
  const [clueId, setClueId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = id => {
    setClueId(id);
    if (!id) {
      dispatch({
        type: `emClueManagement/getCode`,
      });
    }
    setModalVisible(true);
  };

  const getClueDetail = (id: any) => {
    new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/getClueDetail',
        payload: { clueId: id },
        resolve,
      });
    })
      .then(data => {
        if (data) {
          const fields = {
            ...data,
            files:
              data.fileList &&
              data.fileList.map(item => {
                return {
                  url: item.url,
                  uid: item.fileId,
                  name: item.fileName,
                  status: 'done',
                };
              }),
            regionObj: { label: data.region, value: data.regionCode },
          };
          form.setFieldsValue(fields);
        }
      })
      .catch(_ => {});
  };

  useEffect(() => {
    if (clueId) {
      getClueDetail(clueId);
    }
  }, [clueId]);

  useEffect(() => {
    code && form.setFieldsValue({ clueNumber: `XS${code}` });
  }, [code]);

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }

    if (query.get('type') === 'modify' && query.get('id')) {
      showModal({ id: query.get('id') });
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
    form.resetFields();
    setClueId(undefined);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        const fileIds =
          values.files &&
          values.files.map((item: { uid: any }) => {
            return item.uid;
          });
        const regionCode = values.regionObj && values.regionObj.value;
        const region = values.regionObj && values.regionObj.label;

        return new Promise(resolve => {
          dispatch({
            type: `emClueManagement/${clueId ? 'editClue' : 'addClues'}`,
            payload: {
              clueId,
              ...values,
              fileIds,
              regionCode,
              region,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });
  };
  return (
    <Modal
      title={clueId ? '线索修改' : '线索录入'}
      centered
      width="90vw"
      destroyOnClose
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
      <Spin spinning={loading}>
        <AddThreadForm form={form} />
      </Spin>
    </Modal>
  );
};
export default connect(({ loading, emClueManagement }) => ({
  loading: loading.models.emClueManagement,
  emClueManagement,
}))(ModifyModal);

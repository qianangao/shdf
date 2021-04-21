import React, { useState, useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { Modal } from 'antd';
import AddThreadForm from './AddThreadForm';

const useQuery = () => new URLSearchParams(useLocation().search);

const ModifyModal = ({ dispatch, actionRef, addLoading, edirLoading, emClueManagement }) => {
  const query = useQuery();
  const { code } = emClueManagement;
  const [form] = AddThreadForm.useForm();
  const [clueId, setClueId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [eidtInfo, setEidtInfo] = useState('');

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
                  secrecyLevel: item.secrecyLevel,
                };
              }),
            involvingLocalCode: data.involvingLocalCode,
            regionObj: { label: data.region, value: data.regionCode },
          };
          form.setFieldsValue(fields);
          setEidtInfo(fields);
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
        let tempLevel = '';
        const fileIds =
          values.files &&
          values.files.map((item: { uid: any }) => {
            if (tempLevel < item.secrecyLevel) {
              tempLevel = item.secrecyLevel;
            }
            return item.uid;
          });
        if (tempLevel > values.secrecyLevel) {
          message.error('附件密级不能大于该数据密级！');
          return '';
        }
        // const arr1 = LocalCache.get('areaInfo');
        // let involvingLocal = arr1.fliter(item => {
        //   return item.value === values.involvingLocalCode;
        // });
        // involvingLocal = involvingLocal.label;
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
              // involvingLocal,
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
      confirmLoading={addLoading || edirLoading}
      onCancel={hideModal}
    >
      <AddThreadForm form={form} editObj={eidtInfo} />
    </Modal>
  );
};
export default connect(({ loading, emClueManagement }) => ({
  addLoading: loading.effects['emClueManagement/addClues'],
  edirLoading: loading.effects['emClueManagement/editClue'],
  emClueManagement,
}))(ModifyModal);

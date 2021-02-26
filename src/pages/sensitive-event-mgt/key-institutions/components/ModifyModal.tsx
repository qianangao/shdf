import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './form/CaseForm';
import TableCaseHandle from './TableCaseHandle';
import TableFileCase from './TableFileCase';
import CaseHandleModal from './CaseHandleModal';
import ClubSplicing from './ClubSplicing';
import ClubSplicingModal from './ClubSplicingModal';

const ModifyModal = ({ dispatch, actionRef, loading, sensitiveMgt }) => {
  const [form] = OrgInfoForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [sensitiveDetailData, setDetailData] = useState(null);
  const { detailData } = sensitiveMgt;
  const caseHandleModalRef = useRef({});
  const clubSplicingModalRef = useRef({});
  const [infoId, setSensitiveId] = useState('');

  const showModal = items => {
    // 获取详情
    if (items && items !== 'undefined') {
      dispatch({
        type: 'sensitiveMgt/getDetail',
        payload: {
          id: items.eventId,
        },
      });
      dispatch({
        type: 'sensitiveMgt/tableHandleReload',
        payload: {
          id: items.eventId,
        },
      });
      setSensitiveId(items.eventId);
      setDetailData(detailData);
    } else {
      setSensitiveId('');
      setDetailData(null);
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
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        values.engineeringIds = [values.engineeringIds];
        values.specialActionIds = [values.specialActionIds];
        let filesStr = '';
        if (values.files && values.files.length > 0) {
          const ids = values.files.map(item => {
            return item.uid;
          });
          filesStr = ids.join(',');
          delete values.files;
        }
        values.fileIds = filesStr;
        return new Promise(resolve => {
          dispatch({
            type: `sensitiveMgt/${sensitiveDetailData ? 'update' : 'add'}`,
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

  const openCaseHandleModal = item => {
    caseHandleModalRef.current.showModal(item);
  };

  const openClubSplicingModal = item => {
    clubSplicingModalRef.current.showModal(item);
  };

  return (
    <Modal
      title={sensitiveDetailData ? '敏感事件编辑' : '敏感事件录入'}
      centered
      width="900vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm form={form} orgInfoData={detailData} />

      <ClubSplicing id={infoId} openClubSplicingModal={openClubSplicingModal} />

      {infoId ? <TableCaseHandle id={infoId} openCaseHandleModal={openCaseHandleModal} /> : null}

      {infoId ? <TableFileCase id={infoId} orgInfoData={detailData} /> : null}

      <CaseHandleModal actionRef={caseHandleModalRef} id={infoId} />

      <ClubSplicingModal actionRef={clubSplicingModalRef} />
    </Modal>
  );
};

export default connect(({ sensitiveMgt, loading }) => ({
  sensitiveMgt,
  loading: loading.models.sensitiveMgt,
}))(ModifyModal);

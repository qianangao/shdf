import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './form/CaseForm';
import TableCaseHandle from './TableCaseHandle';
import CaseHandleModal from './CaseHandleModal';
import ClubSplicing from './ClubSplicing';
import ClubSplicingModal from './ClubSplicingModal';

const ModifyModal = ({ dispatch, actionRef, loading, caseMgt }) => {
  const [form] = OrgInfoForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const { caseDetailData } = caseMgt;
  const caseHandleModalRef = useRef({});
  const clubSplicingModalRef = useRef({});
  const [infoId, setCaresId] = useState('');

  const showModal = items => {
    // 获取详情
    if (items && items !== 'undefined') {
      dispatch({
        type: 'caseMgt/getDetail',
        payload: {
          id: items.caseId,
        },
      });
      dispatch({
        type: 'caseMgt/tableHandleReload',
        payload: {
          id: items.caseId,
        },
      });
      setCaresId(items.caseId);
      setDetailData(caseDetailData);
    } else {
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
        return new Promise(resolve => {
          dispatch({
            type: `caseMgt/${detailData ? 'update' : 'add'}`,
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
      title={detailData ? '案件编辑' : '案件录入'}
      centered
      width={1080}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm form={form} orgInfoData={caseDetailData} />

      <ClubSplicing id={infoId} openClubSplicingModal={openClubSplicingModal} />

      <TableCaseHandle id={infoId} openCaseHandleModal={openCaseHandleModal} />

      <CaseHandleModal actionRef={caseHandleModalRef} id={infoId} />

      <ClubSplicingModal actionRef={clubSplicingModalRef} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
}))(ModifyModal);

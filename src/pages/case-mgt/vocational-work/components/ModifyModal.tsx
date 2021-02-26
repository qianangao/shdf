import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CueAssociation from '@/components/CueAssociation';
import OrgInfoForm from './form/CaseForm';
import TableCaseHandle from './TableCaseHandle';
import TableFileCase from './TableFileCase';
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
  const cueAssociationRef = useRef({});
  const openAssociationModal = (item: any, views: any) => {
    cueAssociationRef.current.showModal(item, views);
  };

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
      setCaresId('');
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

  const onSelected = item => {
    let clubIds = [];
    if (item && item.length > 0) {
      const ids = item.map(obj => {
        return obj.clueId;
      });
      clubIds = ids;
    }
    if (clubIds) {
      return new Promise(resolve => {
        dispatch({
          type: `caseMgt/clueRelation`,
          payload: {
            clubIds,
            id: infoId,
          },
          resolve,
        });
      });
    }
    return true;
  };
  // @ts-ignore
  return (
    <Modal
      title={detailData ? '案件编辑' : '案件录入'}
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm form={form} id={infoId} orgInfoData={caseDetailData} />

      {infoId ? <ClubSplicing id={infoId} openAssociationModal={openAssociationModal} /> : null}

      {infoId ? <TableCaseHandle id={infoId} openCaseHandleModal={openCaseHandleModal} /> : null}

      {infoId ? <TableFileCase id={infoId} orgInfoData={caseDetailData} /> : null}

      <CaseHandleModal actionRef={caseHandleModalRef} id={infoId} />

      <ClubSplicingModal actionRef={clubSplicingModalRef} />

      <CueAssociation actionRef={cueAssociationRef} onSelected={onSelected} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
}))(ModifyModal);

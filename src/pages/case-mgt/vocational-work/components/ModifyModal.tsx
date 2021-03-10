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
  const [caseType, setCaseType] = useState('');
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
      dispatch({
        type: 'caseMgt/getCaseHandleFile',
        payload: {
          id: items.caseId,
        },
      });
      setCaresId(items.caseId);
      setCaseType(items.caseType);
      setDetailData(caseDetailData);
    } else {
      setCaresId('');
      setCaseType('0');
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
        values.specialActionIds = values.specialActionIds ? [values.specialActionIds] : [];

        let filesStr = '';
        if (values.fileList && values.fileList.length > 0) {
          const ids = values.fileList.map(item => {
            return item.uid;
          });
          filesStr = ids.join(',');
        }
        values.fileIds = filesStr;
        delete values.fileList;
        values.regionCode = values.regionObj ? values.regionObj.value : null;
        values.region = values.regionObj ? values.regionObj.label : null;
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

  const onFieldsChange = item => {
    if (item[0].name[0] === 'caseType') {
      setCaseType(item[0].value);
    }
  };

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
      <OrgInfoForm
        form={form}
        id={infoId}
        orgInfoData={caseDetailData}
        caseType={caseType}
        onFieldsChange={onFieldsChange}
      />

      {infoId ? <ClubSplicing id={infoId} openAssociationModal={openAssociationModal} /> : null}

      {infoId ? <TableCaseHandle id={infoId} openCaseHandleModal={openCaseHandleModal} /> : null}

      {infoId ? <TableFileCase id={infoId} /> : null}

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

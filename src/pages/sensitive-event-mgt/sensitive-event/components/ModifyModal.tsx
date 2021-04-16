import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { message, Modal, Button } from 'antd';
import CueAssociation from '@/components/CueAssociation';
import OrgInfoForm from './form/CaseForm';
import TableCaseHandle from './TableCaseHandle';
import TableFileCase from './TableFileCase';
import CaseHandleModal from './CaseHandleModal';
import ClubSplicing from './ClubSplicing';

const ModifyModal = ({ dispatch, actionRef, loading, sensitiveMgt, caseMgt }) => {
  const [form] = OrgInfoForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [sensitiveDetailData, setDetailData] = useState(null);
  const { detailData } = sensitiveMgt;
  const { specialList } = caseMgt;
  const caseHandleModalRef = useRef({});
  const [infoId, setSensitiveId] = useState('');
  const [caseType, setCaseType] = useState('');
  const cueAssociationRef = useRef({});
  const openAssociationModal = (item: any, views: any) => {
    cueAssociationRef.current.showModal(item, views);
  };

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
      dispatch({
        type: 'caseMgt/getCaseHandleFile',
        payload: {
          id: items.eventId,
        },
      });
      setSensitiveId(items.eventId);
      setCaseType(items.eventType);
      setDetailData(detailData);
    } else {
      setCaseType('0');
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
        let tempLevel = '';
        // values.specialActionIds = values.specialActionIds ? [values.specialActionIds] : [];
        values.charge = Array.isArray(values.charge) ? values.charge.join(',') : values.charge;
        values.platformType = Array.isArray(values.platformType)
          ? values.platformType.join(',')
          : values.platformType;
        values.spreadWay = Array.isArray(values.spreadWay)
          ? values.spreadWay.join(',')
          : values.spreadWay;

        let filesStr = '';
        if (values.fileList && values.fileList.length > 0) {
          const ids = values.fileList.map(item => {
            if (tempLevel < item.secrecyLevel) {
              tempLevel = item.secrecyLevel;
            }
            return item.uid;
          });
          filesStr = ids.join(',');
          delete values.fileList;
        }

        if (tempLevel > values.secrecyLevel) {
          message.error('附件密级不能大于该数据密级！');
          return '';
        }

        values.fileIds = filesStr;
        values.regionCode = values.regionObj ? values.regionObj.value : null;
        values.region = values.regionObj ? values.regionObj.label : null;
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
          type: `sensitiveMgt/clueRelation`,
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

  const reset = () => {
    form.resetFields();
  };

  const onFieldsChange = item => {
    if (item[0].name[0] === 'eventType') {
      setCaseType(item[0].value);
    }
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
      footer={[
        <Button key="back" onClick={sensitiveDetailData ? hideModal : reset}>
          {sensitiveDetailData ? '取消' : '重置'}
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          保存
        </Button>,
      ]}
    >
      <OrgInfoForm
        form={form}
        orgInfoData={detailData}
        specialList={specialList}
        id={infoId}
        caseType={caseType}
        onFieldsChange={onFieldsChange}
      />

      <ClubSplicing id={infoId} openAssociationModal={openAssociationModal} />

      {infoId ? <TableCaseHandle id={infoId} openCaseHandleModal={openCaseHandleModal} /> : null}

      {infoId ? <TableFileCase id={infoId} /> : null}

      <CaseHandleModal actionRef={caseHandleModalRef} id={infoId} />

      <CueAssociation actionRef={cueAssociationRef} onSelected={onSelected} />
    </Modal>
  );
};

export default connect(({ sensitiveMgt, caseMgt, loading }) => ({
  sensitiveMgt,
  caseMgt,
  loading: loading.models.sensitiveMgt,
}))(ModifyModal);

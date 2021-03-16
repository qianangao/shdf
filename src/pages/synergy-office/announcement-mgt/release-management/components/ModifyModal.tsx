import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Spin } from 'antd';
import InstitutionForm from './InstitutionForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form]: any = InstitutionForm.useForm();
  const [noticeId, setNoticeId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectType, setSelectType] = useState('1');

  const showModal = (id: any) => {
    setNoticeId(id || undefined);
    setModalVisible(true);
  };

  const fieldChangeHander = (label, value) => {
    if (label === 'selectType') {
      setSelectType(value);
      if (value === '1') form.setFieldsValue({ visibleRangeOrg: [] });
      else form.setFieldsValue({ visibleRange: [] });
    }
  };

  const getAnnouncementDetail = (id: any) => {
    new Promise(resolve => {
      dispatch({
        type: 'soAnnouncementMgt/getAnnouncementDetail',
        payload: { noticeId: id },
        resolve,
      });
    })
      .then(data => {
        if (data) {
          const fields = {
            ...data,
            visibleRange: data.visibleRange && JSON.parse(data.visibleRange),
            files:
              data.files &&
              data.files.map(item => {
                return {
                  url: item.url,
                  uid: item.fileId,
                  name: item.fileName,
                  status: 'done',
                };
              }),
            remindWays: data.remindWays && data.remindWays.split(','),
          };
          form.setFieldsValue(fields);
        }
      })
      .catch(_ => {});
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
    if (noticeId) {
      getAnnouncementDetail(noticeId);
    }
  }, [noticeId]);

  const hideModal = (): void => {
    setModalVisible(false);
    form.resetFields();
    setSelectType('1');
    setNoticeId(undefined);
  };

  const handleOk = (): void => {
    form
      .validateFields()
      .then((values: any) => {
        const fileIds =
          values.files &&
          values.files.map((item: { uid: any }) => {
            return item.uid;
          });
        const remindWays = values.remindWays ? values.remindWays.join(',') : '';
        return new Promise(resolve => {
          dispatch({
            type: `soAnnouncementMgt/${noticeId ? 'updateAnnouncement' : 'addAnnouncement'}`,
            payload: {
              ...values,
              includeFile: form.getFieldValue(['files']) ? 1 : 0,
              fileIds,
              remindWays,
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
      title={noticeId ? '编辑公告' : '新建公告'}
      centered
      destroyOnClose
      width="90vw"
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
        <InstitutionForm form={form} fieldChangeHander={fieldChangeHander} optType={selectType} />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.soAnnouncementMgt,
}))(ModifyModal);

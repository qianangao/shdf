import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Form, Input, Modal, Radio, Spin, Button } from 'antd';
import { getUseInfo, USER_INFO } from '@/utils/cookie';
import ProcessInfo from './ProcessInfo';
import CommitExamineModal from './CommitExamineModal';

const ProcessInfoModal = ({ dispatch, actionRef, loading, transferModal, concludeRefModal }) => {
  const [form] = Form.useForm();
  const commitModelRef = useRef({});
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [approvalType, setApprovalType] = useState(0);
  const [clueData, setClueData] = useState({ clueId: undefined, sourceClueId: undefined });

  const showModal = (item: any, type: string) => {
    setClueData(item);
    setCategory(type);
    setModalVisible(true);
  };
  const handleModal = () => {
    setModalVisible(false);
  };
  const hideModal = () => {
    dispatch({
      type: 'emClueManagement/removeProcessDetail',
    });
    setModalVisible(false);
    setClueData({ clueId: undefined, sourceClueId: undefined });
    setCategory('');
    setApprovalType(0);
    form.resetFields();
  };
  const showCommitExamine = () => {
    commitModelRef.current.showModal(clueData.clueId, clueData.sourceClueId);
  };
  const showTransferClue = () => {
    transferModal(clueData);
    hideModal();
  };

  useEffect(() => {
    window.addEventListener(
      'changeLanguage',
      () => {
        handleModal();
      },
      false,
    );
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const feedbackClue = () => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: 'emClueManagement/feedbackClue',
            payload: {
              sourceUnit: getUseInfo(USER_INFO)
                ? JSON.parse(getUseInfo(USER_INFO)).orgName
                : 'SHDF?????????',
              clueId: clueData.clueId,
              circulationId: clueData.sourceClueId,
              ...values,
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

  const commitApproval = () => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: 'emClueManagement/approvalClue',
            payload: {
              clueId: clueData.clueId,
              approvalResult: approvalType,
              ...values,
            },
            resolve,
          });
        });
      })
      .then(() => {
        if (approvalType === 2 && form.getFieldValue(['clueType']) === 1) {
          showTransferClue();
        } else {
          hideModal();
        }
      })
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });
  };

  const handleOk = () => {
    if (category === 'submit') {
      showCommitExamine();
    } else if (category === 'feedback') {
      feedbackClue();
    } else if (category === 'approval') {
      commitApproval();
    }
  };

  const createModalTitle = () => {
    let modalTitle = '????????????';
    switch (category) {
      case 'feedback':
        modalTitle = '??????????????????';
        break;
      case 'approval':
        modalTitle = '??????????????????';
        break;
      case 'submit':
      default:
        modalTitle = '????????????';
        break;
    }
    return modalTitle;
  };

  const approvalChange = (state: any) => {
    setApprovalType(state.target.value);
    form.setFieldsValue({ approvalContent: '' });
    form.setFieldsValue({ clueType: '' });
  };

  const completed = () => {
    if (category === 'feedback') {
      handleModal();
    } else {
      new Promise(resolve => {
        dispatch({
          type: 'emClueManagement/concludeTheMatter',
          payload: {
            clueId: clueData.clueId,
            circulationId: clueData.sourceClueId,
            processingResults: 1,
          },
          resolve,
        });
      }).then(() => {
        handleModal();
      });
    }
  };

  return (
    <Modal
      title={createModalTitle()}
      centered
      destroyOnClose
      width="90vw"
      onCancel={handleModal}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      footer={[
        <Button key="back" onClick={completed} style={{ margin: '0 auto' }}>
          {category === 'feedback' ? '??????' : '??????'}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => (category === 'feedback' ? feedbackClue() : concludeRefModal(clueData))}
        >
          {category === 'feedback' ? '??????' : '????????????'}
        </Button>,
      ]}
      confirmLoading={loading}
      visible={modalVisible}
      onOk={handleOk}
    >
      <Spin spinning={loading}>
        <ProcessInfo clueId={clueData.clueId} circulationId={clueData.sourceClueId} />
        <Form form={form} scrollToFirstError layout="vertical">
          {category === 'feedback' && (
            <Form.Item
              name="circulationContent"
              label="??????"
              rules={[
                {
                  required: true,
                  message: '???????????????!',
                },
              ]}
            >
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
            </Form.Item>
          )}
          {category === 'approval' && (
            <>
              <Form.Item
                label="????????????"
                name="receivedType"
                rules={[
                  {
                    required: true,
                    message: '?????????????????????!',
                  },
                ]}
              >
                <Radio.Group onChange={approvalChange} defaultValue={approvalType}>
                  <Radio value={1}>??????</Radio>
                  <Radio value={2}>?????????</Radio>
                </Radio.Group>
              </Form.Item>
              {approvalType === 1 && (
                <Form.Item name="approvalContent" label="????????????">
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
                </Form.Item>
              )}
              {approvalType === 2 && (
                <Form.Item
                  name="clueType"
                  label="??????????????????"
                  rules={[
                    {
                      required: true,
                      message: '???????????????????????????!',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={1}>??????</Radio>
                    <Radio value={0}>???????????????</Radio>
                  </Radio.Group>
                </Form.Item>
              )}
            </>
          )}
        </Form>
        <CommitExamineModal actionRef={commitModelRef} hidePreView={hideModal} />
      </Spin>
    </Modal>
  );
};
export default connect(({ emClueManagement, loading }) => ({
  tableRef: emClueManagement.tableRef,
  loading: loading.models.emClueManagement,
}))(ProcessInfoModal);

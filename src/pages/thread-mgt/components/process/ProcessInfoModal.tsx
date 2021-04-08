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

  const showCommitExamine = () => {
    commitModelRef.current.showModal(clueData.clueId, clueData.sourceClueId);
    // commitModelRef.current.handleModal(clueData.clueId, clueData.sourceClueId);
  };
  const showTransferClue = () => {
    transferModal(clueData);
    hideModal();
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const showModal = (item: any, type: string) => {
    setClueData(item);
    setCategory(type);
    setModalVisible(true);
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
                : 'SHDF办公室',
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
    let modalTitle = '线索办结';
    switch (category) {
      case 'feedback':
        modalTitle = '线索汇总反馈';
        break;
      case 'approval':
        modalTitle = '线索办结审核';
        break;
      case 'submit':
      default:
        modalTitle = '线索办结';
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
    return new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/concludeTheMatter',
        payload: {
          clueId: clueData.clueId,
          circulationId: clueData.sourceClueId,
          processingResults: 1,
        },
        resolve,
      });
    });
    // .then(res => {
    //   handleModal();
    // });
  };
  const handleModal = () => {
    setModalVisible(false);
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
          办结
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => concludeRefModal(clueData)}
        >
          继续办理
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
              label="备注"
              rules={[
                {
                  required: true,
                  message: '请输入备注!',
                },
              ]}
            >
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
            </Form.Item>
          )}
          {category === 'approval' && (
            <>
              <Form.Item
                label="审核状态"
                name="receivedType"
                rules={[
                  {
                    required: true,
                    message: '请选择审核状态!',
                  },
                ]}
              >
                <Radio.Group onChange={approvalChange} defaultValue={approvalType}>
                  <Radio value={1}>通过</Radio>
                  <Radio value={2}>不通过</Radio>
                </Radio.Group>
              </Form.Item>
              {approvalType === 1 && (
                <Form.Item name="approvalContent" label="审核意见">
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
                </Form.Item>
              )}
              {approvalType === 2 && (
                <Form.Item
                  name="clueType"
                  label="线索办理方式"
                  rules={[
                    {
                      required: true,
                      message: '请选择线索办理方式!',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={1}>转办</Radio>
                    <Radio value={0}>退回原省份</Radio>
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

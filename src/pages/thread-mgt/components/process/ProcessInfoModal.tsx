import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Form, Input, Modal } from 'antd';
import ProcessInfo from './ProcessInfo';
import CommitExamineModal from './CommitExamineModal';

const ProcessInfoModal = ({ dispatch, actionRef }) => {
  const [form] = Form.useForm();
  const commitModelRef = useRef({});
  const [modalVisible, setModalVisible] = useState(false);
  const [clueId, setCueId] = useState(undefined);
  const [circulationId, setCirculationId] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  const showCommitExamine = () => {
    commitModelRef.current.showModal(clueId, circulationId);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const showModal = (id, cid, type) => {
    setCueId(id);
    setCirculationId(cid);
    setCategory(type);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setCueId(undefined);
    setCirculationId(undefined);
  };

  const feedbackClue = () => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: 'emClueManagement/feedbackClue',
            payload: {
              clueId,
              circulationId,
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

  const handleOk = () => {
    if (category === 'submit') {
      showCommitExamine();
    } else if (category === 'feedback') {
      feedbackClue();
      // } else if (category === 'approval') {
    }
  };

  return (
    <Modal
      title="线索办结"
      centered
      destroyOnClose
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={hideModal}
    >
      <ProcessInfo clueId={clueId} circulationId={circulationId} />
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
      </Form>
      <CommitExamineModal actionRef={commitModelRef} hidePreView={hideModal} />
    </Modal>
  );
};
export default connect(({ emClueManagement }) => ({
  tableRef: emClueManagement.tableRef,
}))(ProcessInfoModal);

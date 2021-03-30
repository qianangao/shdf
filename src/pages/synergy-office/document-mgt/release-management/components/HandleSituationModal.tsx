import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Button, Card, Col, Form, Input, List, Modal, Row, Select, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';

const HandleSituationModal = ({ dispatch, actionRef, loading, handleSituationData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [noticeId, setNoticeId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm();

  const showModal = (id: any) => {
    setModalVisible(true);
    setNoticeId(id);
  };

  const getHandleSituationList = (params: any) => {
    form.resetFields();
    setCurrentPage(1);
    if (currentPage === 1) searchData(params);
  };

  const searchData = nId => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: `documentMgt/getReadInfo`,
            payload: {
              ...values,
              pageNum: currentPage,
              pageSize: 20,
              noticeId: nId,
            },
            resolve,
          });
        });
      })
      .then(() => {})
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });
  };

  useEffect((): void => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  useEffect((): void => {
    if (noticeId !== '') searchData(noticeId);
  }, [currentPage]);

  useEffect(() => {
    if (noticeId !== '') searchData(noticeId);
  }, [noticeId]);

  const hideModal = (): void => {
    setModalVisible(false);
    form.resetFields();
    setNoticeId('');
    setCurrentPage(1);
  };

  return (
    <Modal
      title="处理情况"
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modalVisible}
      onOk={hideModal}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <Card>
            <Row justify="space-between">
              <Col span={8}>
                <Form.Item label="接受人" name="readingAccount">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} style={{ paddingLeft: 20 }}>
                <Form.Item label="处理状态" name="readingState">
                  <Select>
                    <Select.Option key={0} value={0}>
                      未处理
                    </Select.Option>

                    <Select.Option key={1} value={1}>
                      已处理
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button onClick={() => getHandleSituationList(noticeId)}>重置</Button>
                <Button
                  type="primary"
                  style={{ marginLeft: 10 }}
                  onClick={() => searchData(noticeId)}
                >
                  查询
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
        <List
          style={{ background: '#fff', padding: 20, marginTop: 10 }}
          split={false}
          dataSource={handleSituationData && handleSituationData.data}
          pagination={{
            showTotal: (total, range) => {
              return `第 ${range.slice(',')[0]}-${range.slice(',')[1]} 条/总共 ${total} 条`;
            },
            current: currentPage,
            total: handleSituationData.total,
            onChange: page => {
              setCurrentPage(page);
            },
            pageSize: 20,
          }}
          renderItem={item => (
            <List.Item key={item.readingId} style={{ flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div>{item.readingAccount}</div>
                <div>{formatDateStr(item.lastUpdateTime, 'YYYY-MM-DD HH:mm:ss')}</div>
              </div>

              {item.readingState === 1 && (
                <div
                  style={{ width: '100%', justifyContent: 'start', display: 'flex', marginTop: 15 }}
                >
                  <span style={{ marginTop: 5, whiteSpace: 'nowrap' }}>回复内容：</span>
                  <span
                    style={{
                      border: '1px solid #f2f2f2',
                      padding: '5px 20px',
                      width: '100%',
                      minHeight: 60,
                    }}
                  >
                    {item.replyContent}
                  </span>
                </div>
              )}
            </List.Item>
          )}
        />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, documentMgt }) => ({
  loading: loading.models.documentMgt,
  handleSituationData: documentMgt.handleSituationData,
}))(HandleSituationModal);

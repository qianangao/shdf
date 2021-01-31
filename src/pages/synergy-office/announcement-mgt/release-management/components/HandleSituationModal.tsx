import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Button, Card, Col, Form, Input, List, Modal, Row, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';
import InstitutionForm from './InstitutionForm';

const HandleSituationModal = ({ dispatch, actionRef, loading, soAnnouncementMgt }) => {
  const { readSituationData } = soAnnouncementMgt;
  const [form]: any = InstitutionForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [noticeId, setNoticeId] = useState('');

  const showModal = (items: any) => {
    setModalVisible(true);
    setNoticeId(items.noticeId);
  };

  const getHandleSituationList = (params: any) =>
    dispatch({
      type: 'soAnnouncementMgt/getReadInfo',
      payload: { pageNum: 1, pageSize: 20, noticeId: params },
    });

  useEffect((): void => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  useEffect(() => {
    getHandleSituationList(noticeId);
  }, [noticeId]);

  const hideModal = (): void => {
    setModalVisible(false);
    form.resetFields();
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
        <Card>
          <Row justify="space-between">
            <Col span={8}>
              <Form.Item label="接受人">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8} style={{ paddingLeft: 20 }}>
              <Form.Item label="处理状态">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8} style={{ justifyContent: 'flex-end', display: 'flex' }}>
              <Button>重置</Button>
              <Button type="primary" style={{ marginLeft: 10 }}>
                查询
              </Button>
            </Col>
          </Row>
        </Card>
        <List
          style={{ background: '#fff', padding: 20, marginTop: 10 }}
          split={false}
          dataSource={readSituationData && readSituationData.data}
          pagination={{
            showTotal: (total, range) => {
              return `第 ${range.slice(',')[0]}-${range.slice(',')[1]} 条/总共 ${total} 条`;
            },
            // onChange: page => {
            // },
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

export default connect(({ loading, soAnnouncementMgt }) => ({
  loading: loading.models.soAnnouncementMgt,
  soAnnouncementMgt,
}))(HandleSituationModal);

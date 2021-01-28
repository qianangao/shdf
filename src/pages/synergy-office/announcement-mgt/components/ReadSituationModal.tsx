import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Button, Card, Col, Form, Input, List, Modal, Row } from 'antd';
import InstitutionForm from './InstitutionForm';

const ReadSituationModal = ({ dispatch, actionRef, loading, soAnnouncementMgt }) => {
  const { getReadInfo } = soAnnouncementMgt;
  const [form]: any = InstitutionForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (items: any) => {
    setDetailData(items || null);
    setModalVisible(true);
  };

  const getAnnouncementDetail = (params: any) =>
    dispatch({
      type: 'soAnnouncementMgt/getReadInfo',
      payload: { ...params },
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
    if (getReadInfo) form.setFieldsValue({ ...getReadInfo });
  }, [getReadInfo]);

  useEffect(() => {
    if (detailData) getAnnouncementDetail(detailData.noticeId);
  }, [detailData]);

  const hideModal = (): void => {
    setModalVisible(false);
    form.resetFields();
    setDetailData(null);
  };

  const handleOk = (): void => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: `soAnnouncementMgt/${detailData ? 'updateAnnouncement' : 'addAnnouncement'}`,
            payload: {
              ...values,
              includeFile: 0,
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
      title={detailData ? '编辑公告' : '新建公告'}
      centered
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
      <Form name="info" layout="horizontal" form={form}>
        <Card>
          <Row justify="space-between">
            <Col span={8}>
              <Form.Item label="接受人" name="user">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8} style={{ paddingLeft: 20 }}>
              <Form.Item label="处理状态" name="status">
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
          dataSource={[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
          ]}
          pagination={{
            showTotal: (total, range) => {
              return `第 ${range.slice(',')[0]}-${range.slice(',')[1]} 条/总共 ${total} 条`;
            },
            // onChange: page => {
            // },
            pageSize: 20,
          }}
          renderItem={item => (
            <List.Item key={item} style={{ flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div>全国SHDF办宣传处王武已处理该公告</div>
                <div>2020-12-20 10:10:10</div>
              </div>

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
                  收到XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                </span>
              </div>
            </List.Item>
          )}
        />
      </Form>
    </Modal>
  );
};

export default connect(({ loading, soAnnouncementMgt }) => ({
  loading: loading.models.soAnnouncementMgt,
  soAnnouncementMgt,
}))(ReadSituationModal);

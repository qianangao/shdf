import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';
import DetailInfoForm from './DetailInfoForm';

const ModifyModal = ({ dispatch, actionRef, loading, soAnnouncementMgt }) => {
  const { announcementData } = soAnnouncementMgt;
  const [form]: any = DetailInfoForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [type, setType] = useState('publish');
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (items: any, t: any) => {
    setType(t);
    setDetailData(items);
    setModalVisible(true);
  };

  const getAnnouncementDetail = (params: any): any =>
    dispatch({
      type: 'soAnnouncementMgt/getAnnouncementDetail',
      payload: { noticeId: params },
    });

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const areas = [];
  useEffect(() => {
    if (announcementData) {
      // const range = announcementData.visibleRange === undefined ? [] : JSON.parse(announcementData.visibleRange);
      // console.log('range',range)
      // range.map((item: { realName: string; }) => {
      //   areas.push(item.realName);
      // });
      // announcementData.visibleRange = areas;
      form.setFieldsValue({ ...announcementData });
    }
  }, [announcementData]);

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
            type: `soAnnouncementMgt/auditAnnouncement`,
            payload: {
              ...values,
              noticeId: detailData.noticeId,
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

  const createItem = () => {
    if (type === 'publish') {
      const status = detailData && detailData.noticeStatus;
      switch (status) {
        case -3:
          return [
            <Descriptions.Item label="审核人">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="审核时间">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="发布人">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="发布时间">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="撤回人">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="撤回时间">{announcementData.secrecyLevel}</Descriptions.Item>,
          ];
        case -1:
        case 3:
          return [
            <Descriptions.Item label="审核人">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="审核时间">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="审核状态">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="审核意见" span={3}>
              {announcementData.secrecyLevel}
            </Descriptions.Item>,
          ];
        case 7:
          return [
            <Descriptions.Item label="审核人">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="审核时间">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="发布人">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="发布时间">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="关闭人">{announcementData.secrecyLevel}</Descriptions.Item>,

            <Descriptions.Item label="关闭时间">{announcementData.secrecyLevel}</Descriptions.Item>,
          ];
        default:
          return [];
      }
    }
    return [];
  };

  return (
    <Modal
      title="查看公告"
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
      <Spin spinning={loading}>
        <Descriptions title="基本信息" column={{ xxl: 4, xl: 3, lg: 2 }}>
          <Descriptions.Item label="公告标题" span={3}>
            {announcementData.noticeTitle}
          </Descriptions.Item>
          <Descriptions.Item label="公告创建时间">
            {formatDateStr(announcementData.createTime, 'YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="保密等级">{announcementData.secrecyLevel}</Descriptions.Item>
          <Descriptions.Item label="发布单位" span={1}>
            {announcementData.publishDept}
          </Descriptions.Item>
          <Descriptions.Item label="公告可见范围" span={3}>
            {areas}
          </Descriptions.Item>
          <Descriptions.Item label="公告内容" span={3}>
            <div
              dangerouslySetInnerHTML={{
                __html: announcementData.noticeContent,
              }}
            />
          </Descriptions.Item>
          {/* <Descriptions.Item label="附件列表" span={3}>{announcementData.f}</Descriptions.Item> */}

          {createItem()}
        </Descriptions>
        {type === 'publish' && detailData && detailData.noticeStatus === 7 && (
          <Descriptions title="公告处理信息" column={{ xxl: 4, xl: 3, lg: 2 }}>
            <Descriptions.Item label="保密等级">{announcementData.secrecyLevel}</Descriptions.Item>
          </Descriptions>
        )}
        {type === 'examine' && (
          <>
            <Descriptions title="公告审核信息" />
            <DetailInfoForm form={form} />
          </>
        )}
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, soAnnouncementMgt }) => ({
  loading: loading.models.soAnnouncementMgt,
  soAnnouncementMgt,
}))(ModifyModal);

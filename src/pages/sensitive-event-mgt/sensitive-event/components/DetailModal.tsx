import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';
import TableFileCase from './TableFileCase';
import TableCaseHandle from './TableCaseHandle';
import ClubSplicing from './ClubSplicing';

const CaresDetailModal = ({ dispatch, sensitiveMgt, caseMgt, actionRef, enums }) => {
  const [detailModalVisible, setModalVisible] = useState(false);
  const { detailData } = sensitiveMgt;
  const { specialList } = caseMgt;
  const [infoId, setCaresId] = useState('');

  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'sensitiveMgt/getDetail',
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
    setModalVisible(true);
    setCaresId(items.eventId);
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
    dispatch({
      type: 'sensitiveMgt/save',
      payload: {
        detailData: {},
      },
    });
  };

  const fileList = files => {
    if (files && files.length > 0) {
      const views = files.map(item => {
        return (
          <a href={item.url} style={{ display: 'block' }}>
            {item.name}
          </a>
        );
      });

      return (
        <Descriptions.Item label="附件列表" span={3}>
          <div style={{ marginBottom: 20 }}>{views}</div>
        </Descriptions.Item>
      );
    }
    return <div style={{ marginBottom: 20 }} />;
  };

  // @ts-ignore
  return (
    <Modal
      title="敏感事件详情"
      centered
      width="900vw"
      style={{ paddingBottom: 0 }}
      visible={detailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          确认
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={3}>
        <Descriptions.Item label="报送单位">{detailData.reportUnit}</Descriptions.Item>
        <Descriptions.Item label="报送时间">{detailData.reportTime}</Descriptions.Item>
        <Descriptions.Item label="敏感事件名称">{detailData.eventName}</Descriptions.Item>
        <Descriptions.Item label="敏感事件编号">{detailData.eventCode}</Descriptions.Item>
        <Descriptions.Item label="线索来源">
          {enums.case_source && enums.case_source[detailData.eventSource]}
        </Descriptions.Item>
        <Descriptions.Item label="办理部门">{detailData.investigateDept}</Descriptions.Item>
        <Descriptions.Item label="重要程度">
          {enums.importance_level && enums.importance_level[detailData.importantDegree]}
        </Descriptions.Item>
        <Descriptions.Item label="保密等级">
          {enums.object_secrecy_level && enums.object_secrecy_level[detailData.secrecyLevel]}
        </Descriptions.Item>
        <Descriptions.Item label="立案时间">{detailData.caseTime}</Descriptions.Item>
        <Descriptions.Item label="紧急程度">
          {enums.urgent_level && enums.urgent_level[detailData.urgencyDegree]}
        </Descriptions.Item>
        <Descriptions.Item label="事件类型">
          {enums.case_type && enums.case_type[detailData.eventType]}
        </Descriptions.Item>
        <Descriptions.Item label="事件性质">
          {enums.case_nature && enums.case_nature[detailData.eventNature]}
        </Descriptions.Item>
        <Descriptions.Item label="专项行动">
          {detailData.specialActionIds &&
            detailData.specialActionIds.map(id => {
              return `${specialList[id]} `;
            })}
        </Descriptions.Item>
        <Descriptions.Item label="传播渠道">
          {detailData.spreadWay &&
            enums.spread_channel &&
            detailData.spreadWay.map(id => {
              return `${enums.spread_channel[id]} `;
            })}
        </Descriptions.Item>
        <Descriptions.Item label="传播形式">
          {enums.spread_form && enums.spread_form[detailData.spreadForm]}
        </Descriptions.Item>
        <Descriptions.Item label="涉案平台类型">
          {enums.involved_platform_type &&
            detailData.platformType &&
            detailData.platformType.map(id => {
              return `${enums.involved_platform_type[id]} `;
            })}
        </Descriptions.Item>
        <Descriptions.Item label="涉案数量">{detailData.caseNumber}</Descriptions.Item>
        <Descriptions.Item label="涉案金额">{detailData.caseMoney}</Descriptions.Item>
        {detailData.eventType === 1 ? null : (
          <>
            <Descriptions.Item label="罪名">
              {enums.charge &&
                detailData.charge &&
                detailData.charge.map(id => {
                  return `${enums.charge[id]} `;
                })}
            </Descriptions.Item>
            <Descriptions.Item label="抓获人数">{detailData.capturePersonNum}</Descriptions.Item>
            <Descriptions.Item label="刑事拘留人数">{detailData.detainPersonNum}</Descriptions.Item>
            <Descriptions.Item label="逮捕人数">{detailData.arrestPersonNum}</Descriptions.Item>
            <Descriptions.Item label="判处被告人数量">
              {detailData.defendantPersonNum}
            </Descriptions.Item>
            <Descriptions.Item label="判处被告单位数量">
              {detailData.defendantUnitNum}
            </Descriptions.Item>
            <Descriptions.Item label="最高刑期">{detailData.highestPrisonTerm}</Descriptions.Item>
          </>
        )}
        <Descriptions.Item label="发生地域">{detailData.region}</Descriptions.Item>
      </Descriptions>
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="简要案情" style={{ whiteSpace: 'pre-wrap' }}>
          {detailData.briefCase}
        </Descriptions.Item>

        {detailData.eventType === 1 ? (
          <Descriptions.Item label="具体判决结果" style={{ whiteSpace: 'pre-wrap' }}>
            {detailData.punishResult}
          </Descriptions.Item>
        ) : (
          <Descriptions.Item label="具体判决结果" style={{ whiteSpace: 'pre-wrap' }}>
            {detailData.convictionsResult}
          </Descriptions.Item>
        )}
        {fileList(detailData.fileList)}
      </Descriptions>
      <ClubSplicing id={infoId} isDetail={1} />

      <TableCaseHandle id={infoId} isDetail={1} />

      <TableFileCase id={infoId} />
    </Modal>
  );
};

export default connect(({ sensitiveMgt, caseMgt, loading, global }) => ({
  sensitiveMgt,
  caseMgt,
  loading: loading.models.sensitiveMgt,
  enums: global.enums,
}))(CaresDetailModal);

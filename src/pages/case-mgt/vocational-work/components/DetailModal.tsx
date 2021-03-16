import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';
import TableFileCase from './TableFileCase';
import TableCaseHandle from './TableCaseHandle';
import ClubSplicing from './ClubSplicing';

const CaresDetailModal = ({ dispatch, caseMgt, actionRef, enums }) => {
  const [detailModalVisible, setModalVisible] = useState(false);
  const { caseDetailData } = caseMgt;
  const [infoId, setCaresId] = useState('');
  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'caseMgt/getDetail',
      payload: {
        id: items.caseId,
      },
    });
    dispatch({
      type: 'caseMgt/getCaseHandleFile',
      payload: {
        id: items.caseId,
      },
    });
    setModalVisible(true);
    setCaresId(items.caseId);
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
      type: 'caseMgt/save',
      payload: {
        caseDetailData: {},
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

  return (
    <Modal
      title="案件详情"
      centered
      width="900vw"
      style={{ paddingBottom: 0 }}
      visible={detailModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[
        <Button type="primary" onClick={hideModal}>
          返回
        </Button>,
      ]}
    >
      <Descriptions size="middle" column={3}>
        <Descriptions.Item label="报送单位">{caseDetailData.reportCompany}</Descriptions.Item>
        <Descriptions.Item label="报送时间">{caseDetailData.reportTime}</Descriptions.Item>
        <Descriptions.Item label="案件名称">{caseDetailData.caseName}</Descriptions.Item>
        <Descriptions.Item label="案件编号">{caseDetailData.caseCode}</Descriptions.Item>
        <Descriptions.Item label="线索来源">
          {enums.case_source && enums.case_source[caseDetailData.caseSource]}
        </Descriptions.Item>
        <Descriptions.Item label="办理部门">
          {caseDetailData.investigationDepartment}
        </Descriptions.Item>
        <Descriptions.Item label="重要程度">
          {enums.importance_level && enums.importance_level[caseDetailData.importanceLevel]}
        </Descriptions.Item>
        <Descriptions.Item label="保密等级">
          {enums.subject_secrecy_level && enums.subject_secrecy_level[caseDetailData.secrecyLevel]}
        </Descriptions.Item>
        <Descriptions.Item label="立案时间">{caseDetailData.registerTime}</Descriptions.Item>
        <Descriptions.Item label="紧急程度">
          {enums.urgent_level && enums.urgent_level[caseDetailData.urgentLevel]}
        </Descriptions.Item>
        <Descriptions.Item label="案件类型">
          {enums.case_type && enums.case_type[caseDetailData.caseType]}
        </Descriptions.Item>
        <Descriptions.Item label="案件性质">
          {enums.case_nature && enums.case_nature[caseDetailData.caseNature]}
        </Descriptions.Item>
        <Descriptions.Item label="专项行动">
          {enums.handle_type && enums.handle_type[caseDetailData.specialActionId]}
        </Descriptions.Item>
        <Descriptions.Item label="传播渠道">
          {enums.spread_channel && enums.spread_channel[caseDetailData.spreadChannel]}
        </Descriptions.Item>
        <Descriptions.Item label="传播形式">
          {enums.spread_form && enums.spread_form[caseDetailData.spreadForm]}
        </Descriptions.Item>
        <Descriptions.Item label="涉案平台类型">
          {enums.involved_platform_type &&
            enums.involved_platform_type[caseDetailData.involvedPlatformType]}
        </Descriptions.Item>
        <Descriptions.Item label="涉案数量">{caseDetailData.caseNumber}</Descriptions.Item>
        <Descriptions.Item label="涉案金额">{caseDetailData.caseAmount}</Descriptions.Item>
        {caseDetailData.caseType !== 1 ? null : (
          <>
            <Descriptions.Item label="罪名">
              {enums.charge && enums.charge[caseDetailData.charge]}
            </Descriptions.Item>
            <Descriptions.Item label="刑事拘留人数">
              {caseDetailData.detentionNumber}
            </Descriptions.Item>
            <Descriptions.Item label="抓获人数">{caseDetailData.captureNumber}</Descriptions.Item>
            <Descriptions.Item label="判处被告人数量">
              {caseDetailData.defendantNumber}
            </Descriptions.Item>
            <Descriptions.Item label="逮捕人数">{caseDetailData.arrestNumber}</Descriptions.Item>
            <Descriptions.Item label="最高刑期">{caseDetailData.maximumSentence}</Descriptions.Item>
            <Descriptions.Item label="判处被告单位数量">
              {caseDetailData.defendantCompanyNumber}
            </Descriptions.Item>
          </>
        )}
        <Descriptions.Item label="案件地域">{caseDetailData.region}</Descriptions.Item>
      </Descriptions>

      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="案件简要">{caseDetailData.brieflyCase}</Descriptions.Item>
        {caseDetailData.caseType === 1 ? (
          <Descriptions.Item label="行政处理结果">{caseDetailData.punishResult}</Descriptions.Item>
        ) : (
          <Descriptions.Item label="案件办理结果">
            {caseDetailData.sentenceResult}
          </Descriptions.Item>
        )}
        {fileList(caseDetailData.fileList)}
      </Descriptions>
      <ClubSplicing id={infoId} isDetail={1} />

      <TableCaseHandle id={infoId} isDetail={1} />
      <TableFileCase id={infoId} />
    </Modal>
  );
};

export default connect(({ caseMgt, loading, global }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
  enums: global.enums,
}))(CaresDetailModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Descriptions } from 'antd';

const CaresDetailModal = ({ dispatch, caseMgt, actionRef }) => {
  const [detailModalVisible, setModalVisible] = useState(false);
  const { caseDetailData } = caseMgt;

  const showModal = items => {
    // 获取详情
    dispatch({
      type: 'caseMgt/getDetail',
      payload: {
        id: items.caseId,
      },
    });
    setModalVisible(true);
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

  return (
    <Modal
      title="收文详情"
      centered
      width="900px"
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
        <Descriptions.Item label="案件名称">{caseDetailData.caseName}</Descriptions.Item>
        <Descriptions.Item label="罪名">{caseDetailData.charge}</Descriptions.Item>
        <Descriptions.Item label="案件简要">{caseDetailData.brieflyCase}</Descriptions.Item>
        <Descriptions.Item label="案件编号">{caseDetailData.caseCode}</Descriptions.Item>
        <Descriptions.Item label="案件性质">{caseDetailData.caseNature}</Descriptions.Item>
        <Descriptions.Item label="案件来源">{caseDetailData.caseSource}</Descriptions.Item>
        <Descriptions.Item label="重要程度">{caseDetailData.importanceLevel}</Descriptions.Item>
        <Descriptions.Item label="保密等级">{caseDetailData.secrecyLevel}</Descriptions.Item>
        <Descriptions.Item label="立案日期">{caseDetailData.registerTime}</Descriptions.Item>
        <Descriptions.Item label="紧急程度">{caseDetailData.urgentLevel}</Descriptions.Item>
        <Descriptions.Item label="抓获人数">{caseDetailData.captureNumber}</Descriptions.Item>
        <Descriptions.Item label="刑事拘留人数">{caseDetailData.detentionNumber}</Descriptions.Item>
        <Descriptions.Item label="逮捕人数">{caseDetailData.arrestNumber}</Descriptions.Item>
        <Descriptions.Item label="判处被告人数量">
          {caseDetailData.defendantNumber}
        </Descriptions.Item>
        <Descriptions.Item label="传播载体形式">{caseDetailData.spreadForm}</Descriptions.Item>
        <Descriptions.Item label="所属联防工程">{caseDetailData.projectId}</Descriptions.Item>
        <Descriptions.Item label="平台类型">
          {caseDetailData.involvedPlatformType}
        </Descriptions.Item>
        <Descriptions.Item label="是否网络案件">{caseDetailData.isNetworkCase}</Descriptions.Item>
        <Descriptions.Item label="专项行动">{caseDetailData.specialActionId}</Descriptions.Item>
        <Descriptions.Item label="案件查处部门">
          {caseDetailData.investigationDepartment}
        </Descriptions.Item>
        <Descriptions.Item label="涉案数量">{caseDetailData.caseNumber}</Descriptions.Item>
        <Descriptions.Item label="涉案金额">{caseDetailData.caseAmount}</Descriptions.Item>
        <Descriptions.Item label="案件办理阶段">{caseDetailData.caseType}</Descriptions.Item>
        <Descriptions.Item label="发案公司">{caseDetailData.reportCompany}</Descriptions.Item>
        <Descriptions.Item label="发案时间">{caseDetailData.reportTime}</Descriptions.Item>
        <Descriptions.Item label="案件地域">{caseDetailData.region}</Descriptions.Item>
      </Descriptions>
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="案情描述">{caseDetailData.completeCase}</Descriptions.Item>
        <Descriptions.Item label="行政处理结果">{caseDetailData.punishResult}</Descriptions.Item>
        <Descriptions.Item label="案件办理结果">{caseDetailData.sentenceResult}</Descriptions.Item>
        {/* <Descriptions.Item label="附   件">{caseDetailData.fileList}</Descriptions.Item> */}
      </Descriptions>
    </Modal>
  );
};

export default connect(({ caseMgt, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
}))(CaresDetailModal);

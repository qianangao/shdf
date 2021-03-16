import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';
import ProTable from '@ant-design/pro-table';
import ProcessInfo from '../process/ProcessInfo';

const DetailModal = ({
  dispatch,
  actionRef,
  loading,
  clueDetailData,
  enums,
  cueAssociationList,
}) => {
  const [clueId, setClueId] = useState(undefined);
  const [circulationId, setCirculationId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any, sourceClueId: any) => {
    setClueId(id);
    setCirculationId(sourceClueId);
    setModalVisible(true);
    dispatch({
      type: 'emClueManagement/getClueDetail',
      payload: { clueId: id },
    });
    dispatch({
      type: 'emClueManagement/getCueAssociation',
      payload: { clueId: id },
    });
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = (): void => {
    setClueId(undefined);
    setCirculationId(undefined);
    dispatch({
      type: 'emClueManagement/removeProcessDetail',
    });
    dispatch({
      type: 'emClueManagement/removeClueDetail',
    });
    dispatch({
      type: 'emClueManagement/removeClueAssociation',
    });

    setModalVisible(false);
  };

  const handleOk = (): void => {
    hideModal();
  };

  const fileList = (files: any[]) => {
    if (files && files.length > 0) {
      const views = files.map(item => {
        return (
          <div style={{ display: 'block', whiteSpace: 'nowrap', width: '100%' }}>
            {' '}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', width: '70%', paddingBottom: 5 }}
            >
              {item.fileName}
            </a>
            <div style={{ width: '30%', display: 'inline-block', textAlign: 'center' }}>
              {formatDateStr(item.createTime, 'YYYY年MM月DD日 HH:mm')}
            </div>
          </div>
        );
      });

      return (
        <Descriptions.Item label="附件列表">
          <div style={{ marginBottom: 20 }}>{views}</div>
        </Descriptions.Item>
      );
    }
    return <div style={{ marginBottom: 20 }} />;
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    {
      title: '线索编号',
      dataIndex: 'clueNumber',
      align: 'center',
      width: 140,
      hideInSearch: true,
    },

    {
      title: '线索名称',
      align: 'center',
      dataIndex: 'clueName',
    },
    {
      title: '线索类型',
      align: 'center',
      dataIndex: 'clueType',
      hideInSearch: true,
      valueEnum: enums.clue_type,
    },
    {
      title: '被举报人/机构/公司',
      align: 'center',
      dataIndex: 'reportedObjectName',
      hideInSearch: true,
    },
    {
      title: '发生地域',
      align: 'center',
      dataIndex: 'region',
      hideInSearch: true,
    },
  ];

  return (
    <Modal
      title="查看线索"
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
      destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Spin spinning={loading}>
        <Descriptions
          title="基本信息"
          column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          style={{ marginBottom: 30 }}
        >
          <Descriptions.Item label="线索名称">{clueDetailData.clueName}</Descriptions.Item>
          <Descriptions.Item label="线索类型">
            {enums.clue_type && enums.clue_type[clueDetailData.clueType]}
          </Descriptions.Item>
          <Descriptions.Item label="线索编号">{clueDetailData.clueNumber}</Descriptions.Item>
          <Descriptions.Item label="线索来源">
            {enums.clue_source && enums.clue_source[clueDetailData.clueSource]}
          </Descriptions.Item>
          <Descriptions.Item label="重要程度">
            {enums.clue_importance && enums.clue_importance[clueDetailData.importance]}
          </Descriptions.Item>
          <Descriptions.Item label="保密等级">
            {enums.object_secrecy_level && enums.object_secrecy_level[clueDetailData.secrecyLevel]}
          </Descriptions.Item>
          <Descriptions.Item label="紧急程度">
            {enums.urgent_level && enums.urgent_level[clueDetailData.urgency]}
          </Descriptions.Item>
          <Descriptions.Item label="接报日期">
            {formatDateStr(clueDetailData.receivingTime, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="发生地域">{clueDetailData.region}</Descriptions.Item>
          <Descriptions.Item label="相关出版物">
            {clueDetailData.relatedPublications}
          </Descriptions.Item>
          <Descriptions.Item label="线索描述" span={3}>
            {clueDetailData.clueRemarks}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          title="举报信息"
          column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          style={{ marginBottom: 30 }}
        >
          <Descriptions.Item label="举报人姓名">{clueDetailData.reportName}</Descriptions.Item>
          <Descriptions.Item label="举报人性别">
            {enums.dict_sex && enums.dict_sex[clueDetailData.reportSex]}
          </Descriptions.Item>
          <Descriptions.Item label="举报人地址">{clueDetailData.reportAddress}</Descriptions.Item>
          <Descriptions.Item label="举报人邮箱">{clueDetailData.reportMailbox}</Descriptions.Item>
          <Descriptions.Item label="举报人电话">{clueDetailData.reportPhone}</Descriptions.Item>
          <Descriptions.Item label="举报人邮编">{clueDetailData.reportPostcode}</Descriptions.Item>
          <Descriptions.Item label="被举报对象名字">
            {clueDetailData.reportedObjectName}
          </Descriptions.Item>
          <Descriptions.Item label="被举报对象类型">
            {enums.clue_reported_object_type &&
              enums.clue_reported_object_type[clueDetailData.reportedObjectType]}
          </Descriptions.Item>
          <Descriptions.Item label="举报对象电话">
            {clueDetailData.reportedObjectPhone}
          </Descriptions.Item>
          <Descriptions.Item label="被举报对象地址">
            {clueDetailData.reportedObjectAddress}
          </Descriptions.Item>
          <Descriptions.Item label="举报内容" span={3}>
            {clueDetailData.reportContent}
          </Descriptions.Item>
          <Descriptions.Item label="是否公开" span={3}>
            {clueDetailData.open === 0 ? '否' : '是'}
          </Descriptions.Item>
          {fileList(clueDetailData.fileList)}
        </Descriptions>

        {cueAssociationList && cueAssociationList.length > 0 && (
          <>
            <Descriptions title="线索串并信息" />
            <ProTable
              search={false}
              toolBarRender={false}
              pagination={false}
              rowKey="clueId"
              scroll={{ x: 'max-content' }}
              dataSource={cueAssociationList}
              columns={columns}
              style={{ marginBottom: 30 }}
            />
          </>
        )}

        <ProcessInfo clueId={clueId} circulationId={circulationId} title="线索办理反馈信息" />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, emClueManagement, global }) => ({
  loading: loading.models.emClueManagement,
  clueDetailData: emClueManagement.clueDetailData,
  cueAssociationList: emClueManagement.cueAssociationList,
  enums: global.enums,
}))(DetailModal);

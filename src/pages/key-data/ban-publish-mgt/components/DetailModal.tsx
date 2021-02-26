import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';

const DetailModal = ({ dispatch, actionRef, loading, banPublishDetail, enums }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setModalVisible(true);
    dispatch({
      type: 'kdBanPublishMgt/getBanPublishDetail',
      payload: { publicationId: id },
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
    dispatch({
      type: 'kdBanPublishMgt/removeBanPublish',
    });
    setModalVisible(false);
  };

  const handleOk = (): void => {
    hideModal();
  };

  const fileList = (files: { url: string | undefined; fileName: React.ReactNode }[]) => {
    if (files && files.length > 0) {
      const views = files.map((item: { url: string | undefined; fileName: React.ReactNode }) => {
        return (
          <a href={item.url} style={{ display: 'block' }}>
            {item.fileName}
          </a>
        );
      });

      return (
        <Descriptions.Item label="相关附件">
          <div style={{ marginBottom: 20 }}>{views}</div>
        </Descriptions.Item>
      );
    }
    return <div style={{ marginBottom: 20 }} />;
  };

  return (
    <Modal
      title="非法出版物详情"
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
        <Descriptions title="基本信息" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item label="中文名称">{banPublishDetail.name}</Descriptions.Item>
          <Descriptions.Item label="英文名称">{banPublishDetail.nameEnglish}</Descriptions.Item>
          <Descriptions.Item label="作者及编著者">{banPublishDetail.author}</Descriptions.Item>
          <Descriptions.Item label="出版机构">{banPublishDetail.organization}</Descriptions.Item>
          <Descriptions.Item label="发行商">{banPublishDetail.publisher}</Descriptions.Item>
          <Descriptions.Item label="书刊号">{banPublishDetail.isbnIssn}</Descriptions.Item>
          <Descriptions.Item label="定价">{banPublishDetail.price}</Descriptions.Item>
          <Descriptions.Item label="出版日期">
            {formatDateStr(banPublishDetail.publicationDate, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="类别">
            {enums.blood && enums.blood[banPublishDetail.category]}
          </Descriptions.Item>
          <Descriptions.Item label="关键词">{banPublishDetail.keyword}</Descriptions.Item>
          <Descriptions.Item label="保密等级">
            {enums.subject_secrecy_level &&
              enums.subject_secrecy_level[banPublishDetail.secrecyLevel]}
          </Descriptions.Item>
          <Descriptions.Item label="所属联防工程">{banPublishDetail.actionId}</Descriptions.Item>
          <Descriptions.Item label="简介说明" span={3}>
            {banPublishDetail.description}
          </Descriptions.Item>
          <Descriptions.Item label="备注说明" span={3}>
            {banPublishDetail.remarks}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="鉴定结果" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
          <Descriptions.Item label="鉴定机构">
            {banPublishDetail.appraisalInstitution}
          </Descriptions.Item>
          <Descriptions.Item label="鉴定类型">
            {enums.political && enums.political[banPublishDetail.appraisalType]}
          </Descriptions.Item>
          <Descriptions.Item label="鉴定日期">
            {formatDateStr(banPublishDetail.appraisalDate, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="鉴定结论">
            {banPublishDetail.appraisalConclusion}
          </Descriptions.Item>
          <Descriptions.Item label="特征描述">
            {banPublishDetail.featureDescription}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="相关资料" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          {fileList(banPublishDetail.fileInfoList)}
          <Descriptions.Item label="相关视频">{banPublishDetail.videos}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, kdBanPublishMgt, global }) => ({
  loading: loading.models.kdBanPublishMgt,
  banPublishDetail: kdBanPublishMgt.banPublishDetail,
  enums: global.enums,
}))(DetailModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';

const DetailModal = ({ dispatch, actionRef, loading, institutionData, enums }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setModalVisible(true);
    dispatch({
      type: 'kdKeyInstitutionsMgt/getKeyInstitutionsDetail',
      payload: { orgId: id },
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
      type: 'kdKeyInstitutionsMgt/removeInstitution',
    });
    setModalVisible(false);
  };

  const handleOk = (): void => {
    hideModal();
  };

  return (
    <Modal
      title="重点机构详情"
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
          <Descriptions.Item label="中文名称">{institutionData.orgName}</Descriptions.Item>
          <Descriptions.Item label="英文名称">{institutionData.orgNameEn}</Descriptions.Item>
          <Descriptions.Item label="机构类别">{institutionData.category}</Descriptions.Item>
          <Descriptions.Item label="所在地区">
            {enums.dict_sex && enums.dict_sex[institutionData.area]}
          </Descriptions.Item>
          <Descriptions.Item label="中文地址">{institutionData.address}</Descriptions.Item>
          <Descriptions.Item label="英文地址">{institutionData.addressEn}</Descriptions.Item>
          <Descriptions.Item label="机构代码">{institutionData.code}</Descriptions.Item>
          <Descriptions.Item label="联系人员">{institutionData.contacts}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{institutionData.phone}</Descriptions.Item>
          <Descriptions.Item label="传真号码">{institutionData.fax}</Descriptions.Item>
          <Descriptions.Item label="电子邮件">{institutionData.email}</Descriptions.Item>
          <Descriptions.Item label="网站地址">{institutionData.website}</Descriptions.Item>
          <Descriptions.Item label="法定代表">{institutionData.legalPerson}</Descriptions.Item>
          <Descriptions.Item label="管理人员">{institutionData.management}</Descriptions.Item>
          <Descriptions.Item label="成立时间">
            {formatDateStr(institutionData.establishDate, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="简介说明" span={3}>
            {institutionData.description}
          </Descriptions.Item>
          <Descriptions.Item label="备注说明" span={3}>
            {institutionData.remarks}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, kdKeyInstitutionsMgt, global }) => ({
  loading: loading.models.kdKeyInstitutionsMgt,
  institutionData: kdKeyInstitutionsMgt.institutionData,
  enums: global.enums,
}))(DetailModal);

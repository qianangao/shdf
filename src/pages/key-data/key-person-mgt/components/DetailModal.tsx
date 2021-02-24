import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';

const DetailModal = ({ dispatch, actionRef, loading, personDetailData, enums }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setModalVisible(true);
    dispatch({
      type: 'kdKeyPersonMgt/getKeyPersonDetail',
      payload: { personId: id },
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
      type: 'kdKeyPersonMgt/removePersonDetail',
    });
    setModalVisible(false);
  };

  const handleOk = (): void => {
    hideModal();
  };

  return (
    <Modal
      title="重点人物详情"
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
          <Descriptions.Item label="星级">{personDetailData.starLevel}</Descriptions.Item>
          <Descriptions.Item label="中文姓名">{personDetailData.personName}</Descriptions.Item>
          <Descriptions.Item label="英文姓名">{personDetailData.personNameEn}</Descriptions.Item>
          <Descriptions.Item label="外号">{personDetailData.nickname}</Descriptions.Item>
          <Descriptions.Item label="性别">
            {enums.dict_sex && enums.dict_sex[personDetailData.sex]}
          </Descriptions.Item>
          <Descriptions.Item label="生日">
            {formatDateStr(personDetailData.birthday, 'YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="年龄">{personDetailData.age}</Descriptions.Item>
          <Descriptions.Item label="身高">{personDetailData.height} CM</Descriptions.Item>
          <Descriptions.Item label="体重">{personDetailData.weight} KG</Descriptions.Item>
          <Descriptions.Item label="血型">
            {enums.blood && enums.blood[personDetailData.blood]}
          </Descriptions.Item>
          <Descriptions.Item label="民族">
            {enums.nation && enums.nation[personDetailData.nation]}
          </Descriptions.Item>
          <Descriptions.Item label="国籍">
            {enums.nationality && enums.nationality[personDetailData.nationality]}
          </Descriptions.Item>
          <Descriptions.Item label="出生地">{personDetailData.birthplace}</Descriptions.Item>
          <Descriptions.Item label="证件号码">{personDetailData.idCard}</Descriptions.Item>
          <Descriptions.Item label="婚姻状况">
            {enums.marital && enums.marital[personDetailData.marital]}
          </Descriptions.Item>
          <Descriptions.Item label="文化程度">
            {enums.education && enums.education[personDetailData.education]}
          </Descriptions.Item>
          <Descriptions.Item label="政治面貌">
            {enums.political && enums.political[personDetailData.political]}
          </Descriptions.Item>
          <Descriptions.Item label="宗教信仰">{personDetailData.religion}</Descriptions.Item>
          <Descriptions.Item label="团体组织">{personDetailData.organization}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{personDetailData.telephone}</Descriptions.Item>
          <Descriptions.Item label="联系邮箱">{personDetailData.email}</Descriptions.Item>
          <Descriptions.Item label="联系地址" span={2}>
            {personDetailData.address}
          </Descriptions.Item>
          <Descriptions.Item label="工作单位">{personDetailData.workPlace}</Descriptions.Item>
          <Descriptions.Item label="工作部门">{personDetailData.workDepartment}</Descriptions.Item>
          <Descriptions.Item label="工作职务">{personDetailData.workJob}</Descriptions.Item>
          <Descriptions.Item label="家庭成员" span={3}>
            {personDetailData.familyMember}
          </Descriptions.Item>
          <Descriptions.Item label="社会背景" span={3}>
            {personDetailData.social}
          </Descriptions.Item>
          <Descriptions.Item label="教育经历" span={3}>
            {personDetailData.educational}
          </Descriptions.Item>
          <Descriptions.Item label="性质属性" span={3}>
            {personDetailData.attribute}
          </Descriptions.Item>
          <Descriptions.Item label="备注说明" span={3}>
            {personDetailData.remarks}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, kdKeyPersonMgt, global }) => ({
  loading: loading.models.kdKeyPersonMgt,
  personDetailData: kdKeyPersonMgt.personDetailData,
  enums: global.enums,
}))(DetailModal);

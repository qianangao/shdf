import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
import { formatDateStr } from '@/utils/format';

const DetailModal = ({ dispatch, actionRef, loading, OrgListDetailData }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setModalVisible(true);
    dispatch({
      type: 'guanli/getOrgListDetail',
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
      type: 'guanli/removePersonDetail',
    });
    setModalVisible(false);
  };

  const handleOk = (): void => {
    hideModal();
  };

  return (
    <Modal
      title="组织管理详情"
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
          <Descriptions.Item label="组织Id">{OrgListDetailData.orgId}</Descriptions.Item>
          <Descriptions.Item label="上级机构">{OrgListDetailData.orgPid}</Descriptions.Item>
          <Descriptions.Item label="机构名称">{OrgListDetailData.orgName}</Descriptions.Item>
          <Descriptions.Item label="机构代号">{OrgListDetailData.orgCode}</Descriptions.Item>
          <Descriptions.Item label="机构类型">{OrgListDetailData.orgKind}</Descriptions.Item>
          <Descriptions.Item label="机构性质">{OrgListDetailData.orgNature}</Descriptions.Item>
          <Descriptions.Item label="机构简称">{OrgListDetailData.orgSimpleName}</Descriptions.Item>
          <Descriptions.Item label="主管人员">{OrgListDetailData.chargePerson}</Descriptions.Item>
          <Descriptions.Item label="职能描述">{OrgListDetailData.functionDesc}</Descriptions.Item>
          <Descriptions.Item label="机构分类">{OrgListDetailData.orgType}</Descriptions.Item>
          <Descriptions.Item label="机构指令">{OrgListDetailData.orgOrder}</Descriptions.Item>
          <Descriptions.Item label="创建人">{OrgListDetailData.createUser}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{OrgListDetailData.createTime}</Descriptions.Item>
          <Descriptions.Item label="最近一次操作人">
            {OrgListDetailData.lastUpdateUser}
          </Descriptions.Item>
          <Descriptions.Item label="最近一次操作时间">
            {formatDateStr(OrgListDetailData.lastUpdateUser, 'YYYY-MM-DD')}
          </Descriptions.Item>
          {/* <Descriptions.Item label="机构类型">
            {OrgListDetailData.sex}ime
          </Descriptions.Item>
          <Descriptions.Item label="机构性质">
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
          </Descriptions.Item> */}
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, guanli }) => ({
  loading: loading.models.guanli,
  OrgListDetailData: guanli.OrgListDetailData,
}))(DetailModal);

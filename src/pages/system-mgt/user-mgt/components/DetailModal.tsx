import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal, Spin } from 'antd';
// import { formatDateStr } from '@/utils/format';

const DetailModal = ({ dispatch, actionRef, loading, usetListData, enums }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setModalVisible(true);
    dispatch({
      type: 'userMgt/getUserDetail',
      payload: { userId: id },
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
      type: 'userMgt/removePersonDetail',
    });
    setModalVisible(false);
  };

  const handleOk = (): void => {
    hideModal();
  };

  return (
    <Modal
      title="用户详情"
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
        <Descriptions title=" " column={{ xxl: 4, xl: 3, lg: 2 }}>
          <Descriptions.Item label="用户姓名">{usetListData.userName}</Descriptions.Item>
          <Descriptions.Item label="用户编码">{usetListData.userCode}</Descriptions.Item>
          <Descriptions.Item label="手机号">{usetListData.mobile}</Descriptions.Item>
          <Descriptions.Item label="用户性别">
            {enums.dict_sex && enums.dict_sex[usetListData.sex]}
          </Descriptions.Item>
          <Descriptions.Item label="所在机构">{usetListData.orgId}</Descriptions.Item>
          <Descriptions.Item label="数据来源'">{usetListData.source}</Descriptions.Item>
          <Descriptions.Item label="电子邮箱">{usetListData.email} </Descriptions.Item>
          <Descriptions.Item label="职位">{usetListData.positionName} </Descriptions.Item>
          <Descriptions.Item label="证件类型">
            {enums.blood && enums.blood[usetListData.paperType]}
          </Descriptions.Item>
          <Descriptions.Item label="职级">
            {enums.nation && enums.nation[usetListData.jobLevel]}
          </Descriptions.Item>
          <Descriptions.Item label="所在机构名称">{usetListData.orgName}</Descriptions.Item>
          <Descriptions.Item label="序号">{usetListData.orderNum}</Descriptions.Item>
          <Descriptions.Item label="用户类型">{usetListData.userType}</Descriptions.Item>
          <Descriptions.Item label="证件号码">{usetListData.paperNum}</Descriptions.Item>
          <Descriptions.Item label="用户密码">
            {enums.education && enums.education[usetListData.loginPwd]}
          </Descriptions.Item>
          <Descriptions.Item label="登陆名">
            {enums.political && enums.political[usetListData.loginName]}
          </Descriptions.Item>
          <Descriptions.Item label="用户状态">{usetListData.userStatus}</Descriptions.Item>
          <Descriptions.Item label="用户地址">{usetListData.addr}</Descriptions.Item>
          <Descriptions.Item label="出生日期">{usetListData.birthday}</Descriptions.Item>
          <Descriptions.Item label="备注">{usetListData.remark}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default connect(({ loading, userMgt, global }) => ({
  loading: loading.models.userMgt,
  usetListData: userMgt.usetListData,
  enums: global.enums,
}))(DetailModal);

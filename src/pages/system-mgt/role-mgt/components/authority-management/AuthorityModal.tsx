import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Tree, Spin } from 'antd';

const AuthorityModal = ({ ruleData, dispatch, actionRef, loading, confirmLoading }) => {
  const [roleId, setRoleId] = useState('');
  const [ruleModalVisible, setModalVisible] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);

  const showModal = id => {
    setRoleId(id);

    new Promise(resolve => {
      dispatch({
        type: `smRoleMgt/getRuleIds`,
        payload: {
          id,
        },
        resolve,
      });
    }).then(data => {
      setCheckedKeys(data);
    });

    setModalVisible(true);
  };

  useEffect(() => {
    dispatch({
      type: `smRoleMgt/getAuthTree`,
    });

    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
  };

  const onCheckHandler = keys => {
    setCheckedKeys(keys);
  };

  const handleOk = () => {
    new Promise(resolve => {
      dispatch({
        type: `smRoleMgt/updateRoleRules`,
        payload: {
          roleId,
          ids: checkedKeys,
        },
        resolve,
      });
    }).then(_ => {
      hideModal();
    });
  };

  return (
    <Modal
      title="配置角色权限"
      centered
      width="580px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '20px',
        maxHeight: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={ruleModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={confirmLoading}
      onCancel={hideModal}
    >
      <Spin spinning={loading}>
        <Tree checkable onCheck={onCheckHandler} checkedKeys={checkedKeys} treeData={ruleData} />
      </Spin>
    </Modal>
  );
};

export default connect(({ smRoleMgt, loading }) => ({
  ruleData: smRoleMgt.ruleData,
  loading: smRoleMgt.ruleData,
  confirmLoading: loading.models.smDictionaryMgt,
}))(AuthorityModal);

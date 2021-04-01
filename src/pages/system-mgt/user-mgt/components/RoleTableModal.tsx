import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Transfer } from 'antd';

const TableModifyModal = ({ dispatch, actionRef, loading }) => {
  const [userId, setuserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [roleDatas, setRoleDatas] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const getRole = userIds => {
    if (userIds) {
      new Promise(resolve => {
        dispatch({
          type: 'userMgt/getRoleList',
          payload: { userIds },
          resolve,
        });
      })
        .then(data => {
          setRoleDatas(data.map(item => ({ ...item, key: item.roleId })));

          return new Promise(resolve => {
            dispatch({
              type: 'userMgt/getAddRoleList',
              payload: { userIds },
              resolve,
            });
          });
        })
        .then(data => {
          const targetIds = data.map(item => item.roleId);
          setTargetKeys(targetIds);
        });
    }
  };
  const showModal = userIds => {
    setuserId(userIds || null);
    getRole(userIds);
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
    setuserId(null);
    setModalVisible(false);
  };

  // xx
  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const handleOk = () => {
    new Promise(resolve => {
      dispatch({
        type: `userMgt/useraddRole`,
        payload: {
          userId,
          roleIds: targetKeys,
        },
        resolve,
      });
    })
      .then(_ => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="用户角色列表"
      centered
      width="50vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Transfer
        dataSource={roleDatas}
        titles={['角色列表', '已选角色']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={item => item.name}
      />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(TableModifyModal);

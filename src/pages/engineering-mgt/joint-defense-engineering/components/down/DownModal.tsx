import React, { useState, useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { Modal, Tree } from 'antd';

const useQuery = () => new URLSearchParams(useLocation().search);
const DownModal = ({ dispatch, actionRef, loading, roleTree }) => {
  const query = useQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheckHandler = keys => {
    setCheckedKeys(keys);
  };
  const getTreeData = () => {
    dispatch({
      type: 'smRoleMgt/getRoleTree',
      payload: {},
    });
  };
  useEffect(() => {
    getTreeData();
  }, []);

  const showModal = Id => {
    if (Id) setId(Id);
    setModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }

    if (query.get('type') === 'modify' && query.get('id') && query.get('status') === '1') {
      showModal({ id: query.get('id'), disabled: false, add: true });
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
    setCheckedKeys([]);
  };

  const handleOk = () => {
    const keys = checkedKeys.join(',');
    return new Promise(resolve => {
      dispatch({
        type: `defenseEngineering/deployProjectTaskList`,
        payload: {
          targetProvince: keys,
          taskId: id,
        },
        resolve,
      });
    })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="部署任务"
      centered
      width="580px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      {roleTree && roleTree.length ? (
        <Tree checkable onCheck={onCheckHandler} checkedKeys={checkedKeys} treeData={roleTree} />
      ) : (
        <></>
      )}
      {/* <Transfer
        dataSource={provinceData}
        titles={['选择省份']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={item => item.title}
        oneWay
      /> */}
    </Modal>
  );
};

export default connect(({ loading, smRoleMgt }) => ({
  loading: loading.models.smDictionaryMgt,
  roleTree: smRoleMgt.roleTree,
}))(DownModal);

import React, { useEffect, useState } from 'react';
import { Tree, Spin } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

const RoleTree = ({ dispatch, roleTree, loading }) => {
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const getTreeData = (orgId = '') => {
    new Promise(resolve => {
      dispatch({
        type: 'smRoleMgt/getRoleTree',
        payload: { orgId },
        resolve,
      });
    }).then(res => {
      const arr = [];
      arr.push(res[0].key);
      setSelectedKeys([...arr]);
    });
  };
  useEffect(() => {
    getTreeData();
  }, []);

  // const actionSearchHander = value => {
  //   getTreeData(value);
  // };

  const actionExpandHandler = node => {
    setExpandedKeys(node);
  };

  const actionSelectHandler = (keys, { node }) => {
    const orgId = node.key;
    dispatch({
      type: 'smRoleMgt/getListTable',
      payload: { orgId },
    });
    if (!keys[0]) return;
    setSelectedKeys(keys);
  };

  return (
    <div className={styles.treeContent}>
      {/*  TEMP 搜索逻辑预留  */}
      {/* <Input.Search
        allowClear
        style={{ marginBottom: 8, marginTop: 8 }}
        placeholder="请输入单位名称"
        enterButton="查询"
        onSearch={actionSearchHander}
      /> */}
      <Spin spinning={loading}>
        {roleTree && roleTree.length ? (
          <Tree
            treeData={roleTree}
            onSelect={actionSelectHandler}
            selectedKeys={selectedKeys}
            onExpand={actionExpandHandler}
            expandedKeys={expandedKeys}
          />
        ) : (
          <></>
        )}
      </Spin>
    </div>
  );
};

export default connect(({ smRoleMgt }) => ({
  roleTree: smRoleMgt.roleTree,
  loading: smRoleMgt.loading,
}))(RoleTree);

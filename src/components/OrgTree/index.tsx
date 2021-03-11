import React, { useEffect, useState } from 'react';
import { Spin, Tree } from 'antd';
import { connect } from 'umi';
import { getCookie, USER_ORG_ID } from '@/utils/cookie';
import styles from './index.less';

const OrgTree = ({
  value = '',
  OrganizationTree,
  dispatch,
  loading,
  allLevel = true,
  onChange = null,
  allInValue = false,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);

  const getTreeData = () => {
    new Promise(resolve => {
      dispatch({
        type: 'global/getAllOrganization',
        payload: { orgId: allLevel ? undefined : getCookie(USER_ORG_ID) },
        resolve,
      });
    }).then(data => {
      if (data && data[0]) {
        setExpandedKeys([data[0].key]);
        setSelectedKeys([data[0].key]);
        onChange && onChange(data[0].key);
      }
    });
  };

  useEffect(() => {
    getTreeData();
  }, []);

  useEffect(() => {
    setSelectedKeys([value]);
  }, [value]);

  const orgExpandHandler = node => {
    setExpandedKeys(node);
  };
  const orgSelectHandler = (keys, { node }) => {
    if (!keys[0]) return;

    setSelectedKeys(keys);

    onChange && onChange(allInValue ? node : keys[0]);
  };

  return (
    <div className={styles.treeContent}>
      <Spin spinning={loading} style={{ minHeight: 100 }}>
        <Tree
          treeData={OrganizationTree}
          onSelect={orgSelectHandler}
          selectedKeys={selectedKeys}
          onExpand={orgExpandHandler}
          expandedKeys={expandedKeys}
        />
      </Spin>
    </div>
  );
};

export default connect(({ global }) => ({
  OrganizationTree: global.OrganizationTree,
  loading: global.loading,
}))(OrgTree);

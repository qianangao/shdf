import React, { useEffect, useState, useRef } from 'react';
import { Tree, Input } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

const OrgTree = ({ value, onChange, orgTree, userInfo, allInValue, dispatch }) => {
  const [hasSearch, setHasSearch] = useState(false);
  const symbol = useRef(Symbol('OrgTree'));
  const orgSymbol = symbol.current;

  const { searchOrgTreeData, orgTreeData, orgLoadedLoadedKeys, orgSelectedKeys, orgExpandedKeys } =
    orgTree[orgSymbol] || {};

  useEffect(() => {
    dispatch({ type: 'orgTree/initTreeData', payload: { value }, orgSymbol });
    dispatch({ type: 'orgTree/getOrgTreeById', orgSymbol });

    const { organizationId, organizationName } = userInfo;

    // 初始化组织树选择
    onChange &&
      onChange(
        allInValue
          ? {
              key: organizationId,
              title: organizationName,
            }
          : organizationId,
      );

    return () => {
      dispatch({ type: 'orgTree/destroyTree', orgSymbol });
    };
  }, []);

  const orgSearchHander = value0 => {
    if (!value0) return;

    setHasSearch(true);

    dispatch({
      type: 'orgTree/searchOrgTree',
      orgSymbol,
      payload: {
        organizationName: value0,
      },
    });
  };

  const orgChangeHander = event => {
    if (hasSearch && !event.target.value) {
      dispatch({
        type: 'orgTree/clearSearchData',
        orgSymbol,
      });

      setHasSearch(false);
    }
  };

  const orgExpandHandler = node => {
    dispatch({
      type: 'orgTree/saveOrgTree',
      orgSymbol,
      payload: {
        orgExpandedKeys: node,
      },
    });
  };
  const orgSelectHandler = (selectedKeys, { node }) => {
    if (!selectedKeys[0]) return;

    dispatch({
      type: 'orgTree/saveOrgTree',
      orgSymbol,
      payload: {
        orgSelectedKeys: selectedKeys,
      },
    });

    onChange && onChange(allInValue ? node : selectedKeys[0]);
  };

  const orgLoadDataHandler = treeNode => {
    return new Promise(resolve => {
      if (treeNode.children) {
        resolve();
        return;
      }

      dispatch({
        type: 'orgTree/getOrgTreeById',
        orgSymbol,
        payload: {
          id: treeNode.id,
        },
        resolve,
      });
    });
  };
  return (
    <div className={styles.treeContent}>
      <Input.Search
        style={{ marginBottom: 8 }}
        placeholder="查询"
        onSearch={orgSearchHander}
        onChange={orgChangeHander}
      />
      <Tree
        treeData={searchOrgTreeData || orgTreeData}
        loadData={orgLoadDataHandler}
        loadedKeys={orgLoadedLoadedKeys}
        onSelect={orgSelectHandler}
        selectedKeys={orgSelectedKeys}
        onExpand={orgExpandHandler}
        expandedKeys={orgExpandedKeys}
      />
    </div>
  );
};

export default connect(({ orgTree, user }) => ({
  orgTree,
  userInfo: user.userInfo,
}))(OrgTree);

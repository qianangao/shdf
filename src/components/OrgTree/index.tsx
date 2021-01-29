import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import { getOrgTreeById } from '@/services/orgTree';
import { transformOrgTreeData, updateTreeData } from '@/utils/orgTreeUtil';
import styles from './index.less';

const OrgTree = ({ value = '', onChange = null, allInValue = false }) => {
  const [orgTreeData, setOrgTreeData] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [loadedKeys, setLoadedKeys] = useState<any>([]);

  const getTreeData = (id = '') => {
    return getOrgTreeById({ id }).then(data => {
      const tempId = id || 'demoid';
      if (!id) {
        orgTreeData.push({
          // TEMP 获取用户所在组织id title
          key: tempId,
          title: 'demo全扫',
        });

        setTimeout(() => {
          setExpandedKeys([tempId]);
          setSelectedKeys([tempId]);
        }, 200);
      }

      setLoadedKeys([...loadedKeys, tempId]);
      transformOrgTreeData(data);
      const treeData = updateTreeData(orgTreeData, tempId, data);
      setOrgTreeData(treeData);
    });
  };

  useEffect(() => {
    getTreeData();

    // 初始化组织树选择
    onChange &&
      onChange(
        allInValue
          ? {
              // TEMP 获取用户所在组织id title
              key: 'demoid',
              title: 'demo全扫',
            }
          : 'demoid',
      );
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

  const orgLoadDataHandler = treeNode => {
    return new Promise<any>(resolve => {
      if (treeNode.children) {
        resolve(null);
        return;
      }

      getTreeData(treeNode.id).then(data => resolve(data));
    });
  };
  return (
    <div className={styles.treeContent}>
      {/*  TEMP 搜索逻辑预留  */}
      {/* <Input.Search
        style={{ marginBottom: 8 }}
        placeholder="查询"
        onSearch={orgSearchHander}
        onChange={orgChangeHander}
      /> */}
      <Tree
        treeData={orgTreeData}
        loadData={orgLoadDataHandler}
        loadedKeys={loadedKeys}
        onSelect={orgSelectHandler}
        selectedKeys={selectedKeys}
        onExpand={orgExpandHandler}
        expandedKeys={expandedKeys}
      />
    </div>
  );
};

export default OrgTree;

/* TEMP 搜索逻辑预留 */
// const [hasSearch, setHasSearch] = useState(false);

// const orgSearchHander = value0 => {
//   if (!value0) return;

//   setHasSearch(true);

//   // searchOrgTree({
//   //   organizationName: value0,
//   // }).then(data => setOrgTreeData(data));
// };

// const orgChangeHander = event => {
//   if (hasSearch && !event.target.value) {
//     dispatch({
//       type: 'orgTree/clearSearchData',
//       orgSymbol,
//     });

//     setHasSearch(false);
//   }
// };

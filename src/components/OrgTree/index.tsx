import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
// import { getOrgTreeById } from '@/services/orgTree';
import { transformOrgTreeData, updateTreeData } from '@/utils/orgTreeUtil';
import styles from './index.less';

// temp 对接数据前临时mock数据
const getOrgTreeById = ({ id }) => {
  const data = [
    {
      id: `1${id}`, // id
      sort: null,
      organizationName: '测试单位1', // 单位名称
      parentEmployerId: id || '1000', // 父单位id
      parentOrganizationName: '省委老干部局', // 父单位名称
      isLgbMinistry: null,
      dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3', // 单位性质
      organizationTelphone: null,
      dictRank: 1, // 单位级别
      children: null,
      isSubunit: 1,
      gmtCreate: null,
      communityAddress: null,
    },
    {
      id: `2${id}`, // id
      sort: 0,
      organizationName: '测试单位2',
      parentEmployerId: id || '1000', // 父单位id
      parentOrganizationName: '省委老干部局',
      isLgbMinistry: 0,
      dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
      organizationTelphone: 'string',
      dictRank: 1,
      children: null,
      isSubunit: 1,
      gmtCreate: null,
      communityAddress: null,
    },
    {
      id: `3${id}`, // id
      sort: 0,
      organizationName: '测试单位3',
      parentEmployerId: id || '1000', // 父单位id
      parentOrganizationName: '省委老干部局',
      isLgbMinistry: 0,
      dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
      organizationTelphone: 'string',
      dictRank: 1,
      children: null,
      isSubunit: 0,
      gmtCreate: null,
      communityAddress: null,
    },
  ];
  return Promise.resolve(data);
};

const OrgTree = ({ value = '', onChange = null, allInValue = false }) => {
  const [orgTreeData, setOrgTreeData] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [loadedKeys, setLoadedKeys] = useState<any>([]);

  const getTreeData = (id = '') => {
    return getOrgTreeById({ id }).then(data => {
      if (data.error) {
        return;
      }

      const tempId = id || 'demoid';
      if (!id) {
        orgTreeData.push({
          // TEMP 获取用户所在组织id title
          key: tempId,
          title: '全国扫黄打非办公室',
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
              title: '全国扫黄打非办公室',
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

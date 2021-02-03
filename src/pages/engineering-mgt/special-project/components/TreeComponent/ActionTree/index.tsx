import React, { useEffect, useState } from 'react';
import { Tree, Button, Row, Col, Input } from 'antd';
import { getSpecialActionTree } from '../../../service';
import styles from './index.less';

const ActionTree = ({ value = '', onChange = null, allInValue = false, openAddSpecialModal }) => {
  const [actionTreeData, setActionTreeData] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [loadedKeys, setLoadedKeys] = useState<any>([]);

  const getTreeData = (actionName = '') => {
    return getSpecialActionTree({ actionName }).then(data => {
      if (data.error) {
        return;
      }
      setActionTreeData(data);
      const tempId = actionName || '';
      if (!actionName) {
        // actionTreeData.push({
        //   // TEMP 获取用户所在组织id title
        //   key: tempId,
        //   title: '专项行动',
        // });

        setTimeout(() => {
          setExpandedKeys([tempId]);
          setSelectedKeys([tempId]);
        }, 200);
      }

      setLoadedKeys([...loadedKeys, tempId]);
      // transformOrgTreeData(data);
      // const treeData = updateTreeData(actionTreeData, tempId, data);
      // console.log("treeData",treeData);

      // setActionTreeData(treeData);
    });
  };
  // const transformOrgTreeData = tree => {
  //   const parentIds: any[] = [];
  //   tree.map(node => {
  //     if (node.children) {
  //       parentIds.push(node.id);
  //       parentIds.push(...transformOrgTreeData(node.children));
  //     }
  //     // node.key = node.id || node.key;
  //     // node.title = node.organizationName || node.title;
  //     // node.isSubunit !== undefined && (node.isLeaf = !node.isSubunit);
  //     return node;
  //   });

  //   return parentIds;
  // };

  // const updateTreeData = (list, key, children) => {
  //   return list.map((node: { key: any; children: any; [extra: string]: any }) => {
  //     if (node.key === key) {
  //       return {
  //         ...node,
  //         children,
  //       };
  //     }
  //     if (node.children) {
  //       return {
  //         ...node,
  //         children: updateTreeData(node.children, key, children),
  //       };
  //     }
  //     return node;
  //   });
  // };

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
          : '',
      );
  }, []);

  useEffect(() => {
    setSelectedKeys([value]);
  }, [value]);

  const actionExpandHandler = node => {
    setExpandedKeys(node);
  };
  const actionSelectHandler = (keys, { node }) => {
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
      <Row>
        <Col span={6}>
          <Button type="primary" onClick={() => openAddSpecialModal()} size="small">
            新增专项行动
          </Button>
        </Col>
        <Col span={8} offset={5}>
          <Button type="primary" onClick={() => openAddSpecialModal('annual')} size="small">
            新增年度专项行动
          </Button>
        </Col>
      </Row>
      {/*  TEMP 搜索逻辑预留  */}
      <Input.Search
        style={{ marginBottom: 8, marginTop: 8 }}
        placeholder="查询"
        // onSearch={orgSearchHander}
        // onChange={orgChangeHander}
      />

      <Tree
        treeData={actionTreeData}
        loadData={orgLoadDataHandler}
        loadedKeys={loadedKeys}
        onSelect={actionSelectHandler}
        selectedKeys={selectedKeys}
        onExpand={actionExpandHandler}
        expandedKeys={expandedKeys}
      />
    </div>
  );
};

export default ActionTree;

/* TEMP 搜索逻辑预留 */
// const [hasSearch, setHasSearch] = useState(false);

// const orgSearchHander = value0 => {
//   if (!value0) return;

//   setHasSearch(true);

//   // searchOrgTree({
//   //   organizationName: value0,
//   // }).then(data => setActionTreeData(data));
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

import React, { useEffect, useState } from 'react';
import { Tree, Button, Row, Col, Input } from 'antd';
import { connect } from 'umi';
import { getSpecialActionTree } from '../../../service';
import styles from './index.less';

const ActionTree = ({ openAddSpecialModal, dispatch, specialAction }) => {
  const { treeRef } = specialAction;
  const [actionTreeData, setActionTreeData] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  // const [loadedKeys, setLoadedKeys] = useState<any>([]);

  const getTreeData = (actionName = '') => {
    return getSpecialActionTree({ actionName }).then(data => {
      if (data.error) {
        return;
      }
      setActionTreeData(data);
    });
  };

  useEffect(() => {
    getTreeData();
    //  // 初始化组织树选择
    //  onChange &&
    //  onChange(
    //    allInValue
    //      ? {
    //          // TEMP 获取用户所在组织id title
    //          key: 'demoid',
    //          title: 'demo全扫',
    //        }
    //      : 'demoid',
    //  );
  }, []);

  // const actionLoadDataHandler = treeNode => {

  //   return new Promise<any>(resolve => {

  //     console.log("treeNode",treeNode);

  //     if (treeNode.children) {
  //       resolve(null);
  //       return;
  //     }

  //     getTreeData(treeNode.id).then(data => resolve(data));
  //   });
  // };
  const actionSearchHander = value => {
    // if (!value) return;
    getTreeData(value).then(data => setActionTreeData(data));
  };

  const actionExpandHandler = node => {
    // console.log("node",node);

    setExpandedKeys(node);
  };
  const actionSelectHandler = (keys, { node }) => {
    const actionId = node.key;
    dispatch({
      type: 'specialAction/getSpecialAction',
      payload: { actionId },
    });
    dispatch({
      type: 'specialAction/getChildrenTaskList',
      payload: { actionId },
    });

    if (!keys[0]) return;

    setSelectedKeys(keys);
    // onChange && onChange(allInValue ? node : keys[0]);
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
          <Button
            type="primary"
            onClick={() => openAddSpecialModal({ year: 'annual' })}
            size="small"
          >
            新增年度专项行动
          </Button>
        </Col>
      </Row>
      {/*  TEMP 搜索逻辑预留  */}
      <Input.Search
        allowClear
        style={{ marginBottom: 8, marginTop: 8 }}
        placeholder="行动名称"
        enterButton="查询"
        onSearch={actionSearchHander}
      />

      <Tree
        treeData={actionTreeData}
        actionRef={treeRef}
        // loadData={actionLoadDataHandler}
        onSelect={actionSelectHandler}
        selectedKeys={selectedKeys}
        onExpand={actionExpandHandler}
        expandedKeys={expandedKeys}
      />
    </div>
  );
};

export default connect(({ specialAction }) => ({ specialAction }))(ActionTree);

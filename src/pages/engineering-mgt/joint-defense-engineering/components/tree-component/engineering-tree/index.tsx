import React, { useEffect, useState } from 'react';
import { Tree, Button, Row, Col, Input, Spin } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

const EngineeringTree = ({ dispatch, engineeringTree, loading, openAddEngineeringModal }) => {
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const getTreeData = (projectName = '') => {
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getEngineeringTree',
        payload: { projectName },
        resolve,
      });
    }).then(res => {
      const arr = [];
      if (res.length) {
        arr.push(res[0].key);
      }
      setSelectedKeys([...arr]);
    });
  };

  useEffect(() => {
    getTreeData();
  }, []);

  const engineeringSearchHandler = value => {
    getTreeData(value);
  };

  const actionExpandHandler = node => {
    setExpandedKeys(node);
  };
  const engineeringSelectHandler = (keys, { node }) => {
    const projectId = node.key;
    const projectPid = node.pid;
    dispatch({
      type: 'dictionaryMgt/getListTable',
      payload: { projectId, projectPid },
    });
    if (!keys[0]) return;
    setSelectedKeys(keys);
  };

  return (
    <div className={styles.treeContent}>
      <Row>
        <Col span={6}>
          <Button type="primary" onClick={() => openAddEngineeringModal({ add: true })}>
            新增工程
          </Button>
        </Col>
        <Col span={8} offset={5}>
          <Button
            type="primary"
            onClick={() => openAddEngineeringModal({ year: 'annual', add: true })}
          >
            新增年度工程
          </Button>
        </Col>
      </Row>
      {/*  TEMP 搜索逻辑预留  */}
      <Input.Search
        allowClear
        style={{ marginBottom: 8, marginTop: 8 }}
        placeholder="工程名称"
        enterButton="查询"
        onSearch={engineeringSearchHandler}
      />
      <Spin spinning={loading}>
        {engineeringTree && engineeringTree.length ? (
          <Tree
            treeData={engineeringTree}
            onSelect={engineeringSelectHandler}
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

export default connect(({ dictionaryMgt }) => ({
  engineeringTree: dictionaryMgt.engineeringTree,
  loading: dictionaryMgt.loading,
}))(EngineeringTree);

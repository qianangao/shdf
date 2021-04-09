import React, { useEffect, useState } from 'react';
import { Tree, Button, Row, Col, Input, Spin } from 'antd';
import { connect } from 'umi';
import { checkAuthority } from '@/utils/authority';
import styles from './index.less';

const EngineeringTree = ({
  dispatch,
  engineeringTree,
  loading,
  defenseEngineeringModal,
  annualDefenseEngineeringModal,
  projectId,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  useEffect(() => {
    const arr = [];
    arr.push(projectId);
    setSelectedKeys([...arr]);
  }, [projectId]);

  const getTreeData = (projectName = '') => {
    new Promise(resolve => {
      dispatch({
        type: 'defenseEngineering/getEngineeringTree',
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
    const projectIds = node.key;
    const projectPid = node.pid;
    dispatch({
      type: 'defenseEngineering/getListTable',
      payload: { projectId: projectIds, projectPid },
    });
    if (!keys[0]) return;
    setSelectedKeys(keys);
  };

  return (
    <div className={styles.treeContent}>
      <Row>
        <Col span={6}>
          <Button
            type="primary"
            onClick={() => defenseEngineeringModal({ add: true })}
            hidden={!checkAuthority('em/dep/addProject')}
          >
            新增工程
          </Button>
        </Col>
        <Col span={8} offset={5}>
          <Button
            type="primary"
            onClick={() => annualDefenseEngineeringModal()}
            hidden={!checkAuthority('em/dep/addAnnual')}
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
        // hidden={!checkAuthority('em/dep/query')}
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

export default connect(({ defenseEngineering }) => ({
  engineeringTree: defenseEngineering.engineeringTree,
  projectId: defenseEngineering.projectId,
  loading: defenseEngineering.loading,
}))(EngineeringTree);

import React, { useEffect, useState } from 'react';
import { Tree, Button, Row, Col, Input, Spin } from 'antd';
import { connect } from 'umi';
import { checkAuthority } from '@/utils/authority';
import styles from './index.less';

const ActionTree = ({
  specialActionModal,
  annualSpecialActionModal,
  dispatch,
  actionTree,
  loading,
  actionId,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);

  useEffect(() => {
    const arr = [];
    arr.push(actionId);
    setSelectedKeys([...arr]);
  }, [actionId]);
  const getTreeData = (actionName = '') => {
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/getSpecialActionTree',
        payload: { actionName },
        resolve,
      });
    }).then(res => {
      const arr = [];
      if (res.length) {
        arr.push(res[0].key);
      }
      setSelectedKeys([]);
      setSelectedKeys([...arr]);
    });
  };
  useEffect(() => {
    getTreeData();
  }, []);

  const actionSearchHander = value => {
    getTreeData(value);
  };

  const actionExpandHandler = node => {
    setExpandedKeys(node);
  };

  const actionSelectHandler = (keys, { node }) => {
    const actionIds = node.key;
    dispatch({
      type: 'specialAction/getListTable',
      payload: { actionId: actionIds },
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
            onClick={() => specialActionModal()}
            size="small"
            hidden={!checkAuthority('em/sa/addSpecial')}
          >
            新增专项行动
          </Button>
        </Col>
        <Col span={8} offset={5}>
          <Button
            type="primary"
            onClick={() => annualSpecialActionModal()}
            size="small"
            hidden={!checkAuthority('em/sa/addAnnual')}
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
        // hidden={!checkAuthority('em/sa/query')}
      />
      <Spin spinning={loading}>
        {actionTree && actionTree.length ? (
          <Tree
            treeData={actionTree}
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

export default connect(({ specialAction }) => ({
  actionTree: specialAction.actionTree,
  actionId: specialAction.actionId,
  loading: specialAction.loading,
}))(ActionTree);

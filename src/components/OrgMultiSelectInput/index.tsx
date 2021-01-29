import React, { useEffect, useState } from 'react';
import { Modal, Tree, Input } from 'antd';
import { getAllOrgTree } from '@/services/orgTree';
import { transformOrgTreeData } from '@/utils/orgTreeUtil';
import styles from './index.less';

let treeItems = new Map();

/**
 * 单位多选组件
 * @param param0 出入参格式为： [{ name, id }]
 */
const OrgMultiSelectInput = ({ value, onChange }) => {
  const [orgSelectModalVisible, setVisible] = useState(false);
  const [valueName, setValueName] = useState('');
  const [multiOrgTreeData, setMultiOrgTreeData] = useState<any>([]);

  /* TEMP 搜索逻辑预留 */
  // const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState({
    checked: [],
    halfChecked: [],
  });

  const [autoExpandParent, setAutoExpandParent] = useState(false);
  const getTreeitems = (treeData, items = new Map()) => {
    treeData.forEach(item => {
      items.set(`${item.key}`, item.title);

      if (item.children) {
        getTreeitems(item.children, items);
      }
    });

    return items;
  };

  /* TEMP 搜索逻辑预留 */
  // const getParentKey = (key, tree) => {
  //   for (let i = 0; i < tree.length; i++) {
  //     const node = tree[i];
  //     if (node.children) {
  //       if (
  //         node.children.some(item => {
  //           return item.key === key;
  //         })
  //       ) {
  //         return node.key;
  //       }
  //       return getParentKey(key, node.children);
  //     }
  //   }

  //   return '';
  // };

  useEffect(() => {
    getAllOrgTree().then(data => {
      transformOrgTreeData(data);
      setMultiOrgTreeData(data);

      if (data && data[0]) {
        setExpandedKeys([data[0].key]);
        treeItems = getTreeitems(data);
      }
    });
  }, []);

  useEffect(() => {
    if (value && value.length > 0) {
      const nameArr = [];
      const idArr = [];
      value.forEach(({ name, id }) => {
        nameArr.push(name);
        idArr.push(id);
      });

      setValueName(nameArr.join(', '));
      setCheckedKeys({
        checked: idArr,
        halfChecked: [],
      });
    }
  }, [value]);

  const showModal = () => {
    setVisible(true);
  };

  /* TEMP 搜索逻辑预留 */
  // const orgChangeHander = event => {
  //   const { value: value0 } = event.target;
  //   const keys = Array.from(treeItems)
  //     .map(item => {
  //       if (item[1].indexOf(value0) > -1) {
  //         const a = getParentKey(item[0], multiOrgTreeData);
  //         return a;
  //       }
  //       return null;
  //     })
  //     .filter((item, i, self) => {
  //       return item && self.indexOf(item) === i;
  //     });

  //   setSearchValue(value0);
  //   setExpandedKeys(keys);
  //   setAutoExpandParent(true);
  // };

  const onCheckHandler = keys => {
    setCheckedKeys(keys);
  };

  const onExpandHandler = keys => {
    setExpandedKeys(keys);
    setAutoExpandParent(false);
  };

  const handleOk = () => {
    const orgArr = [];
    const nameArr = [];

    checkedKeys.checked.forEach(id => {
      const name = treeItems.get(id);
      nameArr.push(name);
      orgArr.push({
        id,
        name,
      });
    });

    setValueName(nameArr.join(', '));

    onChange && onChange(orgArr);
    setVisible(false);
  };

  const renderTreeNodes = data => {
    return data.map(item => {
      const { title } = item;

      /* TEMP 搜索逻辑预留 */
      // if (searchValue) {
      //   const index = item.title.indexOf(searchValue);
      //   const beforeStr = item.title.substr(0, index);
      //   const afterStr = item.title.substr(index + searchValue.length);
      //   title =
      //     index > -1 ? (
      //       <span>
      //         {beforeStr}
      //         <span style={{ color: '#f50' }}>{searchValue}</span>
      //         {afterStr}
      //       </span>
      //     ) : (
      //       <span>{item.title}</span>
      //     );
      // }

      if (item.children) {
        return { title, key: item.key, children: renderTreeNodes(item.children) };
      }
      return { title, key: item.key };
    });
  };

  return (
    <>
      <Input.TextArea
        readOnly
        value={valueName}
        placeholder="请选择单位"
        autoSize={{ minRows: 3, maxRows: 5 }}
        onClick={showModal}
      />
      <Modal
        title="选择单位"
        width={640}
        visible={orgSelectModalVisible}
        onOk={handleOk}
        centered
        bodyStyle={{
          height: 'calc(95vh - 108px)',
          overflow: 'auto',
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div className={styles.treeContent}>
          {/* TEMP 搜索逻辑预留 */}
          {/* <Input.Search style={{ marginBottom: 8 }} placeholder="查询" onChange={orgChangeHander} /> */}
          <Tree
            checkable
            checkStrictly
            onCheck={onCheckHandler}
            checkedKeys={checkedKeys}
            onExpand={onExpandHandler}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={renderTreeNodes(multiOrgTreeData)}
          />
        </div>
      </Modal>
    </>
  );
};

export default OrgMultiSelectInput;

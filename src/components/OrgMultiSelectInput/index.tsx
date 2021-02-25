import React, { useEffect, useState } from 'react';
import { Modal, Tree, Input } from 'antd';
// import { getAllOrgTree } from '@/services/orgTree';
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
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
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
    // temp 对接数据后更新
    const data: any = [
      {
        id: '1000', // id
        sort: null,
        organizationName: '全国SHDF办公室', // 单位名称
        parentEmployerId: '0', // 父单位id
        parentOrganizationName: null,
        isLgbMinistry: null,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3', // 单位性质
        organizationTelphone: null,
        dictRank: null,
        children: [
          // 子单位信息
          {
            id: '2c948a827409c4aa017409c4aa63',
            sort: null,
            organizationName: '陕西SHDF办公室',
            parentEmployerId: '1000',
            parentOrganizationName: '陕西SHDF',
            isLgbMinistry: null,
            dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
            organizationTelphone: null,
            dictRank: null,
            children: [
              {
                id: '4028b23f738f519401738f321b9',
                sort: null,
                organizationName: '西安SHDF办公室',
                parentEmployerId: '1000',
                parentOrganizationName: '西安SHDF',
                isLgbMinistry: null,
                dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
                organizationTelphone: null,
                dictRank: null,
                children: null,
                isSubunit: null,
                gmtCreate: '2020-07-27T08:09:15.000+0000',
                communityAddress: null,
              },
              {
                id: '4028b23f738f519401738f321b0',
                sort: null,
                organizationName: '延安SHDF办公室',
                parentEmployerId: '1001',
                parentOrganizationName: '延安SHDF',
                isLgbMinistry: null,
                dictOrganizationType: '8adcf7c96a48fae4016a4925f3e2',
                organizationTelphone: null,
                dictRank: null,
                children: null,
                isSubunit: null,
                gmtCreate: '2020-07-27T08:09:15.000+0000',
                communityAddress: null,
              },
            ],
            isSubunit: 1,
            gmtCreate: '2020-08-20T02:48:38.000+0000',
            communityAddress: null,
          },
          {
            id: '2c948a827409c4aa017409c4aa61',
            sort: null,
            organizationName: '四川SHDF办公室',
            parentEmployerId: '1002',
            parentOrganizationName: '四川SHDF',
            isLgbMinistry: null,
            dictOrganizationType: '8adcf7c96a48fae4016a4925f3e4',
            organizationTelphone: null,
            dictRank: null,
            children: [
              {
                id: '4028b23f738f519401738f321b5',
                sort: null,
                organizationName: '成都SHDF办公室',
                parentEmployerId: '1003',
                parentOrganizationName: '成都SHDF',
                isLgbMinistry: null,
                dictOrganizationType: '8adcf7c96a48fae4016a4925f3e6',
                organizationTelphone: null,
                dictRank: null,
                children: null,
                isSubunit: null,
                gmtCreate: '2020-07-27T08:09:15.000+0000',
                communityAddress: null,
              },
              {
                id: '4028b23f738f519401738f321b7',
                sort: null,
                organizationName: '广元SHDF办公室',
                parentEmployerId: '1004',
                parentOrganizationName: '广元SHDF',
                isLgbMinistry: null,
                dictOrganizationType: '8adcf7c96a48fae4016a4925f3e7',
                organizationTelphone: null,
                dictRank: null,
                children: null,
                isSubunit: null,
                gmtCreate: '2020-07-27T08:09:15.000+0000',
                communityAddress: null,
              },
            ],
            isSubunit: 1,
            gmtCreate: '2020-08-20T02:48:38.000+0000',
            communityAddress: null,
          },
        ],
        isSubunit: null,
        gmtCreate: '2018-09-12T10:41:25.000+0000',
        communityAddress: null,
      },
    ];
    // getAllOrgTree().then(data => {
    // if (data.error) {
    //   return;
    // }

    transformOrgTreeData(data);
    setMultiOrgTreeData(data);

    if (data && data[0]) {
      setExpandedKeys([data[0].key]);
      treeItems = getTreeitems(data);
    }
    // });
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

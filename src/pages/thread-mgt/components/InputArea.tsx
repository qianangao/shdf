import React, { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
// import { getCookie, USER_ORG_ID } from '@/utils/cookie';
// import styles from './index.less';

const treeItems = new Map();

/**
 * 单位多选组件
 * @param param0 出入参格式为： [{ name, id }]
 */
const OrgMultiSelectInput = ({ value, onChange, dispatch }) => {
  const [orgSelectModalVisible, setVisible] = useState(false);
  const [valueName, setValueName] = useState('');

  /* TEMP 搜索逻辑预留 */
  // const [searchValue, setSearchValue] = useState('');
  // const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [checkedKeys, setCheckedKeys] = useState({
    checked: [],
    halfChecked: [],
  });

  // const [autoExpandParent, setAutoExpandParent] = useState(false);
  // const getTreeitems = (treeData, items = new Map()) => {
  //   treeData.forEach(item => {
  //     items.set(`${item.key}`, item.title);

  //     if (item.children) {
  //       getTreeitems(item.children, items);
  //     }
  //   });

  //   return items;
  // };

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
  // const getOrganization = () => {
  //   new Promise(resolve => {
  //     dispatch({
  //       type: 'global/getOrganization',
  //       payload: { orgId: getCookie(USER_ORG_ID) },
  //       resolve,
  //     });
  //   }).then(data => {
  //     // transformOrgTreeData(data);

  //     if (data && data[0]) {
  //       setExpandedKeys([data[0].key]);
  //       treeItems = getTreeitems(data);
  //     }
  //   });
  // };

  useEffect(() => {
    // getOrganization();
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

  // const onCheckHandler = keys => {
  //   setCheckedKeys(keys);
  // };

  // const onExpandHandler = keys => {
  //   setExpandedKeys(keys);
  //   setAutoExpandParent(false);
  // };

  const handleOk = () => {
    const orgArr = [];
    const nameArr = [];
    checkedKeys.checked.forEach(id => {
      const name = treeItems.get(`${id}`);
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
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '中文名称', align: 'center', dataIndex: 'name' },
    { title: '作者及编著者', align: 'center', dataIndex: 'author' },
    { title: '出版机构', align: 'center', dataIndex: 'organization' },
    { title: '鉴定机构', align: 'center', dataIndex: 'appraisalInstitution' },
    {
      title: '出版日期',
      align: 'center',
      dataIndex: 'publicationDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '鉴定日期',
      align: 'center',
      dataIndex: 'appraisalDate',
      valueType: 'date',
      hideInSearch: true,
    },
    // {
    //   title: '鉴定类型',
    //   align: 'center',
    //   dataIndex: 'appraisalType',
    //   valueEnum: enums.illegal_appraisalType,
    // },
  ];
  const getKeyBanPublishList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'kdBanPublishMgt/getKeyBanPublishList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <>
      <Input.TextArea
        readOnly
        value={valueName}
        placeholder="请选择非法出版物"
        autoSize={{ minRows: 3, maxRows: 5 }}
        onClick={showModal}
      />
      <Modal
        title="选择出版物"
        width="90vw"
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
        <div>
          {/* TEMP 搜索逻辑预留 */}
          {/* <Input.Search style={{ marginBottom: 8 }} placeholder="查询" onChange={orgChangeHander} /> */}
          <ProTable
            rowKey="publicationId"
            headerTitle="非法出版物"
            // actionRef={tableRef}
            rowClassName={getSecrecyRowClassName}
            rowSelection={[]}
            scroll={{ x: 'max-content' }}
            request={async params => getKeyBanPublishList(params)}
            columns={columns}
          />
        </div>
      </Modal>
    </>
  );
};

export default connect()(OrgMultiSelectInput);

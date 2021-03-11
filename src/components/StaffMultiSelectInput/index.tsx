import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Modal, List, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import OrgTree from '@/components/OrgTree';
import styles from './index.less';

let tempSelectData = [];

const StaffMultiSelectInput = ({
  value,
  enums,
  getPerson,
  dispatch,
  onChange,
  allLevel = true,
  rowSelectType = 'checkbox',
}) => {
  const tableRef = useRef({});
  const [lgbSelectModalVisible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(undefined);

  const [listData, setListData] = useState([]);

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName' },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'sex',
      valueEnum: enums.dict_sex,
      hideInSearch: true,
    },
    {
      title: '手机号码',
      align: 'center',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '身份证号码',
      align: 'center',
      dataIndex: 'idCard',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInTable: true,
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dict_sex'],
      },
    });
  }, []);

  useEffect(() => {
    if (value && Array.isArray(value)) {
      setListData(value);
      setSelectedRowKeys(value.map(item => item.userId));
    }
  }, [value]);

  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'global/getOrgPerson',
        payload: { ...params, orgId: selectedOrgId, secrecyLevel: '2' },
        resolve,
      });
    });

  const changeListData = data => {
    setListData(data);
    onChange && onChange(data);
  };

  const deleteItem = item => {
    if (listData.indexOf(item) === -1) return;

    listData.splice(listData.indexOf(item), 1);
    changeListData([...listData]);
  };

  const onOrgSelect = orgId => {
    setSelectedOrgId(orgId);
    tableRef.current.reload && tableRef.current.reload();
  };

  const handleOk = () => {
    const listMap = new Map();

    listData.forEach(item => {
      listMap.set(item.userId, item.realName);
    });
    tempSelectData.forEach(item => {
      listMap.set(item.userId, item.realName);
    });

    changeListData(
      Array.from(listMap).map(item => {
        return {
          userId: item[0],
          realName: item[1],
        };
      }),
    );
    hideModal();
  };

  const hideModal = () => {
    setSelectedOrgId(undefined);
    // setSelectedRowKeys([]);
    setVisible(false);
  };

  return (
    <>
      <section className={styles.listContent}>
        <div className={styles.btnGroup}>
          <Button
            type="link"
            onClick={() => {
              setVisible(true);
            }}
          >
            添加
          </Button>
          <Button
            type="link"
            onClick={() => {
              changeListData([]);
            }}
          >
            清空
          </Button>
        </div>
        <div className={styles.listGroup}>
          <List
            size="small"
            dataSource={listData}
            renderItem={item => (
              <List.Item
                extra={
                  <CloseOutlined
                    className={styles.deleteBtn}
                    onClick={() => {
                      deleteItem(item);
                    }}
                  />
                }
              >
                {item.realName}
              </List.Item>
            )}
          />
        </div>
      </section>
      <Modal
        title="选择人员"
        centered
        width="90vw"
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          height: 'calc(95vh - 128px)',
          overflow: 'auto',
        }}
        visible={lgbSelectModalVisible}
        onOk={handleOk}
        destroyOnClose
        okText="添加"
        onCancel={() => hideModal()}
      >
        <section
          style={{
            display: 'flex',
            flex: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <aside
            style={{
              background: '#fff',
              minHeight: 'calc(100vh - 226px)',
              maxHeight: '100vh',
              marginRight: 20,
              padding: '27px 20px',
              flex: '0 0 260px',
              borderRight: '1px solid #eee',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <OrgTree onChange={onOrgSelect} allLevel={allLevel} />
          </aside>

          <section style={{ width: '100%', overflow: 'auto' }}>
            <ProTable
              rowKey="userId"
              headerTitle="人员信息"
              actionRef={tableRef}
              rowSelection={{
                type: rowSelectType,
                onChange: (keys, rows) => {
                  tempSelectData = rows;
                  setSelectedRowKeys(keys);
                },
                selectedRowKeys,
              }}
              search={false}
              scroll={{ x: 'max-content' }}
              request={getPerson || (selectedOrgId && (async params => getEmployeeList(params)))}
              columns={columns}
            />
          </section>
        </section>
      </Modal>
    </>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(StaffMultiSelectInput);

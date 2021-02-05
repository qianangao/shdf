import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';

let tempSelectData = [];

const CueAssociation = ({ value, getLgbs, dispatch, onChange, actionRef, commit }) => {
  const tableRef = useRef({});
  const [selectModalVisible, setVisible] = useState(false);
  const [selectChildModalVisible, setChildVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [assoiation, setAssoiation] = useState(null);
  const [views, setViews] = useState(null);

  const [listData, setListData] = useState([]);

  const showModal = (item: any, view: any) => {
    setViews(view);
    setAssoiation(item || null);
    setVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  useEffect(() => {
    if (value && Array.isArray(value)) {
      setListData(value);
      setSelectedRowKeys(value.map(item => item.id));
    }
  }, [value]);

  // const changeListData = data => {
  //   setListData(data);
  //   onChange && onChange(data);
  // };
  const getCueAssociationById = params =>
    new Promise(resolve => {
      dispatch({
        type: 'cueAssociation/getAssociationList',
        payload: { ...params, id: assoiation && assoiation.clueId },
        resolve,
      });
    });

  const handleOk = () => {
    commit &&
      new Promise(resolve => {
        dispatch({
          type: commit.type,
          payload: { mainClueId: assoiation.clueId, relationClueIds: selectedRowKeys },
          resolve,
        });
      })
        .then(data => {
          if (data) {
            // setVisible(false);
          }
        })
        .catch(_ => {});

    onChange && onChange(listData, tempSelectData);

    // const listMap = new Map();
    //
    // listData.forEach(item => {
    //   listMap.set(item.id, item.realName);
    // });
    // tempSelectData.forEach(item => {
    //   listMap.set(item.id, item.realName);
    // });
    //
    // changeListData(
    //   Array.from(listMap).map(item => {
    //     return {
    //       id: item[0],
    //       realName: item[1],
    //     };
    //   }),
    // );
    // setVisible(false);
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
    {
      title: '线索编号',
      dataIndex: 'clueNumber',
      align: 'center',
      width: 140,
      hideInSearch: true,
    },

    {
      title: '线索名称',
      align: 'center',
      dataIndex: 'clueName',
    },
    {
      title: '线索类型',
      align: 'center',
      dataIndex: 'clueType',
      hideInSearch: true,
    },
    {
      title: '被举报人',
      align: 'center',
      dataIndex: 'reportedObjectName',
      hideInSearch: true,
    },
    {
      title: '被举报机构',
      align: 'center',
      dataIndex: 'reportedObjectName',
      hideInSearch: true,
    },
    {
      title: '发生地域',
      align: 'center',
      dataIndex: 'region',
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Modal
        title="选择串并联线索"
        centered
        width="90vw"
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          height: 'calc(95vh - 128px)',
          overflow: 'auto',
        }}
        visible={selectModalVisible}
        onOk={handleOk}
        destroyOnClose
        okText="添加"
        onCancel={() => setVisible(false)}
      >
        {views}
        <Button type="primary" onClick={() => setChildVisible(true)}>
          选择串并联线索
        </Button>
        <ProTable
          search={false}
          toolBarRender={false}
          pagination={false}
          rowKey="clueId"
          headerTitle="串并联线索信息"
          actionRef={tableRef}
          rowSelection={{
            onChange: (keys, rows) => {
              tempSelectData = rows;
              setSelectedRowKeys(keys);
            },
            selectedRowKeys,
          }}
          scroll={{ x: 'max-content' }}
          request={getLgbs || (async params => getCueAssociationById(params))}
          columns={columns}
        />
      </Modal>
      <Modal
        title="选择串并联信息"
        centered
        width="90vw"
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          height: 'calc(95vh - 128px)',
          overflow: 'auto',
        }}
        visible={selectChildModalVisible}
        onOk={handleOk}
        destroyOnClose
        okText="添加"
        onCancel={() => setChildVisible(false)}
      >
        <ProTable
          rowKey="clueId"
          headerTitle="串并联线索信息"
          actionRef={tableRef}
          rowSelection={{
            onChange: (keys, rows) => {
              tempSelectData = rows;
              setSelectedRowKeys(keys);
            },
            selectedRowKeys,
          }}
          scroll={{ x: 'max-content' }}
          request={getLgbs || (async params => getCueAssociationById(params))}
          columns={columns}
        />
      </Modal>
    </>
  );
};

export default connect(({ cueAssociation }) => ({
  cueAssociation,
}))(CueAssociation);

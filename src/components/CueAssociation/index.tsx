import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';

let tempSelectData: any[] = [];

const CueAssociation = ({
  value,
  getLgbs,
  dispatch,
  onSelected,
  actionRef,
  commit,
  loading,
  enums,
}) => {
  const tableRef = useRef({});
  const [selectModalVisible, setVisible] = useState(false);
  const [selectChildModalVisible, setChildVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedTempRowKeys, setSelectedTempRowKeys] = useState([]);
  const [clueId, setClueId] = useState(undefined);
  const [views, setViews] = useState(null);

  const [listData, setListData] = useState([]);

  const showModal = (id: any, view: any) => {
    setViews(view);
    setClueId(id);
    setVisible(true);
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['clue_type'],
      },
    });
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedRowKeys([]);
    setSelectedTempRowKeys([]);
    setClueId(undefined);
    setViews(null);
    tempSelectData = [];
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
        payload: { ...params, id: clueId },
        resolve,
      });
    });

  const selectClue = () => {
    setChildVisible(false);
  };

  const delSelectClue = (arr: any[]) => {
    const newArrKeys: React.SetStateAction<never[]> = [];
    selectedRowKeys.forEach(item => {
      if (!arr.includes(item)) {
        newArrKeys.push(item);
      }
    });
    setSelectedRowKeys(newArrKeys);
    const newSelectData: any[] = [];
    tempSelectData.forEach(item => {
      if (!arr.includes(item.clueId)) {
        newSelectData.push(item);
      }
    });
    tempSelectData = newSelectData;
  };

  const handleOk = () => {
    onSelected && onSelected(tempSelectData, listData);

    commit
      ? new Promise(resolve => {
          dispatch({
            type: commit.type,
            payload: { mainClueId: clueId, relationClueIds: selectedRowKeys },
            resolve,
          });
        })
          .then(data => {
            if (data) {
              hideModal();
            }
          })
          .catch(_ => {})
      : hideModal();

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
      valueEnum: enums.clue_type,
    },
    {
      title: '被举报人/机构/公司',
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
        title="串并联线索"
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
        confirmLoading={loading}
        onCancel={hideModal}
      >
        {views}
        <Button type="primary" onClick={() => setChildVisible(true)} disabled={loading}>
          选择串并联线索
        </Button>
        <ProTable
          search={false}
          toolBarRender={_ => [
            selectedTempRowKeys && selectedTempRowKeys.length && (
              <Button
                type="primary"
                onClick={() => {
                  Modal.confirm({
                    title: '确认删除所选择待串并联线索？',
                    onOk: () => delSelectClue(selectedTempRowKeys),
                  });
                }}
              >
                批量删除
              </Button>
            ),
          ]}
          pagination={false}
          rowKey="clueId"
          headerTitle="待串并联线索"
          actionRef={tableRef}
          scroll={{ x: 'max-content' }}
          rowSelection={{
            onChange: keys => {
              setSelectedTempRowKeys(keys);
            },
            selectedTempRowKeys,
          }}
          dataSource={tempSelectData}
          columns={columns}
        />
      </Modal>
      <Modal
        title="选择待串并联线索"
        centered
        width="90vw"
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          height: 'calc(95vh - 128px)',
          overflow: 'auto',
        }}
        visible={selectChildModalVisible}
        onOk={selectClue}
        destroyOnClose
        okText="选择"
        confirmLoading={loading}
        onCancel={() => setChildVisible(false)}
      >
        <ProTable
          rowKey="clueId"
          headerTitle="串并联线索"
          toolBarRender={false}
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

export default connect(({ cueAssociation, loading, global }) => ({
  cueAssociation,
  loading: loading.models.cueAssociation || loading.models.emClueManagement,
  enums: global.enums,
}))(CueAssociation);

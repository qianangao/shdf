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
      title: '??????',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    {
      title: '????????????',
      dataIndex: 'clueNumber',
      align: 'center',
      width: 140,
      hideInSearch: true,
    },

    {
      title: '????????????',
      align: 'center',
      dataIndex: 'clueName',
    },
    {
      title: '????????????',
      align: 'center',
      dataIndex: 'clueType',
      hideInSearch: true,
      valueEnum: enums.clue_type,
    },
    {
      title: '????????????/??????/??????',
      align: 'center',
      dataIndex: 'reportedObjectName',
      hideInSearch: true,
    },
    {
      title: '????????????',
      align: 'center',
      dataIndex: 'region',
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Modal
        title="???????????????"
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
        okText="??????"
        confirmLoading={loading}
        onCancel={hideModal}
      >
        {views}
        <Button type="primary" onClick={() => setChildVisible(true)} disabled={loading}>
          ????????????????????????
        </Button>
        <ProTable
          search={false}
          toolBarRender={_ => [
            selectedTempRowKeys && selectedTempRowKeys.length && (
              <Button
                type="primary"
                onClick={() => {
                  Modal.confirm({
                    title: '??????????????????????????????????????????',
                    onOk: () => delSelectClue(selectedTempRowKeys),
                  });
                }}
              >
                ????????????
              </Button>
            ),
          ]}
          pagination={false}
          rowKey="clueId"
          headerTitle="?????????????????????"
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
        title="????????????????????????"
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
        okText="??????"
        confirmLoading={loading}
        onCancel={() => setChildVisible(false)}
      >
        <ProTable
          rowKey="clueId"
          headerTitle="???????????????"
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

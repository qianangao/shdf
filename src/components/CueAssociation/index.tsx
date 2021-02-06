import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';

let tempSelectData: any[] = [];

const CueAssociation = ({ value, getLgbs, dispatch, onSelected, actionRef, commit }) => {
  const tableRef = useRef({});
  const [selectModalVisible, setVisible] = useState(false);
  const [selectChildModalVisible, setChildVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [association, setAssociation] = useState(null);
  const [views, setViews] = useState(null);

  const [listData, setListData] = useState([]);

  const showModal = (item: any, view: any) => {
    setViews(view);
    setAssociation(item);
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
        payload: { ...params, id: association && association.clueId },
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
            payload: { mainClueId: association.clueId, relationClueIds: selectedRowKeys },
            resolve,
          });
        })
          .then(data => {
            if (data) {
              setVisible(false);
            }
          })
          .catch(_ => {})
      : setVisible(false);

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
        onCancel={() => setVisible(false)}
      >
        {views}
        <Button type="primary" onClick={() => setChildVisible(true)}>
          选择串并联线索
        </Button>
        <ProTable
          search={false}
          toolBarRender={_ => [
            selectedRowKeys && selectedRowKeys.length && (
              <Button
                onClick={() => {
                  Modal.confirm({
                    title: '确认删除所选择待串并联线索？',
                    onOk: () => delSelectClue,
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
          rowSelection={{}}
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

export default connect(({ cueAssociation }) => ({
  cueAssociation,
}))(CueAssociation);

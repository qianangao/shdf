import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ProTable from '@ant-design/pro-table';

const OperatingLogModal = ({ dispatch, actionRef, tableRef, enums }) => {
  const [cueId, setCueId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = id => {
    setCueId(id);
    setModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
    setCueId(undefined);
  };
  const handleOk = () => {
    hideModal();
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

    { title: '日志时间', align: 'center', dataIndex: 'createTime', valueType: 'dateTime' },
    { title: '操作人员', align: 'center', dataIndex: 'createUser' },
    {
      title: '操作类型',
      align: 'center',
      dataIndex: 'oplogType',
      valueEnum: enums.clue_oplog_type,
    },
    {
      title: 'IP地址',
      align: 'center',
      dataIndex: 'clueType',
      hideInTable: true,
    },
    {
      title: '内容',
      align: 'center',
      dataIndex: 'oplogContent',
    },
  ];
  // 获取所有线索
  const getOperatingLogList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/getOperatingLogList',
        payload: { ...params, clueId: cueId },
        resolve,
      });
    });

  return (
    <Modal
      title="操作日志列表"
      centered
      destroyOnClose
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={hideModal}
    >
      <ProTable
        search={false}
        rowKey="oplogId"
        headerTitle="线索列表"
        actionRef={tableRef}
        scroll={{ x: 'max-content' }}
        request={async params => getOperatingLogList(params)}
        toolBarRender={false}
        columns={columns}
      />
    </Modal>
  );
};
export default connect(({ emClueManagement, global }) => ({
  tableRef: emClueManagement.tableRef,
  enums: global.enums,
}))(OperatingLogModal);

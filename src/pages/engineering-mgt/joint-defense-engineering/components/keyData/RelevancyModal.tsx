import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ProTable from '@ant-design/pro-table';

const RelevancyModal = ({ dispatch, actionRef, loading, enums, dictionaryMgt }) => {
  const tableRef = useRef({});
  const [selectModalVisible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [title, setTitle] = useState('选择非法出版物');
  const [type, setType] = useState(0);

  const showModal = (name, category) => {
    setTitle(name);
    setType(category);
    setVisible(true);
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['illegal_dict', 'dict_sex'],
      },
    });
  };

  const hideModal = () => {
    setSelectedRowKeys([]);
    setTitle('');
    setType(0);
    setVisible(false);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const getRelevancyBanPublishList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getRelevancyBanPublishList',
        payload: { ...params, id: dictionaryMgt.projectId },
        resolve,
      });
    });

  const getRelevancyPersonList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getRelevancyPersonList',
        payload: { ...params, id: dictionaryMgt.projectId },
        resolve,
      });
    });

  const getRelevancyInstitutionsList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getRelevancyInstitutionsList',
        payload: { ...params, id: dictionaryMgt.projectId },
        resolve,
      });
    });

  const getRelevancyClueList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getRelevancyClueList',
        payload: { ...params, id: dictionaryMgt.projectId },
        resolve,
      });
    });

  const handleOk = () => {
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/relationEngineering',
        payload: {
          projectId: dictionaryMgt.projectId,
          businessId: selectedRowKeys,
          businessType: type,
        },
        resolve,
      });
    })
      .then(data => {
        if (data) {
          hideModal();
        }
      })
      .catch(_ => {});
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
    { title: '作者及编著者', align: 'center', dataIndex: 'author', hideInSearch: true },
    { title: '书刊号', align: 'center', dataIndex: 'isbnIssn', hideInSearch: true },
    { title: '出版机构', align: 'center', dataIndex: 'organization', hideInSearch: true },
    {
      title: '出版日期',
      align: 'center',
      dataIndex: 'publicationDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'category',
      valueEnum: enums.illegal_dict,
      hideInSearch: true,
    },
  ];

  const personColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'personName' },
    { title: '证件号码', align: 'center', dataIndex: 'idCard' },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'sex',
      valueEnum: enums.dict_sex,
      hideInSearch: true,
    },
    { title: '年龄', align: 'center', dataIndex: 'age', hideInSearch: true },
    {
      title: '出生地',
      align: 'center',
      dataIndex: 'birthplace',
      hideInSearch: true,
    },
    {
      title: '生日',
      align: 'center',
      dataIndex: 'birthday',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'telephone',
      hideInSearch: true,
    },
  ];

  const institutionsColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '机构中文名', align: 'center', dataIndex: 'orgName', hideInSearch: true },
    { title: '机构代码', align: 'center', dataIndex: 'code' },
    { title: '联系人员', align: 'center', dataIndex: 'contacts', hideInSearch: true },
    {
      title: '中文地址',
      align: 'center',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: '成立时间',
      align: 'center',
      dataIndex: 'establishDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '机构类型',
      align: 'center',
      dataIndex: 'category',
      hideInTable: true,
    },
  ];

  const clueColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '线索名称', align: 'center', dataIndex: 'clueName' },
    { title: '线索编号', align: 'center', dataIndex: 'clueNumber', hideInSearch: true },
    {
      title: '线索类型',
      align: 'center',
      dataIndex: 'clueType',
      hideInSearch: true,
      valueEnum: enums.clue_type,
    },
    {
      title: '线索来源',
      align: 'center',
      hideInSearch: true,
      dataIndex: 'clueSource',
      valueEnum: enums.clue_source,
    },
    {
      title: '地域',
      align: 'center',
      dataIndex: 'region',
      valueEnum: enums.subject_secrecy_level,
      // width: 200,
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Modal
        title={title}
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
        okText="确定"
        confirmLoading={loading}
        onCancel={() => hideModal()}
      >
        {type === 0 && (
          <ProTable
            rowKey="publicationId"
            headerTitle="非法出版物列表"
            actionRef={tableRef}
            rowSelection={{
              onChange: keys => {
                setSelectedRowKeys(keys);
              },
              selectedRowKeys,
            }}
            scroll={{ x: 'max-content' }}
            request={async params => getRelevancyBanPublishList(params)}
            columns={columns}
          />
        )}
        {type === 1 && (
          <ProTable
            rowKey="personId"
            // toolBarRender={false}
            headerTitle="人物列表"
            actionRef={tableRef}
            rowSelection={{
              onChange: keys => {
                setSelectedRowKeys(keys);
              },
              selectedRowKeys,
            }}
            scroll={{ x: 'max-content' }}
            request={async params => getRelevancyPersonList(params)}
            columns={personColumns}
          />
        )}
        {type === 2 && (
          <ProTable
            rowKey="orgId"
            headerTitle="机构列表"
            actionRef={tableRef}
            rowSelection={{
              onChange: keys => {
                setSelectedRowKeys(keys);
              },
              selectedRowKeys,
            }}
            scroll={{ x: 'max-content' }}
            request={async params => getRelevancyInstitutionsList(params)}
            columns={institutionsColumns}
          />
        )}
        {type === 3 && (
          <ProTable
            rowKey="clueId"
            headerTitle="线索列表"
            actionRef={tableRef}
            rowSelection={{
              onChange: keys => {
                setSelectedRowKeys(keys);
              },
              selectedRowKeys,
            }}
            scroll={{ x: 'max-content' }}
            request={async params => getRelevancyClueList(params)}
            columns={clueColumns}
          />
        )}
      </Modal>
    </>
  );
};

export default connect(({ dictionaryMgt, loading, global }) => ({
  dictionaryMgt,
  loading: loading.models.dictionaryMgt,
  enums: global.enums,
}))(RelevancyModal);

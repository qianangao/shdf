import React, { useRef } from 'react';
import { Button, Popconfirm, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  kdKeyInstitutionsMgt,
  openModifyModal,
  openDetailModal,
  openAuthModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = kdKeyInstitutionsMgt;
  const uploadRef = useRef();

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '机构中文名', align: 'center', dataIndex: 'orgName' },
    { title: '机构代码', align: 'center', dataIndex: 'code' },
    { title: '联系人员', align: 'center', dataIndex: 'contacts', hideInSearch: true },
    {
      title: '中文地址',
      align: 'center',
      dataIndex: 'address',
    },
    {
      title: '成立时间',
      align: 'center',
      dataIndex: 'establishDate',
      valueType: 'date',
    },
    {
      title: '机构类型',
      align: 'center',
      dataIndex: 'category',
      valueEnum: enums.subject_secrecy_level,
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom: any, data: { orgId: any }) => [
        <a key={`${data.orgId}up`} onClick={() => openModifyModal(data.orgId)}>
          编辑
        </a>,
        <a key={`${data.orgId}detail`} onClick={() => openDetailModal(data.orgId)}>
          查看
        </a>,
        <Popconfirm
          key={`${data.orgId}del`}
          title="确认删除该重点机构吗？"
          placement="topRight"
          onConfirm={() => deleteKeyInstitutions(data.orgId)}
        >
          <a>删除</a>
        </Popconfirm>,
        <a key={`${data.orgId}auth`} onClick={() => openAuthModal(data.orgId)}>
          授权
        </a>,
      ],
    },
  ];

  const getKeyInstitutions = (params: any) =>
    new Promise(resolve => {
      dispatch({
        type: 'kdKeyInstitutionsMgt/getKeyInstitutions',
        payload: { ...params },
        resolve,
      });
    });

  const deleteKeyInstitutions = (orgId: any) => {
    dispatch({
      type: 'kdKeyInstitutionsMgt/deleteKeyInstitutions',
      payload: { orgId },
    });
  };

  const templateDownload = () => {
    dispatch({
      type: 'kdKeyInstitutionsMgt/templateDownload',
    });
  };

  const importInstitution = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importInstitution' });
    new Promise(resolve => {
      dispatch({
        type: 'kdKeyInstitutionsMgt/importInstitutions',
        payload: {
          file,
          type: 'excel',
        },
        resolve,
      });
    })
      .then(res => {
        if (res && res.failure > 0) {
          message.error(`${res.failure}条数据格式有误，请确认并更正数据后重新导入`);
        }
      })
      .finally(() => {
        message.destroy('importInstitution');
      });
    e.target.value = '';
  };

  const exportInstitution = selectedRowKeys => {
    // const ids = selectedRowKeys.join(',');
    message.loading({ content: '数据正在处理中，请稍后……', key: 'exportInstitution' });
    new Promise(resolve => {
      dispatch({
        type: 'kdKeyInstitutionsMgt/exportInstitutions',
        payload: { ids: selectedRowKeys },
        resolve,
      });
    })
      .then(_ => {})
      .finally(() => {
        message.destroy('exportInstitution');
      });
  };

  return (
    <ProTable
      rowKey="orgId"
      headerTitle="重点机构"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getKeyInstitutions(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        <Button type="primary" onClick={() => templateDownload()}>
          模板下载
        </Button>,
        <>
          <input
            type="file"
            name="file"
            onChange={importInstitution}
            style={{ display: 'none' }}
            ref={uploadRef}
          />
          <Button
            type="primary"
            onClick={() => {
              uploadRef.current.click();
            }}
          >
            导入
          </Button>
        </>,
        <Button
          type="primary"
          onClick={() => {
            exportInstitution(selectedRowKeys);
          }}
        >
          导出
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ kdKeyInstitutionsMgt, global }) => ({
  kdKeyInstitutionsMgt,
  enums: global.enums,
}))(Table);

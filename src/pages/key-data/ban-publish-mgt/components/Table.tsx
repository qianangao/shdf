import React, { useRef } from 'react';
import { Button, message, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  kdBanPublishMgt,
  openModifyModal,
  openDetailModal,
  openAuthModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = kdBanPublishMgt;
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
    { title: '中文名称', align: 'center', dataIndex: 'name' },
    { title: '作者及编著者', align: 'center', dataIndex: 'author' },
    {
      title: '保密级别',
      align: 'center',
      dataIndex: 'subjectSecrecyLevel',
      valueEnum: enums.subject_secrecy_level,
      hideInTable: true,
    },
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
    {
      title: '鉴定类型',
      align: 'center',
      dataIndex: 'appraisalType',
      valueEnum: enums.subject_secrecy_level,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a key={`${data.publicationId}detail`} onClick={() => openDetailModal(data.publicationId)}>
          查看
        </a>,
        <a key={`${data.publicationId}up`} onClick={() => openModifyModal(data.publicationId)}>
          编辑
        </a>,
        <a key={`${data.publicationId}auth`} onClick={() => openAuthModal(data.publicationId)}>
          授权
        </a>,
        <Popconfirm
          key={`${data.publicationId}del`}
          title="确认删除该非法出版物吗？"
          placement="topRight"
          onConfirm={() => deleteBanPublish(data.publicationId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getKeyBanPublishList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'kdBanPublishMgt/getKeyBanPublishList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteBanPublish = publicationId => {
    dispatch({
      type: 'kdBanPublishMgt/deleteBanPublish',
      payload: { publicationId },
    });
  };

  const templateDownload = () => {
    dispatch({
      type: 'kdBanPublishMgt/templateDownload',
    });
  };

  const importBanPublish = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importBanPublish' });
    new Promise(resolve => {
      dispatch({
        type: 'kdBanPublishMgt/importBanPublish',
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
        message.destroy('importBanPublish');
      });
    e.target.value = '';
  };

  const exportBanPublish = selectedRowKeys => {
    // const ids = selectedRowKeys.join(',');
    message.loading({ content: '数据正在处理中，请稍后……', key: 'exportBanPublish' });
    new Promise(resolve => {
      dispatch({
        type: 'kdBanPublishMgt/exportBanPublish',
        payload: { publicationId: selectedRowKeys },
        resolve,
      });
    })
      .then(_ => {})
      .finally(() => {
        message.destroy('exportBanPublish');
      });
  };

  return (
    <ProTable
      rowKey="publicationId"
      headerTitle="非法出版物"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getKeyBanPublishList(params)}
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
            onChange={importBanPublish}
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
            exportBanPublish(selectedRowKeys);
          }}
        >
          导出
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ kdBanPublishMgt, global }) => ({
  kdBanPublishMgt,
  enums: global.enums,
}))(Table);

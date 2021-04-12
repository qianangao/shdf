import React, { useRef } from 'react';
import { Button, message, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';

const Table = ({
  kdKeyPersonMgt,
  openModifyModal,
  openDetailModal,
  openAuthModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = kdKeyPersonMgt;
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
    { title: '姓名', align: 'center', dataIndex: 'personName' },
    { title: '证件号码', align: 'center', dataIndex: 'idCard' },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'sex',
      valueEnum: enums.dict_sex,
    },
    { title: '年龄', align: 'center', dataIndex: 'age' },
    {
      title: '出生地',
      align: 'center',
      dataIndex: 'birthplace',
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
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom: any, data: { personId: any }) => [
        <a
          key={`${data.personId}up`}
          onClick={() => openModifyModal(data.personId)}
          hidden={!checkAuthority('kd/kpm/update')}
        >
          编辑
        </a>,
        <a
          key={`${data.personId}detail`}
          onClick={() => openDetailModal(data.personId)}
          hidden={!checkAuthority('kd/kpm/detail')}
        >
          查看
        </a>,
        <Popconfirm
          key={`${data.personId}del`}
          title="确认删除该重点人物吗？"
          placement="topRight"
          onConfirm={() => deleteKeyPerson(data.personId)}
        >
          <a hidden={!checkAuthority('kd/kpm/delete')}>删除</a>
        </Popconfirm>,
        <a
          key={`${data.personId}auth`}
          onClick={() => openAuthModal(data.personId)}
          hidden={!checkAuthority('kd/kpm/authUser')}
        >
          授权
        </a>,
      ],
    },
  ];

  const getKeyPerson = (params: any) =>
    new Promise(resolve => {
      dispatch({
        type: 'kdKeyPersonMgt/getKeyPerson',
        payload: { ...params },
        resolve,
      });
    });

  const deleteKeyPerson = (personId: any) => {
    dispatch({
      type: 'kdKeyPersonMgt/deleteKeyPerson',
      payload: { personId },
    });
  };

  const templateDownload = () => {
    dispatch({
      type: 'kdKeyPersonMgt/templateDownload',
    });
  };

  const importPerson = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importPerson' });
    new Promise(resolve => {
      dispatch({
        type: 'kdKeyPersonMgt/importPerson',
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
        message.destroy('importPerson');
      });
    e.target.value = '';
  };

  const exportPerson = selectedRowKeys => {
    // const ids = selectedRowKeys.join(',');
    message.loading({ content: '数据正在处理中，请稍后……', key: 'exportPerson' });
    new Promise(resolve => {
      dispatch({
        type: 'kdKeyPersonMgt/exportPerson',
        payload: { ids: selectedRowKeys },
        resolve,
      });
    })
      .then(_ => {})
      .finally(() => {
        message.destroy('exportPerson');
      });
  };

  return (
    <ProTable
      rowKey="personId"
      headerTitle="重点人物"
      actionRef={tableRef}
      rowClassName={getSecrecyRowClassName}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getKeyPerson(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button
          type="primary"
          onClick={() => openModifyModal()}
          hidden={!checkAuthority('kd/kpm/add')}
        >
          新增
        </Button>,
        <Button
          type="primary"
          onClick={() => templateDownload()}
          hidden={!checkAuthority('kd/kpm/download')}
        >
          模板下载
        </Button>,
        <>
          <input
            type="file"
            name="file"
            onChange={importPerson}
            style={{ display: 'none' }}
            ref={uploadRef}
          />
          <Button
            type="primary"
            onClick={() => {
              uploadRef.current.click();
            }}
            hidden={!checkAuthority('kd/kpm/import')}
          >
            导入
          </Button>
        </>,
        <Button
          type="primary"
          onClick={() => {
            exportPerson(selectedRowKeys);
          }}
          hidden={!checkAuthority('kd/kpm/export')}
        >
          导出
        </Button>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ kdKeyPersonMgt, global }) => ({
  kdKeyPersonMgt,
  enums: global.enums,
}))(Table);

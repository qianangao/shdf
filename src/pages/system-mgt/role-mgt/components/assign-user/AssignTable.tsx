import React, { useRef } from 'react';
import { Button, Popconfirm, Modal, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const AssignTable = ({ smRoleMgt, modifyUserModal, dispatch }) => {
  const { userTableRef } = smRoleMgt;
  const uploadLgbListRef = useRef();
  const columns = [
    // {
    //   title: '序号',
    //   dataIndex: 'index',
    //   valueType: 'index',
    //   align: 'center',
    //   fixed: 'left',
    //   width: 64,
    // },
    { title: '姓名', align: 'center', dataIndex: 'roleName' },
    { title: '出生日期', align: 'center', dataIndex: 'remark', hideInSearch: true },
    { title: '所属部门', align: 'center', dataIndex: 'remark' },
    { title: '专/兼职', align: 'center', dataIndex: 'remark', hideInSearch: true },
    { title: '状态', align: 'center', dataIndex: 'remark', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, roleData) => [
        roleData.isEdit === 1 && (
          <a key={`${roleData.id}up`} onClick={() => modifyUserModal(roleData)}>
            编辑
          </a>
        ),
        <a key={`${roleData.id}deal`}>设置角色</a>,
        roleData.isEdit === 1 && (
          <Popconfirm
            key={`${roleData.id}del`}
            title="确认删除该角色吗？该操作不可恢复"
            placement="topRight"
            onConfirm={() => deleteRoles([roleData.id])}
          >
            <a>删除</a>
          </Popconfirm>
        ),
      ],
    },
  ];

  const templateDownload = () => {
    dispatch({
      type: 'smRoleMgt/templateDownload',
    });
  };

  const importUserInfo = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importUserInfo' });
    new Promise(resolve => {
      dispatch({
        type: 'smRoleMgt/importUserInfo',
        payload: {
          file,
          type: 'excel',
        },
        resolve,
      });
    })
      .then(res => {
        if (res && res.failure > 0) {
          Modal.warning({
            title: '导入数据格式有误！',
            width: 640,
            content: (
              <div
                style={{
                  maxHeight: 400,
                  overflow: 'auto',
                }}
              >
                {`${res.failure}条数据格式有误，请确认并更正数据后重新导入`}
              </div>
            ),
          });
        }
      })
      .finally(() => {
        message.destroy('importUserInfo');
      });
    e.target.value = '';
  };

  const getRoleList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smRoleMgt/getUserList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteRoles = ids => {
    dispatch({
      type: 'smRoleMgt/deleteRoles',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="工作人员信息"
      actionRef={userTableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getRoleList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => modifyUserModal()}>
          新增
        </Button>,
        <Button
          onClick={() => {
            Modal.confirm({
              title: '确认删除所选择单位？该操作不可恢复',
              onOk: () => {
                deleteRoles(selectedRowKeys);
              },
            });
          }}
        >
          删除
        </Button>,
        <Button type="primary" onClick={() => templateDownload()}>
          模板下载
        </Button>,
        <>
          <input
            type="file"
            name="file"
            onChange={importUserInfo}
            style={{ display: 'none' }}
            ref={uploadLgbListRef}
          />
          <Button
            type="primary"
            onClick={() => {
              uploadLgbListRef.current.click();
            }}
          >
            导入
          </Button>
        </>,
      ]}
      columns={columns}
    />
  );
};

export default connect(({ smRoleMgt }) => ({
  smRoleMgt,
}))(AssignTable);

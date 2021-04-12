import React, { useRef } from 'react';
import { Button, Popconfirm, message, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';

const Table = ({ guanli, openModifyModal, openDetailModal, dispatch }) => {
  const { tableRef } = guanli;
  const formRef = useRef();
  const uploadLgbListRef = useRef();
  const deleteOrgList = orgId => {
    dispatch({
      type: 'guanli/deleteOrgList',
      payload: orgId,
    });
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
    { title: '上级机构', align: 'center', dataIndex: 'orgPid', hideInSearch: true },
    { title: '机构名称', align: 'center', dataIndex: 'orgName' },
    { title: '机构编号', align: 'center', dataIndex: 'orgCode' },
    {
      title: '机构简称',
      align: 'center',
      dataIndex: 'orgSimpleName',
      hideInSearch: true,
    },
    { title: '机构分类', align: 'center', dataIndex: 'orgType', hideInSearch: true },
    { title: '机构性质', align: 'center', dataIndex: 'orgNature', hideInSearch: true },
    { title: '机构类型', align: 'center', dataIndex: 'orgKind', hideInSearch: true },
    // { title: '机构指令', align: 'center', dataIndex: 'orgOrder', hideInSearch: true },
    // { title: '主管人员', align: 'center', dataIndex: 'chargePerson', hideInSearch: true },
    // { title: '职能描述', align: 'center', dataIndex: 'functionDesc', hideInSearch: true },
    // { title: '创建人', align: 'center', dataIndex: 'createUser', hideInSearch: true },
    // { title: '创建时间', align: 'center', dataIndex: 'createTime', hideInSearch: true },
    // { title: '最近一次操作人', align: 'center', dataIndex: 'lastUpdateUser', hideInSearch: true },
    // { title: '最近一次操作时间', align: 'center', dataIndex: 'lastUpdataTime', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.orgId}detail`}
          onClick={() => openDetailModal(data.orgId)}
          hidden={!checkAuthority('sm/um/detail')}
        >
          查看
        </a>,
        <a
          key={`${data.orgId}up`}
          onClick={() => openModifyModal(data.orgId)}
          hidden={!checkAuthority('sm/um/update')}
        >
          修改
        </a>,
        <Popconfirm
          key={`${data.orgId}del`}
          title="确认删除该人员信息吗？"
          placement="topRight"
          onConfirm={() => deleteOrgList(data.orgId)}
        >
          <a hidden={!checkAuthority('sm/um/detail')}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getOrgList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'guanli/getOrgList',
        payload: { ...params },
        resolve,
      });
    });

  // const templateDownload = () => {//
  //   dispatch({
  //     type: 'guanli/templateDownload',
  //   });
  // };

  const importAddressBook = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importsAddressBook' });
    new Promise(resolve => {
      dispatch({
        type: 'guanli/importAddressBook', //
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
        message.destroy('importsAddressBook');
      });
    e.target.value = '';
  };

  // const exportDetailData = selectedRowKeys => {
  //   const bookIds = selectedRowKeys.join(',');
  //   dispatch({
  //     type: 'guanli/exportAddressBook',//
  //     payload: { bookIds },
  //   });
  // };

  return (
    <div>
      <ProTable
        rowKey="orgId"
        headerTitle="组织列表"
        actionRef={tableRef}
        formRef={formRef}
        rowClassName={getSecrecyRowClassName}
        rowSelection={[]}
        scroll={{ x: 'max-content' }}
        request={async params => getOrgList(params)}
        toolBarRender={_ => [
          <Button
            type="primary"
            onClick={() => openModifyModal()}
            hidden={!checkAuthority('sm/um/add')}
          >
            新增
          </Button>,
          // <Button type="primary" onClick={() => templateDownload()}>
          //   模板下载
          // </Button>,
          <>
            <input
              type="file"
              name="file"
              onChange={importAddressBook}
              style={{ display: 'none' }}
              ref={uploadLgbListRef}
            />
            {/* <Button
              type="primary"
              onClick={() => {
                uploadLgbListRef.current.click();
              }}
            >
              导入
            </Button> */}
          </>,
          // <Button
          //   type="primary"
          //   onClick={() => {
          //     exportDetailData(selectedRowKeys);
          //   }}
          // >
          //   导出
          // </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ guanli }) => ({
  guanli,
}))(Table);

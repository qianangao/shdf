import React, { useRef } from 'react';
import { Button, message, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';

const Table = ({ emAddressBook, dispatch, enums }) => {
  const { tableRef } = emAddressBook;
  const formRef = useRef();
  const uploadLgbListRef = useRef();
  // const deleteAddressBook = bookId => {
  //   dispatch({
  //     type: 'emAddressBook/deleteAddressBook',
  //     payload: bookId,
  //   });
  // };

  const columns = [
    { title: '姓名', align: 'center', dataIndex: 'userName' },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'gender',
      hideInSearch: true,
      valueEnum: enums.dict_sex,
    },
    {
      title: '所属部门',
      align: 'center',
      dataIndex: 'userDept',
    },
    { title: '当前职务', align: 'center', dataIndex: 'job', hideInSearch: true },
    { title: '手机号', align: 'center', dataIndex: 'phoneNumber', hideInSearch: true },
    { title: '办公电话', align: 'center', dataIndex: 'officeTelephone', hideInSearch: true },
    // { title: '邮箱', align: 'center', dataIndex: 'mailbox', hideInSearch: true },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   align: 'center',
    //   dataIndex: 'id',
    //   width: 180,
    //   fixed: 'right',
    //   render: (dom, data) => [
    //     <a key={`${data.bookId}up`} onClick={() => openModifyModal(data.bookId)}>
    //       修改
    //     </a>,
    //     <Popconfirm
    //       key={`${data.bookId}del`}
    //       title="确认删除该人员信息吗？"
    //       placement="topRight"
    //       onConfirm={() => deleteAddressBook(data.bookId)}
    //     >
    //       <a>删除</a>
    //     </Popconfirm>,
    //   ],
    // },
  ];

  const getAddressBook = params =>
    new Promise(resolve => {
      dispatch({
        type: 'emAddressBook/getAddressBook',
        payload: { ...params },
        resolve,
      });
    });

  const templateDownload = () => {
    dispatch({
      type: 'emAddressBook/templateDownload',
    });
  };

  const importAddressBook = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importsAddressBook' });
    new Promise(resolve => {
      dispatch({
        type: 'emAddressBook/importAddressBook',
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

  const exportDetailData = selectedRowKeys => {
    const bookIds = selectedRowKeys.join(',');
    dispatch({
      type: 'emAddressBook/exportAddressBook',
      payload: { bookIds },
    });
  };

  return (
    <div>
      <ProTable
        rowKey="bookId"
        headerTitle="人员列表"
        actionRef={tableRef}
        formRef={formRef}
        rowSelection={[]}
        rowClassName={getSecrecyRowClassName}
        scroll={{ x: 'max-content' }}
        request={async params => getAddressBook(params)}
        toolBarRender={(_, { selectedRowKeys }) => [
          // <Button type="primary" onClick={() => openModifyModal()}>
          //   新增
          // </Button>,
          <Button type="primary" onClick={() => templateDownload()}>
            模板下载
          </Button>,
          <>
            <input
              type="file"
              name="file"
              onChange={importAddressBook}
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
          <Button
            type="primary"
            onClick={() => {
              exportDetailData(selectedRowKeys);
            }}
          >
            导出
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ emAddressBook, global }) => ({
  emAddressBook,
  enums: global.enums,
}))(Table);

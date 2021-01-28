import React, {useRef}from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import UploadInput from '@/components/UploadInput';
// import DepartmentTree from './departmentTree';

const Table = ({ emAddressBook, openModifyModal, dispatch }) => {
  const { tableRef } = emAddressBook;
  const formRef = useRef();
  const uploadLgbListRef = useRef();

  const deleteAddressBook = bookId => {
    dispatch({
      type: 'emAddressBook/deleteAddressBook',
      payload: bookId ,
    });
  };

  const columns = [
    { title: '姓名', align: 'center', dataIndex: 'userName' },
    { title: '性别', align: 'center', dataIndex: 'gender', hideInSearch: true,
  render:(dom, data) =>(
    <>
    {
      data.gender === 0 && (<span>女</span>)
    }
    {
      data.gender === 1 && (<span>男</span>)
    }
    {
      data.gender ===2 && (<span>保密</span>)
    }
    </>
  )
   },
    {
      title: '所属部门',
      align: 'center',
      dataIndex: 'userDept',
      // valueEnum: {
      //   付小小: { text: '付小小' },
      //   曲丽丽: { text: '曲丽丽' },
      //   林东东: { text: '林东东' },
      //   陈帅帅: { text: '陈帅帅' },
      //   兼某某: { text: '兼某某' },
      // },
    },
    { title: '当前职务', align: 'center', dataIndex: 'job', hideInSearch: true },
    { title: '手机号', align: 'center', dataIndex: 'phoneNumber', hideInSearch: true },
    { title: '办公电话', align: 'center', dataIndex: 'officeTelephone', hideInSearch: true },
    { title: '邮箱', align: 'center', dataIndex: 'mailbox', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a key={`${data.bookId}up`} onClick={() => openModifyModal(data.bookId)}>
          修改
        </a>,
        <Popconfirm
          key={`${data.bookId}del`}
          title="确认删除该人员信息吗？"
          placement="topRight"
          onConfirm={() => deleteAddressBook(data.bookId)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
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

  const importLgbs = e => {
    const file = e.target.files[0];

    message.loading({ content: '文件上传中，请稍后……', key: 'importsLgbKey', duration: 0 });

    new Promise(resolve => {
      dispatch({
        type: 'global/uploadFile',
        payload: {
          file,
          type: 'excel',
          isLocal: true,
        },
        resolve,
      });
    })
      // .then(data => {
      //   return new Promise(resolve => {
      //     dispatch({
      //       type: 'emAddressBook/templateDownload',
      //       payload: data,
      //       resolve,
      //     });
      //   });
      // })
      .then(res => {
        if (res && res.length > 0) {
          Modal.warning({
            title: '导入数据格式有误，请确认并更正数据后重新导入！',
            width: 640,
            content: (
              <div
                style={{
                  maxHeight: 400,
                  overflow: 'auto',
                }}
              >
                {res.map(item => (
                  <div key={item.reason}>{item.reason}</div>
                ))}
              </div>
            ),
          });
        }
      })
      .finally(() => {
        message.destroy('importsLgbKey');
      });

    e.target.value = '';
  };
  const exportDetailData = selectedRowKeys => {
    let bookIds = selectedRowKeys.join(',')
    // if (selectedRowKeys && selectedRowKeys.length) {
      dispatch({
        type: 'emAddressBook/exportAddressBook',
        payload: bookIds,
      });
      return;
    // }

    tableRef.current.reload();

    dispatch({
      type: 'emAddressBook/exportAddressBook',
      payload: {
        ...formRef.current.getFieldsValue(),
      },
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
        scroll={{ x: 'max-content' }}
        request={async params => getAddressBook(params)}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button type="primary" onClick={() => openModifyModal()}>
            新增
          </Button>,
           <Button
           onClick={() => {
             const url = '/通讯录人员信息导入模板.xlsx';
             window.open(url);
           }}
         >
           模板下载
         </Button>,
        <>
          <input
            type="file"
            name="file"
            onChange={importLgbs}
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
          // <Button onClick={() => templateDownload()}>模板下载</Button>,
          // <UploadInput type="excel" />,
          // selectedRowKeys && selectedRowKeys.length && (
          //   <Button type="primary" onClick={() => exportAddressBook(selectedRowKeys)}>
          //     导出
          //   </Button>
          // ),
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ emAddressBook }) => ({
  emAddressBook,
}))(Table);

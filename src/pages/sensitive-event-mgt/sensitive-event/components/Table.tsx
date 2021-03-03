import React, { useRef } from 'react';
import { Button, Modal, Popconfirm, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  sensitiveMgt,
  openAuthorizeModal,
  openModifyModal,
  openDetailModal,
  openApplyCaseModal,
  openRecordDetailModal,
  openRecordApprovalModifyModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = sensitiveMgt;
  const uploadLgbListRef = useRef();
  const del = id => {
    const param = [id];
    dispatch({
      type: 'sensitiveMgt/del',
      payload: {
        param,
      },
    });
  };

  const recall = id => {
    dispatch({
      type: 'sensitiveMgt/recall',
      payload: {
        id,
      },
    });
  };
  const completed = id => {
    dispatch({
      type: 'sensitiveMgt/completed',
      payload: {
        id,
      },
    });
  };
  const createButton = caseData => {
    const Cat = (
      <a key={`${caseData.eventId}cat`} onClick={() => openDetailModal(caseData)}>
        查看
      </a>
    );
    const Edit = (
      <a key={`${caseData.eventId}up`} onClick={() => openModifyModal(caseData)}>
        编辑
      </a>
    );
    const Delete = (
      <Popconfirm
        key={`${caseData.eventId}del`}
        title="确认删除？"
        placement="topRight"
        onConfirm={() => del(caseData.eventId)}
      >
        <a>删除</a>
      </Popconfirm>
    );
    const Auth = (
      <a key={`${caseData.eventId}role`} onClick={() => openAuthorizeModal(caseData)}>
        授权
      </a>
    );
    const Well = (
      <Popconfirm
        key={`${caseData.eventId}re_re`}
        title="确认办结？"
        placement="topRight"
        onConfirm={() => completed(caseData.eventId)}
      >
        <a>办结</a>
      </Popconfirm>
    );

    switch (caseData.handleStatus) {
      case 0:
        return [Cat, Edit, Delete];
      case 1:
        return [Auth, Well];
      case 2:
        return [Cat];
      default:
        return [Cat, Edit, Delete];
    }
  };

  const createSuperviseButton = caseData => {
    const ApplyCase = (
      <a key={`${caseData.eventId}app_re`} onClick={() => openApplyCaseModal(caseData)}>
        申请备案
      </a>
    );
    const Recall = (
      <Popconfirm
        key={`${caseData.eventId}re_re`}
        title="确认撤回？"
        placement="topRight"
        onConfirm={() => recall(caseData.eventId)}
      >
        <a>撤回备案</a>
      </Popconfirm>
    );
    const RecordApproval = (
      <a key={`${caseData.eventId}re_app`} onClick={() => openRecordApprovalModifyModal(caseData)}>
        备案审批
      </a>
    );
    const RecordDetail = (
      <a key={`${caseData.eventId}in_re`} onClick={() => openRecordDetailModal(caseData)}>
        备案信息
      </a>
    );

    switch (caseData.superviseStatus) {
      case 0: // 未备案
        return [ApplyCase];
      case 1: // 备案审批中
        return [Recall, RecordApproval];
      case 2: // 备案不通过
        return [RecordApproval, RecordDetail];
      case 3: // 已备案
        return [RecordDetail];
      default:
        return [ApplyCase];
    }
  };

  const columns = [
    {
      title: '敏感事件名称',
      dataIndex: 'eventName',
      align: 'center',
    },
    { title: '敏感事件编号', align: 'center', dataIndex: 'eventCode' },
    {
      title: '事件类型',
      align: 'center',
      dataIndex: 'eventType',
      valueEnum: enums.case_type,
    },
    {
      title: '事件来源',
      dataIndex: 'eventSource',
    },
    {
      title: '事件地域',
      align: 'center',
      dataIndex: 'belongRegional',
      hideInSearch: true,
    },
    {
      title: '办理状态',
      align: 'center',
      dataIndex: 'handleStatus',
      valueEnum: enums.handle_state,
      hideInSearch: true,
    },
    {
      title: '办理操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'eventId',
      width: 180,
      fixed: 'right',
      render: (dom, caseData) => createButton(caseData),
    },
    {
      title: '备案状态',
      align: 'center',
      dataIndex: 'superviseStatus',
      valueEnum: enums.case_supervise_state,
      fixed: 'right',
      width: 80,
      hideInSearch: true,
    },
    {
      title: '备案操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'receiptId',
      width: 180,
      fixed: 'right',
      render: (dom, caseData) => createSuperviseButton(caseData),
    },
  ];

  const getList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'sensitiveMgt/getList',
        payload: { ...params },
        resolve,
      });
    });

  const templateDownload = () => {
    dispatch({
      type: 'sensitiveMgt/templateDownload',
    });
  };

  const importCase = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importsAddressBook' });
    new Promise(resolve => {
      dispatch({
        type: 'sensitiveMgt/importCase',
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
        message.destroy('error++');
      });
    e.target.value = '';
  };

  const exportDetailData = () => {
    // const bookIds = selectedRowKeys.join(',');
    message.loading({ content: '文件导出，请稍后……', key: 'importsAddressBook' });
    dispatch({
      type: 'sensitiveMgt/exportCase',
    });
    message.destroy('error++');
  };

  return (
    <ProTable
      actionRef={tableRef}
      rowKey="eventId"
      headerTitle="敏感事件列表"
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getList(params)}
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
            onChange={importCase}
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
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择单位？该操作不可恢复',
                onOk: () => {
                  del(selectedRowKeys);
                },
              });
            }}
          >
            批量删除
          </Button>
        ),
      ]}
      columns={columns}
    />
  );
};

export default connect(({ sensitiveMgt, global }) => ({
  sensitiveMgt,
  enums: global.enums,
}))(Table);

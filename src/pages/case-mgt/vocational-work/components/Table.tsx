import React, { useRef } from 'react';
import { Button, Modal, Popconfirm, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  caseMgt,
  openAuthorizeModal,
  openModifyModal,
  openDetailModal,
  openApplyCaseModal,
  openRecordDetailModal,
  openRecordApprovalModifyModal,
  openApplySuperviseModal,
  openSuperviseModal,
  openSuperviseApprovalModal,
  openSuperviseDetailModal,
  openEvaluateModal,
  openEvaluateFeedbackModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = caseMgt;
  const uploadLgbListRef = useRef();
  const del = id => {
    dispatch({
      type: 'caseMgt/del',
      payload: {
        id,
      },
    });
  };

  const recallSupervise = id => {
    dispatch({
      type: 'caseMgt/recallSupervise',
      payload: {
        id,
      },
    });
  };

  const recall = id => {
    dispatch({
      type: 'caseMgt/recall',
      payload: {
        id,
      },
    });
  };
  const completed = id => {
    dispatch({
      type: 'caseMgt/completed',
      payload: {
        id,
      },
    });
  };
  const createButton = caseData => {
    const Cat = (
      <a key={`${caseData.caseId}cat`} onClick={() => openDetailModal(caseData)}>
        查看
      </a>
    );
    const Edit = (
      <a key={`${caseData.caseId}up`} onClick={() => openModifyModal(caseData)}>
        编辑
      </a>
    );
    const Delete = (
      <Popconfirm
        key={`${caseData.caseId}del`}
        title="确认删除？"
        placement="topRight"
        onConfirm={() => del(caseData.caseId)}
      >
        <a>删除</a>
      </Popconfirm>
    );
    const Auth = (
      <a key={`${caseData.caseId}role`} onClick={() => openAuthorizeModal(caseData)}>
        授权
      </a>
    );
    const Well = (
      <Popconfirm
        key={`${caseData.caseId}re_re`}
        title="确认办结？"
        placement="topRight"
        onConfirm={() => completed(caseData.caseId)}
      >
        <a>办结</a>
      </Popconfirm>
    );

    const Evaluate = (
      <a key={`${caseData.caseId}eval`} onClick={() => openEvaluateModal(caseData)}>
        评价
      </a>
    );

    const EvaluateFeedback = (
      <a key={`${caseData.caseId}ev_ba`} onClick={() => openEvaluateFeedbackModal(caseData)}>
        评价反馈
      </a>
    );
    switch (caseData.handleState) {
      case 0:
        return [Cat, Edit, Delete];
      case 1:
        return [Auth, Well];
      case 2:
        switch (caseData.evaluateState) {
          case 0:
            return [Evaluate];
          case 1:
            return [EvaluateFeedback];
          case 2:
            return [Cat];
          default:
            return [Evaluate];
        }
      default:
        return [Cat, Edit, Delete];
    }
  };

  const createSuperviseButton = caseData => {
    const ApplyCase = (
      <a key={`${caseData.caseId}app_re`} onClick={() => openApplyCaseModal(caseData)}>
        申请备案
      </a>
    );
    const Recall = (
      <Popconfirm
        key={`${caseData.caseId}re_re`}
        title="确认撤回？"
        placement="topRight"
        onConfirm={() => recall(caseData.caseId)}
      >
        <a>撤回备案</a>
      </Popconfirm>
    );
    const RecordApproval = (
      <a key={`${caseData.caseId}re_app`} onClick={() => openRecordApprovalModifyModal(caseData)}>
        备案审批
      </a>
    );
    const RecordDetail = (
      <a key={`${caseData.caseId}in_re`} onClick={() => openRecordDetailModal(caseData)}>
        备案信息
      </a>
    );
    const ApplySupervise = (
      <a key={`${caseData.caseId}app_do`} onClick={() => openApplySuperviseModal(caseData)}>
        申请督办
      </a>
    );
    const Supervise = (
      <a key={`${caseData.caseId}do`} onClick={() => openSuperviseModal(caseData)}>
        督办
      </a>
    );
    const SuperviseApproval = (
      <a key={`${caseData.caseId}pa_do`} onClick={() => openSuperviseApprovalModal(caseData)}>
        督办审批
      </a>
    );
    const rollbackSupervise = (
      <Popconfirm
        key={`${caseData.caseId}re_re`}
        title="确认撤回？"
        placement="topRight"
        onConfirm={() => recallSupervise(caseData.caseId)}
      >
        <a>撤回督办</a>
      </Popconfirm>
    );
    const SuperviseDetail = (
      <a key={`${caseData.caseId}in_do`} onClick={() => openSuperviseDetailModal(caseData)}>
        督办信息
      </a>
    );

    switch (caseData.caseSuperviseState) {
      case 0: // 未备案
        return [ApplyCase];
      case 1: // 备案审批中
        return [Recall, RecordApproval];
      case 2: // 备案不通过
        return [RecordApproval, RecordDetail];
      case 3: // 已备案
        return [ApplySupervise, Supervise, RecordDetail];
      case 4: // 督办审批中
        return [rollbackSupervise, SuperviseApproval];
      case 5: // 督办不通过
        return [SuperviseApproval, SuperviseDetail];
      case 6: // 督办中
        return [SuperviseDetail];
      default:
        return [ApplyCase];
    }
  };

  const columns = [
    {
      title: '案件名称',
      dataIndex: 'caseName',
      align: 'center',
    },
    { title: '案件编号', align: 'center', dataIndex: 'caseCode' },
    {
      title: '案件类型',
      align: 'center',
      dataIndex: 'caseType',
      hideInSearch: true,
      valueEnum: enums.case_type,
    },
    {
      title: '案件来源',
      dataIndex: 'caseSource',
      hideInSearch: true,
      valueEnum: enums.case_source,
    },
    {
      title: '案件地域',
      align: 'center',
      dataIndex: 'region',
      hideInSearch: true,
    },
    {
      title: '办理状态',
      align: 'center',
      dataIndex: 'handleState',
      valueEnum: enums.handle_state,
    },
    {
      title: '办理操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'caseId',
      width: 180,
      fixed: 'right',
      render: (dom, caseData) => createButton(caseData),
    },
    {
      title: '备案督办状态',
      align: 'center',
      dataIndex: 'caseSuperviseState',
      valueEnum: enums.case_supervise_state,
      fixed: 'right',
      width: 60,
    },
    {
      title: '备案督办操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'receiptId',
      width: 180,
      fixed: 'right',
      render: (dom, caseData) => createSuperviseButton(caseData),
    },
  ];

  const getReceivingList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'caseMgt/getCaseList',
        payload: { ...params },
        resolve,
      });
    });

  const templateDownload = () => {
    dispatch({
      type: 'caseMgt/templateDownload',
    });
  };

  const importCase = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importsAddressBook' });
    new Promise(resolve => {
      dispatch({
        type: 'caseMgt/importCase',
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
      type: 'caseMgt/exportCase',
    });
    message.destroy('error++');
  };

  return (
    <ProTable
      actionRef={tableRef}
      rowKey="caseId"
      headerTitle="案件列表"
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getReceivingList(params)}
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

export default connect(({ caseMgt, global }) => ({
  caseMgt,
  enums: global.enums,
}))(Table);

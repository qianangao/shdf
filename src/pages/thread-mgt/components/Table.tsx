import React, { useRef, useState } from 'react';
import { Button, message, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import CueAssociation from '@/components/CueAssociation';
import AssociationDesc from './AssociationDesc';

let tempSelectData = [];
const Table = ({
  emClueManagement,
  openDetailModal,
  openModifyModal,
  openAuthModal,
  openLogModal,
  transferModal,
  hostRefModal,
  processRefModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = emClueManagement;
  const uploadLgbListRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const cueAssociationRef = useRef({});
  const openAssociationModal = (item: any, views: any) => {
    cueAssociationRef.current.showModal(item, views);
  };

  const deleteClue = (clueId: any) => {
    dispatch({
      type: 'emClueManagement/deleteClue',
      payload: { clueId },
    });
  };

  const finishClue = (clueId: any) => {
    dispatch({
      type: 'emClueManagement/finishClue',
      payload: { clueId },
    });
  };

  const createButton = (data: any) => {
    const CHECK = (
      <a
        key={`${data.clueId}detail`}
        onClick={() => openDetailModal(data.clueId, data.sourceClueId)}
      >
        查看
      </a>
    );
    const EDIT = (
      <a key={`${data.clueId}update`} onClick={() => openModifyModal(data.clueId)}>
        修改
      </a>
    );
    const AUTH = (
      <a key={`${data.clueId}auth`} onClick={() => openAuthModal(data.clueId)}>
        授权
      </a>
    );
    const TRANSFER = (
      <a key={`${data.clueId}transfer`} onClick={() => transferModal(data)}>
        转办
      </a>
    );
    const HOST = (
      <a key={`${data.clueId}host`} onClick={() => hostRefModal(data)}>
        主办
      </a>
    );
    const FEEDBACK = (
      <a key={`${data.clueId}feedback`} onClick={() => processRefModal(data, 'feedback')}>
        反馈
      </a>
    );
    const SUBMIT = (
      <a key={`${data.clueId}submit`} onClick={() => processRefModal(data, 'submit')}>
        办结
      </a>
    );
    const APPROVAL = (
      <a key={`${data.clueId}approval`} onClick={() => processRefModal(data, 'approval')}>
        审核
      </a>
    );
    const LOG = (
      <a key={`${data.clueId}log`} onClick={() => openLogModal(data.clueId)}>
        日志
      </a>
    );
    const FINISH = (
      <Popconfirm
        key={`${data.noticeId}finish`}
        title="确认结束该线索吗？"
        placement="topRight"
        onConfirm={() => finishClue(data.clueId)}
      >
        <a>结束</a>
      </Popconfirm>
    );
    const DELETE = (
      <Popconfirm
        key={`${data.noticeId}del`}
        title="确认删除该线索吗？"
        placement="topRight"
        onConfirm={() => deleteClue(data.clueId)}
      >
        <a>删除</a>
      </Popconfirm>
    );

    if (data.isCreateUser !== 0) {
      // 创建人
      switch (data.status) {
        case -1: // 已结束
          return [CHECK, AUTH, LOG];
        case 0: // 已录入
        case 1: // 待办理
          return [CHECK, EDIT, AUTH, TRANSFER, HOST, FINISH, LOG, DELETE];
        case 3: // 办理中
          return [CHECK, EDIT, AUTH, LOG];
        case 4: // 已办理
          return [CHECK, AUTH, SUBMIT, LOG];
        case 5: // 待审核
          return [CHECK, AUTH, LOG];
        case 11: // 已反馈
        default:
          return [CHECK];
      }
    } else if (data.isTransferUser !== 0) {
      // 转办人
      switch (data.status) {
        case -1:
          return [CHECK];
        case 0:
          return [];
        case 1:
          return [CHECK, TRANSFER, HOST];
        case 3:
          return [];
        case 4:
          return [CHECK, FEEDBACK];
        case 5:
          return [];
        case 11:
        default:
          return [CHECK];
      }
    } else if (data.isApprovalUser !== 0) {
      // 审批人
      if (data.status === 5)
        // 待审核，有审核按钮
        return [CHECK, APPROVAL, LOG];
      return [CHECK, LOG];
    } else {
      // 授权人
      return [CHECK];
    }
  };

  // 列表项的配置
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    {
      title: '权限用户',
      dataIndex: 'user',
      align: 'center',
      hideInTable: true,
    },
    { title: '线索编号', align: 'center', dataIndex: 'clueNumber' },
    { title: '线索名称', align: 'center', dataIndex: 'clueName' },
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
    {
      title: '线索状态',
      align: 'center',
      dataIndex: 'status',
      valueEnum: enums.clue_type_all,
    },
    {
      title: '保密等级',
      align: 'center',
      dataIndex: 'secrecyLevel',
      hideInTable: true,
      valueEnum: enums.object_secrecy_level,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      render: (dom: any, data: any) => createButton(data),
    },
  ];
  // 获取所有线索
  const getAllClues = (params: any) =>
    new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/getAllClues',
        payload: { ...params },
        resolve,
      });
    });
  // 模板下载
  const templateDownload = () => {
    dispatch({
      type: 'emClueManagement/getTemplate',
      payload: { name: '线索' },
    });
  };
  const importClue = e => {
    const file = e.target.files[0];
    message.loading({ content: '文件上传中，请稍后……', key: 'importClue' });
    new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/importClue',
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
        message.destroy('importClue');
      });
    e.target.value = '';
  };

  const exportClue = () => {
    message.loading({ content: '数据正在处理中，请稍后……', key: 'exportClue' });
    new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/exportClue',
        payload: { ids: selectedRowKeys },
        resolve,
      });
    })
      .then(_ => {})
      .finally(() => {
        message.destroy('exportClue');
      });
  };

  return (
    <>
      <ProTable
        rowKey="clueId"
        headerTitle="线索列表"
        actionRef={tableRef}
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
        rowSelection={{
          onChange: (keys, rows) => {
            tempSelectData = rows;
            setSelectedRowKeys(keys);
          },
          selectedRowKeys,
        }}
        request={async params => getAllClues(params)}
        toolBarRender={_ => [
          selectedRowKeys && selectedRowKeys.length && (
            <Button
              type="primary"
              onClick={() => {
                if (selectedRowKeys.length > 1) {
                  message.error('只能单条线索串并联');
                } else {
                  openAssociationModal(
                    tempSelectData[0] && tempSelectData[0].clueId,
                    <AssociationDesc association={tempSelectData[0]} />,
                  );
                }
              }}
            >
              线索串并联
            </Button>
          ),
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
              onChange={importClue}
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
              exportClue();
            }}
          >
            导出
          </Button>,
        ]}
        columns={columns}
      />
      <CueAssociation
        actionRef={cueAssociationRef}
        // onSelected={onSelected}
        commit={{
          type: 'emClueManagement/commitCueAssociation',
        }}
      />
    </>
  );
};

export default connect(({ emClueManagement, global }) => ({
  emClueManagement,
  enums: global.enums,
}))(Table);

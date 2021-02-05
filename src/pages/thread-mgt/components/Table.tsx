import React, { useRef, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import CueAssociation from '@/components/CueAssociation';
import AssociationDesc from './AssociationDesc';

let tempSelectData = [];
const Table = ({
  emClueManagement,
  openModifyModal,
  openAuthModal,
  openExportModal,
  openLogModal,
  transferModal,
  hostRefModal,
  processRefModal,
  enums,
  dispatch,
}) => {
  const { tableRef } = emClueManagement;
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

  // 列表项的配置
  const columns = [
    { title: '线索编号', align: 'center', dataIndex: 'clueId', valueType: 'index', width: 100 },
    { title: '线索名称', align: 'center', dataIndex: 'clueName' },
    {
      title: '保密等级',
      align: 'center',
      valueEnum: enums.subject_secrecy_level,
      hideInTable: true,
    },
    {
      title: '权限用户',
      dataIndex: 'user',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '线索类型',
      align: 'center',
      dataIndex: 'clueType',
      valueEnum: enums.subject_secrecy_level,
    },
    {
      title: '线索来源',
      align: 'center',
      dataIndex: 'clueSource',
      valueEnum: enums.subject_secrecy_level,
    },
    {
      title: '地域',
      align: 'center',
      dataIndex: 'reportedObjectAddress',
      valueEnum: enums.subject_secrecy_level,
      hideInSearch: true,
    },

    {
      title: '线索状态',
      align: 'center',
      dataIndex: 'processingStatus',
      valueEnum: enums.subject_secrecy_level,
      labelWidth: '60',
    },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 300,
      render: (dom, data) => [
        <a key={`${data.clueId}detail`} onClick={() => openModifyModal(data)}>
          查看
        </a>,
        <a key={`${data.clueId}update`} onClick={() => openModifyModal(data)}>
          修改
        </a>,
        <a key={`${data.clueId}auth`} onClick={() => openAuthModal(data.clueId)}>
          授权
        </a>,
        <a key={`${data.clueId}host`} onClick={() => hostRefModal(data)}>
          主办
        </a>,
        <a key={`${data.clueId}transfer`} onClick={() => transferModal(data)}>
          转办
        </a>,
        <a
          key={`${data.clueId}submit`}
          onClick={() => processRefModal(data.clueId, data.circulationId, 'submit')}
        >
          办结
        </a>,
        <a
          key={`${data.clueId}approval`}
          onClick={() => processRefModal(data.clueId, data.circulationId, 'approval')}
        >
          审核
        </a>,
        <a
          key={`${data.clueId}feedback`}
          onClick={() => processRefModal(data.clueId, data.circulationId, 'feedback')}
        >
          反馈
        </a>,
        <Popconfirm
          key={`${data.noticeId}finish`}
          title="确认结束该线索吗？"
          placement="topRight"
          onConfirm={() => finishClue(data.clueId)}
        >
          <a>结束</a>
        </Popconfirm>,
        <a key={`${data.clueId}log`} onClick={() => openLogModal(data.clueId)}>
          日志
        </a>,
        <Popconfirm
          key={`${data.noticeId}del`}
          title="确认删除该线索吗？"
          placement="topRight"
          onConfirm={() => deleteClue(data.clueId)}
        >
          <a>删除</a>
        </Popconfirm>,
        // <Popconfirm
        //   key={`${data.clueId}del`}
        //   title="确认删除该重点机构吗？"
        //   placement="topRight"
        //   onConfirm={() => deleteKeyInstiton(data.orgId)}
        // >
        //   <a>删除</a>
        // </Popconfirm>,
      ],
    },
  ];
  // 获取所有线索
  const getAllClues = params =>
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
      type: 'emAddressBook/templateDownload',
    });
  };

  return (
    <>
      <ProTable
        rowKey="clueId"
        headerTitle="线索列表"
        actionRef={tableRef}
        scroll={{ x: 1600 }}
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
              onClick={() =>
                openAssociationModal(
                  tempSelectData[0],
                  <AssociationDesc associatin={tempSelectData[0]} />,
                )
              }
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
          <Button type="primary" onClick={() => {}}>
            导入
          </Button>,
          <Button type="primary" onClick={() => openExportModal()}>
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

import React from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const KeyPersonTable = ({
  dictionaryMgt,
  relevancyModal,
  openPersonDetailModal,
  dispatch,
  enums,
}) => {
  const { tableRef } = dictionaryMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'personName' },
    { title: '证件号码', align: 'center', dataIndex: 'idCard' },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'sex',
      valueEnum: enums.dict_sex,
      hideInSearch: true,
    },
    { title: '年龄', align: 'center', dataIndex: 'age', hideInSearch: true },
    {
      title: '出生地',
      align: 'center',
      dataIndex: 'birthplace',
      hideInSearch: true,
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
      width: 80,
      fixed: 'right',
      render: (dom: any, data: { personId: any }) => [
        <a key={`${data.personId}detail`} onClick={() => openPersonDetailModal(data.personId)}>
          查看
        </a>,
      ],
    },
  ];

  const getEngineeringKeyPersonList = params =>
    dictionaryMgt.projectId &&
    dictionaryMgt.projectId !== '' &&
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getEngineeringKeyPersonList',
        payload: { ...params, id: dictionaryMgt.projectId },
        resolve,
      });
    });

  return (
    <div>
      <ProTable
        rowKey="personId"
        actionRef={tableRef}
        rowSelection={false}
        scroll={{ x: 'max-content' }}
        request={async params => getEngineeringKeyPersonList(params)}
        toolBarRender={_ => [
          <Button type="primary" onClick={() => relevancyModal('选择人物', 1)}>
            关联人物
          </Button>,
        ]}
        columns={columns}
      />
    </div>
  );
};

export default connect(({ dictionaryMgt, global }) => ({
  dictionaryMgt,
  enums: global.enums,
}))(KeyPersonTable);

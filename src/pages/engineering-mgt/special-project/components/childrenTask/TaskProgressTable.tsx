import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
// import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
// import AdvancedForm from '@/components/AdvancedForm';

const TaskProgressTable = ({ taskProgressList, FeedbackDetailModal }) => {
  const [dataSource, setDataSource] = useState([]);
  // const [selectData, setSelectData] = useState([]);
  // console.log("taskProgressList",taskProgressList);
  // console.log("head",head);

  useEffect(() => {
    if (taskProgressList) {
      setDataSource([...taskProgressList]);
    }
  }, [taskProgressList]);

  const columns = [
    {
      title: '序号',
      render: (text, render, index) => `${index + 1}`,
      width: 64,
      align: 'center',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '省份/进度',
      align: 'center',
      dataIndex: 'province',
      render: text => <a onClick={() => FeedbackDetailModal(2)}>{text}</a>,
    },
    { title: '阶段反馈1', align: 'center', dataIndex: 'stage1', render: text => <a>{text}</a> },
    { title: '阶段反馈2', align: 'center', dataIndex: 'stage2', render: text => <a>{text}</a> },
    { title: '阶段反馈3', align: 'center', dataIndex: 'stage3', render: text => <a>{text}</a> },
    { title: '阶段反馈4', align: 'center', dataIndex: 'stage4', render: text => <a>{text}</a> },
  ];

  return <Table dataSource={dataSource} columns={columns} rowKey="province" />;
};

export default connect(({ specialAction }) => ({
  taskProgressList: specialAction.taskProgressList,
  head: specialAction.head,
  specialAction,
}))(TaskProgressTable);

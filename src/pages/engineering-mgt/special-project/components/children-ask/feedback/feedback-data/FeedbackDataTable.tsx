import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { connect } from 'umi';

const FeedbackTableData = ({ FeedbackData }) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (FeedbackData) {
      setDataSource([]);
      setDataSource([...FeedbackData]);
    }
  }, [FeedbackData]);

  const columns = [
    {
      title: '序号',
      render: (text, render, index) => `${index + 1}`,
      width: 64,
      align: 'center',
      dataIndex: 'id',
      key: 'id',
    },
    { title: '名称', align: 'center', dataIndex: 'feedbackName' },
    {
      title: '反馈类型',
      align: 'center',
      dataIndex: 'feedbackType',
      render: text => <span>{text === 0 ? '总反馈' : '阶段反馈'}</span>,
    },
    { title: '开始日期', align: 'center', dataIndex: 'startDate' },
    { title: '截止日期', align: 'center', dataIndex: 'endDate' },
    { title: '反馈要求', align: 'center', dataIndex: 'feedbackRequire' },
  ];

  return <Table dataSource={dataSource} columns={columns} rowKey="taskId" />;
};

export default connect(({ specialAction }) => ({
  FeedbackData: specialAction.FeedbackData,
  specialAction,
}))(FeedbackTableData);

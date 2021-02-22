import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
// import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
// import AdvancedForm from '@/components/AdvancedForm';

const FeedbackTableData = ({ FeedbackData }) => {
  const [dataSource, setDataSource] = useState([]);
  // const [selectData, setSelectData] = useState([]);
  useEffect(() => {
    if (FeedbackData) {
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
    // { title: '序号', align: 'center', dataIndex: 'id', hideInSearch: true },
    { title: '名称', align: 'center', dataIndex: 'feedbackName' },
    { title: '反馈类型', align: 'center', dataIndex: 'feedbackType' },
    { title: '开始日期', align: 'center', dataIndex: 'startDate' },
    { title: '截止日期', align: 'center', dataIndex: 'endDate' },
    { title: '反馈要求', align: 'center', dataIndex: 'feedbackRequire' },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey="taskId" />
    </div>
  );
};

export default connect(({ specialAction }) => ({
  FeedbackData: specialAction.FeedbackData,
  specialAction,
}))(FeedbackTableData);

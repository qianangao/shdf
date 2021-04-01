import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
// import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
// import AdvancedForm from '@/components/AdvancedForm';
import { getSecrecyRowClassName } from '@/utils/secrecy';

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
    // {
    //   title: '反馈类型',
    //   align: 'center',
    //   dataIndex: 'feedbackType',
    //   render: text => <span>{text === '0' ? '总反馈' : '阶段反馈'}</span>,
    // },
    { title: '开始日期', align: 'center', dataIndex: 'startDate' },
    { title: '截止日期', align: 'center', dataIndex: 'endDate' },
    { title: '反馈要求', align: 'center', dataIndex: 'feedbackRequire' },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="taskId"
      rowClassName={getSecrecyRowClassName}
    />
  );
};

export default connect(({ defenseEngineering }) => ({
  FeedbackData: defenseEngineering.FeedbackData,
  defenseEngineering,
}))(FeedbackTableData);

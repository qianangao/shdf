import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { connect } from 'umi';
import './index.css';
import { getSecrecyRowClassName } from '@/utils/secrecy';

const FeedbackTable = ({ dispatch, feedListData, onChange }) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setDataSource([...feedListData]);
  }, [feedListData]);

  const handleSelect = ids => {
    const data = dataSource;
    data.forEach(item => {
      if (item.feedbackId === ids) {
        const arr = [];
        arr.push(item);
        onChange && onChange(arr);
        dispatch({
          type: `specialAction/selectFeedbackData`,
          payload: arr,
        });
      }
    });
  };

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
    // {
    //   title: '反馈类型',
    //   align: 'center',
    //   dataIndex: 'feedbackType',
    //   render: text => <span>{text === '0' ? '总反馈' : '阶段反馈'}</span>,
    // },
    { title: '开始日期', align: 'center', dataIndex: 'startDate' },
    { title: '截止日期', align: 'center', dataIndex: 'endDate' },
    {
      title: '反馈要求',
      align: 'center',
      dataIndex: 'feedbackRequire',
      width: 200,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (dom, data) => [
        <Button type="link" size="small" onClick={() => handleSelect(data.feedbackId)}>
          选择
        </Button>,
      ],
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="taskId"
        rowClassName={getSecrecyRowClassName}
      />
    </div>
  );
};

export default connect(({ specialAction }) => ({
  feedListData: specialAction.feedListData,
  specialAction,
}))(FeedbackTable);

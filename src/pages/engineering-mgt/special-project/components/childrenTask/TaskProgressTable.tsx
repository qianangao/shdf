import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
// import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
// import AdvancedForm from '@/components/AdvancedForm';

const TaskProgressTable = ({ taskProgressList, head, feedbackDetailModal }) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (taskProgressList) {
      setDataSource([]);
      setDataSource([...taskProgressList]);
    }
  }, [taskProgressList]);

  useEffect(() => {
    if (head) {
      const arr = [];
      Object.keys(head).forEach(function (key) {
        if (key === 'province') {
          arr.push({ title: key, dataIndex: key, align: 'center' });
        } else {
          arr.push({
            title: key,
            dataIndex: key,
            align: 'center',
            render: (text, record) => (
              <a onClick={() => feedbackDetailModal(record[key].id)}>{record[key].label}</a>
            ),
          });
        }
        setColumns([...columns, ...arr]);
      });
    }
  }, [head]);

  return (
    <>
      {/* onClick={() => this.exportData()}  */}
      <Button type="primary">导出</Button>
      <Table dataSource={dataSource} columns={columns} rowKey="province" />
    </>
  );
};

export default connect(({ specialAction }) => ({
  taskProgressList: specialAction.taskProgressList,
  head: specialAction.head,
  specialAction,
}))(TaskProgressTable);

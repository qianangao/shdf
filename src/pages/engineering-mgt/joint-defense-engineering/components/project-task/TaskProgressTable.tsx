import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'umi';
import { getSecrecyRowClassName } from '@/utils/secrecy';
import { checkAuthority } from '@/utils/authority';

const TaskProgressTable = ({ dispatch, taskProgressList, head, feedbackDetailModal }) => {
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
      setColumns([]);
      Object.keys(head).forEach(function (key) {
        if (key === 'province') {
          arr.push({ title: head[key], dataIndex: key, align: 'center' });
        } else {
          arr.push({
            title: head[key],
            dataIndex: key,
            align: 'center',
            render: (text, record) => (
              <a onClick={() => feedbackDetailModal(record[key].id)}>{record[key].label}</a>
            ),
          });
        }
      });
      setColumns([...arr]);
    }
  }, [head]);

  const exportData = () => {
    dispatch({
      type: 'defenseEngineering/exportLog',
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => exportData()} hidden={!checkAuthority('em/dep/export')}>
        导出
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="province"
        rowClassName={getSecrecyRowClassName}
      />
    </>
  );
};

export default connect(({ defenseEngineering }) => ({
  taskProgressList: defenseEngineering.taskProgressList,
  head: defenseEngineering.head,
  defenseEngineering,
}))(TaskProgressTable);

import React, { useState } from 'react';
import { Button, Card } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
// import FeedbackTable from './FeedbackTable';
import TaskProgressTable from '../TaskProgressTable';
import SummaryFeedbackTable from '../SummaryFeedbackTable';

const EditProjectTaskForm = ({
  form,
  disabled,
  visible,
  add,
  addProjectTaskModal,
  feedbackDetailModal,
}) => {
  const [tableData, setTableData] = useState([]);
  const onChange = data => {
    setTableData([...data]);
  };

  const formItems = [
    {
      label: '任务名称',
      name: 'taskName',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入子任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '任务状态',
      name: 'taskStatus',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请选择任务状态' }],
      enumsLabel: 'special_task_state',
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },
    {
      label: '任务描述',
      name: 'taskContent',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
    {
      label: '反馈要求',
      name: 'feedbackRequireList',
      span: 4,
      disabled,
      render: (
        <SummaryFeedbackTable
          disabled={disabled}
          visible={visible}
          add={add}
          onChange={onChange}
          value={tableData}
        />
      ),
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      disabled,
      type: 'upload',
    },
    {
      label: '任务进度',
      name: 'taskProgressList',
      span: 4,
      disabled,
      render: <TaskProgressTable feedbackDetailModal={feedbackDetailModal} />,
    },
  ];

  return (
    <Card
      title="任务信息"
      extra={
        <>
          <Button type="primary" onClick={() => addProjectTaskModal({ visible: true })}>
            新增子任务
          </Button>
        </>
      }
      style={{ width: '100%', marginRight: 200 }}
    >
      <AdvancedForm form={form} fields={formItems} />
    </Card>
  );
};

EditProjectTaskForm.useForm = AdvancedForm.useForm;

export default EditProjectTaskForm;

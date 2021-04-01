import React, { useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import SummaryFeedbackTable from '../SummaryFeedbackTable';
import StageFeedbackTable from '../StageFeedbackTable';

const ProjectTaskForm = ({ form }) => {
  const [tableData, setTableData] = useState([]);
  const [totalTableData, setTotalTableData] = useState([]);
  const onChange = data => {
    setTableData([...data]);
  };
  const onTotalChange = data => {
    setTotalTableData([...data]);
  };
  const checkStartDate = (rule, value, callback) => {
    const endValue = form.getFieldValue('endDate');
    if (endValue && endValue < value) {
      callback(new Error('开始日期应不晚于结束日期!'));
    } else {
      callback();
    }
  };
  const checkEndDate = (rule, value, callback) => {
    const startValue = form.getFieldValue('startDate');
    if (startValue && startValue > value) {
      callback(new Error('结束日期应不早于开始日期!'));
    } else {
      callback();
    }
  };
  const formItems = [
    {
      label: '任务名称',
      name: 'taskName',
      span: 4,
      rules: [
        { required: true, message: '请输入任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 4,
      rules: [{ required: true, message: '请选择保密等级!' }],
      enumsLabel: 'object_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 4,
      rules: [
        { required: true, message: '请选择开始日期!' },
        {
          validator: checkStartDate,
        },
      ],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 4,
      rules: [
        { required: true, message: '请选择截止日期!' },
        {
          validator: checkEndDate,
        },
      ],
      type: 'date',
    },
    {
      label: '任务描述',
      name: 'taskContent',
      span: 4,
      rules: [
        { required: true, message: '请输入任务描述!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字!' },
      ],
      type: 'textarea',
    },

    {
      label: '阶段反馈要求',
      name: 'feedbackRequireList',
      span: 4,
      render: <StageFeedbackTable onChange={onChange} value={tableData} add edit />,
    },
    {
      label: '总结反馈要求',
      name: 'sumFeedbackRequireList',
      span: 4,
      rules: [{ required: true, message: '请输入反馈要求!' }],
      render: <SummaryFeedbackTable onChange={onTotalChange} value={totalTableData} add edit />,
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      type: 'uploadSecrecy',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

ProjectTaskForm.useForm = AdvancedForm.useForm;
export default ProjectTaskForm;

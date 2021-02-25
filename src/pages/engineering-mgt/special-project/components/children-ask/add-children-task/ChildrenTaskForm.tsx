import React, { useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import SummaryFeedbackTable from '../feedback/SummaryFeedbackTable';

const ChildrenTaskForm = props => {
  const { form, visible } = props;

  const [tableData, setTableData] = useState([]);
  const onChange = data => {
    setTableData([...data]);
  };
  const formItems = [
    {
      label: '子任务名称',
      name: 'taskName',
      span: 2,
      rules: [
        { required: true, message: '请输入子任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 2,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 2,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },
    // { name: 'segmentation', type: 'segmentation' },
    {
      label: '任务描述',
      name: 'taskDescription',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },

    {
      label: '反馈要求',
      name: 'specialTaskFeedbackList',
      span: 4,
      // rules: [{ required: true, message: '请输入!' }],
      render: <SummaryFeedbackTable visible={visible} onChange={onChange} value={tableData} add />,
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      type: 'upload',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

ChildrenTaskForm.useForm = AdvancedForm.useForm;
export default ChildrenTaskForm;

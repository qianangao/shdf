import React from 'react';
import { Button } from 'antd';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import FeedbackDataTable from './FeedbackDataTable';

const FeedbackForm = ({ form, openFeedbackReqModal, FeedbackData }) => {
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
        { required: true, message: '请输入子任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 4,
      enumsLabel: 'object_secrecy_level',
      rules: [{ required: true, message: '请选择保密等级!' }],
    },
    {
      label: '实际开始日期',
      name: 'startDate',
      span: 4,
      rules: [
        {
          validator: checkStartDate,
        },
      ],
      type: 'date',
    },
    {
      label: '实际截止日期',
      name: 'endDate',
      span: 4,
      rules: [
        {
          validator: checkEndDate,
        },
      ],
      type: 'date',
    },
    {
      label: '反馈信息',
      name: 'feedbackContent',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      rules: [{ required: true, message: '请选择附件!' }],
      type: 'uploadSecrecy',
    },
    {
      label: '反馈类型',
      name: 'stageRequest',
      span: 4,
      render: <Button onClick={() => openFeedbackReqModal()}>选择反馈要求</Button>,
    },
    {
      label: '反馈要求',
      name: 'specialTaskFeedbackList',
      span: 4,
      // rules: [{ required: true, message: '请选择反馈要求!' }],
      render: <FeedbackDataTable value={FeedbackData} />,
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

FeedbackForm.useForm = AdvancedForm.useForm;

export default connect(({ specialAction }) => ({
  FeedbackData: specialAction.FeedbackData,
}))(FeedbackForm);

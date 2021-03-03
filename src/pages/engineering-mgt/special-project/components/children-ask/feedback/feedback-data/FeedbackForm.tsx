import React from 'react';
import { Button } from 'antd';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import FeedbackDataTable from './FeedbackDataTable';

const FeedbackForm = ({ form, openFeedbackReqModal, FeedbackData }) => {
  const formItems = [
    {
      label: '任务名称',
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
      enumsLabel: 'subject_secrecy_level',
      rules: [{ required: true, message: '请选择保密等级' }],
    },
    {
      label: '实际开始日期',
      name: 'startDate',
      span: 2,
      // rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '实际截止日期',
      name: 'endDate',
      span: 2,
      // rules: [{ required: true, message: '请选择截止日期!' }],
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
      type: 'upload',
    },
    {
      label: '反馈要求',
      name: 'stageRequest',
      span: 4,
      render: <Button onClick={() => openFeedbackReqModal()}>选择反馈要求</Button>,
    },
    {
      label: '反馈要求',
      name: 'specialTaskFeedbackList',
      span: 4,
      render: <FeedbackDataTable value={FeedbackData} />,
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

FeedbackForm.useForm = AdvancedForm.useForm;

export default connect(({ specialAction }) => ({
  FeedbackData: specialAction.FeedbackData,
}))(FeedbackForm);

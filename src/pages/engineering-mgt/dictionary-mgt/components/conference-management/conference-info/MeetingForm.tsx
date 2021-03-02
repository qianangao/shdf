import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const MeetingForm = ({ form, disabled }) => {
  const formItems = [
    {
      label: '会议主题',
      name: 'meetingTheme',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入会议主题!', whitespace: true },
        { max: 30, message: '会议主题长度请小于30位!' },
      ],
    },
    {
      label: '会议地点',
      name: 'meetingPlace',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请输入会议地点!', whitespace: true }],
    },
    {
      label: '会议时间',
      name: 'startTime',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },
    {
      label: '举办单位',
      name: 'organizer',
      span: 4,
      disabled,
      rules: [{ required: true, message: '请输入会议地点!', whitespace: true }],
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
      label: '参会人员',
      name: 'meetingPerson',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
    {
      label: '会议纪要',
      name: 'meetingContent',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入!' },
        { max: 500, min: 0, message: '输入文字过长，内容不能超过500字' },
      ],
      type: 'textarea',
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      disabled,
      type: 'upload',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

MeetingForm.useForm = AdvancedForm.useForm;

export default MeetingForm;

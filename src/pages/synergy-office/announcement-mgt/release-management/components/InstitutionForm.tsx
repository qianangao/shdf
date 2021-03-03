import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Checkbox } from 'antd';
import StaffMultiSelectInput from '@/components/StaffMultiSelectInput';

const InstitutionForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'noticeId', hidden: true },
    {
      label: '公告标题',
      name: 'noticeTitle',
      rules: [
        { required: true, message: '请输入公告标题!' },
        { max: 40, min: 0, message: '输入文字过长，公告标题不能超过40字' },
      ],
    },
    {
      label: '发布部门',
      name: 'publishDept',
      rules: [{ required: true, message: '请输入发布部门!' }],
      initialValue: '全国SHDF办公室',
      disabled: true,
    },
    {
      label: '密级标识',
      name: 'secrecyLevel',
      rules: [{ required: true, message: '请选择密级标识!' }],
      enumsLabel: 'object_secrecy_level',
    },
    {
      label: '可见范围',
      name: 'visibleRange',
      span: 3,
      disabled: true,
      rules: [{ required: true, message: '请选择可见范围!' }],
      render: <StaffMultiSelectInput />,
    },
    {
      label: '公告内容',
      name: 'noticeContent',
      type: 'editor',
      span: 3,
      rules: [
        { required: true, message: '请输入公告内容!' },
        { max: 10000, min: 0, message: '输入文字过长，公告内容不能超过10000字' },
      ],
    },
    {
      label: '提醒方式',
      name: 'remindWays',
      span: 3,
      initialValue: ['1'],
      render: <Checkbox.Group options={[{ label: '站内信', value: '1' }]} />,
    },
    {
      label: '上传附件',
      name: 'files',
      type: 'upload',
      span: 3,
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

InstitutionForm.useForm = AdvancedForm.useForm;

export default InstitutionForm;

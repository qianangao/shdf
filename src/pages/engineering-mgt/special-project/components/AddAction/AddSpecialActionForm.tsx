import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const AddSpecialActionForm = ({ form, visible }) => {
  const formItems = [
    {
      label: '专项行动',
      name: 'specialAction',
      span: 2,
      rules: [{ required: true, message: '请选择行动名称' }],
      visible,
    },
    {
      label: '复用历史信息',
      name: 'info',
      span: 2,
      visible,
    },
    {
      label: '行动名称',
      name: 'actionName',
      span: 2,
      rules: [
        { required: true, message: '请输入行动名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'level',
      span: 2,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'start_date',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
      visible,
    },
    {
      label: '结束日期',
      name: 'end_date',
      span: 2,
      rules: [{ required: true, message: '请选择结束日期!' }],
      type: 'date',
      visible,
    },
    {
      label: '行动年度',
      name: 'annual',
      span: 2,
      rules: [{ required: true, message: '请输入行动年度!', whitespace: true }],
      visible,
    },
    {
      name: 'segmentation',
      type: 'segmentation',
    },
    {
      label: '行动描述',
      name: 'description',
      span: 4,
      rules: [{ required: true, message: '请输入!' }],
      type: 'textarea',
    },
    {
      label: '附件列表',
      name: 'files',
      span: 4,
      type: 'upload',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AddSpecialActionForm.useForm = AdvancedForm.useForm;

export default AddSpecialActionForm;

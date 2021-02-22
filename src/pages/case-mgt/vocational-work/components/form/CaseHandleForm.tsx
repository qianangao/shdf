import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const CaseHandleForm = ({ form, formData }) => {
  const formItems = [
    {
      label: '办理阶段',
      name: 'handleStage',
      enumsLabel: 'case_type',
      rules: [{ required: true, message: '请输入姓名!', whitespace: true }],
    },
    {
      label: '经办人',
      name: 'handleAccount',
    },
    {
      label: '办理时间',
      name: 'handleTime',
      type: 'dateTime',
    },
    {
      label: '办理进度',
      name: 'handleProgress',
      enumsLabel: 'case_type',
    },
    {
      label: '完整案情',
      span: 4,
      name: 'handleContent',
    },
    {
      label: '附件列表',
      name: 'transmitFiles',
      span: 4,
      type: 'upload',
    },
  ];

  useEffect(() => {}, [formData]);

  return <AdvancedForm form={form} loading={false} fields={formItems} />;
};

CaseHandleForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(CaseHandleForm);

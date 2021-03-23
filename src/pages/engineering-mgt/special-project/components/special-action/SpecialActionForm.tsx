import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const SpecialActionForm = ({ form }) => {
  const formItems = [
    {
      label: '行动名称',
      name: 'actionName',
      span: 4,
      rules: [
        { required: true, message: '请输入行动名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 4,
      rules: [{ required: true, message: '请选择保密等级!' }],
      enumsLabel: 'subject_secrecy_level',
    },
    {
      label: '行动描述',
      name: 'actionDescription',
      span: 4,
      type: 'textarea',
      rules: [
        { required: true, message: '请输入行动描述!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
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

SpecialActionForm.useForm = AdvancedForm.useForm;

export default connect(() => ({}))(SpecialActionForm);

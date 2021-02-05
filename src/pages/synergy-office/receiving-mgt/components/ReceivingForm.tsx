import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const ReceivingForm = ({ form, orgInfoData }) => {
  const formItems = [
    {
      name: 'receiptId',
      hidden: true,
    },
    {
      label: '办理类型',
      name: 'handleType',
      span: 1,
      enumsLabel: 'handle_type',

      // rules: [  { required: true, message: '请选择类型!', whitespace: true },  ],
    },
    {
      label: '来文单位',
      name: 'docUnit',
      span: 1,
      rules: [
        { required: true, message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '来文单位长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '来文文号',
      name: 'docNo',
      span: 1,
      rules: [
        { required: true, message: '请输入来文文号!', whitespace: true },
        { max: 80, message: '来文文号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '收文日期',
      name: 'receiptData',
      span: 1,
      type: 'dateTime',
      rules: [{ required: true, message: '请输入收文日期!', whitespace: true }],
    },
    {
      label: '信封编号',
      name: 'envelopeCode',
      span: 1,
      rules: [
        { required: true, message: '请输入信封编号!', whitespace: true },
        { max: 80, message: '信封编号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '紧急程度',
      name: 'urgentLevel',
      enumsLabel: 'urgent_level',
      span: 1,
      // rules: [  { required: true, message: '请选择紧急程度!', whitespace: true },   ],
    },
    {
      label: '密级', ///
      name: 'secrecyLevel',
      enumsLabel: 'subject_secrecy_level',
      span: 1,
      // rules: [  { required: true, message: '请选择密级!', whitespace: true }, ],
    },
    {
      label: '保密期限', /// /
      name: 'secrecyDuration',
      span: 1,
    },
    {
      label: '文件份数', /// /
      name: 'fileNum',
      span: 1,
    },
    {
      label: '成文日期', ///
      name: 'finishTime',
      span: 1,
      type: 'dateTime',
      rules: [{ message: '请输入成文日期!', whitespace: true }],
    },
    {
      label: '办理时限', ///
      name: 'handleDuration',
      span: 1,
    },
    {
      label: '收文编号(系统生成)', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },

    {
      label: '来文标题',
      name: 'receiptTitle',
      span: 4,
      rules: [
        { required: true, message: '请输入来文标题!', whitespace: true },
        { max: 80, message: '来文标题长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '备注',
      name: 'remarks',
      span: 4,
      type: 'textarea',
      rules: [{ max: 400, message: '备注长度请小于400位!', whitespace: true }],
    },
    {
      label: '批示',
      name: 'instructions',
      span: 4,
      type: 'editor',
      rules: [
        { message: '请输入批示!', whitespace: true },
        { max: 80, message: '单位名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '附件',
      name: 'files',
      span: 4,
      type: 'upload',
    },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

ReceivingForm.useForm = AdvancedForm.useForm;

export default ReceivingForm;

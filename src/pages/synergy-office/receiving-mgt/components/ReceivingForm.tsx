import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const ReceivingForm = ({ form, orgInfoData, id }) => {
  const formItems = [
    {
      name: 'receiptId',
      hidden: true,
    },
    {
      label: '办理类型',
      name: 'handleType',
      enumsLabel: 'handle_type',

      rules: [{ required: true, message: '请选择类型!' }],
    },
    {
      label: '来文单位',
      name: 'docUnit',
      rules: [
        { required: true, message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '来文单位长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '来文文号',
      name: 'docNo',
      rules: [
        { required: true, message: '请输入来文文号!', whitespace: true },
        { max: 80, message: '来文文号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '收文日期',
      name: 'receiptData',
      type: 'dateTime',
      rules: [{ required: true, message: '请输入收文日期!', whitespace: true }],
    },
    {
      label: '信封编号',
      name: 'envelopeCode',
      rules: [
        { required: true, message: '请输入信封编号!', whitespace: true },
        { max: 80, message: '信封编号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '紧急程度',
      name: 'urgentLevel',
      enumsLabel: 'urgent_level',
      rules: [{ required: true, message: '请选择紧急程度!' }],
    },
    {
      label: '密级',
      name: 'secrecyLevel',
      enumsLabel: 'subject_secrecy_level',
      rules: [{ required: true, message: '请选择密级!' }],
    },
    {
      label: '保密期限',
      name: 'secrecyDuration',
    },
    {
      label: '文件份数',
      name: 'fileNum',
    },
    {
      label: '成文日期',
      name: 'finishTime',
      type: 'dateTime',
      rules: [{ message: '请输入成文日期!', whitespace: true }],
    },
    {
      label: '办理时限',
      name: 'handleDuration',
    },
    {
      label: '收文编号(系统生成)',
      name: 'receiptCode',
      visible: !!id,
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
      label: '备注',
      name: 'remarks',
      span: 4,
      type: 'textarea',
      rules: [{ max: 400, message: '备注长度请小于400位!', whitespace: true }],
    },
    {
      label: '附件',
      name: 'fileList',
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

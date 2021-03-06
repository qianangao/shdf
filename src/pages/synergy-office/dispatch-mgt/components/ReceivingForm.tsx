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
      label: '发文单位',
      name: 'docUnit',
      extraProps: { placeholder: '请输入单位名称' },
      rules: [
        { required: true, message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '发文单位长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '发文文号',
      name: 'docNo',
      extraProps: { placeholder: '请输入发文文号' },
      rules: [
        { required: true, message: '请输入发文文号!', whitespace: true },
        { max: 80, message: '发文文号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '发文日期',
      name: 'receiptData',
      type: 'dateTime',
      rules: [{ required: true, message: '请选择发文日期!', whitespace: true }],
    },
    {
      label: '信封编号',
      name: 'envelopeCode',
      extraProps: { placeholder: '请输入信封编号' },
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
      label: '保密等级',
      name: 'secrecyLevel',
      enumsLabel: 'subject_secrecy_level',
      rules: [{ required: true, message: '请选择密级!' }],
    },
    {
      label: '保密期限',
      extraProps: { placeholder: '请输入保密期限' },
      name: 'secrecyDuration',
    },
    {
      label: '文件份数',
      extraProps: { placeholder: '请输入文件份数' },
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
      extraProps: { placeholder: '请输入办理时限' },
      name: 'handleDuration',
    },
    {
      label: '发文编号(系统生成)',
      name: 'receiptCode',
      visible: !!id,
      disabled: 'true',
    },

    {
      label: '标题',
      name: 'receiptTitle',
      extraProps: { placeholder: '请输入发文标题' },
      span: 4,
      rules: [
        { required: true, message: '请输入发文标题!', whitespace: true },
        { max: 80, message: '发文标题长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '批示',
      name: 'instructions',
      span: 4,
      type: 'editor',
      rules: [
        { message: '请输入批示!', whitespace: true },
        { max: 450, message: '单位名称长度请小于450位!', whitespace: true },
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

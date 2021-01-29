import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const ReceivingForm = ({ form, orgInfoData }) => {
  const formItems = [
    {
      name: 'receiptId',
      hidden: true,
    },
    {
      label: '办  理  类  型',
      name: 'handleType',
      span: 1.5,
      enumsLabel: 'subject_secrecy_level',

      // rules: [  { required: true, message: '请选择类型!', whitespace: true },  ],
    },
    {
      label: '来  文  单  位',
      name: 'docUnit',
      span: 1.5,
      rules: [
        { required: true, message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '来文单位长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '来  文  文  号',
      name: 'docNo',
      span: 1.5,
      rules: [
        { required: true, message: '请输入来文文号!', whitespace: true },
        { max: 80, message: '来文文号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '收  文  日  期',
      name: 'receiptData',
      span: 1.5,
      type: 'dateTime',
      rules: [{ required: true, message: '请输入收文日期!', whitespace: true }],
    },
    {
      label: '信  封  编  号',
      name: 'envelopeCode',
      span: 1.5,
      rules: [
        { required: true, message: '请输入信封编号!', whitespace: true },
        { max: 80, message: '信封编号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '紧  急  程  度',
      name: 'urgentLevel',
      enumsLabel: 'subject_secrecy_level',
      span: 1.5,
      // rules: [  { required: true, message: '请选择紧急程度!', whitespace: true },   ],
    },
    {
      label: '密             级', ///
      name: 'secrecyLevel',
      enumsLabel: 'subject_secrecy_level',
      span: 1.5,
      // rules: [  { required: true, message: '请选择密级!', whitespace: true }, ],
    },
    {
      label: '保  密  期  限', /// /
      name: 'secrecyDuration',
      span: 1.5,
    },
    {
      label: '文  件  份  数', /// /
      name: 'fileNum',
      span: 1.5,
    },
    {
      label: '成  文  日  期', ///
      name: 'finishTime',
      span: 1.5,
      type: 'dateTime',
      rules: [{ message: '请输入成文日期!', whitespace: true }],
    },
    {
      label: '办  理   时   限', ///
      name: 'handleDuration',
      span: 1.5,
    },
    {
      label: '收   文  编  号(系统生成)', ///
      name: 'receiptCode',
      span: 1.5,
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
      label: '备    注',
      name: 'remarks',
      span: 4,
      type: 'textarea',
      rules: [{ max: 400, message: '备注长度请小于400位!', whitespace: true }],
    },
    {
      label: '批   示',
      name: 'instructions',
      span: 4,
      type: 'editor',
      rules: [
        { message: '请输入批示!', whitespace: true },
        { max: 80, message: '单位名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '附   件',
      name: 'fileIds',
      span: 4,
      type: 'upload',
      rules: [
        { message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '单位名称长度请小于80位!', whitespace: true },
      ],
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

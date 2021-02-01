import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const CaseMgt = ({ form, orgInfoData }) => {
  const formItems = [
    {
      name: 'receiptId',
      hidden: true,
    },
    {
      label: '案件名称',
      name: 'handleType',
      span: 1,
      enumsLabel: 'handle_type',
      // rules: [  { required: true, message: '请选择类型!', whitespace: true },  ],
    },
    {
      label: '案件编号',
      name: 'docUnit',
      span: 1,
      rules: [
        { required: true, message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '来文单位长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '案件类型',
      name: 'docNo',
      span: 1,
      rules: [
        { required: true, message: '请输入来文文号!', whitespace: true },
        { max: 80, message: '来文文号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '案件来源',
      name: 'receiptData',
      span: 1,
      type: 'dateTime',
      rules: [{ required: true, message: '请输入收文日期!', whitespace: true }],
    },
    {
      label: '重要程度',
      name: 'envelopeCode',
      span: 1,
      rules: [
        { required: true, message: '请输入信封编号!', whitespace: true },
        { max: 80, message: '信封编号长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '保密等级',
      name: 'urgentLevel',
      enumsLabel: 'urgent_level',
      span: 1,
      // rules: [  { required: true, message: '请选择紧急程度!', whitespace: true },   ],
    },
    {
      label: '立案日期', ///
      name: 'secrecyLevel',
      enumsLabel: 'subject_secrecy_level',
      span: 1,
      // rules: [  { required: true, message: '请选择密级!', whitespace: true }, ],
    },
    {
      label: '紧急程度', /// /
      name: 'secrecyDuration',
      span: 1,
    },
    {
      label: '抓获人数', /// /
      name: 'fileNum',
      span: 1,
    },
    {
      label: '采取刑事强制措施人数', ///
      name: 'finishTime',
      span: 1,
      type: 'dateTime',
      rules: [{ message: '请输入成文日期!', whitespace: true }],
    },
    {
      label: '传播载体形式', ///
      name: 'handleDuration',
      span: 1,
    },
    {
      label: '所属联防工程', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '平台类型', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '是否网络案件', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '专项行动', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '案件查处部门', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '涉案数量', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '涉案金额', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '案件办理阶段', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '发案时间', ///
      name: 'receiptCode',
      span: 1,
      disabled: 'true',
    },
    {
      label: '发生地域',
      name: 'receiptTitle',
      span: 4,
      rules: [
        { required: true, message: '请输入来文标题!', whitespace: true },
        { max: 80, message: '来文标题长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '线索串并联',
      name: 'receiptTitle',
      span: 4,
      rules: [
        { required: true, message: '请输入来文标题!', whitespace: true },
        { max: 80, message: '来文标题长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '案情描述',
      name: 'remarks',
      span: 4,
      type: 'textarea',
      rules: [{ max: 400, message: '备注长度请小于400位!', whitespace: true }],
    },
    {
      label: '案件办理结果',
      name: 'instructions',
      span: 4,
      type: 'editor',
      rules: [
        { message: '请输入批示!', whitespace: true },
        { max: 80, message: '单位名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '相关附件',
      name: 'fileIds',
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

CaseMgt.useForm = AdvancedForm.useForm;

export default CaseMgt;

import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';

const CaseMgt = ({ form, id, orgInfoData, caseType, onFieldsChange }) => {
  const formItems = [
    {
      name: 'caseId',
      hidden: true,
    },
    {
      label: '报送单位',
      name: 'reportCompany',
      rules: [{ required: true, message: '请输入报送单位!', whitespace: true }],
    },
    {
      label: '报送时间',
      name: 'reportTime',
      type: 'dateTime',
      rules: [{ required: true, message: '请选择送报时间!' }],
    },
    {
      label: '案件名称',
      name: 'caseName',
      rules: [{ required: true, message: '请输入案件名称!', whitespace: true }],
    },
    {
      label: '案件编号(系统生成)',
      disabled: 'true',
      visible: !!id,
      name: 'caseCode',
    },
    {
      label: '线索来源',
      name: 'caseSource',
      enumsLabel: 'case_source',
      rules: [{ required: true, message: '请输入案件来源!', whitespace: true }],
    },
    {
      label: '办理部门',
      name: 'investigationDepartment',
      rules: [{ required: true, message: '请输入办理部门!', whitespace: true }],
    },
    {
      label: '重要程度',
      name: 'importanceLevel',
      enumsLabel: 'importance_level',
      rules: [{ required: true, message: '请输入重要程度!', whitespace: true }],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      enumsLabel: 'subject_secrecy_level',
      rules: [{ required: true, message: '请选择保密等级!', whitespace: true }],
    },
    {
      label: '立案时间',
      name: 'registerTime',
      type: 'dateTime',
      rules: [{ required: true, message: '请选择立案日期!' }],
    },
    {
      label: '紧急程度',
      name: 'urgentLevel',
      enumsLabel: 'urgent_level',
      rules: [{ required: true, message: '请输入紧急程度!', whitespace: true }],
    },
    {
      label: '案件类型',
      name: 'caseType',
      enumsLabel: 'case_type',
      rules: [{ required: true, message: '请选择案件办理阶段!', whitespace: true }],
    },
    {
      label: '案件性质',
      name: 'caseNature',
      enumsLabel: 'case_nature',
      rules: [{ required: true, message: '请输入案件性质!', whitespace: true }],
    },
    {
      label: '专项行动',
      name: 'specialActionIds',
      enumsLabel: 'handle_type',
    },
    {
      label: '传播渠道',
      name: 'spreadChannel',
      enumsLabel: 'spread_channel',
    },
    {
      label: '传播形式',
      name: 'spreadForm',
      enumsLabel: 'spread_form',
    },
    {
      label: '涉案平台类型',
      name: 'involvedPlatformType',
      enumsLabel: 'involved_platform_type',
    },
    {
      label: '涉案数量',
      name: 'caseNumber',
    },
    {
      label: '涉案金额',
      name: 'caseAmount',
    },
    {
      label: '罪名',
      name: 'charge',
      enumsLabel: 'charge',
      visible: caseType !== '1',
    },
    {
      label: '刑事拘留人数',
      name: 'detentionNumber',
      visible: caseType !== '1',
    },
    {
      label: '抓获人数',
      name: 'captureNumber',
      visible: caseType !== '1',
    },
    {
      label: '判处被告人数量',
      name: 'defendantNumber',
      visible: caseType !== '1',
    },
    {
      label: '逮捕人数',
      name: 'arrestNumber',
      visible: caseType !== '1',
    },
    {
      label: '最高刑期',
      name: 'maximumSentence',
      visible: caseType !== '1',
    },
    {
      label: '判处被告单位数量',
      name: 'defendantCompanyNumber',
      visible: caseType !== '1',
    },
    {
      label: '案件地域',
      name: 'regionObj',
      render: <ProvinceCascaderInput />,
      rules: [{ required: true, message: '请输入发生地域!' }],
    },
    {
      name: 'segmentation1',
      type: 'segmentation',
    },
    {
      label: '案情简要',
      name: 'brieflyCase',
      type: 'textarea',
      span: 4,
      rules: [{ max: 400, message: '案情简要长度请小于400位!', whitespace: true }],
    },
    {
      label: '行政处理结果',
      name: 'punishResult',
      visible: caseType === '1',
      span: 4,
      type: 'textarea',
    },
    {
      label: '刑事案件具体判决结果',
      name: 'sentenceResult',
      visible: caseType !== '1',
      span: 4,
      type: 'textarea',
    },
    {
      name: 'segmentation2',
      type: 'segmentation',
    },
    {
      label: '相关附件',
      name: 'fileList',
      type: 'upload',
    },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  const selectLgbInput = (
    // 显示单位信息-公共组件
    <></>
  );

  return (
    <AdvancedForm
      form={form}
      fields={formItems}
      footerRender={selectLgbInput}
      onFieldsChange={onFieldsChange}
    />
  );
};

CaseMgt.useForm = AdvancedForm.useForm;

export default CaseMgt;

import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const CaseMgt = ({ form, orgInfoData }) => {
  const formItems = [
    {
      name: 'caseId',
      hidden: true,
    },
    {
      label: '案件名称',
      name: 'caseName',
      rules: [{ required: true, message: '请输入案件名称!', whitespace: true }],
    },
    {
      label: '罪名',
      name: 'charge',
      rules: [{ required: true, message: '请输入罪名!', whitespace: true }],
    },
    {
      label: '案情简要',
      name: 'brieflyCase',
      rules: [{ max: 80, message: '案情简要长度请小于400位!', whitespace: true }],
    },
    {
      label: '案件编号(系统生成)',
      disabled: 'true',
      name: 'caseCode',
    },
    {
      label: '案件性质',
      name: 'caseNature',
      enumsLabel: 'case_nature',
      rules: [{ required: true, message: '请输入案件性质!', whitespace: true }],
    },
    {
      label: '案件来源',
      name: 'caseSource',
      enumsLabel: 'case_source',
      rules: [{ required: true, message: '请输入案件来源!', whitespace: true }],
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
      label: '立案日期',
      name: 'registerTime',
      type: 'dateTime',
      // rules: [  { required: true, message: '请选择密级!', whitespace: true }, ],
    },
    {
      label: '紧急程度',
      name: 'urgentLevel',
      enumsLabel: 'urgent_level',
      rules: [{ required: true, message: '请输入紧急程度!', whitespace: true }],
    },
    {
      label: '抓获人数',
      name: 'captureNumber',
    },
    {
      label: '刑事拘留人数',
      name: 'detentionNumber',
    },
    {
      label: '逮捕人数',
      name: 'arrestNumber',
    },
    {
      label: '判处被告人数量',
      name: 'defendantNumber',
    },
    {
      label: '传播渠道',
      name: 'spreadChannel',
      enumsLabel: 'spread_channel',
      rules: [{ required: true, message: '请选择传播渠道!', whitespace: true }],
    },
    {
      label: '传播形式',
      name: 'spreadForm',
      enumsLabel: 'spread_form',
      rules: [{ required: true, message: '请选择传播形式!', whitespace: true }],
    },
    {
      label: '所属联防工程',
      name: 'engineeringIds',
      enumsLabel: 'handle_type',
      rules: [{ required: true, message: '请选择所属联防工程!', whitespace: true }],
    },
    {
      label: '是否网络案件',
      name: 'isNetworkCase',
      enumsLabel: 'is_network_case',
      rules: [{ required: true, message: '请选择类型!', whitespace: true }],
    },
    {
      label: '专项行动',
      name: 'specialActionIds',
      enumsLabel: 'handle_type',
      rules: [{ required: true, message: '请选择专项行动!', whitespace: true }],
    },
    {
      label: '案件查处部门',
      name: 'investigationDepartment',
    },
    {
      label: '涉案平台类型',
      name: 'involvedPlatformType',
      enumsLabel: 'involved_platform_type',
      rules: [{ required: true, message: '请选择涉案平台!', whitespace: true }],
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
      label: '案件办理阶段',
      name: 'caseType',
      enumsLabel: 'handle_type',
      rules: [{ required: true, message: '请选择案件办理阶段!', whitespace: true }],
    },
    {
      label: '发案公司',
      name: 'reportCompany',
    },
    {
      label: '发案时间',
      name: 'reportTime',
      type: 'dateTime',
    },
    {
      label: '案件地域',
      name: 'region',
      span: 4,
      rules: [
        { required: true, message: '请输入发生地域!', whitespace: true },
        { max: 80, message: '发生地域长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '案情描述',
      name: 'completeCase',
      span: 4,
      type: 'textarea',
      rules: [{ max: 400, message: '案情描述长度请小于400位!', whitespace: true }],
    },
    {
      label: '行政处理结果',
      name: 'punishResult',
      span: 1.5,
      type: 'textarea',
      rules: [
        { message: '请输入行政处理结果!', whitespace: true },
        { max: 80, message: '单位名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '案件办理结果',
      name: 'sentenceResult',
      span: 1.5,
      type: 'textarea',
      rules: [
        { message: '请输入案件办理结果!', whitespace: true },
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

  const selectLgbInput = (
    // 显示老干部信息-公共组件
    <></>
  );

  return <AdvancedForm form={form} fields={formItems} footerRender={selectLgbInput} />;
};

CaseMgt.useForm = AdvancedForm.useForm;

export default CaseMgt;

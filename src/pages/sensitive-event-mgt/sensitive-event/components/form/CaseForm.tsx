import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';

const CaseForm = ({ form, orgInfoData, specialList, id, caseType, onFieldsChange }) => {
  const formItems = [
    {
      name: 'eventId',
      hidden: true,
    },
    {
      label: '报送单位',
      name: 'reportUnit',
      rules: [{ required: true, message: '请输入报送单位!', whitespace: true }],
    },
    {
      label: '报送时间',
      name: 'reportTime',
      type: 'dateTime',
      rules: [{ required: true, message: '请选择报送时间!' }],
    },
    {
      label: '敏感事件名称',
      name: 'eventName',
      rules: [{ required: true, message: '请输入敏感事件名称!', whitespace: true }],
    },
    {
      label: '敏感事件编号(系统生成)',
      disabled: 'true',
      name: 'eventCode',
      visible: !!id,
    },
    {
      label: '敏感事件来源',
      name: 'eventSource',
      enumsLabel: 'case_source',
      rules: [{ required: true, message: '请选择敏感事件来源!', whitespace: true }],
    },
    {
      label: '办理部门',
      name: 'investigateDept',
      rules: [{ required: true, message: '请输入办理部门!', whitespace: true }],
    },
    {
      label: '重要程度',
      name: 'importantDegree',
      enumsLabel: 'importance_level',
      rules: [{ required: true, message: '请选择重要程度!', whitespace: true }],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      enumsLabel: 'object_secrecy_level',
      rules: [{ required: true, message: '请选择保密等级!', whitespace: true }],
    },
    {
      label: '立案时间',
      name: 'caseTime',
      type: 'dateTime',
      rules: [{ required: true, message: '请选择立案时间!' }],
    },
    {
      label: '紧急程度',
      name: 'urgencyDegree',
      enumsLabel: 'urgent_level',
      rules: [{ required: true, message: '请选择紧急程度!', whitespace: true }],
    },
    {
      label: '敏感事件类型',
      name: 'eventType',
      enumsLabel: 'case_type',
      rules: [{ required: true, message: '请选择敏感事件类型!', whitespace: true }],
    },
    {
      label: '敏感事件性质',
      name: 'eventNature',
      enumsLabel: 'case_nature',
      rules: [{ required: true, message: '请选择敏感事件性质!', whitespace: true }],
    },
    {
      label: '专项行动',
      name: 'specialActionIds',
      enumsItems: specialList,
      extraProps: {
        mode: 'multiple',
      },
    },
    {
      label: '传播渠道',
      name: 'spreadWay',
      enumsLabel: 'spread_channel',
      extraProps: {
        mode: 'multiple',
      },
    },
    {
      label: '传播形式',
      name: 'spreadForm',
      enumsLabel: 'spread_form',
      rules: [{ required: true, message: '请选择传播形式!', whitespace: true }],
    },
    {
      label: '涉案平台类型',
      name: 'platformType',
      enumsLabel: 'involved_platform_type',
      extraProps: {
        mode: 'multiple',
      },
    },
    {
      label: '涉案数量',
      name: 'caseNumber',
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入正确的涉案数量',
        },
      ],
    },
    {
      label: '涉案金额',
      name: 'caseMoney',
      rules: [
        {
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入正确的涉案金额',
        },
      ],
    },
    {
      label: '罪名',
      name: 'charge',
      enumsLabel: 'charge',
      visible: caseType !== '1',
      extraProps: {
        mode: 'multiple',
      },
    },
    {
      label: '抓获人数',
      name: 'capturePersonNum',
      visible: caseType !== '1',
      rules: [
        {
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入正确的抓获人数',
        },
      ],
    },
    {
      label: '刑事拘留人数',
      name: 'detainPersonNum',
      visible: caseType !== '1',
      rules: [
        {
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入正确的刑事拘留人数',
        },
      ],
    },
    {
      label: '逮捕人数',
      name: 'arrestPersonNum',
      visible: caseType !== '1',
      rules: [
        {
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入正确的逮捕人数',
        },
      ],
    },
    {
      label: '判处被告人数量',
      name: 'defendantPersonNum',
      visible: caseType !== '1',
      rules: [
        {
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入正确的判处被告人数量',
        },
      ],
    },
    {
      label: '判处被告单位数量',
      name: 'defendantUnitNum',
      visible: caseType !== '1',
      rules: [
        {
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入正确的判处被告单位数量',
        },
      ],
    },
    {
      label: '最高刑期',
      name: 'highestPrisonTerm',
      visible: caseType !== '1',
      rules: [
        {
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入正确的最高刑期',
        },
      ],
    },
    {
      label: '发生地域',
      name: 'regionObj',
      render: <ProvinceCascaderInput />,
      rules: [{ required: true, message: '请选择发生地域!' }],
    },
    {
      label: '简要案情',
      name: 'briefCase',
      span: 4,
      type: 'textarea',
      rules: [{ max: 400, message: '简要案情长度请小于400位!', whitespace: true }],
    },
    {
      label: '具体判决结果',
      name: 'punishResult',
      visible: caseType === '1',
      span: 4,
      type: 'textarea',
      rules: [{ max: 80, message: '单位名称长度请小于80位!', whitespace: true }],
    },
    {
      label: '具体判决结果',
      name: 'convictionsResult',
      span: 4,
      type: 'textarea',
      visible: caseType !== '1',
      rules: [{ max: 80, message: '单位名称长度请小于80位!', whitespace: true }],
    },
    {
      label: '相关附件',
      name: 'fileList',
      span: 4,
      type: 'uploadSecrecy',
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

  return (
    <AdvancedForm
      form={form}
      fields={formItems}
      footerRender={selectLgbInput}
      onFieldsChange={onFieldsChange}
    />
  );
};

CaseForm.useForm = AdvancedForm.useForm;

export default CaseForm;

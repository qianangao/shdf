import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Checkbox } from 'antd';
import { getUseInfo, USER_INFO } from '@/utils/cookie';
import OrgSelectInput from '@/components/OrgMultiSelectInput/OrgSelectInput';

const InstitutionForm = ({ form, fieldChangeHander }) => {
  const formItems = [
    { label: 'id', name: 'documentId', hidden: true },
    {
      label: '公告标题',
      name: 'documentTitle',
      span: 3,
      rules: [
        { required: true, message: '请输入公告标题!' },
        { max: 40, min: 0, message: '输入文字过长，公告标题不能超过40字' },
      ],
    },
    {
      label: '发布部门',
      name: 'publishDept',
      rules: [{ required: true, message: '请输入发布部门!' }],
      initialValue: getUseInfo(USER_INFO)
        ? JSON.parse(getUseInfo(USER_INFO)).orgName
        : 'SHDF办公室',
      disabled: true,
    },
    {
      label: '密级标识',
      name: 'secrecyLevel',
      rules: [{ required: true, message: '请选择密级标识!' }],
      enumsLabel: 'object_secrecy_level',
    },
    {
      label: '可见范围',
      name: 'visibleRangeOrg',
      rules: [{ required: true, message: '请选择可见范围!' }],
      render: <OrgSelectInput />,
    },
    {
      label: '公告内容',
      name: 'documentContent',
      type: 'editor',
      span: 3,
      rules: [
        { required: true, message: '请输入公告内容!' },
        { max: 10000, min: 0, message: '输入文字过长，公告内容不能超过10000字' },
      ],
    },
    {
      label: '提醒方式',
      name: 'remindWays',
      span: 3,
      initialValue: ['1'],
      render: <Checkbox.Group options={[{ label: '站内信', value: '1' }]} />,
    },
    {
      label: '上传附件',
      name: 'files',
      type: 'uploadSecrecy',
      span: 3,
    },
  ];

  return <AdvancedForm form={form} fields={formItems} fieldChange={fieldChangeHander} />;
};

InstitutionForm.useForm = AdvancedForm.useForm;

export default InstitutionForm;

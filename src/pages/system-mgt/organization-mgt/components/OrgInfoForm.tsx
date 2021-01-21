import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const OrgInfoForm = ({ form, orgInfoData }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '单位名称',
      name: 'organizationName',
      span: 4,
      rules: [
        { required: true, message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '单位名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '单位性质',
      name: 'dictOrganizationType',
      span: 4,
      enumsLabel: 'dictOrganizationType',
      rules: [{ required: true, message: '请选择单位性质!' }],
    },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

OrgInfoForm.useForm = AdvancedForm.useForm;

export default OrgInfoForm;

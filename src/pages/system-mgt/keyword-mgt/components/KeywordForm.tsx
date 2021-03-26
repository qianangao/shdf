import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const KeywordForm = ({ form, orgInfoData }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '关键字',
      name: 'keyWord',
      span: 4,
      rules: [
        { required: true, message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '单位名称长度请小于80位!', whitespace: true },
      ],
    },
    // {
    //   label: '单位性质',
    //   name: 'dictOrganizationType',
    //   span: 4,
    //   enumsLabel: 'dictOrganizationType',
    //   rules: [{ required: true, message: '请选择单位性质!' }],
    // },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

KeywordForm.useForm = AdvancedForm.useForm;

export default KeywordForm;

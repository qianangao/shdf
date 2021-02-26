import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const CaseMgt = ({ form, orgInfoData }) => {
  const formItems = [
    {
      label: '总体评价',
      name: 'evaluateContent',
      span: 4,
      type: 'textarea',
      rules: [
        { message: '请输入总体评价!', whitespace: true },
        { max: 80, message: '总体评价长度请小于80位!', whitespace: true },
      ],
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

  return <AdvancedForm form={form} fields={formItems} headerRender={selectLgbInput} />;
};

CaseMgt.useForm = AdvancedForm.useForm;

export default CaseMgt;

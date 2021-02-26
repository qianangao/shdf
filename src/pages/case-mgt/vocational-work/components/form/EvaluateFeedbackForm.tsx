import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const CaseMgt = ({ form, orgInfoData }) => {
  const formItems = [
    {
      label: '反馈内容',
      name: 'evaluateFeedback',
      span: 4,
      type: 'textarea',
      rules: [
        { message: '请输入反馈内容!', whitespace: true },
        { max: 80, message: '反馈内容长度请小于80位!', whitespace: true },
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

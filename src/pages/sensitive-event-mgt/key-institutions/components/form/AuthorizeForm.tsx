import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

import StaffMultiSelectInput from '@/components/StaffMultiSelectInput';

const AuthorizeForm = ({ form, orgInfoData }) => {
  const formItems = [
    { label: 'id', name: 'orgId', hidden: true },
    { label: '请选择你要授权的人', name: 'staff', span: 4, render: <StaffMultiSelectInput /> },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

AuthorizeForm.useForm = AdvancedForm.useForm;

export default AuthorizeForm;

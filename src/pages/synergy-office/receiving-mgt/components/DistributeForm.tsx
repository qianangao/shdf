import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

import StaffMultiSelectInput from '@/components/StaffMultiSelectInput';

const DistributeForm = ({ form, orgInfoData }) => {
  const formItems = [
    { label: 'id', name: 'orgId', hidden: true },
    { label: '请选择你要分发传阅的人', name: 'staff', span: 4, render: <StaffMultiSelectInput /> },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

DistributeForm.useForm = AdvancedForm.useForm;

export default DistributeForm;

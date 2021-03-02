import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const FileCaseForm = ({ form, orgInfoData }) => {
  const formItems = [
    {
      name: 'caseId',
      hidden: true,
    },
    {
      label: '附件列表',
      name: 'transmitFileIds',
      span: 4,
      type: 'upload',
    },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

FileCaseForm.useForm = AdvancedForm.useForm;

export default FileCaseForm;

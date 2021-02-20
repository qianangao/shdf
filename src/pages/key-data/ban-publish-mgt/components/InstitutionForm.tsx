import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';
import StaffMultiSelectInput from '@/components/StaffMultiSelectInput';
import AddressInput from '@/components/AddressInput';

const InstitutionForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'orgId', hidden: true },
    { label: '机构中文名', name: 'orgName' },
    { label: '保密级别', name: 'subjectSecrecyLevel', enumsLabel: 'subject_secrecy_level' },
    { label: '成立日期', name: 'establishDate', type: 'date' },
    { label: '组织demo', name: 'org', render: <OrgMultiSelectInput /> },
    { label: '人员demo', name: 'staff', render: <StaffMultiSelectInput /> },
    { label: '地址选择', name: 'address', render: <AddressInput /> },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

InstitutionForm.useForm = AdvancedForm.useForm;

export default InstitutionForm;

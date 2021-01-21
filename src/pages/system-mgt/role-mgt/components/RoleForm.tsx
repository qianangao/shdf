import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const RoleForm = ({ form, roleData }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '角色名称',
      name: 'roleName',
      span: 4,
      rules: [
        { required: true, message: '请输入角色名称!', whitespace: true },
        { max: 80, message: '角色名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '角色描述',
      name: 'remark',
      span: 4,
      rules: [{ max: 180, message: '角色描述长度请小于180位!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (roleData) {
      form.setFieldsValue({ ...roleData });
    }
  }, [roleData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

RoleForm.useForm = AdvancedForm.useForm;

export default RoleForm;

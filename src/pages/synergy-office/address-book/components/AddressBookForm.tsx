import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { checkPhone, checkEmail, checkTelephone } from '@/utils/validators';

const AddressBookForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'bookId', hidden: true },
    {
      label: '姓名',
      name: 'userName',
      span: 4,
      rules: [
        { required: true, message: '请输入员工姓名!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!' },
      ],
    },
    {
      label: '性别',
      name: 'gender',
      span: 4,
      rules: [{ required: true, message: '请选择员工性别!' }],
      enumsLabel: 'dict_sex',
    },
    {
      label: '所属部门',
      name: 'userDept',
      span: 4,
      rules: [{ required: true, message: '请输入所属部门!' }],
    },
    {
      label: '当前职务',
      name: 'job',
      span: 4,
      rules: [{ required: true, message: '请输入当前职务!' }],
    },
    {
      label: '手机号',
      name: 'phoneNumber',
      span: 4,
      rules: [
        { required: true, message: '请输入手机号码!' },
        {
          validator: checkPhone,
        },
      ],
    },
    {
      label: '办公电话',
      name: 'officeTelephone',
      span: 4,
      extraProps: {
        placeholder: '010-88888888',
      },
      rules: [
        {
          validator: checkTelephone,
        },
      ],
    },
    {
      label: '邮箱',
      name: 'mailbox',
      span: 4,
      rules: [
        {
          validator: checkEmail,
        },
      ],
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AddressBookForm.useForm = AdvancedForm.useForm;

export default AddressBookForm;

import React from 'react';
import { Radio } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import { checkPhone, checkEmail, checkTelephone } from '@/utils/validators';

const AddressBookForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'bookId', hidden: true },
    {
      label: '员工姓名',
      name: 'userName',
      span: 4,
      rules: [
        { required: true, message: '请输入姓名!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!' },
      ],
    },
    {
      label: '员工性别',
      name: 'gender',
      span: 4,
      // initialValue: '1',
      rules: [{ required: true, message: '请选择员工性别' }],
      render: (
        <Radio.Group>
          <Radio value={0}>女</Radio>
          <Radio value={1}>男</Radio>
          <Radio value={2}>保密</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '所属部门',
      name: 'userDept',
      span: 4,
      rules: [{ required: true, message: '请选择所属部门' }],
    },
    {
      label: '当前职务',
      name: 'job',
      span: 4,
      rules: [{ required: true, message: '请选择当前职务' }],
    },
    {
      label: '手机号码',
      name: 'phoneNumber',
      span: 4,
      rules: [
        { required: true, message: '请填写手机号码!' },
        {
          validator: checkPhone,
        },
      ],
    },
    {
      label: '座机/分机',
      name: 'officeTelephone',
      span: 4,
      rules: [
        {
          validator: checkTelephone,
        },
      ],
    },
    {
      label: '邮箱地址',
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

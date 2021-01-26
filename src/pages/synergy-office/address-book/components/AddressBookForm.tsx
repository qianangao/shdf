import React from 'react';
import { Radio } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import { checkPhone, checkPost, checkTelephone } from '@/utils/validators';

const AddressBookForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'orgId', hidden: true },
    {
      label: '员工姓名',
      name: 'orgName',
      span: 4,
      rules: [{ required: true, message: '请填写员工姓名', whitespace: true }],
    },
    {
      label: '员工性别',
      name: 'orgNameEn',
      span: 4,
      rules: [{ required: true, message: '请选择员工性别' }],
      render: (
        <Radio.Group>
          <Radio value="1">男</Radio>
          <Radio value="0">女</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '所属部门',
      name: 'orgCode',
      span: 4,
      rules: [{ required: true, message: '请选择所属部门' }],
    },
    {
      label: '当前职务',
      name: 'category',
      span: 4,
      rules: [{ required: true, message: '请选择当前职务' }],
    },
    {
      label: '手机号码',
      name: 'area',
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
      name: 'description',
      span: 4,
      rules: [
        {
          validator: checkTelephone,
        },
      ],
    },
    {
      label: '邮箱地址',
      name: 'address',
      span: 4,
      rules: [
        {
          validator: checkPost,
        },
      ],
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AddressBookForm.useForm = AdvancedForm.useForm;

export default AddressBookForm;

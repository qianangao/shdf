import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Radio } from 'antd';
import { checkPhone } from '@/utils/validators';

const UserForm = ({ form }) => {
  const formItems = [
    {
      label: '姓名',
      name: 'roleName',
      span: 4,
      rules: [
        { required: true, message: '请输入姓名!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
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
      label: '出生日期',
      name: 'gender',
      span: 4,
      rules: [{ required: true, message: '请输入出生日期!' }],
      type: 'date',
    },
    {
      label: '所属部门',
      name: 'gender',
      span: 4,
      rules: [{ required: true, message: '请输入所属部门!' }],
    },
    {
      label: '联系电话',
      name: 'gender',
      span: 4,
      rules: [
        { required: true, message: '请输入手机号码!' },
        {
          validator: checkPhone,
        },
      ],
    },
    {
      label: '身份证号',
      name: 'gender',
      span: 4,
      rules: [{ required: true, message: '请输入所属部门!' }],
    },
    {
      label: '工作人员状态',
      name: 'job',
      span: 4,
      rules: [{ required: true, message: '请选择!' }],
      render: (
        <Radio.Group>
          <Radio value="1">在职</Radio>
          <Radio value="0">离职</Radio>
          <Radio value="2">退休</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '专/兼职',
      name: 'job',
      span: 4,
      rules: [{ required: true, message: '请选择!' }],
      render: (
        <Radio.Group>
          <Radio value="1">专职</Radio>
          <Radio value="0">兼职</Radio>
        </Radio.Group>
      ),
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

UserForm.useForm = AdvancedForm.useForm;

export default UserForm;

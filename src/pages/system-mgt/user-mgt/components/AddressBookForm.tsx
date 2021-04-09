import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { checkPhone, checkEmail } from '@/utils/validators';
import OrgSelectInput from '@/components/OrgMultiSelectInput/OrgSelectInput';

const AddressBookForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'userId', hidden: true },
    {
      label: '用户姓名',
      name: 'userName',
      span: 1,
      rules: [
        { required: true, message: '请输入用户姓名!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!' },
      ],
    },
    {
      label: '用户编码',
      name: 'userCode',
      span: 1,
      rules: [
        { required: true, message: '请输入用编码!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!' },
      ],
    },
    {
      label: '手机号',
      name: 'mobile',
      span: 1,
      rules: [
        { required: true, message: '请输入手机号码!' },
        {
          validator: checkPhone,
        },
      ],
    },
    {
      label: '所在机构',
      name: 'orgObj',
      span: 1,
      rules: [{ required: true, message: '请选择所在机构!' }],
      render: <OrgSelectInput />,
    },
    {
      label: '用户性别',
      name: 'sex',
      span: 1,
      rules: [{ required: true, message: '请选择用户性别!' }],
      enumsLabel: 'dict_sex',
    },
    {
      label: '数据来源',
      name: 'source',
      span: 1,
    },
    {
      label: '电子邮箱',
      name: 'email',
      span: 1,
      rules: [
        {
          validator: checkEmail,
        },
      ],
    },
    {
      label: '职位',
      name: 'positionName',
      span: 1,
      rules: [{ required: true, message: '请输入当前职务!' }],
    },
    {
      label: '证件类型',
      name: 'paperType',
      span: 1,
      rules: [{ required: true, message: '请输入证件类型!' }],
    },
    {
      label: '职级',
      name: 'jobLevel',
      span: 1,
      rules: [{ required: true, message: '请输入职!' }],
    },
    {
      label: '序号',
      name: 'orderNum',
      span: 1,
      rules: [{ required: true, message: '请输序号!' }],
    },
    {
      label: '用户类型',
      name: 'userType',
      span: 1,
      rules: [{ required: true, message: '请输用户类型!' }],
    },
    {
      label: '证件号码',
      name: 'paperNum',
      span: 1,
      rules: [{ required: true, message: '请输入职!' }],
    },
    {
      label: '用户密码',
      name: 'loginPwd',
      span: 1,
      rules: [{ required: true, message: '请输入密码!' }],
    },
    {
      label: '登陆名',
      name: 'loginName',
      span: 1,
      rules: [{ required: true, message: '请输入登录名!' }],
    },
    {
      label: '用户状态',
      name: 'userStatus',
      span: 1,
      rules: [{ required: true, message: '请输入用户状态!' }],
    },
    {
      label: '用户地址',
      name: 'addr',
      span: 1,
      rules: [{ required: true, message: '请输入地址!' }],
    },
    {
      label: '出生日期',
      name: 'birthday',
      span: 1,
      rules: [{ required: true, message: '请输入出生日期' }],
    },
    {
      label: '备注',
      name: 'remark',
      span: 1,
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AddressBookForm.useForm = AdvancedForm.useForm;

export default AddressBookForm;

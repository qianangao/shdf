import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
// import { checkPhone, checkEmail, checkTelephone } from '@/utils/validators';

const AddressBookForm = ({ form }) => {
  // const isInteger = (rule, value, callback) => {
  //   if (!value) {
  //     return callback(new Error('输入不可以为空'));
  //   }
  //   setTimeout(() => {
  //     if (!Number(value)) {
  //       callback(new Error('请输入正整数'));
  //     } else {
  //       const re = /^[0-9]*[1-9][0-9]*$/;
  //       const rsCheck = re.test(value);
  //       if (!rsCheck) {
  //         callback(new Error('请输入正整数'));
  //       } else {
  //         callback();
  //       }
  //     }
  //   }, 0);
  // };
  const formItems = [
    { label: 'id', name: 'orgId', hidden: true, span: 2 },
    // {
    //   label: '上级机构',
    //   name: 'orgPid',
    //   span: 1.5,
    //   rules: [
    //     { required: true, message: '请输入上级机构!', whitespace: true },
    //     { max: 30, message: '姓名长度请小于30位!' },
    //   ],
    // },

    {
      label: '机构名称',
      name: 'orgName',
      span: 1.5,
      rules: [{ required: true, message: '请输入机构名称!' }],
    },
    {
      label: '机构代号',
      name: 'orgCode',
      span: 1.5,
      rules: [{ required: true, message: '请输入机构代号!' }],
    },
    {
      label: '机构类型',
      name: 'orgKind',
      span: 1.5,
      rules: [{ required: true, message: '请输入机构类型!' }],
    },

    {
      label: '机构性质',
      name: 'orgNature',
      span: 1.5,
      // extraProps: {
      //   placeholder: '010-88888888',
      // },
      rules: [{ required: true, message: '请输入机构性质!' }],
    },
    {
      label: '机构简称',
      name: 'orgSimpleName',
      span: 1.5,
      rules: [{ required: true, message: '请输入机构简称!' }],
    },
    {
      label: '主管人员',
      name: 'chargePerson',
      span: 1.5,
      rules: [{ required: true, message: '请输入主管人员!' }],
    },
    {
      label: '职能描述',
      name: 'functionDesc',
      span: 1.5,
      rules: [{ required: true, message: '请输入职能描述!' }],
    },
    {
      label: '机构分类',
      name: 'orgType',
      span: 1.5,
      rules: [{ required: true, message: '请输入机构分类!' }],
    },
    {
      label: '机构命令代号',
      name: 'orgOrder',
      span: 1.5,
      rules: [
        {
          required: true,
          // validator: isInteger
        },
      ],
    },

    // {
    //   label: '排序号',
    //   name: 'orgOrder',
    //   span: 1.5,
    //   rules: [
    //     { required: true, message: '请输入排序号!' },
    //     {
    //       validator: checkPhone,
    //     },
    //   ],
    // },
    // {
    //   label: '创建人',
    //   name: 'createUser',
    //   span: 1.5,
    //   rules: [
    //     { required: true, message: '请输入创建人!' },
    //     {
    //       validator: checkPhone,
    //     },
    //   ],
    // },
    // {
    //   label: '创建时间',
    //   name: 'createTime',
    //   span: 1.5,
    //   rules: [
    //     { required: true, message: '请输入创建时间!' },
    //     {
    //       validator: checkPhone,
    //     },
    //   ],
    // },
    // {
    //   label: '最近一次操作人',
    //   name: 'lastUpdateUser',
    //   span: 1.5,
    //   rules: [
    //     { required: true, message: '请输入最近一次操作人!' },
    //     {
    //       validator: checkPhone,
    //     },
    //   ],
    // },
    // {
    //   label: '最近一次操作时间',
    //   name: 'lastUpdataTime',
    //   span: 1.5,
    //   rules: [
    //     { required: true, message: '请输入最近一次操作时间!' },
    //     {
    //       validator: checkPhone,
    //     },
    //   ],
    // },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AddressBookForm.useForm = AdvancedForm.useForm;

export default AddressBookForm;

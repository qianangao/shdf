import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { isNum } from '@/utils/validators';
import { Input } from 'antd';

const PersonForm = ({ form }) => {
  const validate = (rule, value, callback) => {
    const obj = form.getFieldsValue(['personName', 'personNameEn', 'nickname']);
    if (
      (obj.personName !== '' && obj.personName !== null && obj.personName !== undefined) ||
      (obj.personNameEn !== '' && obj.personNameEn !== null && obj.personNameEn !== undefined) ||
      (obj.nickname !== '' && obj.nickname !== null && obj.nickname !== undefined)
    ) {
      callback();
    } else {
      callback('中文姓名，英文姓名，外号必填一个');
    }
  };
  const formItems = [
    { label: 'id', name: 'personId', hidden: true },
    {
      label: '星级',
      name: 'starLevel',
      enumsLabel: 'star_level',
      rules: [{ required: true, message: '请选择星级!' }],
    },
    {
      label: '中文姓名',
      name: 'personName',
      rules: [{ required: true, validator: validate }],
    },
    {
      label: '英文姓名',
      name: 'personNameEn',
      rules: [{ required: true, validator: validate }],
    },
    {
      label: '外号',
      name: 'nickname',
      rules: [{ required: true, validator: validate }],
    },
    {
      label: '性别',
      name: 'sex',
      enumsLabel: 'dict_sex',
    },
    {
      label: '生日',
      name: 'birthday',
      type: 'date',
    },
    {
      label: '年龄',
      name: 'age',
      rules: [{ validator: isNum }, { max: 3, min: 0, message: '年龄输入错误' }],
      render: <Input addonAfter="岁" type="number" />,
    },
    {
      label: '身高',
      name: 'height',
      rules: [
        { required: true, validator: isNum },
        { max: 3, min: 0, message: '身高输入错误' },
      ],
      render: <Input addonAfter="CM" type="number" />,
    },
    {
      label: '体重',
      name: 'weight',
      rules: [
        { required: true, validator: isNum },
        { max: 3, min: 0, message: '体重输入错误' },
      ],
      render: <Input addonAfter="KG" type="number" />,
    },
    {
      label: '血型',
      name: 'blood',
      enumsLabel: 'blood',
      rules: [{ required: true, message: '请输入血型!' }],
    },
    {
      label: '民族',
      name: 'nation',
      enumsLabel: 'nation',
    },
    {
      label: '国籍',
      name: 'nationality',
      enumsLabel: 'nationality',
    },
    {
      label: '出生地',
      name: 'birthplace',
      rules: [{ required: true, message: '请输入出生地!' }],
    },
    {
      label: '证件号码',
      name: 'idCard',
    },
    {
      label: '婚姻状况',
      name: 'marital',
      enumsLabel: 'marital',
      rules: [{ required: true, message: '请选择婚姻状况!' }],
    },
    {
      label: '文化程度',
      name: 'education',
      enumsLabel: 'education',
    },
    {
      label: '政治面貌',
      name: 'political',
      enumsLabel: 'political',
    },
    {
      label: '宗教信仰',
      name: 'religion',
    },
    {
      label: '团体组织',
      name: 'organization',
    },
    {
      label: '联系电话',
      name: 'telephone',
    },
    {
      label: '联系邮箱',
      name: 'email',
    },
    {
      label: '联系地址',
      name: 'address',
    },
    {
      label: '工作单位',
      name: 'workPlace',
    },
    {
      label: '工作部门',
      name: 'workDepartment',
    },
    {
      label: '工作职务',
      name: 'workJob',
    },
    {
      label: '家庭成员',
      name: 'familyMember',
    },
    {
      label: '社会背景',
      name: 'social',
      type: 'textarea',
    },
    {
      label: '教育经历',
      name: 'educational',
      type: 'textarea',
    },
    {
      label: '性质属性',
      name: 'attribute',
      type: 'textarea',
    },
    {
      label: '备注说明',
      name: 'remarks',
      type: 'textarea',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

PersonForm.useForm = AdvancedForm.useForm;

export default PersonForm;

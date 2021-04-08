import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const AddThreadForm = ({ form, InfoData }) => {
  const formItems = [
    {
      label: '上报省份',
      name: 'reportProvince',
      span: 1,
      rules: [{ required: true, message: '请输入上报省份!' }],
    },
    {
      label: '上报时间',
      name: 'reportDate',
      type: 'date',
      span: 1,
    },
    {
      label: '宣传物品涉疆',
      name: 'publicityMaterialsSJ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入宣传物品数量!(数字)',
        },
      ],
    },
    {
      label: '宣传物品涉藏',
      name: 'publicityMaterialsSZ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入宣传物品数量!(数字)',
        },
      ],
    },
    {
      label: '宣传物品涉宗教',
      name: 'publicityMaterialsSZJ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入宣传物品数量!(数字)',
        },
      ],
    },
    {
      label: '宣传物品其他',
      name: 'publicityMaterialsQT',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入宣传物品数量!(数字)',
        },
      ],
    },

    {
      label: '删除网络信息涉疆',
      name: 'networkInformationSJ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入删除网络信息数量!(数字)',
        },
      ],
    },
    {
      label: '删除网络信息涉藏',
      name: 'networkInformationSZ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入删除网络信息数量!(数字)',
        },
      ],
    },
    {
      label: '删除网络信息涉宗教',
      name: 'networkInformationSZJ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入删除网络信息数量!(数字)',
        },
      ],
    },
    {
      label: '删除网络信息其他',
      name: 'networkInformationQT',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入删除网络信息数量!(数字)',
        },
      ],
    },

    {
      label: '查办案件工程涉疆',
      name: 'investigationHandlingCaseSJ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入查办案件工程数量数量!(数字)',
        },
      ],
    },
    {
      label: '查办案件工程涉藏',
      name: 'investigationHandlingCaseSZ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入查办案件工程数量数量!(数字)',
        },
      ],
    },
    {
      label: '查办案件工程涉宗教',
      name: 'investigationHandlingCaseSZJ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入查办案件工程数量数量!(数字)',
        },
      ],
    },
    {
      label: '查办案件工程其他',
      name: 'investigationHandlingCaseQT',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入查办案件工程数量数量!(数字)',
        },
      ],
    },
    {
      label: '非法出版涉疆',
      name: 'illegalPublicationSJ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入非法出版数量!(数字)',
        },
      ],
    },
    {
      label: '非法出版涉藏',
      name: 'illegalPublicationSZ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入非法出版数量!(数字)',
        },
      ],
    },
    {
      label: '非法出版涉宗教',
      name: 'illegalPublicationSZJ',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入非法出版数量!(数字)',
        },
      ],
    },
    {
      label: '非法出版其他',
      name: 'illegalPublicationQT',
      span: 1,
      rules: [
        {
          required: true,
          pattern: new RegExp(/^[1-9]\d*$/, 'g'),
          message: '请输入非法出版数量!(数字)',
        },
      ],
    },
  ];
  useEffect(() => {
    if (InfoData) {
      form.setFieldsValue({ ...InfoData });
    }
  }, [InfoData]);
  return <AdvancedForm form={form} fields={formItems} />;
};
AddThreadForm.useForm = AdvancedForm.useForm;
export default AddThreadForm;

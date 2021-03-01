import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
const AddThreadForm = ({ form }) => {
  const formItems = [
    // {
    //   name: '',
    //   span: 4,
    //   render: <Descriptions title="基本信息" size="middle" />,
    // },

    {
      label: '信息名称',
      name: 'infoName',
      span: 4,
      rules: [
        { required: true, message: '请输入信息名称!' },
        { min: 0, max: 100, message: '信息名称长度最多100字!' },
      ],
    },
    {
      label: '信息类型',
      name: 'infoType',
      span: 4,
      // enumsLabel: 'clue_type',
      rules: [{ required: true, message: '请输入信息类型!' }],
    },
    {
      label: '上报时间',
      name: 'reportDate',
      type: 'date',
      span: 4,
    },
    {
      label: '上报省份',
      name: 'reportProvince',
      span: 4,
      rules: [{ required: true, message: '请输入上报省份!' }],
    },
    {
      label: '内容',
      name: 'infoDesc',
      span: 4,
      type: 'textarea',
      rules: [{ min: 0, max: 300, message: '内容描述长度最多300字!' }],
    },
    {
      label: '附件',
      name: 'fileShow',
      type: 'upload',
      span: 4,
    },
  ];
  return <AdvancedForm form={form} fields={formItems} />;
};
AddThreadForm.useForm = AdvancedForm.useForm;
export default AddThreadForm;

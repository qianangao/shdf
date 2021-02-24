import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';

const BanPublishForm = ({ form }) => {
  const formItems = [
    { label: 'id', name: 'publicationId', hidden: true },
    { label: '中文名称', name: 'name' },
    { label: '英文名称', name: 'name_english' },
    {
      label: '作者及编著者',
      name: 'author',
      rules: [{ required: true, message: '请输入作者及编著者!' }],
    },
    { label: '出版机构', name: 'organization' },
    { label: '发行商', name: 'publisher' },
    { label: '书刊号', name: 'isbnIssn' },
    {
      label: '定价',
      name: 'price',
      rules: [{ required: true, message: '请输入定价!' }],
    },
    {
      label: '出版日期',
      name: 'publicationDate',
      type: 'date',
      rules: [{ required: true, message: '请选择出版日期!' }],
    },
    { label: '类别', name: 'category', enumsLabel: 'subject_secrecy_level' },
    { label: '关键词', name: 'keyword' },
    { label: '保密等级', name: 'subjectSecrecyLevel', enumsLabel: 'subject_secrecy_level' },
    {
      label: '所属联防工程',
      name: 'actionId',
      render: <OrgMultiSelectInput />,
    },
    {
      label: '简介说明',
      name: 'description',
      type: 'textarea',
    },
    {
      label: '备注说明',
      name: 'remarks',
      type: 'textarea',
      rules: [{ required: true, message: '请输入备注说明!' }],
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

BanPublishForm.useForm = AdvancedForm.useForm;

export default BanPublishForm;

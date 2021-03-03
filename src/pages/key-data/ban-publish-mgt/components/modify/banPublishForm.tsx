import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';
import { Descriptions } from 'antd';

const BanPublishForm = ({ form }) => {
  const formItems = [
    {
      name: 'baseInfo',
      span: 3,
      render: <Descriptions title="基本信息" size="middle" />,
    },
    { label: 'id', name: 'publicationId', hidden: true },
    { label: '中文名称', name: 'name' },
    { label: '英文名称', name: 'nameEnglish' },
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
    { label: '类别', name: 'category', enumsLabel: 'illegal_dict' },
    { label: '关键词', name: 'keyword' },
    { label: '保密等级', name: 'secrecyLevel', enumsLabel: 'subject_secrecy_level' },
    {
      name: 'line1',
      type: 'segmentation',
    },
    {
      label: '所属联防工程',
      name: 'actionId',
      hidden: true,
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
    {
      name: 'identificationResults',
      span: 3,
      render: <Descriptions title="鉴定结果" size="middle" />,
    },
    {
      label: '鉴定结构',
      name: 'appraisalInstitution',
    },
    { label: '鉴定类型', name: 'appraisalType', enumsLabel: 'illegal_appraisalType' },
    {
      label: '鉴定日期',
      name: 'appraisalDate',
      type: 'date',
    },
    {
      label: '鉴定结论',
      name: 'appraisalConclusion',
      type: 'textarea',
    },
    {
      label: '特征描述',
      name: 'featureDescription',
      type: 'textarea',
    },
    {
      name: 'relevantData',
      span: 3,
      render: <Descriptions title="相关资料" size="middle" />,
    },
    {
      label: '相关附件',
      name: 'files',
      type: 'upload',
    },
    {
      label: '相关视频',
      name: 'video',
      type: 'video',
      span: 2,
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

BanPublishForm.useForm = AdvancedForm.useForm;

export default BanPublishForm;

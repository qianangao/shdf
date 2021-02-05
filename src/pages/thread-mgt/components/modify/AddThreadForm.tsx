import React from 'react';
import { Radio, Descriptions } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';
import UploadInput from '@/components/UploadInput';

const AddThreadForm = ({ form }) => {
  const formItems = [
    {
      name: '',
      span: 4,
      render: <Descriptions title="基本信息" size="middle" />,
    },
    {
      label: '线索id',
      name: 'clueId',
      hidden: true,
    },
    {
      label: '线索名称',
      name: 'clueName',
      required: true,
    },
    {
      label: '线索类型',
      name: 'clueType',
      enumsLabel: 'subject_secrecy_level',
      required: true,
    },
    {
      label: '线索编号',
      name: 'clueNumber',
      required: true,
    },
    {
      label: '线索来源',
      name: 'clueSource',
      enumsLabel: 'subject_secrecy_level',
      required: true,
    },
    {
      label: '重要程度',
      name: 'importance',
      enumsLabel: 'subject_secrecy_level',
      required: true,
    },
    {
      label: '保密等级',
      name: 'subjectSecrecyLevel',
      enumsLabel: 'subject_secrecy_level',
    },
    {
      label: '紧急程度',
      name: 'urgency',
      enumsLabel: 'subject_secrecy_level',
      required: true,
    },
    {
      label: '接报日期',
      name: 'receivingTime',
      type: 'date',
    },
    {
      label: '发生地域',
      name: 'region',
      render: <ProvinceCascaderInput />,
      // required: true,
    },
    {
      label: '相关出版物',
      name: 'relatedPublications',
    },
    {
      label: '所属联防工程',
      name: 'orgName',
      render: <OrgMultiSelectInput />,
    },
    {
      label: '线索描述',
      name: 'clueRemarks',
      type: 'textarea',
    },
    {
      name: 'sdfsa',
      span: 4,
      render: <Descriptions title="举报信息" size="middle" />,
    },
    {
      label: '被举报对象名字',
      name: 'reportedObjectName',
    },
    {
      label: '被举报对象类型',
      name: 'reportedObjectType',
    },
    {
      label: '被举报对象电话',
      name: 'reportedObjectPhone',
    },
    {
      label: '被举报对象地址',
      name: 'reportedObjectaddress',
    },
    {
      label: '举报内容',
      name: 'reportContent',
      type: 'textarea',
      span: 4,
    },
    {
      label: '举报人姓名',
      name: 'reportName',
    },
    {
      label: '举报人性别',
      name: 'reportSex',
      render: (
        <Radio.Group>
          <Radio value={0}>女</Radio>
          <Radio value={1}>男</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '举报人地址',
      name: 'reportAddress',
    },
    {
      label: '举报人邮箱',
      name: 'reportMailbox',
    },
    {
      label: '举报人电话',
      name: 'reportPhone',
    },
    {
      label: '举报人邮编',
      name: 'reportPostcode',
    },
    {
      label: '是否公开',
      name: 'isOpen',
      type: 'switch',
    },
    {
      name: 'line1',
      type: 'segmentation',
    },
    {
      label: '附件',
      render: <UploadInput />,
    },
  ];
  return <AdvancedForm form={form} fields={formItems} />;
};
AddThreadForm.useForm = AdvancedForm.useForm;
export default AddThreadForm;

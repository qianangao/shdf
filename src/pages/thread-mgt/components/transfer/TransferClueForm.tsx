import React from 'react';
import { Descriptions } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import OrgSelectInput from '@/components/OrgMultiSelectInput/OrgSelectInput';

const TransferClueForm = ({ form, fieldChangeHander, optType }) => {
  const formItems = [
    {
      name: '',
      span: 3,
      render: <Descriptions title="转办信息" size="middle" />,
    },
    {
      label: '线索id',
      name: 'clueId',
      hidden: true,
    },
    {
      label: '线索名称',
      name: 'clueName',
      disabled: true,
      // rules: [{ required: true, message: '请选择可见范围!' }],
    },
    {
      label: '线索编号',
      name: 'clueNumber',
      disabled: true,
    },
    // {
    //   name: 'line1',
    //   type: 'segmentation',
    // },
    {
      label: '转办类型',
      name: 'circulationType',
      defaultValue: '1',
      enumsItems: {
        '1': '交办',
        '2': '协办',
      },
      rules: [{ required: true, message: '请选择转办类型!' }],
    },
    {
      label: '转办单位',
      name: 'unitList',
      rules: [{ required: true, message: '请选择转办单位!' }],
      render: <OrgSelectInput optionType={optType} />,
    },

    {
      label: '转办要求',
      name: 'circulationContent',
      type: 'textarea',
      rules: [{ required: true, message: '请输入转办要求!' }],
      span: 2,
    },
  ];

  return <AdvancedForm form={form} fields={formItems} fieldChange={fieldChangeHander} />;
};
TransferClueForm.useForm = AdvancedForm.useForm;
export default TransferClueForm;

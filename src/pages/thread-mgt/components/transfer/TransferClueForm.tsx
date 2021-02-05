import React from 'react';
import { Radio, Descriptions } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';

const TransferClueForm = ({ form }) => {
  const formItems = [
    {
      name: '',
      span: 4,
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
    {
      label: '主办单位',
      name: 'sourceUnit',
      initialValue: '全国SHDF办公室',
      // disabled: true,
    },
    {
      label: '主办人',
      name: 'sourceDealUser',
      initialValue: '张三',
      // disabled: true,
    },
    // {
    //   name: 'line1',
    //   type: 'segmentation',
    // },
    {
      label: '转办类型',
      name: 'circulationType',
      render: (
        <Radio.Group>
          <Radio value={1}>交办</Radio>
          <Radio value={2}>协办</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: '请选择转办类型!' }],
    },
    {
      label: '转办单位',
      name: 'unitList',
      render: <OrgMultiSelectInput />,
      rules: [{ required: true, message: '请选择转办单位!' }],
    },

    {
      label: '转办要求',
      name: 'circulationContent',
      type: 'textarea',
      rules: [{ required: true, message: '请输入转办要求!' }],
      span: 4,
    },
  ];
  return <AdvancedForm form={form} fields={formItems} />;
};
TransferClueForm.useForm = AdvancedForm.useForm;
export default TransferClueForm;

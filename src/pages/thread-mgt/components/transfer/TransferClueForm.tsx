import React from 'react';
import { Descriptions, Radio } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput/index';

const TransferClueForm = ({ form, fieldChangeHander }) => {
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
      render: <OrgMultiSelectInput />,
    },
    // {
    //   label: '组织树',
    //   name: 'orgIds',
    //   span: 4,
    //   rules: [{ required: true, message: '请选择!' }],
    //   render: (
    //     <OrgMultiSelectInput />
    //   ),
    // },

    {
      label: '转办要求',
      name: 'circulationContent',
      type: 'textarea',
      rules: [{ required: true, message: '请输入转办要求!' }],
      span: 2,
    },
    {
      label: ' 是否满足立案条件',
      name: 'satisfyCase',
      render: (
        <Radio.Group>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: '请选择是否满足立案条件!' }],
    },
    {
      label: '是否涉及敏感事件',
      name: 'involveSensitive',
      render: (
        <Radio.Group>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: '请选择是否涉及敏感事件!' }],
    },
  ];

  return <AdvancedForm form={form} fields={formItems} fieldChange={fieldChangeHander} />;
};
TransferClueForm.useForm = AdvancedForm.useForm;
export default TransferClueForm;

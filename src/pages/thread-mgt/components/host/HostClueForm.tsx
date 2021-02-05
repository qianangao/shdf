import React from 'react';
import { Radio, Descriptions } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';

const TransferClueForm = ({ form }) => {
  const formItems = [
    {
      name: 'base',
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
    {
      label: '工作内容',
      name: 'circulationContent',
      type: 'textarea',
      rules: [{ required: true, message: '请输入工作内容!' }],
      span: 4,
    },

    {
      label: '相关附件',
      name: 'files',
      type: 'upload',
    },
    {
      name: 'line1',
      type: 'segmentation',
    },
    {
      name: 'other',
      span: 4,
      render: <Descriptions title="其他" size="middle" />,
    },
    {
      label: '是否满足立案条件',
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
  return <AdvancedForm form={form} fields={formItems} />;
};
TransferClueForm.useForm = AdvancedForm.useForm;
export default TransferClueForm;

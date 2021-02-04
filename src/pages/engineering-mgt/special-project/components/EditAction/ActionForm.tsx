import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const ActionForm = ({ form, disabled = true, actionForm, openAddSpecialModal }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    form.setFieldsValue(actionForm);
    if (actionForm.actionYear) {
      setVisible(true);
    }
    // console.log("form",form);
    // console.log("visible",visible);
    // console.log("actionForm",actionForm);
  });

  const formItems = [
    // { label: 'id', name: 'bookId', hidden: true },
    {
      label: '行动名称',
      name: 'actionName',
      span: 2,
      disabled,
      rules: [
        { required: true, message: '请输入行动名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '行动编号',
      name: 'actionId',
      span: 2,
      disabled,
      visible,
      rules: [{ required: true, message: '请输入行动编号', whitespace: true }],
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 2,
      disabled,
      visible,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '结束日期',
      name: 'endDate',
      span: 2,
      disabled,
      visible,
      rules: [{ required: true, message: '请选择结束日期!' }],
      type: 'date',
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 2,
      disabled,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },
    // {
    //   label: '行动年度',
    //   name: 'actionYear',
    //   span: 2,
    //   disabled,
    //   rules: [{ required: true, message: '请输入行动年度!', whitespace: true }],

    // },
    {
      label: '总体描述',
      name: 'actionDescription',
      span: 4,
      disabled,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
  ];

  return (
    <Card
      title="专项行动"
      extra={
        <Button
          type="primary"
          onClick={() => openAddSpecialModal({ id: 1, year: visible ? 'annual' : '' })}
        >
          编辑
        </Button>
      }
      style={{ width: '100%', marginRight: 200 }}
    >
      <AdvancedForm form={form} fields={formItems} />
    </Card>
  );
};

ActionForm.useForm = AdvancedForm.useForm;

export default connect(({ specialAction }) => ({
  actionForm: specialAction.actionForm,
}))(ActionForm);

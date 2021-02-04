import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Select } from 'antd';
import { connect } from 'umi';

const AddSpecialActionForm = ({ form, visible, historyInfo, actionList }) => {
  // console.log("actionList",actionList);
  // console.log("historyInfo",historyInfo);

  const formItems = [
    {
      label: '专项行动',
      name: 'id',
      span: 2,
      rules: [{ required: true, message: '请选择行动名称' }],
      visible,
      render: (
        <Select
          allowClear
          // onChange={onChangeType}
          // getPopupContainer={triggerNode => {
          //   return triggerNode.parentNode || document.body;
          // }}
        >
          {actionList &&
            actionList.map(item => <Select.Option key={item.key}>{item.title}</Select.Option>)}
        </Select>
      ),
    },
    {
      label: '复用历史信息',
      name: 'info',
      span: 2,
      visible,
      render: (
        <Select
          allowClear
          // onChange={onChangeType}
          // getPopupContainer={triggerNode => {
          //   return triggerNode.parentNode || document.body;
          // }}
        >
          {historyInfo &&
            historyInfo.map(item => <Select.Option key={item.id}>{item.actionName}</Select.Option>)}
        </Select>
      ),
    },
    {
      label: '行动名称',
      name: 'actionName',
      span: 2,
      rules: [
        { required: true, message: '请输入行动名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 2,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
      visible,
    },
    {
      label: '结束日期',
      name: 'endDate',
      span: 2,
      rules: [{ required: true, message: '请选择结束日期!' }],
      type: 'date',
      visible,
    },
    {
      label: '行动年度',
      name: 'actionYear',
      span: 2,
      rules: [{ required: true, message: '请输入行动年度!', whitespace: true }],
      visible,
    },
    {
      name: 'segmentation',
      type: 'segmentation',
    },
    {
      label: '行动描述',
      name: 'actionDescription',
      span: 4,
      rules: [{ required: true, message: '请输入!' }],
      type: 'textarea',
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      type: 'upload',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

AddSpecialActionForm.useForm = AdvancedForm.useForm;

export default connect(specialAction => ({
  historyInfo: specialAction.historyInfo,
  actionList: specialAction.actionList,
}))(AddSpecialActionForm);

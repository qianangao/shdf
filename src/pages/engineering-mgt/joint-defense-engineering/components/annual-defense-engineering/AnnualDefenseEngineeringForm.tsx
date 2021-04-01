import React, { useState, useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Select } from 'antd';
import { connect } from 'umi';

const DefenseEngineeringForm = ({ dispatch, form, isShow }) => {
  const [actionData, setActionData] = useState([]);
  // isShow为true时显示工程选项这一栏
  useEffect(() => {
    if (isShow) {
      new Promise(resolve => {
        dispatch({
          type: 'defenseEngineering/getEngineeringTree',
          resolve,
        });
      }).then(res => {
        const arr = [];
        res.forEach(item => {
          arr.push({ key: item.key, title: item.title });
        });
        setActionData(arr);
      });
    }

    return () => {
      setActionData([]);
    };
  }, []);

  const checkStartDate = (rule, value, callback) => {
    const endValue = form.getFieldValue('endTime');
    if (endValue && endValue < value) {
      callback(new Error('开始日期应不晚于结束日期!'));
    } else {
      callback();
    }
  };
  const checkEndDate = (rule, value, callback) => {
    const startValue = form.getFieldValue('startTime');
    if (startValue && startValue > value) {
      callback(new Error('结束日期应不早于开始日期!'));
    } else {
      callback();
    }
  };

  const formItems = [
    {
      label: '工程选项',
      name: 'projectId',
      span: 4,
      rules: [{ required: true, message: '请选择联防工程!' }],
      visible: isShow,
      render: (
        <Select allowClear>
          {actionData &&
            actionData.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.title}
              </Select.Option>
            ))}
        </Select>
      ),
    },
    {
      label: '工程名称',
      name: 'projectName',
      span: 4,
      rules: [
        { required: true, message: '请输入工程名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '开始日期',
      name: 'startTime',
      span: 4,
      rules: [
        { required: true, message: '请选择开始日期!' },
        {
          validator: checkStartDate,
        },
      ],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endTime',
      span: 4,
      rules: [
        { required: true, message: '请选择结束日期!' },
        {
          validator: checkEndDate,
        },
      ],
      type: 'date',
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 4,
      rules: [{ required: true, message: '请选择保密等级!' }],
      enumsLabel: 'object_secrecy_level',
    },
    {
      label: '工程描述',
      name: 'describe',
      span: 4,
      rules: [
        { required: true, message: '请输入工程描述!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字!' },
      ],
      type: 'textarea',
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 4,
      type: 'uploadSecrecy',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

DefenseEngineeringForm.useForm = AdvancedForm.useForm;

export default connect(() => ({}))(DefenseEngineeringForm);

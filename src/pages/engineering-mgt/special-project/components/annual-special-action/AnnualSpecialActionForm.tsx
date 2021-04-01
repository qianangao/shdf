import React, { useState, useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Select } from 'antd';
import { connect } from 'umi';

const AnnualSpecialActionForm = ({ dispatch, form, isShow }) => {
  const [actionList, setActionList] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    if (isShow) {
      new Promise(resolve => {
        dispatch({
          type: 'specialAction/getSpecialActionTree',
          resolve,
        });
      }).then(res => {
        setActionList(res);
        const arr = [];
        res.forEach(item => {
          arr.push({ key: item.key, title: item.title });
        });
        setActionData(arr);
        setHistoryData([]);
      });
    }
    return () => {
      setActionData([]);
      setHistoryData([]);
    };
  }, [isShow]);

  const onChangeAction = key => {
    form.setFieldsValue({ historyInfo: '' });
    actionList.forEach(item => {
      if (item.key === key) {
        form.resetFields();
        form.setFieldsValue({ actionId: key });
        setHistoryData(item.children);
      }
    });
  };

  const onChangehistory = key => {
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/getSpecialAction',
        payload: {
          actionId: key,
        },
        resolve,
      });
    }).then(res => {
      delete res.actionId;
      form.setFieldsValue({ ...res });
    });
  };

  const checkStartDate = (rule, value, callback) => {
    const endValue = form.getFieldValue('endDate');
    if (endValue && endValue < value) {
      callback(new Error('开始日期应不晚于结束日期!'));
    } else {
      callback();
    }
  };
  const checkEndDate = (rule, value, callback) => {
    const startValue = form.getFieldValue('startDate');
    if (startValue && startValue > value) {
      callback(new Error('结束日期应不早于开始日期!'));
    } else {
      callback();
    }
  };

  const formItems = [
    {
      label: '专项行动',
      name: 'actionId',
      span: 4,
      rules: [{ required: true, message: '请选择专项行动!' }],
      visible: isShow,
      render: (
        <Select allowClear onChange={onChangeAction}>
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
      label: '复用历史信息',
      name: 'historyInfo',
      span: 4,
      visible: isShow,
      render: (
        <Select allowClear onChange={onChangehistory}>
          {historyData &&
            historyData.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.title}
              </Select.Option>
            ))}
        </Select>
      ),
    },
    {
      label: '行动名称',
      name: 'actionName',
      span: 4,
      rules: [
        { required: true, message: '请输入行动名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '行动年度',
      name: 'actionYear',
      span: 24,
      rules: [{ required: true, message: '请输入行动年度!', whitespace: true }],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 4,
      rules: [{ required: true, message: '请选择保密等级!' }],
      enumsLabel: 'object_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'startDate',
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
      name: 'endDate',
      span: 4,
      rules: [
        { required: true, message: '请选择结束日期!' },
        {
          validator: checkEndDate,
        },
      ],
      type: 'date',
    },

    { name: 'segmentation', type: 'segmentation' },
    {
      label: '行动描述',
      name: 'actionDescription',
      span: 4,
      rules: [
        { required: true, message: '请输入行动描述!' },
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

AnnualSpecialActionForm.useForm = AdvancedForm.useForm;

export default connect(() => ({}))(AnnualSpecialActionForm);

import React, { useState, useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Select } from 'antd';
import { connect } from 'umi';

const AddSpecialActionForm = ({ dispatch, form, visible, editVisible }) => {
  const [actionList, setActionList] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  // const [idVisible, setIdVisible] = useState(true);

  useEffect(() => {
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
    return () => {
      setActionData([]);
      setHistoryData([]);
    };
  }, []);

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

  const formItems = [
    {
      label: '专项行动',
      name: 'actionId',
      span: 2,
      rules: [{ required: true, message: '请选择行动名称' }],
      visible: editVisible && visible,
      render: (
        <Select
          allowClear
          onChange={onChangeAction}
          getPopupContainer={triggerNode => {
            return triggerNode.parentNode || document.body;
          }}
        >
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
      span: 2,
      visible: editVisible && visible,
      render: (
        <Select
          allowClear
          onChange={onChangehistory}
          // getPopupContainer={triggerNode => {
          //   return triggerNode.parentNode || document.body;
          // }}
        >
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
    { name: 'segmentation', type: 'segmentation' },
    // {
    //   label: '行动类型',
    //   name: 'actionType',
    //   span: 2,
    //   rules: [{ required: true, message: '请输入行动类型!', whitespace: true }],
    //   enumsLabel:'special_type'
    // },
    {
      label: '行动描述',
      name: 'actionDescription',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
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

export default connect(() => ({}))(AddSpecialActionForm);

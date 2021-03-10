import React, { useState, useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import { Select } from 'antd';
import { checkPhone } from '@/utils/validators';
import ProvinceListTable from '../province-list/ProvinceListTable';
import TempProvinceTable from '../temp-province-list/TempProvinceTable';

const AddEngineeringForm = ({ dispatch, form, visible, add, edit, editVisible }) => {
  const [tableData, setTableData] = useState([]);
  const [tempTableData, setTtempTableData] = useState([]);
  const [actionData, setActionData] = useState([]);
  useEffect(() => {
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/getEngineeringTree',
        resolve,
      });
    }).then(res => {
      const arr = [];
      res.forEach(item => {
        arr.push({ key: item.key, title: item.title });
      });
      setActionData(arr);
    });
    return () => {
      setActionData([]);
    };
  }, []);
  const onChange = data => {
    setTableData([...data]);
  };
  const onTempChange = data => {
    setTtempTableData([...data]);
  };

  const formItems = [
    {
      label: '工程选择',
      name: 'projectId',
      span: 2,
      rules: [{ required: true, message: '请选择工程名称' }],
      visible: visible && editVisible,
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
      span: 2,
      rules: [
        { required: true, message: '请输入工程名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '工程编号',
      name: 'projectCode',
      span: 2,
      visible: !visible,
      rules: [{ required: true, message: '请输入工程编号!', whitespace: true }],
    },
    {
      label: '开始日期',
      name: 'startTime',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
      visible,
    },
    {
      label: '截止日期',
      name: 'endTime',
      span: 2,
      rules: [{ required: true, message: '请选择结束日期!' }],
      type: 'date',
      visible,
    },
    {
      label: '联系人',
      name: 'contacts',
      span: 2,
      rules: [
        { required: true, message: '请输入联系人!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '联系电话',
      name: 'contactInformation',
      span: 2,
      rules: [
        { required: true, message: '请输入联系电话!', whitespace: true },
        {
          validator: checkPhone,
        },
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
      label: '工程描述',
      name: 'describe',
      span: 2,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },

    {
      label: '牵头省份',
      name: 'provinceCode',
      span: 2,
      visible: !visible,
      rules: [
        { required: true, message: '请输入牵头省份!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '省份列表',
      name: 'projectProvinceEntityList',
      span: 4,
      visible: !visible,
      // rules: [{ required: true, message: '请输入!' }],
      render: <ProvinceListTable onChange={onChange} value={tableData} add={add} edit={edit} />,
    },
    {
      label: '临时省份列表',
      name: 'projectTemporaryProvinceEntityList',
      span: 4,
      visible: !visible,
      // rules: [{ required: true, message: '请输入!' }],
      render: <TempProvinceTable add={add} onChange={onTempChange} value={tempTableData} />,
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

AddEngineeringForm.useForm = AdvancedForm.useForm;

export default connect(() => ({}))(AddEngineeringForm);
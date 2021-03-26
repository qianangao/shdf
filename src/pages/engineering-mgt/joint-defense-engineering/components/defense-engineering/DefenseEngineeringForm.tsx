import React, { useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import { checkPhone } from '@/utils/validators';
import ProvinceListTable from '../province-list/ProvinceListTable';
// import TempProvinceTable from '../temp-province-list/TempProvinceTable';

const DefenseEngineeringForm = ({ form, add, edit }) => {
  const [tableData, setTableData] = useState([]);
  const onChange = data => {
    setTableData([...data]);
  };

  const formItems = [
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
      label: '工程编号',
      name: 'projectCode',
      span: 4,
      rules: [{ required: true, message: '请输入工程编号!', whitespace: true }],
    },
    {
      label: '联系人',
      name: 'contacts',
      span: 4,
      rules: [
        { required: true, message: '请输入联系人!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '联系电话',
      name: 'contactInformation',
      span: 4,
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
      span: 4,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'object_secrecy_level',
    },
    {
      label: '工程描述',
      name: 'describe',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },

    {
      label: '牵头省份',
      name: 'provinceCode',
      span: 4,
      rules: [
        { required: true, message: '请输入牵头省份!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '省份列表',
      name: 'projectProvinceEntityList',
      span: 4,
      // rules: [{ required: true, message: '请输入!' }],
      render: <ProvinceListTable onChange={onChange} value={tableData} add={add} edit={edit} />,
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

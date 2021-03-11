import React, { useState } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Radio, Tree } from 'antd';

const RoleForm = ({ form, roleTree }) => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const [value, setValue] = React.useState('1');

  const onChange = e => {
    setValue(e.target.value);
  };

  const onCheckHandler = keys => {
    setCheckedKeys(keys);
  };

  const formItems = [
    {
      label: '角色名称',
      name: 'name',
      span: 4,
      rules: [
        { required: true, message: '请输入角色名称!', whitespace: true },
        { max: 30, message: '名称长度请小于30位!' },
      ],
    },
    {
      label: '角色描述',
      name: 'remark',
      span: 4,
      rules: [{ required: true, message: '请输入角色描述!' }],
    },
    {
      label: '是否系统公用',
      name: 'publicRole',
      span: 4,
      rules: [{ required: true, message: '请选择!' }],
      render: (
        <Radio.Group onChange={onChange} value={value}>
          <Radio value="1">是</Radio>
          <Radio value="0">否</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '组织树',
      name: 'orgIds',
      span: 4,
      visible: value === '0',
      render: (
        <Tree checkable onCheck={onCheckHandler} checkedKeys={checkedKeys} treeData={roleTree} />
      ),
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

RoleForm.useForm = AdvancedForm.useForm;

export default RoleForm;

import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Select } from 'antd';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput/index';

const RoleForm = ({ form, publicRole }) => {
  // const [checkedKeys, setCheckedKeys] = useState([]);
  const [value, setValue] = React.useState('');
  useEffect(() => {
    setValue(publicRole);
  }, [publicRole]);

  // useEffect(() => {
  //   setCheckedKeys([]);
  //   setCheckedKeys([...orgIds]);
  // }, [orgIds]);

  const onChange = v => {
    setValue(v);
  };

  // const onCheckHandler = keys => {
  //   setCheckedKeys([...keys]);
  //   onTreeChange && onTreeChange(keys);
  // };

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
        <Select onChange={onChange} value={value}>
          <Select.Option value="1">是</Select.Option>
          <Select.Option value="0">否</Select.Option>
        </Select>
      ),
    },
    {
      label: '组织树',
      name: 'orgIdsList',
      span: 4,
      visible: value === '0',
      rules: [{ required: value === '0', message: '请选择!' }],
      render: (
        <OrgMultiSelectInput />
        // <Tree checkable onCheck={onCheckHandler} checkedKeys={checkedKeys} treeData={roleTree} />
      ),
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

RoleForm.useForm = AdvancedForm.useForm;

export default RoleForm;

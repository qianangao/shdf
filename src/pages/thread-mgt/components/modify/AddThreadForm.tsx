import React, { useEffect, useState } from 'react';
import { Descriptions, AutoComplete, Select } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';
import { connect } from 'umi';
import { checkEmail, checkPhoneOrTelephone, checkPost } from '@/utils/validators';
import { LocalCache } from '@/utils/storage';

const { Option } = Select;

const AddThreadForm = ({ form, dispatch }) => {
  const [options, setOptions] = React.useState<{ value: string }[]>([]);
  const [actionData, setActionData] = useState([]);
  useEffect(() => {
    setActionData(LocalCache.get('areaInfo'));
  }, []);
  const onSearch = () => {
    // searchText: string
    // console.log(searchText);
  };
  const onSelect = () => {
    // data: string
    // console.log('onSelect', data);
  };
  useEffect(() => {
    getList({ pageSize: 1000 });
  }, []);
  const getList = params => {
    new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/getList',
        payload: { ...params },
        resolve,
      });
    }).then(res => {
      const keys = [];
      res.data.map(item => {
        return keys.push({ value: item.keyWord });
      });
      setOptions(keys);
    });
  };

  // function selecthandleChange(value) {
  //   console.log(`selected ${value}`);
  // }
  const formItems = [
    {
      name: '',
      span: 3,
      render: <Descriptions title="基本信息" size="middle" />,
    },
    {
      label: '线索id',
      name: 'clueId',
      hidden: true,
    },
    {
      label: '线索名称',
      name: 'clueName',
      rules: [
        { required: true, message: '请输入线索名称!' },
        { min: 0, max: 100, message: '线索名称长度最多100字!' },
      ],
    },
    // {
    //   label: '发文时间',
    //   name: 'createTime',
    //   type: 'date',
    //   rules: [{ required: true, message: '请选择发文时间!' }],
    // },
    // {
    //   label: '摘要',
    //   name: 'clueRemarks',
    //   rules: [{ required: true, message: '请选择摘要' }],
    // },
    {
      label: '线索类型',
      name: 'clueType',
      enumsLabel: 'clue_type',
      rules: [{ required: true, message: '请选择线索类型!' }],
    },
    {
      label: '发文文号',
      name: 'clueNumber',
      disabled: 'true',
      rules: [{ required: true, message: '请重新获取发文文号!' }],
    },
    {
      label: '线索来源',
      name: 'clueSource',
      enumsLabel: 'clue_source',
      rules: [{ required: true, message: '请选择线索来源!' }],
    },
    {
      label: '涉及地方',
      name: 'involvingLocalCode',
      rules: [{ required: true, message: '请选择涉及地方!' }],
      render: (
        <Select>
          {actionData.map(item => (
            <Option key={item.value}>{item.label}</Option>
          ))}
        </Select>
      ),
    },

    {
      label: '重要程度',
      name: 'importance',
      enumsLabel: 'clue_importance',
      rules: [{ required: true, message: '请选择重要程度!' }],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      enumsLabel: 'object_secrecy_level',
      rules: [{ required: true, message: '请选择保密等级!' }],
    },
    {
      label: '紧急程度',
      name: 'urgency',
      enumsLabel: 'urgent_level',
      rules: [{ required: true, message: '请选择紧急程度!' }],
    },
    {
      label: '接报日期',
      name: 'receivingTime',
      type: 'date',
    },
    {
      label: '发生地域',
      name: 'regionObj',
      render: <ProvinceCascaderInput />,
      rules: [{ required: true, message: '请选择发生地域!' }],
    },
    {
      label: '关键词',
      name: 'keyWordId',
      rules: [
        { required: false, message: '请输入关键词!' },
        { min: 0, max: 100, message: '关键词称长度最多100字!' },
      ],
      render: (
        <AutoComplete
          options={options}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder="请输入关键词!"
        />
      ),
      // enumsItems: {
      //   '1': '交办',
      //   '2': '协办',
      // }
    },
    {
      label: '相关出版物',
      name: 'relatedPublications',
      type: 'textarea',
    },
    // {
    //   label: '所属联防工程',
    //   name: 'orgName',
    //   render: <OrgMultiSelectInput />,
    // },
    {
      label: '摘要',
      name: 'clueRemarks',
      type: 'textarea',
      span: 2,
      rules: [{ min: 0, max: 300, message: '摘要描述长度最多300字!' }],
    },
    {
      name: 'line',
      span: 3,
      render: <Descriptions title="举报信息" size="middle" />,
    },
    {
      label: '举报人姓名',
      name: 'reportName',
      rules: [{ min: 0, max: 30, message: '姓名最多30字!' }],
    },
    {
      label: '举报人性别',
      name: 'reportSex',
      enumsLabel: 'dict_sex',
    },
    {
      label: '举报人地址',
      name: 'reportAddress',
      rules: [{ min: 0, max: 100, message: '地址长度最多100字!' }],
    },
    {
      label: '举报人邮箱',
      name: 'reportMailbox',
      rules: [
        {
          validator: checkEmail,
        },
      ],
    },
    {
      label: '举报人电话',
      name: 'reportPhone',
      rules: [
        {
          validator: checkPhoneOrTelephone,
        },
      ],
    },
    {
      label: '举报人邮编',
      name: 'reportPostcode',
      hidden: true,
      rules: [
        {
          validator: checkPost,
        },
      ],
    },
    // {
    //   name: 'line1',
    //   span: 3,
    //   render: <div style={{fontSize:15,fontWeight:600}}>被举报人信息</div>,
    // },
    {
      label: '被举报对象名字',
      name: 'reportedObjectName',
      rules: [{ min: 0, max: 30, message: '姓名长度最多30字!' }],
    },
    {
      label: '被举报对象类型',
      name: 'reportedObjectType',
      enumsLabel: 'clue_reported_object_type',
    },
    {
      label: '被举报对象电话',
      name: 'reportedObjectPhone',
      rules: [
        {
          validator: checkPhoneOrTelephone,
        },
      ],
    },
    {
      label: '被举报对象地址',
      name: 'reportedObjectAddress',
      // type: 'textarea',
      rules: [{ min: 0, max: 100, message: '地址长度最多100字!' }],
    },
    {
      label: '举报内容',
      name: 'reportContent',
      type: 'textarea',
      span: 3,
      rules: [{ min: 0, max: 1000, message: '举报内容长度最多1000字!' }],
    },
    {
      label: '是否公开',
      name: 'open',
      type: 'switch',
    },
    {
      name: 'line1',
      type: 'segmentation',
    },
    {
      label: '附件',
      name: 'files',
      type: 'uploadSecrecy',
    },
  ];
  return <AdvancedForm form={form} fields={formItems} />;
};
AddThreadForm.useForm = AdvancedForm.useForm;
// export default AddThreadForm;
export default connect(({ emClueManagement, global }) => ({
  emClueManagement,
  enums: global.enums,
}))(AddThreadForm);

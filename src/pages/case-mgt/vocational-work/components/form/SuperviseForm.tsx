import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Descriptions } from 'antd';

const CaseMgt = ({ form, orgInfoData }) => {
  const formItems = [
    {
      label: '督办开始时间：',
      name: 'superviseStart',
      type: 'dateTime',
      rules: [
        { message: '请输入备注!', whitespace: true },
        { max: 80, message: '备注长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '督办结束时间：',
      name: 'superviseEnd',
      type: 'dateTime',
      rules: [
        { message: '请输入备注!', whitespace: true },
        { max: 80, message: '备注长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '备注',
      name: 'requirement',
      span: 4,
      type: 'textarea',
      rules: [
        { message: '请输入备注!', whitespace: true },
        { max: 80, message: '备注长度请小于80位!', whitespace: true },
      ],
    },
  ];

  useEffect(() => {
    if (orgInfoData) {
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  const selectLgbInput = (
    // 显示单位信息-公共组件
    <>
      <Descriptions title="请确认是否对该案件进行督办申请，如有补充请填至备注框内。" />
    </>
  );

  return <AdvancedForm form={form} fields={formItems} headerRender={selectLgbInput} />;
};

CaseMgt.useForm = AdvancedForm.useForm;

export default CaseMgt;

import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Descriptions } from 'antd';

const CaseMgt = ({ form, orgInfoData }) => {
  const formItems = [
    {
      label: '督办开始时间：',
      name: 'superviseStart',
      type: 'textarea',
      rules: [
        { message: '请输入备注!', whitespace: true },
        { max: 80, message: '备注长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '督办结束时间：',
      name: 'superviseEnd',
      type: 'textarea',
      rules: [
        { message: '请输入备注!', whitespace: true },
        { max: 80, message: '备注长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '备注',
      name: 'approvalOpinion',
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
      form.setFieldsValue({});
    }
  }, [orgInfoData]);

  const selectLgbInput = (
    // 显示老干部信息-公共组件
    <>
      <Descriptions size="middle" column={1} title="督办申请">
        <Descriptions.Item label="申请时间">{orgInfoData.applyTime}</Descriptions.Item>
        <Descriptions.Item label="申请人">{orgInfoData.applyUser}</Descriptions.Item>
        <Descriptions.Item label="申请备注">{orgInfoData.applyRemarks}</Descriptions.Item>
      </Descriptions>
      <Descriptions size="middle" column={1} title="督办审批">
        <Descriptions.Item label="审批时间">{orgInfoData.approvalTime}</Descriptions.Item>
        <Descriptions.Item label="审批人">{orgInfoData.approvalOpinion}</Descriptions.Item>
      </Descriptions>
    </>
  );

  return <AdvancedForm form={form} fields={formItems} headerRender={selectLgbInput} />;
};

CaseMgt.useForm = AdvancedForm.useForm;

export default CaseMgt;
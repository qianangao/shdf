import React, { useState, useEffect } from 'react';
import { Button, Descriptions } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const ActionForm = ({ form, actionForm, openAddSpecialModal, enums }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    form.setFieldsValue(actionForm);
    if (actionForm && actionForm.actionYear) {
      setVisible(true);
    }
    return () => {
      setVisible(false);
      form.setFieldsValue({});
    };
  });

  // const formItems = [
  //   // { label: 'id', name: 'bookId', hidden: true },
  //   {
  //     label: '行动名称',
  //     name: 'actionName',
  //     span: 2,
  //     disabled,
  //     rules: [
  //       { required: true, message: '请输入行动名称!', whitespace: true },
  //       { max: 30, message: '长度请小于30位!' },
  //     ],
  //   },
  //   {
  //     label: '行动年度',
  //     name: 'actionYear',
  //     // name: 'actionId',
  //     span: 2,
  //     disabled,
  //     visible,
  //     rules: [{ required: true, message: '请输入行动年度', whitespace: true }],
  //   },
  //   {
  //     label: '开始日期',
  //     name: 'startDate',
  //     span: 2,
  //     disabled,
  //     visible,
  //     rules: [{ required: true, message: '请选择开始日期' }],
  //     type: 'date',
  //   },
  //   {
  //     label: '结束日期',
  //     name: 'endDate',
  //     span: 2,
  //     disabled,
  //     visible,
  //     rules: [{ required: true, message: '请选择结束日期!' }],
  //     type: 'date',
  //   },
  //   {
  //     label: '保密等级',
  //     name: 'secrecyLevel',
  //     span: 2,
  //     disabled,
  //     rules: [{ required: true, message: '请选择保密等级' }],
  //     enumsLabel: 'subject_secrecy_level',
  //   },
  //   // {
  //   //   label: '行动年度',
  //   //   name: 'actionYear',
  //   //   span: 2,
  //   //   disabled,
  //   //   rules: [{ required: true, message: '请输入行动年度!', whitespace: true }],

  //   // },
  //   {
  //     label: '总体描述',
  //     name: 'actionDescription',
  //     span: 4,
  //     disabled,
  //     rules: [
  //       { required: true, message: '请输入!' },
  //       { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
  //     ],
  //     type: 'textarea',
  //   },
  // ];

  return (
    // <Card
    //   title={actionForm.actionYear ?'年度专项行动':'专项行动'}
    //   extra={
    //     <Button
    //       type="primary"
    //       onClick={() => openAddSpecialModal({actionForm})}
    //     >
    //       编辑
    //     </Button>
    //   }
    //   style={{ width: '100%', marginRight: 200 }}
    // >

    // {/* <AdvancedForm form={form} fields={formItems} /> */}
    // </Card>

    <Descriptions
      title={actionForm.actionYear ? '年度专项行动' : '专项行动'}
      extra={
        <Button type="primary" onClick={() => openAddSpecialModal({ actionForm })}>
          编辑
        </Button>
      }
      column={{ xxl: 4, xl: 3, lg: 3 }}
    >
      <Descriptions.Item label="行动名称" span={2}>
        {actionForm.actionName}
      </Descriptions.Item>
      {visible && (
        <>
          <Descriptions.Item label="行动年度" span={2}>
            {actionForm.actionYear}
          </Descriptions.Item>
          <Descriptions.Item label="开始日期" span={2}>
            {actionForm.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="结束日期" span={2}>
            {actionForm.endDate}
          </Descriptions.Item>
        </>
      )}
      <Descriptions.Item label="保密等级" span={4}>
        {enums.subject_secrecy_level && enums.subject_secrecy_level[actionForm.secrecyLevel]}
      </Descriptions.Item>
      <Descriptions.Item label="总体描述" span={4}>
        {actionForm.actionDescription}
      </Descriptions.Item>
    </Descriptions>
  );
};

ActionForm.useForm = AdvancedForm.useForm;

export default connect(({ specialAction, global }) => ({
  actionForm: specialAction.actionForm,
  enums: global.enums,
}))(ActionForm);

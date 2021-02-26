import React, { useState, useEffect } from 'react';
import { Button, Descriptions, Popconfirm, Card } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const ActionDeacription = ({ dispatch, form, actionForm, openAddSpecialModal, enums }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    form.setFieldsValue(actionForm);
    if (actionForm && actionForm.actionYear) {
      setVisible(true);
    }
    return () => {
      setVisible(false);
      form.resetFields();
    };
  }, [actionForm]);

  const deleteSpecialAction = actionId => {
    dispatch({
      type: 'specialAction/deleteSpecialAction',
      payload: actionId,
    });
  };

  return (
    <Card>
      <Descriptions
        title={actionForm.actionYear ? '年度专项行动' : '专项行动'}
        extra={
          <>
            <Button
              type="primary"
              onClick={() => openAddSpecialModal({ actionForm })}
              style={{ marginRight: 8 }}
            >
              编辑
            </Button>
            <Popconfirm
              key={`${actionForm.actionId}del`}
              title="确认删除该行动信息吗？"
              placement="topRight"
              onConfirm={() => deleteSpecialAction(actionForm.actionId)}
            >
              <Button type="primary">删除</Button>
            </Popconfirm>
            ,
          </>
        }
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
    </Card>
  );
};

ActionDeacription.useForm = AdvancedForm.useForm;

export default connect(({ specialAction, global }) => ({
  actionForm: specialAction.actionForm,
  enums: global.enums,
}))(ActionDeacription);

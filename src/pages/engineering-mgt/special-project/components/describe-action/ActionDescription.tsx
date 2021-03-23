import React, { useState, useEffect } from 'react';
import { Button, Descriptions, Popconfirm, Card, Spin } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const ActionDescription = ({
  dispatch,
  form,
  actionForm,
  specialActionModal,
  annualSpecialActionModal,
  enums,
  loading,
}) => {
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

  const fileList = (files: any[]) => {
    if (files && files.length > 0) {
      const views = files.map(item => {
        return (
          <a href={item.url} style={{ display: 'block' }}>
            {item.fileName}
          </a>
        );
      });

      return (
        <Descriptions.Item label="附件列表">
          <div style={{ marginBottom: 20 }}>{views}</div>
        </Descriptions.Item>
      );
    }
    return <div style={{ marginBottom: 20 }} />;
  };

  return (
    <Card>
      <Spin spinning={loading}>
        <Descriptions
          title={actionForm.actionYear ? '年度专项行动' : '专项行动'}
          extra={
            <>
              {visible ? (
                <Button
                  type="primary"
                  onClick={() => annualSpecialActionModal(actionForm)}
                  style={{ marginRight: 8 }}
                >
                  编辑
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => specialActionModal(actionForm)}
                  style={{ marginRight: 8 }}
                >
                  编辑
                </Button>
              )}
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
          {fileList(actionForm.fileInfoList)}
        </Descriptions>
      </Spin>
    </Card>
  );
};

ActionDescription.useForm = AdvancedForm.useForm;

export default connect(({ specialAction, global }) => ({
  actionForm: specialAction.actionForm,
  enums: global.enums,
  loading: specialAction.loading,
}))(ActionDescription);

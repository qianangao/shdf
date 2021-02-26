import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Popconfirm, Card } from 'antd';
import { connect } from 'umi';
import ProvinceListTable from '../province-list/ProvinceListTable';

const EngineeringDescription = ({
  enums,
  dispatch,
  engineeringForm,
  openAddEngineeringModal,
  tempProvinceModal,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // form.setFieldsValue(actionForm);
    if (engineeringForm && engineeringForm.startTime) {
      setVisible(true);
    }
    return () => {
      setVisible(false);
      // form.resetFields();
    };
  }, [engineeringForm]);

  const deleteEngineeringData = projectId => {
    dispatch({
      type: 'dictionaryMgt/deleteEngineeringData',
      payload: { projectId },
    });
  };

  return (
    <Card>
      <Descriptions
        title=""
        extra={
          <>
            <Button type="primary" style={{ marginRight: 8 }} onClick={() => tempProvinceModal()}>
              新增临时省份
            </Button>
            <Button
              type="primary"
              onClick={() => openAddEngineeringModal({ engineeringForm, edit: true })}
              style={{ marginRight: 8 }}
            >
              编辑
            </Button>
            <Popconfirm
              // key={`${actionForm.provinceId}del`}
              title="确认删除该工程信息吗？"
              placement="topRight"
              onConfirm={() => deleteEngineeringData(engineeringForm.projectId)}
            >
              <Button type="primary">删除</Button>
            </Popconfirm>
          </>
        }
      >
        {!visible && (
          <>
            <Descriptions.Item label="工程名称" span={2}>
              {engineeringForm.projectName}
            </Descriptions.Item>
            <Descriptions.Item label="工程编号" span={2}>
              {engineeringForm.projectCode}
            </Descriptions.Item>
          </>
        )}
        {visible && (
          <>
            <Descriptions.Item label="开始日期" span={2}>
              {engineeringForm.startTime}
            </Descriptions.Item>
            <Descriptions.Item label="截止日期" span={2}>
              {engineeringForm.endTime}
            </Descriptions.Item>
          </>
        )}

        <Descriptions.Item label="保密等级" span={2}>
          {enums.subject_secrecy_level && enums.subject_secrecy_level[engineeringForm.secrecyLevel]}
        </Descriptions.Item>
        {!visible && (
          <>
            <Descriptions.Item label="联络人" span={2}>
              {engineeringForm.contacts}
            </Descriptions.Item>
            <Descriptions.Item label="联络电话" span={2}>
              {engineeringForm.contactInformation}
            </Descriptions.Item>
            <Descriptions.Item label="牵头省份" span={4}>
              {engineeringForm.provinceCode}
            </Descriptions.Item>
            <Descriptions.Item label="牵头省份" span={4}>
              {engineeringForm.provinceCode}
            </Descriptions.Item>
          </>
        )}

        <Descriptions.Item label="工程描述" span={4}>
          {engineeringForm.describe}
        </Descriptions.Item>
        {!visible && (
          <>
            <Descriptions.Item label="成员省份" span={4}>
              <ProvinceListTable />
            </Descriptions.Item>
          </>
        )}

        <Descriptions.Item label="附件列表" span={4}>
          {engineeringForm.fileIds}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default connect(({ dictionaryMgt, global }) => ({
  engineeringForm: dictionaryMgt.engineeringForm,
  enums: global.enums,
}))(EngineeringDescription);

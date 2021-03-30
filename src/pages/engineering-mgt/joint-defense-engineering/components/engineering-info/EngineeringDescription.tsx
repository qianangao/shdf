import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Popconfirm, Card, Spin } from 'antd';
import { connect } from 'umi';
import ProvinceListTable from '../province-list/ProvinceListTable';
import TempProvinceTable from '../temp-province-list/TempProvinceTable';

const EngineeringDescription = ({
  enums,
  dispatch,
  engineeringForm,
  defenseEngineeringModal,
  annualDefenseEngineeringModal,
  loading,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (engineeringForm && engineeringForm.startTime) {
      setVisible(true);
    }
    return () => {
      setVisible(false);
    };
  }, [engineeringForm]);

  const deleteEngineeringData = projectId => {
    dispatch({
      type: 'defenseEngineering/deleteEngineeringData',
      payload: { projectId },
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
        <Descriptions.Item label="附件列表" span={4}>
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
          title=""
          extra={
            <>
              {/* {!visible && (
                <Button
                  type="primary"
                  style={{ marginRight: 8 }}
                  onClick={() => tempProvinceModal()}
                >
                  新增临时省份
                </Button>
              )} */}
              {visible ? (
                <Button
                  type="primary"
                  onClick={() => annualDefenseEngineeringModal({ edit: true, engineeringForm })}
                  style={{ marginRight: 8 }}
                >
                  编辑
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => defenseEngineeringModal({ edit: true, engineeringForm })}
                  style={{ marginRight: 8 }}
                >
                  编辑
                </Button>
              )}

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
            {enums.object_secrecy_level && enums.object_secrecy_level[engineeringForm.secrecyLevel]}
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
            </>
          )}

          <Descriptions.Item label="工程描述" span={4}>
            {engineeringForm.describe}
          </Descriptions.Item>
          {!visible && (
            <>
              <Descriptions.Item label="成员省份" span={4}>
                <ProvinceListTable style={{ width: '50vw' }} />
              </Descriptions.Item>
              <Descriptions.Item label="临时省份" span={4}>
                <TempProvinceTable style={{ width: '50vw' }} />
              </Descriptions.Item>
            </>
          )}
          {fileList(engineeringForm.fileInfoList)}
        </Descriptions>
      </Spin>
    </Card>
  );
};

export default connect(({ defenseEngineering, global }) => ({
  engineeringForm: defenseEngineering.engineeringForm,
  enums: global.enums,
  loading: defenseEngineering.loading,
}))(EngineeringDescription);

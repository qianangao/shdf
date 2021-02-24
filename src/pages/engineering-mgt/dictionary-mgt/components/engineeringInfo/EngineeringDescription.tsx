import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Popconfirm, Card } from 'antd';
import { connect } from 'umi';
// import Table from '../Table'

const EngineeringDescription = ({
  dispatch,
  engineeringForm,
  openAddEngineeringModal,
  tempProvinceModal,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // form.setFieldsValue(actionForm);
    if (engineeringForm && engineeringForm.actionYear) {
      setVisible(true);
    }
    return () => {
      setVisible(false);
      // form.resetFields();
    };
  }, [engineeringForm]);

  const deleteEngineeringData = actionId => {
    dispatch({
      type: 'dictionaryMgt/deleteEngineeringData',
      payload: actionId,
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
              onClick={() => openAddEngineeringModal({ engineeringForm })}
              style={{ marginRight: 8 }}
            >
              编辑
            </Button>
            <Popconfirm
              // key={`${actionForm.actionId}del`}
              title="确认删除该行动信息吗？"
              placement="topRight"
              onConfirm={() => deleteEngineeringData(engineeringForm.actionId)}
            >
              <Button type="primary">删除</Button>
            </Popconfirm>
            ,
          </>
        }
      >
        {!visible && (
          <>
            <Descriptions.Item label="工程名称" span={2}>
              天山工程
            </Descriptions.Item>
            <Descriptions.Item label="工程编号" span={2}>
              1810000000
            </Descriptions.Item>
          </>
        )}
        {visible && (
          <>
            <Descriptions.Item label="开始日期" span={2}>
              2020-12-21
            </Descriptions.Item>
            <Descriptions.Item label="截止日期" span={2}>
              2021-02-11
            </Descriptions.Item>
          </>
        )}

        <Descriptions.Item label="保密等级" span={2}>
          机密
        </Descriptions.Item>
        {!visible && (
          <>
            <Descriptions.Item label="联络人" span={2}>
              李刚
            </Descriptions.Item>
            <Descriptions.Item label="联络电话" span={2}>
              12345678909
            </Descriptions.Item>
            <Descriptions.Item label="牵头省份" span={4}>
              新疆维吾尔自治区
            </Descriptions.Item>
            {/* <Descriptions.Item label="牵头省份" span={4}>
                <Table/>
            </Descriptions.Item> */}
          </>
        )}
        {visible && (
          <>
            <Descriptions.Item label="" span={2} />
          </>
        )}
        <Descriptions.Item label="工程描述" span={4}>
          新疆维吾尔自治区1323413发生过v发的不打算
        </Descriptions.Item>
        <Descriptions.Item label="附件列表" span={4}>
          申达股份大哥哥
        </Descriptions.Item>
      </Descriptions>
      ,
    </Card>
  );
};

export default connect(({ dictionaryMgt }) => ({ engineeringForm: dictionaryMgt.engineeringForm }))(
  EngineeringDescription,
);

import React from 'react';
import { Descriptions } from 'antd';

const AssociationDesc = ({ associatin }) => {
  return (
    <Descriptions title="线索基本信息" column={{ xxl: 4, xl: 3, lg: 2 }}>
      <Descriptions.Item label="线索名称" span={3}>
        {associatin && associatin.clueName}
      </Descriptions.Item>
      <Descriptions.Item label="发生地域">{associatin && associatin.region}</Descriptions.Item>
      <Descriptions.Item label="被举报人">
        {associatin && associatin.reportedObjectName}
      </Descriptions.Item>
      <Descriptions.Item label="被举报机构" span={1}>
        {associatin && associatin.reportedObjectName}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default AssociationDesc;

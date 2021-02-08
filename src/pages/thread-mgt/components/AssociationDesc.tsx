import React from 'react';
import { Descriptions } from 'antd';

const AssociationDesc = ({ association }) => {
  return (
    <Descriptions title="线索基本信息" column={{ xxl: 4, xl: 3, lg: 2 }}>
      <Descriptions.Item label="线索名称" span={{ xxl: 2, xl: 3, lg: 2 }}>
        {association && association.clueName}
      </Descriptions.Item>
      <Descriptions.Item label="发生地域">{association && association.region}</Descriptions.Item>
      <Descriptions.Item label="被举报人/机构">
        {association && association.reportedObjectName}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default AssociationDesc;

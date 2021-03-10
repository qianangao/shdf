import React from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';

const TableFileCase = ({ sensitiveMgt }) => {
  const { caseFileListData } = sensitiveMgt;

  const fileList = files => {
    if (files && files.length > 0) {
      const views = files.map(item => {
        return (
          <a href={item.url} style={{ display: 'block' }}>
            {item.fileName}
          </a>
        );
      });

      return (
        <Descriptions size="middle" column={1}>
          <Descriptions.Item label="办理附件" span={1}>
            <div style={{ marginBottom: 20 }}>{views}</div>
          </Descriptions.Item>
        </Descriptions>
      );
    }
    return <div style={{ marginBottom: 20 }} />;
  };

  return <>{fileList(caseFileListData)}</>;
};

export default connect(({ sensitiveMgt, global, loading }) => ({
  sensitiveMgt,
  loading: loading.models.sensitiveMgt,
  enums: global.enums,
}))(TableFileCase);

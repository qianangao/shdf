import React from 'react';
import { connect } from 'umi';
import { Descriptions } from 'antd';

const TableFileCase = ({ caseMgt }) => {
  const { caseFileListData } = caseMgt;

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

export default connect(({ caseMgt, global, loading }) => ({
  caseMgt,
  loading: loading.models.caseMgt,
  enums: global.enums,
}))(TableFileCase);

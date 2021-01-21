import React from 'react';
import { ConfigProvider } from 'antd';
import { Inspector } from 'react-dev-inspector';
import zhCN from 'antd/es/locale/zh_CN';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout: React.FC = ({ children }) => {
  return (
    <InspectorWrapper>
      <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
    </InspectorWrapper>
  );
};

export default Layout;

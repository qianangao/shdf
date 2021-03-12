import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import Table from './components/Table';
import TableNotice from './components/TableNotice';
import TableReceiving from './components/TableReceiving';

const { Sider, Content } = Layout;

const Home = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <Sider width="50%" style={{ marginRight: 10 }} theme="light">
          <Table />
        </Sider>
        <Content>
          <TableNotice />
          <Content style={{ width: 300, height: 10 }} />
          <TableReceiving style={{ marginTop: 10 }} />
        </Content>
      </Layout>
    </>
  );
};

export default connect(({ home }) => ({
  noticeAnnouncementData: home.noticeAnnouncementData,
  elegantDemeanorData: home.elegantDemeanorData,
  achievementListData: home.achievementListData,
  elderlyPolicyListData: home.elderlyPolicyListData,
}))(Home);

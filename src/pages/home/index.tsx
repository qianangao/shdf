import { Row } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';

const Home = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Row gutter={[16, 16]}>home</Row>
    </>
  );
};

export default connect(({ home }) => ({
  noticeAnnouncementData: home.noticeAnnouncementData,
  elegantDemeanorData: home.elegantDemeanorData,
  achievementListData: home.achievementListData,
  elderlyPolicyListData: home.elderlyPolicyListData,
}))(Home);

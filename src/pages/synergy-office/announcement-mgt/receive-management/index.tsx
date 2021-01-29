import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';
import ReplyNoticeModal from './components/ReplyNoticeModal';

const AnnouncementMgt = ({ dispatch }) => {
  const readModifyRef = useRef({});
  const replyRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  const openReadModal = (item: any) => {
    readModifyRef.current.showModal(item);
  };
  const replyModal = (item: any) => {
    replyRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table openReadModal={openReadModal} replyModal={replyModal} />
      <ReplyNoticeModal actionRef={replyRef} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(AnnouncementMgt);

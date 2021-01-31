import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';
import ReplyNoticeModal from './components/ReplyNoticeModal';
import DetailModal from '@/pages/synergy-office/announcement-mgt/components/DetailModal';

const AnnouncementMgt = ({ dispatch }) => {
  const detailRef = useRef({});
  const replyRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  const openDetailModal = (item: any) => {
    detailRef.current.showModal(item);
  };
  const replyModal = (item: any) => {
    replyRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table openDetailModal={openDetailModal} replyModal={replyModal} />
      <ReplyNoticeModal actionRef={replyRef} />
      <DetailModal actionRef={detailRef} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(AnnouncementMgt);

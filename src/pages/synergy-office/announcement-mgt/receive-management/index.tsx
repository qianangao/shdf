import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DetailModal from '@/pages/synergy-office/announcement-mgt/components/DetailModal';
import Table from './components/Table';
import ReplyNoticeModal from './components/ReplyNoticeModal';

const AnnouncementMgt = ({ dispatch }) => {
  const detailRef = useRef({});
  const replyRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['notice_receive'],
      },
    });
  }, []);

  const openDetailModal = (id: any, status: any, type: any) => {
    detailRef.current.showModal(id, status, type);
  };
  const replyModal = (id: any) => {
    replyRef.current.showModal(id);
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

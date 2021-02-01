import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import HandleSituationModal from './components/HandleSituationModal';
import CommitExamineModal from './components/CommitExamineModal';
import DetailModal from '../components/DetailModal';

const AnnouncementMgt = ({ dispatch }) => {
  const modifyRef = useRef({});
  const readModifyRef = useRef({});
  const commitExamineRef = useRef({});
  const detailRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level', 'notice_status'],
      },
    });
  }, []);

  const openModifyModal = (item: any) => {
    modifyRef.current.showModal(item);
  };
  const openReadModal = (item: any) => {
    readModifyRef.current.showModal(item);
  };
  const commitExamineModal = (item: any) => {
    commitExamineRef.current.showModal(item);
  };
  const detailModal = (item: any, type: any) => {
    detailRef.current.showModal(item, type);
  };

  return (
    <PageHeaderWrapper>
      <Table
        openModifyModal={openModifyModal}
        openReadModal={openReadModal}
        commitExamineModal={commitExamineModal}
        detailModal={detailModal}
      />
      <ModifyModal actionRef={modifyRef} />
      <HandleSituationModal actionRef={readModifyRef} />
      <CommitExamineModal actionRef={commitExamineRef} />
      <DetailModal actionRef={detailRef} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(AnnouncementMgt);

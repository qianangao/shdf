import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import HandleSituationModal from './components/HandleSituationModal';
import CommitExamineModal from './components/CommitExamineModal';
import DetailModal from '../components/DetailModal';

const AnnouncementMgt = ({ dispatch }) => {
  const modifyRef = useRef({});
  const HandleSituationRef = useRef({});
  const commitExamineRef = useRef({});
  const detailRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['object_secrecy_level', 'notice_status'],
      },
    });
  }, []);

  const openModifyModal = (id: any) => {
    modifyRef.current.showModal(id);
  };
  const handleSituationModal = (id: any) => {
    HandleSituationRef.current.showModal(id);
  };
  const commitExamineModal = (id: any) => {
    commitExamineRef.current.showModal(id);
  };
  const detailModal = (id: any, status: any, type: any) => {
    detailRef.current.showModal(id, status, type);
  };

  return (
    <>
      <Table
        openModifyModal={openModifyModal}
        handleSituationModal={handleSituationModal}
        commitExamineModal={commitExamineModal}
        detailModal={detailModal}
      />
      <ModifyModal actionRef={modifyRef} />
      <HandleSituationModal actionRef={HandleSituationRef} />
      <CommitExamineModal actionRef={commitExamineRef} />
      <DetailModal actionRef={detailRef} />
    </>
  );
};

export default connect(() => ({}))(AnnouncementMgt);

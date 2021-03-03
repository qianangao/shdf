import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import ProcessInfoModal from './components/process/ProcessInfoModal';
import Table from './components/Table';
import ModifyModal from './components/modify/ModifyModal';
import OperatingLogModal from './components/OperatingLogModal';
import TransferClueModal from './components/transfer/TransferClueModal';
import HostClueModal from './components/host/HostClueModal';
import AuthorizeModal from './components/AuthorizeModal';
import DetailModal from './components/detail/DetailModal';

const ClueManagement = ({ dispatch }) => {
  const detailRef = useRef({});
  const modifyRef = useRef({});
  const authRef = useRef({});
  const logRef = useRef({});
  const transferRef = useRef({});
  const hostRef = useRef({});
  const processRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'subject_secrecy_level',
          'clue_circulation_type',
          'clue_reported_object_type',
          'object_secrecy_level',
          'urgent_level',
          'clue_source',
          'clue_type',
          'clue_importance',
          'clue_oplog_type',
          'clue_type_all',
          'dict_sex',
        ],
      },
    });
  }, []);

  const openDetailModal = (clueId: any, sourceClueId: any) => {
    detailRef.current.showModal(clueId, sourceClueId);
  };
  const openModifyModal = (clueId: any) => {
    modifyRef.current.showModal(clueId);
  };
  const openAuthModal = (clueId: any) => {
    authRef.current.showModal(clueId);
  };
  const openLogModal = (clueId: any) => {
    logRef.current.showModal(clueId);
  };
  const transferModal = (item: any) => {
    transferRef.current.showModal(item);
  };
  const hostRefModal = (item: any) => {
    hostRef.current.showModal(item);
  };
  const processRefModal = (item: any, type: any) => {
    processRef.current.showModal(item, type);
  };
  return (
    <>
      <Table
        openDetailModal={openDetailModal}
        openModifyModal={openModifyModal}
        openAuthModal={openAuthModal}
        openLogModal={openLogModal}
        transferModal={transferModal}
        hostRefModal={hostRefModal}
        processRefModal={processRefModal}
      />
      <DetailModal actionRef={detailRef} />
      <ModifyModal actionRef={modifyRef} />
      <AuthorizeModal actionRef={authRef} />
      <OperatingLogModal actionRef={logRef} />
      <TransferClueModal actionRef={transferRef} />
      <HostClueModal actionRef={hostRef} />
      <ProcessInfoModal actionRef={processRef} transferModal={transferModal} />
    </>
  );
};

export default connect(() => ({}))(ClueManagement);

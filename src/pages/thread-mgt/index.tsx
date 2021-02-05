import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import ProcessInfoModal from '@/pages/thread-mgt/components/process/ProcessInfoModal';
import Table from './components/Table';
import ModifyModal from './components/modify/ModifyModal';
import ExportModal from './components/ExportModal';
import OperatingLogModal from './components/OperatingLogModal';
import TransferClueModal from './components/transfer/TransferClueModal';
import HostClueModal from './components/host/HostClueModal';
import AuthorizeModal from './components/AuthorizeModal';

const ClueManagement = ({ dispatch }) => {
  const modifyRef = useRef({});
  const authRef = useRef({});
  const exportRef = useRef({});
  const logRef = useRef({});
  const transferRef = useRef({});
  const hostRef = useRef({});
  const processRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level', 'clue_circulation_type'],
      },
    });
  }, []);
  const openModifyModal = (item: any) => {
    modifyRef.current.showModal(item);
  };
  const openAuthModal = (id: any) => {
    authRef.current.showModal(id);
  };
  const openExportModal = (item: any) => {
    exportRef.current.showModal(item);
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
  const processRefModal = (clueId: any, circulationId: any, type: any) => {
    processRef.current.showModal(clueId, circulationId, type);
  };
  return (
    <>
      <Table
        openModifyModal={openModifyModal}
        openAuthModal={openAuthModal}
        openExportModal={openExportModal}
        openLogModal={openLogModal}
        transferModal={transferModal}
        hostRefModal={hostRefModal}
        processRefModal={processRefModal}
      />
      <ModifyModal actionRef={modifyRef} />
      <AuthorizeModal actionRef={authRef} />
      <ExportModal actionRef={exportRef} />
      <OperatingLogModal actionRef={logRef} />
      <TransferClueModal actionRef={transferRef} />
      <HostClueModal actionRef={hostRef} />
      <ProcessInfoModal actionRef={processRef} />
    </>
  );
};

export default connect(() => ({}))(ClueManagement);

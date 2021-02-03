import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import ImportModal from './components/ImportModal';
import ExportModal from './components/ExportModal';

const ClueManagement = ({ dispatch }) => {
  const modifyRef = useRef({});
  const importRef = useRef({});
  const exportRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level'],
      },
    });
  }, []);
  const openModifyModal = (item: any) => {
    modifyRef.current.showModal(item);
  };
  const openImportModal = (item: any) => {
    importRef.current.showModal(item);
  };
  const openExportModal = (item: any) => {
    exportRef.current.showModal(item);
  };
  return (
    <>
      <Table
        openModifyModal={openModifyModal}
        openImportModal={openImportModal}
        openExportModal={openExportModal}
      />
      <ModifyModal actionRef={modifyRef} />
      <ImportModal actionRef={importRef} />
      <ExportModal actionRef={exportRef} />
    </>
  );
};

export default connect(() => ({}))(ClueManagement);

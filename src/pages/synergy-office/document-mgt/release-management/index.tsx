import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import HandleSituationModal from './components/HandleSituationModal';
import DetailModal from '../components/DetailModal';

const DocumentMgt = ({ dispatch }) => {
  const modifyRef = useRef({});
  const HandleSituationRef = useRef({});
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
  const detailModal = (id: any, status: any, type: any) => {
    detailRef.current.showModal(id, status, type);
  };

  return (
    <>
      <Table
        openModifyModal={openModifyModal}
        handleSituationModal={handleSituationModal}
        detailModal={detailModal}
      />
      <ModifyModal actionRef={modifyRef} />
      <HandleSituationModal actionRef={HandleSituationRef} />
      <DetailModal actionRef={detailRef} />
    </>
  );
};

export default connect(() => ({}))(DocumentMgt);

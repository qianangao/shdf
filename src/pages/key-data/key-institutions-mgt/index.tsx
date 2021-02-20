import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import AuthorizeModal from './components/AuthorizeModal';
import DetailModal from './components/DetailModal';

const KeyInstitutions = ({ dispatch }) => {
  const modifyRef = useRef({});
  const detailRef = useRef({});
  const authRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level'],
      },
    });
  }, []);

  const openModifyModal = (orgId: any) => {
    modifyRef.current.showModal(orgId);
  };

  const openDetailModal = (orgId: any) => {
    detailRef.current.showModal(orgId);
  };

  const openAuthModal = (orgId: any) => {
    authRef.current.showModal(orgId);
  };

  return (
    <PageHeaderWrapper>
      <Table
        openModifyModal={openModifyModal}
        openDetailModal={openDetailModal}
        openAuthModal={openAuthModal}
      />
      <ModifyModal actionRef={modifyRef} />
      <DetailModal actionRef={detailRef} />
      <AuthorizeModal actionRef={authRef} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(KeyInstitutions);

import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import AuthorizeModal from './components/AuthorizeModal';

const KeyInstitutions = ({ dispatch }) => {
  const modifyRef = useRef({});
  const authRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level'],
      },
    });
  }, []);

  // const orgChangeHander = orgId => {
  //   dispatch({
  //     type: 'kdKeyPersonMgt/selectOrgChange',
  //     payload: orgId,
  //   });
  // };

  const openModifyModal = (publicationId: any) => {
    modifyRef.current.showModal(publicationId);
  };

  const openAuthModal = (orgId: any) => {
    authRef.current.showModal(orgId);
  };

  return (
    <PageHeaderWrapper>
      <Table openModifyModal={openModifyModal} openAuthModal={openAuthModal} />
      <ModifyModal actionRef={modifyRef} />
      <AuthorizeModal actionRef={authRef} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(KeyInstitutions);

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
        names: [
          'dict_sex',
          'star_level',
          'marital',
          'blood',
          'nation',
          'education',
          'political',
          'nationality',
        ],
      },
    });
  }, []);

  const openModifyModal = (personId: any) => {
    modifyRef.current.showModal(personId);
  };
  const openDetailModal = (personId: any) => {
    detailRef.current.showModal(personId);
  };
  const openAuthModal = (personId: any) => {
    authRef.current.showModal(personId);
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

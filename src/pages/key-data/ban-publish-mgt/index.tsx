import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const KeyInstitutions = ({ dispatch }) => {
  const modifyRef = useRef({});

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

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table openModifyModal={openModifyModal} />
      <ModifyModal actionRef={modifyRef} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(KeyInstitutions);

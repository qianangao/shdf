import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayoutQuery from '@/layouts/OrgTreeLayoutQuery';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const SpecialProject = ({ dispatch }) => {
  const modifyRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'emKeyInstitutions/selectOrgChange',
      payload: orgId,
    });
  };

  const addAnnualAction = () => {
    // console.log('addAnnualAction');
  };

  const addAction = () => {
    // console.log('addAction');
  };

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  return (
    <OrgTreeLayoutQuery
      onOrgSelect={orgChangeHander}
      addAnnualAction={addAnnualAction}
      addAction={addAction}
    >
      <Table openModifyModal={openModifyModal} />
      <ModifyModal actionRef={modifyRef} />
    </OrgTreeLayoutQuery>
  );
};

export default connect(() => ({}))(SpecialProject);

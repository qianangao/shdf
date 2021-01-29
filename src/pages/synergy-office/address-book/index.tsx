import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout'
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const AddressBook = ({ dispatch }) => {
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


  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };
  return (
     <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} />
      <ModifyModal actionRef={modifyRef} />
    </OrgTreeLayout>
  );
};

export default connect(() => ({}))(AddressBook);

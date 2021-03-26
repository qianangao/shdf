import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';

const AddUser = ({ dispatch }) => {
  const modifyRef = useRef({});
  const detailRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'userMgt/getEnums',
      payload: {
        names: ['dict_sex'],
      },
    });
  }, []);

  const orgChangeHander = userId => {
    dispatch({
      type: 'userMgt/getUserList',
      payload: { userId },
    });
  };
  const openDetailModal = (personId: any) => {
    detailRef.current.showModal(personId);
  };
  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} openDetailModal={openDetailModal} />
      <ModifyModal actionRef={modifyRef} />
      <DetailModal actionRef={detailRef} />
    </OrgTreeLayout>
  );
};

export default connect(() => ({}))(AddUser);

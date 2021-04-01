import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';
import RoleTableModal from './components/RoleTableModal';
// import TableModifyModal from './components/components/TableModifyModal'
import AddRoleModal from './components/AddRoleModal';

const AddUser = ({ dispatch }) => {
  const modifyRef = useRef({});
  const detailRef = useRef({});
  const roleTableRef = useRef({});
  const addRoleRef = useRef({});
  // const tableModifyRef = useRef({})
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
  const openRoleTableModal = item => {
    roleTableRef.current.showModal(item);
  };
  const openAddRoleModal = item => {
    addRoleRef.current.showModal(item);
  };
  // const openTableModifyModal = item => {
  //   tableModifyRef.current.showModal(item);
  // };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table
        openModifyModal={openModifyModal}
        openDetailModal={openDetailModal}
        openRoleTableModal={openRoleTableModal}
        openAddRoleModal={openAddRoleModal}
      />
      <ModifyModal actionRef={modifyRef} />
      <DetailModal actionRef={detailRef} />
      <RoleTableModal actionRef={roleTableRef} />
      <AddRoleModal actionRef={addRoleRef} />
      {/* <TableModifyModal actionRef={tableModifyRef} /> */}
    </OrgTreeLayout>
  );
};

export default connect(() => ({}))(AddUser);

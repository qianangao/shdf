import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
// import RoleTreeLayout from './components/tree-component/RoleTreeLayout';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import ModifyRoleModal from './components/edit-role/ModifyRoleModal';
// import AssginModal from './components/assign-user/AssignModal'
// import ModifyUserModal from './components/assign-user/edit-user/ModifyUserModal'
import AuthorityModal from './components/authority-management/AuthorityModal';

const RoleMgt = ({ dispatch }) => {
  const modifyRoleModalRef = useRef({});
  // const assignModalRef = useRef({});
  // const modifyUserModalRef = useRef({});
  const authorityModalRef = useRef({});

  useEffect(() => {}, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'smRoleMgt/getListTable',
      payload: { orgId },
    });
  };

  const modifyRoleModal = item => {
    modifyRoleModalRef.current.showModal(item);
  };
  // const assginModal = item => {
  //   assignModalRef.current.showModal(item);
  // };
  // const modifyUserModal = item => {
  //   modifyUserModalRef.current.showModal(item);
  // };
  const authorityModal = item => {
    authorityModalRef.current.showModal(item);
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table modifyRoleModal={modifyRoleModal} authorityModal={authorityModal} />
      <ModifyRoleModal actionRef={modifyRoleModalRef} />
      <AuthorityModal actionRef={authorityModalRef} />
    </OrgTreeLayout>

    // <RoleTreeLayout>
    //   <Table modifyRoleModal={modifyRoleModal} authorityModal={authorityModal} />
    //   <ModifyRoleModal actionRef={modifyRoleModalRef} />
    //   {/* <AssginModal actionRef={assignModalRef} modifyUserModal={modifyUserModal}/> */}
    //   {/* <ModifyUserModal actionRef={modifyUserModalRef} /> */}
    //   <AuthorityModal actionRef={authorityModalRef} />
    // </RoleTreeLayout>
  );
};

export default connect(() => ({}))(RoleMgt);

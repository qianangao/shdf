import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import AuthTreeLayout from './components/tree-component/AuthTreeLayout';
import Table from './components/Table';
import AuthModal from './components/edit-auth/AuthModal';

const AuthMgt = () => {
  const authModalRef = useRef({});

  useEffect(() => {}, []);

  const authModal = item => {
    authModalRef.current.showModal(item);
  };

  return (
    <AuthTreeLayout>
      <Table authModal={authModal} />
      <AuthModal actionRef={authModalRef} />
    </AuthTreeLayout>
  );
};

export default connect(() => ({}))(AuthMgt);

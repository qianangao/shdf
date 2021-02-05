import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';

const ModifyModal = React.lazy(() => import('./components/ModifyModal'));
const ReadListModal = React.lazy(() => import('./components/ReadListModal'));
const DetailModal = React.lazy(() => import('./components/DetailModal'));
const AuthorizeModal = React.lazy(() => import('./components/AuthorizeModal'));
const ApplyCaseModal = React.lazy(() => import('./components/ApplyCaseModal'));
const RecordDetailModal = React.lazy(() => import('./components/RecordDetailModal'));
const RecordApprovalModal = React.lazy(() => import('./components/RecordApprovalModal'));
const ApplySuperviseModal = React.lazy(() => import('./components/ApplySuperviseModal'));
const SuperviseModal = React.lazy(() => import('./components/SuperviseModal'));
const SuperviseApprovalModal = React.lazy(() => import('./components/SuperviseApprovalModal'));
const SuperviseDetailModal = React.lazy(() => import('./components/SuperviseDetailModal'));

const CaseMgt = ({ dispatch }) => {
  const modifyRef = useRef({});
  const readListRef = useRef({});
  const detailRef = useRef({});
  const authorizeRef = useRef({});
  const applyCaseRef = useRef({});
  const recordDetailRef = useRef({});
  const recordApprovalRef = useRef({});
  const applySuperviseRef = useRef({});
  const superviseRef = useRef({});
  const superviseApprovalRef = useRef({});
  const superviseDetailRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level', 'reading_state', 'urgent_level', 'handle_type'],
      },
    });
  }, []);

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  const openReadListModal = item => {
    readListRef.current.showModal(item);
  };

  const openDetailModal = item => {
    detailRef.current.showModal(item);
  };

  const openAuthorizeModal = item => {
    authorizeRef.current.showModal(item);
  };

  const openApplyCaseModal = item => {
    applyCaseRef.current.showModal(item);
  };

  const openRecordDetailModal = item => {
    recordDetailRef.current.showModal(item);
  };

  const openRecordApprovalModifyModal = item => {
    recordApprovalRef.current.showModal(item);
  };

  const openApplySuperviseModal = item => {
    applySuperviseRef.current.showModal(item);
  };

  const openSuperviseModal = item => {
    superviseRef.current.showModal(item);
  };

  const openSuperviseApprovalModal = item => {
    superviseApprovalRef.current.showModal(item);
  };

  const openSuperviseDetailModal = item => {
    superviseDetailRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table
        openSuperviseDetailModal={openSuperviseDetailModal}
        openSuperviseApprovalModal={openSuperviseApprovalModal}
        openSuperviseModal={openSuperviseModal}
        openApplySuperviseModal={openApplySuperviseModal}
        openRecordApprovalModifyModal={openRecordApprovalModifyModal}
        openRecordDetailModal={openRecordDetailModal}
        openApplyCaseModal={openApplyCaseModal}
        openModifyModal={openModifyModal}
        openReadListModal={openReadListModal}
        openDetailModal={openDetailModal}
        openAuthorizeModal={openAuthorizeModal}
      />
      <Suspense fallback={null}>
        <SuperviseDetailModal actionRef={superviseDetailRef} />
        <SuperviseApprovalModal actionRef={superviseApprovalRef} />
        <SuperviseModal actionRef={superviseRef} />
        <ApplySuperviseModal actionRef={applySuperviseRef} />
        <RecordApprovalModal actionRef={recordApprovalRef} />
        <RecordDetailModal actionRef={recordDetailRef} />
        <ApplyCaseModal actionRef={applyCaseRef} />
        <ModifyModal actionRef={modifyRef} />
        <ReadListModal actionRef={readListRef} />
        <DetailModal actionRef={detailRef} />
        <AuthorizeModal actionRef={authorizeRef} />
      </Suspense>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(CaseMgt);

import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';

const ModifyModal = React.lazy(() => import('./components/ModifyModal'));
const DetailModal = React.lazy(() => import('./components/DetailModal'));
const AuthorizeModal = React.lazy(() => import('./components/AuthorizeModal'));
const ApplyCaseModal = React.lazy(() => import('./components/ApplyCaseModal'));
const RecordDetailModal = React.lazy(() => import('./components/RecordDetailModal'));
const RecordApprovalModal = React.lazy(() => import('./components/RecordApprovalModal'));
const EvaluateModal = React.lazy(() => import('./components/EvaluateModal'));
const EvaluateFeedbackModal = React.lazy(() => import('./components/EvaluateFeedbackModal'));

const CaseMgt = ({ dispatch }) => {
  const modifyRef = useRef({});
  const detailRef = useRef({});
  const authorizeRef = useRef({});
  const applyCaseRef = useRef({});
  const recordDetailRef = useRef({});
  const recordApprovalRef = useRef({});
  const evaluateRef = useRef({});
  const evaluateFeedbackRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'subject_secrecy_level',
          'reading_state',
          'urgent_level',
          'spread_channel',
          'spread_form',
          'involved_platform_type',
          'case_type',
          'case_nature',
          'case_source',
          'is_network_case',
          'handle_state',
          'case_supervise_state',
          'importance_level',
          'handle_type',
        ],
      },
    });
  }, []);

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
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

  const openEvaluateModal = item => {
    evaluateRef.current.showModal(item);
  };

  const openEvaluateFeedbackModal = item => {
    evaluateFeedbackRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table
        openEvaluateFeedbackModal={openEvaluateFeedbackModal}
        openEvaluateModal={openEvaluateModal}
        openRecordApprovalModifyModal={openRecordApprovalModifyModal}
        openRecordDetailModal={openRecordDetailModal}
        openApplyCaseModal={openApplyCaseModal}
        openModifyModal={openModifyModal}
        openDetailModal={openDetailModal}
        openAuthorizeModal={openAuthorizeModal}
      />
      <Suspense fallback={null}>
        <EvaluateFeedbackModal actionRef={evaluateFeedbackRef} />
        <EvaluateModal actionRef={evaluateRef} />
        <RecordApprovalModal actionRef={recordApprovalRef} />
        <RecordDetailModal actionRef={recordDetailRef} />
        <ApplyCaseModal actionRef={applyCaseRef} />
        <ModifyModal actionRef={modifyRef} />
        <DetailModal actionRef={detailRef} />
        <AuthorizeModal actionRef={authorizeRef} />
      </Suspense>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(CaseMgt);

import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import ActionTreeLayout from './components/tree-component/ActionTreeLayout';
import Table from './components/Table';
import AddchildrenTaskModal from './components/children-ask/add-children-task/AddchildrenTaskModal';
// import SpecialActionModal from './components/add-action/SpecialActionModal';
import SpecialActionModal from './components/special-action/SpecialActionModal';
import AnnualSpecialActionModal from './components/annual-special-action/AnnualSpecialActionModal';
import DownModal from './components/children-ask/down/DownModal';
import ModifyModal from './components/children-ask/edit-children-task/ModifyModal';
import FeedbackModal from './components/children-ask/feedback/feedback-data/FeedBackModal';
import FeedbackRequestModal from './components/children-ask/FeedbackRequestModal';
import FeedbackDetailModal from './components/children-ask/feedback/feedback-detail/FeedbackDetailModal';
// import ChildrenTaskForm from './components/childrenTask/editChildrenTask/EditChildrenTaskForm'
const SpecialProject = ({ dispatch }) => {
  const modifyRef = useRef({});
  // const addSpecialRef = useRef({});
  const specialActionRef = useRef({});
  const annualSpecialActionRef = useRef({});
  // const editRef = useRef({});
  const editchildrenRef = useRef({});
  const feedbackRef = useRef({});
  const downRef = useRef({});
  const feedbackRequestRef = useRef({});
  const feedDetailRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['object_secrecy_level', 'special_type', 'special_task_state'],
      },
    });
  }, []);

  const openModifyModal = item => {
    editchildrenRef.current.showModal(item);
  };

  const openAddModal = item => {
    modifyRef.current.showModal(item);
  };

  const annualSpecialActionModal = item => {
    annualSpecialActionRef.current.showModal(item);
  };
  const specialActionModal = item => {
    specialActionRef.current.showModal(item);
  };
  // const openEditModal = item => {
  //   editRef.current.showModal(item);
  // };
  const openDownModal = item => {
    downRef.current.showModal(item);
  };
  const openFeedbackModal = item => {
    feedbackRef.current.showModal(item);
  };
  const openFeedbackReqModal = item => {
    feedbackRequestRef.current.showModal(item);
  };
  const feedbackDetailModal = item => {
    feedDetailRef.current.showModal(item);
  };

  return (
    <ActionTreeLayout
      specialActionModal={specialActionModal}
      annualSpecialActionModal={annualSpecialActionModal}
    >
      <Table
        openAddModal={openAddModal}
        openDownModal={openDownModal}
        openModifyModal={openModifyModal}
        openFeedbackModal={openFeedbackModal}
        annualSpecialActionModal={annualSpecialActionModal}
        specialActionModal={specialActionModal}
        openFeedbackReqModal={openFeedbackReqModal}
      />
      <AddchildrenTaskModal actionRef={modifyRef} />
      <AnnualSpecialActionModal actionRef={annualSpecialActionRef} />
      <SpecialActionModal actionRef={specialActionRef} />
      <ModifyModal
        actionRef={editchildrenRef}
        openAddModal={openAddModal}
        feedbackDetailModal={feedbackDetailModal}
      />
      <FeedbackModal actionRef={feedbackRef} openFeedbackReqModal={openFeedbackReqModal} />
      <DownModal actionRef={downRef} />
      <FeedbackRequestModal actionRef={feedbackRequestRef} />
      <FeedbackDetailModal actionRef={feedDetailRef} />
    </ActionTreeLayout>
  );
};

export default connect(() => ({}))(SpecialProject);

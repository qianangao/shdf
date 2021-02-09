import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import ActionTreeLayout from '@/pages/engineering-mgt/special-project/components/TreeComponent/ActionTreeLayout';
import Table from './components/Table';
import AddchildrenTaskModal from './components/childrenTask/AddchildrenTaskModal';
import SpecialActionModal from './components/AddAction/SpecialActionModal';
// import EditModal from './components/EditAction/EditModal';
import DownModal from './components/childrenTask/DownModal';
import ModifyModal from './components/childrenTask/ModifyModal';
import FeedbackModal from './components/childrenTask/FeedBackModal';
// import FeedbackRequestModal from './components/childrenTask/FeedbackRequestModal';

const SpecialProject = ({ dispatch }) => {
  const modifyRef = useRef({});
  const addSpecialRef = useRef({});
  // const editRef = useRef({});
  const editchildrenRef = useRef({});
  const feedbackRef = useRef({});
  const downRef = useRef({});
  // const feedbackRequestRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level', 'special_type', 'special_task_state'],
      },
    });
  }, []);
  // useEffect(()=>{
  //   dispatch({
  //     type: 'specialAction/getSpecialActionTree',
  //     // payload: actionName,
  //   });
  // })
  // const actionChangeHander = actionName => {
  //   dispatch({
  //     type: 'specialAction/getSpecialActionTree',
  //     payload: actionName,
  //   });
  // };

  const openModifyModal = item => {
    editchildrenRef.current.showModal(item);
  };

  const openAddModal = item => {
    modifyRef.current.showModal(item);
  };

  const openAddSpecialModal = item => {
    addSpecialRef.current.showModal(item);
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
  // const openFeedbackReqModal = item => {
  //   feedbackRequestRef.current.showModal(item);
  // };

  return (
    <ActionTreeLayout openAddSpecialModal={openAddSpecialModal}>
      <Table
        openAddModal={openAddModal}
        openDownModal={openDownModal}
        // openEditModal={openEditModal}
        openModifyModal={openModifyModal}
        openFeedbackModal={openFeedbackModal}
        openAddSpecialModal={openAddSpecialModal}
        // openFeedbackReqModal={openFeedbackReqModal}
      />
      <AddchildrenTaskModal actionRef={modifyRef} />
      <SpecialActionModal actionRef={addSpecialRef} />
      {/* <EditModal actionRef={editRef} /> */}
      <ModifyModal
        actionRef={editchildrenRef}
        openFeedbackModal={openFeedbackModal}
        openAddModal={openAddModal}
      />
      <FeedbackModal actionRef={feedbackRef} />
      <DownModal actionRef={downRef} />
      {/* <FeedbackRequestModal actionRef={feedbackRequestRef} /> */}
    </ActionTreeLayout>
  );
};

export default connect(() => ({}))(SpecialProject);

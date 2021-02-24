import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import ActionTreeLayout from './components/TreeComponent/ActionTreeLayout';
import Table from './components/Table';
import AddchildrenTaskModal from './components/childrenTask/addChildrenTask/AddchildrenTaskModal';
import SpecialActionModal from './components/addAction/SpecialActionModal';
// import EditModal from './components/EditAction/EditModal';
import DownModal from './components/childrenTask/down/DownModal';
import ModifyModal from './components/childrenTask/editChildrenTask/ModifyModal';
import FeedbackModal from './components/childrenTask/feedback/feedbackData/FeedBackModal';
import FeedbackRequestModal from './components/childrenTask/FeedbackRequestModal';
import FeedbackDetailModal from './components/childrenTask/feedback/feedbackDetail/FeedbackDetailModal';
// import ChildrenTaskForm from './components/childrenTask/editChildrenTask/EditChildrenTaskForm'
const SpecialProject = ({ dispatch }) => {
  const modifyRef = useRef({});
  const addSpecialRef = useRef({});
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
  const openFeedbackReqModal = item => {
    feedbackRequestRef.current.showModal(item);
  };
  const feedbackDetailModal = item => {
    feedDetailRef.current.showModal(item);
  };

  return (
    <ActionTreeLayout openAddSpecialModal={openAddSpecialModal}>
      <Table
        openAddModal={openAddModal}
        openDownModal={openDownModal}
        // openEditModal={openEditModal}
        openModifyModal={openModifyModal}
        openFeedbackModal={openFeedbackModal}
        openAddSpecialModal={openAddSpecialModal}
        openFeedbackReqModal={openFeedbackReqModal}
        // feedbackDetailModal={feedbackDetailModal}
      />
      {/* <ChildrenTaskForm feedbackDetailModal={feedbackDetailModal}/> */}
      <AddchildrenTaskModal actionRef={modifyRef} />
      <SpecialActionModal actionRef={addSpecialRef} />
      {/* <EditModal actionRef={editRef} /> */}
      <ModifyModal
        actionRef={editchildrenRef}
        openFeedbackModal={openFeedbackModal}
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

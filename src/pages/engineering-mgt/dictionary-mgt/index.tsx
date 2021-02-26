import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import EngineeringTreeLayout from './components/tree-component/EngineeringTreeLayout';
import Table from './components/Table';
import AddEngineeringModal from './components/add-engineering/AddEngineeringModal';
import TempProvinceModal from './components/temp-province/tempProvinceModal';
import AddProjectTaskModal from './components/project-task/add-project-task/AddProjectTaskModal';
import ModifyProjectTaskModal from './components/project-task/edit-project-task/ModifyProjectTaskModal';
import FeedbackDetailModal from './components/feedback/feedback-detail/FeedbackDetailModal';
import FeedbackModal from './components/feedback/feedback-data/FeedbackModal';
import DownModal from './components/down/DownModal';

const DictionaryMgt = ({ dispatch }) => {
  const addEngineeringRef = useRef({});
  const tempProvinceRef = useRef({});
  const addProjectTaskRef = useRef({});
  const editProjectTaskRef = useRef({});
  const feedbackRef = useRef({});
  const feedbackDetailRef = useRef({});
  const downRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level', 'special_type', 'special_task_state'],
      },
    });
  }, []);

  const openAddEngineeringModal = item => {
    addEngineeringRef.current.showModal(item);
  };
  const tempProvinceModel = item => {
    tempProvinceRef.current.showModal(item);
  };
  const addProjectTaskModal = item => {
    addProjectTaskRef.current.showModal(item);
  };
  const modifyProjectTaskModal = item => {
    editProjectTaskRef.current.showModal(item);
  };
  const feedbackModal = item => {
    feedbackRef.current.showModal(item);
  };
  const feedbackDetailModal = item => {
    feedbackDetailRef.current.showModal(item);
  };
  const downModal = item => {
    downRef.current.showModal(item);
  };

  return (
    <EngineeringTreeLayout openAddEngineeringModal={openAddEngineeringModal}>
      <Table
        openAddEngineeringModal={openAddEngineeringModal}
        tempProvinceModel={tempProvinceModel}
        addProjectTaskModal={addProjectTaskModal}
        modifyProjectTaskModal={modifyProjectTaskModal}
        feedbackModal={feedbackModal}
        downModal={downModal}
      />
      <AddEngineeringModal actionRef={addEngineeringRef} />
      <TempProvinceModal actionRef={tempProvinceRef} />
      <AddProjectTaskModal actionRef={addProjectTaskRef} />
      <ModifyProjectTaskModal
        actionRef={editProjectTaskRef}
        addProjectTaskModal={addProjectTaskModal}
        feedbackModal={feedbackModal}
        feedbackDetailModal={feedbackDetailModal}
      />
      <FeedbackModal actionRef={feedbackRef} />
      <FeedbackDetailModal actionRef={feedbackDetailRef} />
      <DownModal actionRef={downRef} />
    </EngineeringTreeLayout>
  );
};

export default connect(() => ({}))(DictionaryMgt);

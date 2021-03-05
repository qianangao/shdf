import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import EngineeringTreeLayout from './components/tree-component/EngineeringTreeLayout';
import Table from './components/Table';
import AddEngineeringModal from './components/add-engineering/AddEngineeringModal';
import TempProvinceModal from './components/temp-province/tempProvinceModal';
import AddProjectTaskModal from './components/project-task/add-project-task/AddProjectTaskModal';
import ModifyProjectTaskModal from './components/project-task/edit-project-task/ModifyProjectTaskModal';
import FeedbackDetailModal from './components/feedback/feedback-detail/FeedbackDetailModal';
import FeedbackModal from './components/feedback/feedback-data/FeedbackModal';
import DownModal from './components/down/DownModal';
import FeedbackRequestModal from './components/project-task/FeedbackRequestModal';
import MeetingTable from './components/conference-management/MeetingTable';
import MeetingModal from './components/conference-management/conference-info/MeetingModal';
import AItable from './components/infoAmodify/InfoAnnounceTable';
import InfoAnModal from './components/infoAmodify/ModifyModal';
import InfoAnDetailModal from './components/infoAmodify/DetailModifyModal';
import EngineTable from './components/engineDmodify/engineDmodifyTable';
import EngineModal from './components/engineDmodify/ModifyModal';

const DictionaryMgt = ({ dispatch, dictionaryMgt }) => {
  const addEngineeringRef = useRef({});
  const tempProvinceRef = useRef({});
  const addProjectTaskRef = useRef({});
  const editProjectTaskRef = useRef({});
  const feedbackRef = useRef({});
  const feedbackDetailRef = useRef({});
  const downRef = useRef({});
  const feedbackRequestRef = useRef({});
  const meetingRef = useRef({});
  const [tableType, setTableType] = useState('annualWork');
  const { projectPid } = dictionaryMgt.dictionaryMgt;

  const tabYears = [
    { label: '年度工作重点', id: 'annualWork' },
    { label: '会议管理', id: 'conferenceManagementYears' },
    { label: '工程数据', id: 'engineeringDataYears' },
    { label: '信息通报', id: 'CommunicationsYears' },
  ];
  const tabs = [
    { label: '工程基本信息', id: 'annualWork' },
    { label: '工程数据', id: 'engineeringData' },
    { label: '工程台账', id: 'engineeringLedger' },
    { label: '线索核处', id: 'engineeringClueCore' },
    { label: '信息通报', id: 'Communications' },
  ];
  const infoAnmodifyRef = useRef({});
  const infoAnDetailmodifyRef = useRef({});
  const engineDmodifyRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['subject_secrecy_level', 'special_type', 'special_task_state'],
      },
    });
  }, []);
  const onTabChange = id => {
    setTableType(id);
  };
  const onTabChangeyear = id => {
    setTableType(id);
  };
  const openAddEngineeringModal = item => {
    addEngineeringRef.current.showModal(item);
  };
  const tempProvinceModal = item => {
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
  // 信息通报
  const openInfoModifyModal = item => {
    infoAnmodifyRef.current.showModal(item);
  };
  const openDetailModifyModal = item => {
    infoAnDetailmodifyRef.current.showModal(item);
  };
  // 工程数据
  const openEngineModifyModal = item => {
    engineDmodifyRef.current.showModal(item);
  };
  const feedbackRequestModal = item => {
    feedbackRequestRef.current.showModal(item);
  };
  const meetingModal = item => {
    meetingRef.current.showModal(item);
  };
  return (
    <EngineeringTreeLayout openAddEngineeringModal={openAddEngineeringModal}>
      {projectPid === 'null' ? (
        <TypeSelectLayout tabs={tabs} onTabChange={onTabChange}>
          {tableType === 'annualWork' && (
            <Table
              openAddEngineeringModal={openAddEngineeringModal}
              tempProvinceModal={tempProvinceModal}
              addProjectTaskModal={addProjectTaskModal}
              modifyProjectTaskModal={modifyProjectTaskModal}
              feedbackModal={feedbackModal}
              downModal={downModal}
            />
          )}
          {tableType === 'engineeringData' && (
            <EngineTable openModifyModal={openEngineModifyModal} />
          )}
          {tableType === 'Communications' && (
            <AItable
              openModifyModal={openInfoModifyModal}
              openDetailModifyModal={openDetailModifyModal}
            />
          )}
        </TypeSelectLayout>
      ) : (
        <TypeSelectLayout tabs={tabYears} onTabChange={onTabChangeyear}>
          {tableType === 'annualWork' && (
            <Table
              openAddEngineeringModal={openAddEngineeringModal}
              tempProvinceModal={tempProvinceModal}
              addProjectTaskModal={addProjectTaskModal}
              modifyProjectTaskModal={modifyProjectTaskModal}
              feedbackModal={feedbackModal}
              downModal={downModal}
            />
          )}
          {tableType === 'conferenceManagementYears' && (
            <MeetingTable meetingModal={meetingModal} />
          )}
          {tableType === 'engineeringDataYears' && (
            <EngineTable openModifyModal={openEngineModifyModal} />
          )}
          {tableType === 'CommunicationsYears' && (
            <AItable
              openModifyModal={openInfoModifyModal}
              openDetailModifyModal={openDetailModifyModal}
            />
          )}
        </TypeSelectLayout>
      )}

      <EngineModal actionRef={engineDmodifyRef} />
      <InfoAnModal actionRef={infoAnmodifyRef} />
      <InfoAnDetailModal actionRef={infoAnDetailmodifyRef} />

      <AddEngineeringModal actionRef={addEngineeringRef} />
      <TempProvinceModal actionRef={tempProvinceRef} />
      <AddProjectTaskModal actionRef={addProjectTaskRef} />
      <ModifyProjectTaskModal
        actionRef={editProjectTaskRef}
        addProjectTaskModal={addProjectTaskModal}
        feedbackDetailModal={feedbackDetailModal}
      />
      <FeedbackModal actionRef={feedbackRef} feedbackRequestModal={feedbackRequestModal} />
      <FeedbackDetailModal actionRef={feedbackDetailRef} />
      <DownModal actionRef={downRef} />
      <FeedbackRequestModal actionRef={feedbackRequestRef} />
      <MeetingModal actionRef={meetingRef} />
    </EngineeringTreeLayout>
  );
};

export default connect(dictionaryMgt => ({
  dictionaryMgt,
}))(DictionaryMgt);

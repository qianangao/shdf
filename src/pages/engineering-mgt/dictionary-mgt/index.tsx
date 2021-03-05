import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import ClueDetailModal from '@/pages/thread-mgt/components/detail/DetailModal';
import BanPublishDetailModal from '@/pages/key-data/ban-publish-mgt/components/detail/DetailModal';
import InstitutionDetailModal from '@/pages/key-data/key-institutions-mgt/components/DetailModal';
import PersonDetailModal from '@/pages/key-data/key-person-mgt/components/DetailModal';
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
import BanPublishTable from './components/keyData/BanPublishTable';
import RelevancyModal from './components/keyData/RelevancyModal';
import KeyPersonTable from './components/keyData/KeyPersonTable';
import KeyInstitutionsTable from './components/keyData/KeyInstitutionsTable';
import ClueTable from './components/keyData/ClueTable';
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
  const relevancyRef = useRef({});
  const clueDetailRef = useRef({});
  const banPublishDetailRef = useRef({});
  const institutionDetailRef = useRef({});
  const personDetailRef = useRef({});
  const [tableType, setTableType] = useState('annualWork');
  const [accountTableType, setAccountTableType] = useState('checkDirectory');
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
    { label: '工程台账', id: 'engineeringAccount' },
    { label: '线索核处', id: 'clueReview' },
    { label: '信息通报', id: 'Communications' },
  ];
  const AccountTabs = [
    { label: '查堵目录', id: 'checkDirectory' },
    { label: '重点单位', id: 'keyInstitution' },
    { label: '重点人物', id: 'keyPerson' },
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

  const onAccountTabChange = id => {
    setAccountTableType(id);
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
  const relevancyModal = (name: any, category: any) => {
    relevancyRef.current.showModal(name, category);
  };
  const openClueDetailModal = (clueId: any, sourceClueId: any) => {
    clueDetailRef.current.showModal(clueId, sourceClueId);
  };
  const openBanPublishDetailModal = (publicationId: any) => {
    banPublishDetailRef.current.showModal(publicationId);
  };
  const openInstitutionDetailModal = (orgId: any) => {
    institutionDetailRef.current.showModal(orgId);
  };
  const openPersonDetailModal = (personId: any) => {
    personDetailRef.current.showModal(personId);
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
          {tableType === 'engineeringAccount' && (
            <TypeSelectLayout tabs={AccountTabs} onTabChange={onAccountTabChange}>
              {accountTableType === 'checkDirectory' && (
                <BanPublishTable
                  relevancyModal={relevancyModal}
                  openBanPublishDetailModal={openBanPublishDetailModal}
                />
              )}
              {accountTableType === 'keyInstitution' && (
                <KeyInstitutionsTable
                  relevancyModal={relevancyModal}
                  openInstitutionDetailModal={openInstitutionDetailModal}
                />
              )}
              {accountTableType === 'keyPerson' && (
                <KeyPersonTable
                  relevancyModal={relevancyModal}
                  openPersonDetailModal={openPersonDetailModal}
                />
              )}
            </TypeSelectLayout>
          )}
          {tableType === 'clueReview' && (
            <ClueTable relevancyModal={relevancyModal} openClueDetailModal={openClueDetailModal} />
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
      <RelevancyModal actionRef={relevancyRef} />
      <ClueDetailModal actionRef={clueDetailRef} />
      <BanPublishDetailModal actionRef={banPublishDetailRef} />
      <InstitutionDetailModal actionRef={institutionDetailRef} />
      <PersonDetailModal actionRef={personDetailRef} />
    </EngineeringTreeLayout>
  );
};

export default connect(dictionaryMgt => ({
  dictionaryMgt,
}))(DictionaryMgt);

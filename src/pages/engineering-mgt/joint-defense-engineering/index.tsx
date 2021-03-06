import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import ClueDetailModal from '@/pages/thread-mgt/components/host/detail/DetailModal';
import BanPublishDetailModal from '@/pages/key-data/ban-publish-mgt/components/detail/DetailModal';
import InstitutionDetailModal from '@/pages/key-data/key-institutions-mgt/components/DetailModal';
import PersonDetailModal from '@/pages/key-data/key-person-mgt/components/DetailModal';
import EngineeringTreeLayout from './components/tree-component/EngineeringTreeLayout';
import Table from './components/Table';
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
import EngineinvolveTable from './components/engineDmodify/engineTable';
import EngineModal from './components/engineDmodify/ModifyModal';
import DefenseEngineeringModal from './components/defense-engineering/DefenseEngineeringModal';
import AnnualDefenseEngineeringModal from './components/annual-defense-engineering/AnnualDefenseEngineeringModal';

const JointDefenseEngineering = ({ dispatch, defenseEngineering }) => {
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
  const defenseEngineeringRef = useRef({});
  const annualDefenseEngineeringRef = useRef({});
  const infoAnmodifyRef = useRef({});
  const infoAnDetailmodifyRef = useRef({});
  const engineDmodifyRef = useRef({});
  const [tableType, setTableType] = useState('annualWork');
  const [accountTableType, setAccountTableType] = useState('checkDirectory');
  const [engineeringTableType, setEngineeringTableType] = useState('involve');
  const { yearOrtot, projectId } = defenseEngineering;

  const tabYears = [
    { label: '??????????????????', id: 'annualWork' },
    { label: '????????????', id: 'conferenceManagementYears' },
    { label: '????????????', id: 'engineeringDataYears' },
    { label: '????????????', id: 'CommunicationsYears' },
  ];
  const tabs = [
    { label: '??????????????????', id: 'annualWork' },
    { label: '????????????', id: 'engineeringData' },
    { label: '????????????', id: 'engineeringAccount' },
    { label: '????????????', id: 'clueReview' },
    { label: '????????????', id: 'Communications' },
  ];
  const AccountTabs = [
    { label: '????????????', id: 'checkDirectory' },
    { label: '????????????', id: 'keyInstitution' },
    { label: '????????????', id: 'keyPerson' },
  ];
  const EngineerTabs = [
    { label: '??????', id: 'involve' },
    { label: '??????', id: 'number' },
  ];

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['object_secrecy_level', 'special_type', 'special_task_state'],
      },
    });
  }, []);
  useEffect(() => {
    setTableType('annualWork');
    setAccountTableType('checkDirectory');
    setEngineeringTableType('involve');
  }, [projectId]);

  const onTabChange = id => {
    setTableType(id);
  };

  const onAccountTabChange = id => {
    setAccountTableType(id);
  };
  const onEngineTabChange = id => {
    setEngineeringTableType(id);
  };

  const onTabChangeyear = id => {
    setTableType(id);
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
  // ????????????
  const openInfoModifyModal = item => {
    infoAnmodifyRef.current.showModal(item);
  };
  const openDetailModifyModal = item => {
    infoAnDetailmodifyRef.current.showModal(item);
  };
  // ????????????
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
  const defenseEngineeringModal = (personId: any) => {
    defenseEngineeringRef.current.showModal(personId);
  };
  const annualDefenseEngineeringModal = (personId: any) => {
    annualDefenseEngineeringRef.current.showModal(personId);
  };

  return (
    <EngineeringTreeLayout
      defenseEngineeringModal={defenseEngineeringModal}
      annualDefenseEngineeringModal={annualDefenseEngineeringModal}
    >
      {yearOrtot === 'null' ? (
        <TypeSelectLayout tabs={tabs} onTabChange={onTabChange} activeKey={tableType}>
          {tableType === 'annualWork' && (
            <Table
              annualDefenseEngineeringModal={annualDefenseEngineeringModal}
              defenseEngineeringModal={defenseEngineeringModal}
              tempProvinceModal={tempProvinceModal}
              addProjectTaskModal={addProjectTaskModal}
              modifyProjectTaskModal={modifyProjectTaskModal}
              feedbackModal={feedbackModal}
              downModal={downModal}
            />
          )}
          {tableType === 'engineeringData' && (
            <TypeSelectLayout
              tabs={EngineerTabs}
              onTabChange={onEngineTabChange}
              activeKey={engineeringTableType}
            >
              {engineeringTableType === 'involve' && (
                <EngineinvolveTable openModifyModal={openEngineModifyModal} />
              )}
              {engineeringTableType === 'number' && (
                <EngineTable openModifyModal={openEngineModifyModal} />
              )}
            </TypeSelectLayout>
          )}
          {tableType === 'engineeringAccount' && (
            <TypeSelectLayout
              tabs={AccountTabs}
              onTabChange={onAccountTabChange}
              activeKey={accountTableType}
            >
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
        <TypeSelectLayout tabs={tabYears} onTabChange={onTabChangeyear} activeKey={tableType}>
          {tableType === 'annualWork' && (
            <Table
              annualDefenseEngineeringModal={annualDefenseEngineeringModal}
              defenseEngineeringModal={defenseEngineeringModal}
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
            <TypeSelectLayout
              tabs={EngineerTabs}
              onTabChange={onEngineTabChange}
              activeKey={engineeringTableType}
            >
              {engineeringTableType === 'involve' && (
                <EngineinvolveTable openModifyModal={openEngineModifyModal} />
              )}
              {engineeringTableType === 'number' && (
                <EngineTable openModifyModal={openEngineModifyModal} />
              )}
            </TypeSelectLayout>
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
      <DefenseEngineeringModal actionRef={defenseEngineeringRef} />
      <AnnualDefenseEngineeringModal actionRef={annualDefenseEngineeringRef} />

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

export default connect(({ defenseEngineering }) => ({
  defenseEngineering,
}))(JointDefenseEngineering);

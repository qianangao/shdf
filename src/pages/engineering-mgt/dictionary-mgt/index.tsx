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
import AddProjectTaskModal from './components/project-task/add-project-task/AddProjectTaskModal';
import ModifyProjectTaskModal from './components/project-task/edit-project-task/ModifyProjectTaskModal';
import FeedbackDetailModal from './components/feedback/feedback-detail/FeedbackDetailModal';
import FeedbackModal from './components/feedback/feedback-data/FeedbackModal';
import DownModal from './components/down/DownModal';
import FeedbackRequestModal from './components/project-task/FeedbackRequestModal';
import TempProvinceModal from './components/temp-province/tempProvinceModal';
import MeetingTable from './components/conference-management/MeetingTable';
import MeetingModal from './components/conference-management/conference-info/MeetingModal';
import BanPublishTable from './components/keyData/BanPublishTable';
import RelevancyModal from './components/keyData/RelevancyModal';
import KeyPersonTable from './components/keyData/KeyPersonTable';
import KeyInstitutionsTable from './components/keyData/KeyInstitutionsTable';
import ClueTable from './components/keyData/ClueTable';

const DictionaryMgt = ({ dispatch }) => {
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

  const tabs = [
    { label: '年度工作重点', id: 'annualWork' },
    { label: '会议管理', id: 'conferenceManagement' },
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
      <TypeSelectLayout tabs={tabs} onTabChange={onTabChange} type="card">
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
        {tableType === 'conferenceManagement' && <MeetingTable meetingModal={meetingModal} />}
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
      </TypeSelectLayout>
    </EngineeringTreeLayout>
  );
};

export default connect(() => ({}))(DictionaryMgt);

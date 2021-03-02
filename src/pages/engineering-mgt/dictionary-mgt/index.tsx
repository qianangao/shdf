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
import { Tabs } from 'antd';
import AItable from './components/infoAmodify/InfoAnnounceTable';
import InfoAnModal from './components/infoAmodify/ModifyModal';
import InfoAnDetailModal from './components/infoAmodify/DetailModifyModal';
import EngineTable from './components/engineDmodify/engineDmodifyTable';
import EngineModal from './components/engineDmodify/ModifyModal';

const { TabPane } = Tabs;

const DictionaryMgt = ({ dispatch }) => {
  const addEngineeringRef = useRef({});
  const tempProvinceRef = useRef({});
  const addProjectTaskRef = useRef({});
  const editProjectTaskRef = useRef({});
  const feedbackRef = useRef({});
  const feedbackDetailRef = useRef({});
  const downRef = useRef({});
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
  //信息通报
  const openInfoModifyModal = item => {
    infoAnmodifyRef.current.showModal(item);
  };
  const openDetailModifyModal = item => {
    infoAnDetailmodifyRef.current.showModal(item);
  };
  //工程数据
  const openEngineModifyModal = item => {
    engineDmodifyRef.current.showModal(item);
  };
  return (
    <EngineeringTreeLayout openAddEngineeringModal={openAddEngineeringModal}>
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="年度工作重点" key="1">
          <Table
            openAddEngineeringModal={openAddEngineeringModal}
            tempProvinceModel={tempProvinceModel}
            addProjectTaskModal={addProjectTaskModal}
            modifyProjectTaskModal={modifyProjectTaskModal}
            feedbackModal={feedbackModal}
            downModal={downModal}
          />
        </TabPane>
        <TabPane tab="会议管理" key="2"></TabPane>
        <TabPane tab="工程数据" key="3">
          {/* <EDtable openModifyModal={openModifyModal} /> */}
          <EngineTable openModifyModal={openEngineModifyModal} />
        </TabPane>
        <TabPane tab="信息通报" key="5">
          <AItable
            openModifyModal={openInfoModifyModal}
            openDetailModifyModal={openDetailModifyModal}
          />
        </TabPane>
      </Tabs>
      <EngineModal actionRef={engineDmodifyRef} />
      <InfoAnModal actionRef={infoAnmodifyRef} />
      <InfoAnDetailModal actionRef={infoAnDetailmodifyRef} />

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

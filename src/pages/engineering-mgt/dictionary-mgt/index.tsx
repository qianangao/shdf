import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import EngineeringTreeLayout from './components/TreeComponent/EngineeringTreeLayout';
import Table from './components/Table';
import AddEngineeringModal from './components/addEngineering/AddEngineeringModal';
import TempProvinceModal from './components/tempProvince/tempProvinceModal';

const DictionaryMgt = ({ dispatch }) => {
  const addEngineeringRef = useRef({});
  const tempProvinceRef = useRef({});

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

  return (
    <EngineeringTreeLayout openAddEngineeringModal={openAddEngineeringModal}>
      <Table
        openAddEngineeringModal={openAddEngineeringModal}
        tempProvinceModel={tempProvinceModel}
      />
      <AddEngineeringModal actionRef={addEngineeringRef} />
      <TempProvinceModal actionRef={tempProvinceRef} />
    </EngineeringTreeLayout>
  );
};

export default connect(() => ({}))(DictionaryMgt);

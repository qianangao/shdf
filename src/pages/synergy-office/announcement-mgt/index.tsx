import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import ReadSituationModal from './components/ReadSituationModal';

const AnnouncementMgt = ({ dispatch }) => {
  const modifyRef = useRef({});
  const readModifyRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  const openModifyModal = (item: any) => {
    modifyRef.current.showModal(item);
  };
  const openReadModal = (item: any) => {
    readModifyRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table openModifyModal={openModifyModal} openReadModal={openReadModal} />
      <ModifyModal actionRef={modifyRef} />
      <ReadSituationModal actionRef={readModifyRef} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(AnnouncementMgt);

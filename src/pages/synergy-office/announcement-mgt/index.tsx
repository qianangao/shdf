import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const AnnouncementMgt = ({ dispatch }) => {
  const modifyRef = useRef({});

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
  return (
    <PageHeaderWrapper>
      <Table openModifyModal={openModifyModal} />
      <ModifyModal actionRef={modifyRef} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(AnnouncementMgt);

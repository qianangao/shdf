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
  // const tabs = [
  //   {
  //     id: 'drafts',
  //     label: '草稿箱',
  //   },
  //   {
  //     id: 'publish',
  //     label: '已发布',
  //   },
  //   {
  //     id: 'received',
  //     label: '已接收',
  //   },
  // ];

  const openModifyModal = item => {
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

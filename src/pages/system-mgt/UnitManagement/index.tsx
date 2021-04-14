import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';

const AddressBook = ({ dispatch }) => {
  const [orgPid, setOrgPid] = useState(undefined);
  const modifyRef = useRef({});
  const detailRef = useRef({});
  // 字符串转义
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dict_sex'],
      },
    });
  }, []);

  // const orgChangeHander = id => {

  // };
  const orgChangeHander = orgId => {
    setOrgPid(orgId);
    dispatch({
      type: 'guanli/getListTable',
      payload: { orgId },
    });
  };

  const openModifyModal = item => {
    modifyRef.current.showModal(item, orgPid);
  };
  const openDetailModal = (orgId: any) => {
    detailRef.current.showModal(orgId);
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Table openModifyModal={openModifyModal} openDetailModal={openDetailModal} />
      <ModifyModal actionRef={modifyRef} />
      <DetailModal actionRef={detailRef} />
    </OrgTreeLayout>
  );
};

export default connect(() => ({}))(AddressBook);

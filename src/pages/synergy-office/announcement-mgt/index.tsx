import React, { useEffect } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';

const AnnouncementMgt = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);
  const tabs = [
    {
      id: 'drafts',
      label: '草稿箱',
    },
    {
      id: 'pubilsh',
      label: '已发布',
    },
    {
      id: 'received',
      label: '已接收',
    },
  ];
  const onTabChange = id => {
    console.warn(id);
  };
  return (
    <PageHeaderWrapper>
      <TypeSelectLayout tabs={tabs} onTabChange={onTabChange}>
        公告管理
      </TypeSelectLayout>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(AnnouncementMgt);

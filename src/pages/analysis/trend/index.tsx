import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Row } from 'antd';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import Clue from './components/Clue';
import Unlawful from './components/Unlawful';
import Case from './components/Case';

const Trend = ({ dispatch }) => {
  useEffect(() => {}, []);
  const [tableType, setTableType] = useState('case');
  const tabs = [
    { label: '案件统计', id: 'case' },
    { label: '线索统计', id: 'clue' },
    { label: '非法出版物统计', id: 'unlawful' },
    { label: '敏感事件', id: 'sensitive' },
  ];
  const onTabChange = id => {
    setTableType(id);
    let analysisType;
    switch (id) {
      case 'case':
        analysisType = '1';
        break;
      case 'clue':
        analysisType = '2';
        break;
      case 'unlawful':
        analysisType = '3';
        break;
      case 'sensitive':
        analysisType = '4';
        break;
      default:
        analysisType = '1';
    }
    dispatch({
      type: 'statistical/getTabsName',
      payload: {
        analysisType,
      },
    });
  };
  useEffect(() => {
    setTableType('case');
  }, []);
  return (
    <Row gutter={[16, 16]}>
      <TypeSelectLayout tabs={tabs} onTabChange={onTabChange} activeKey={tableType}>
        {tableType === 'case' && <Case />}
        {tableType === 'unlawful' && <Unlawful />}
        {tableType === 'clue' && <Clue />}
        {tableType === 'sensitive' && <Case />}
      </TypeSelectLayout>
    </Row>
  );
};
export default connect(() => ({}))(Trend);

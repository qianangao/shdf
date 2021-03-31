import React, { useState } from 'react';
import { connect } from 'umi';
import { Transfer } from 'antd';

const TableCopy = ({ getAddroleData }) => {
  // console.log(getAddroleData);

  const mockData = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: getAddroleData.length,
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
    });
  }
  const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);

  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const onChange = nextTargetKeys => {
    // console.log('targetKeys:', nextTargetKeys);
    /// console.log('direction:', direction);
    // console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    // console.log('sourceSelectedKeys:', sourceSelectedKeys);
    // console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = () => {
    // console.log('direction:', direction);
    // console.log('target:', e.target);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['查询用户可添加角色列表', '查询用户角色列表']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={item => item.title}
    />
  );
};

export default connect(({ loading, userMgt, global }) => ({
  loading: loading.models.userMgt,
  userMgt,
  usetListData: userMgt.usetListData,
  getAddroleData: userMgt.getAddroleData,
  enums: global.enums,
}))(TableCopy);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Transfer } from 'antd';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

// const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  //   const onScroll = (direction, e) => {
  //     console.log('direction:', direction);
  //     console.log('target:', e.target);
  //   };

  const showModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    return new Promise(resolve => {
      dispatch({
        type: `specialAction/editSpecialAction`,
        payload: {
          selectedKeys,
        },
        resolve,
      });
    })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="编辑专项行动"
      centered
      width="40vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Transfer
        dataSource={mockData}
        titles={['选择省份']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        //   onScroll={onScroll}
        render={item => item.title}
        oneWay
      />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);

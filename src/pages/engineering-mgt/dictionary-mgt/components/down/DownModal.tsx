import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Transfer } from 'antd';

const DownModal = ({ dispatch, actionRef, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [provinceData, setProvinceData] = useState([]);
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
  useEffect(() => {
    new Promise(resolve => {
      dispatch({
        type: 'dictionaryMgt/provinceData',
        resolve,
      });
    }).then(res => {
      const arr = [];
      for (let i = 0; i < res.length; i++) {
        arr.push({ key: res[i].orgId, title: res[i].orgName });
      }
      setProvinceData([...arr]);
    });
  }, []);

  const showModal = Id => {
    setTargetKeys([]);
    if (Id) setId(Id);
    // dispatch({
    //   type: 'dictionaryMgt/findChildrenTaskDetail',
    //   payload: { taskId: Id },
    // });
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
    const keys = targetKeys.join(',');
    return new Promise(resolve => {
      dispatch({
        type: `dictionaryMgt/deployProjectTaskList`,
        payload: {
          targetProvince: keys,
          taskId: id,
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
      title="部署任务"
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
        dataSource={provinceData}
        titles={['选择省份']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        //   onScroll={onScroll}
        render={item => item.title}
        oneWay
      />
      {/* <ProvinceCascaderInput/> */}
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(DownModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Transfer } from 'antd';

const TableModifyModal = ({ dispatch, actionRef, loading }) => {
  const [userId, setuserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [roleDatas, setRoleDatas] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  // const [getMoveKeys, setGetMoveKeys] = useState();
  // const [getDirection, setGetDirection] = useState();

  const getRole = userIds => {
    if (userIds) {
      new Promise(resolve => {
        dispatch({
          type: 'userMgt/getAddRoleList',
          payload: { userIds },
          resolve,
        });
      }).then(data => {
        // setRoleDatas(data.map(item => ({ ...item, key: item.roleId })));
        //  console.log('data===',data);

        // const roleDatasId = data.map(item => ({ ...item, key: item.roleId }));
        // setRoleDatas(roleDatasId);

        // console.log(roleDatas);

        return new Promise(resolve => {
          dispatch({
            type: 'userMgt/getRoleList',
            payload: { userIds },
            resolve,
          });
        }).then(res => {
          let roleDatasArr = [];
          roleDatasArr = data.concat(res);

          const roleDatasArrId = roleDatasArr.map(item => ({ ...item, key: item.roleId }));

          setRoleDatas(roleDatasArrId);

          // for (let n = 0; n < roleDatasArr.length - 1; n++) {
          //   if (roleDatasArr[n].key == getMoveKeys && getDirection == 'right') {
          //     res.push(roleDatasArr[n]);
          //     console.log('right', res);
          //   } else if (roleDatasArr[n].key == getMoveKeys && getDirection == 'left') {
          //     res.splice(
          //       res.findIndex(e => e.roleDatasArr[n].key == getMoveKeys),
          //       1,
          //     );
          //     console.log('left', res);
          //   }
          // }
          // console.log('添加后res=====', res);
          const targetIds = res.map(item => ({ ...item, key: item.roleId }));

          const selectItem = [];
          for (const item of roleDatasArrId) {
            for (const index of targetIds) {
              if (item.key === index.key) {
                selectItem.push(item.key);
              }
            }
          }
          // targetIds.map(item => {
          //   roleDatasId.map(value => {
          //     console.log(value.key);
          //     console.log(item);
          //     if (value.key === item) {
          //       // selectItem.push(item.key);
          //       console.log(value.key);
          //     }
          //   });
          // });

          setTargetKeys(selectItem);
          setSelectedKeys(selectItem);
        });
      });
    }
  };
  const showModal = userIds => {
    setuserId(userIds || null);
    getRole(userIds);
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
    setuserId(null);
    setModalVisible(false);
  };

  // xx
  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
    // setGetMoveKeys(moveKeys);
    // setGetDirection(direction);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const handleOk = () => {
    new Promise(resolve => {
      dispatch({
        type: `userMgt/useraddRole`,
        payload: {
          userId,
          roleIds: targetKeys,
        },
        resolve,
      });
    })
      .then(_ => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="用户角色列表"
      centered
      width="50vw"
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
        dataSource={roleDatas}
        listStyle={{
          width: '45%',
          height: 400,
        }}
        titles={['角色列表', '已选角色']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={item => item.name}
      />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(TableModifyModal);

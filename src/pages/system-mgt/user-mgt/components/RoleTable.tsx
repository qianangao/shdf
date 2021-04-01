// import React, { useEffect, useState } from 'react';
// import { connect } from 'umi';
// import { Transfer } from 'antd';

// const TableCopy = ({ getAddroleData, getRoleData }) => {
//   const getRole = userId => {
//     if (userIds) {
//       new Promise(resolve => {
//         dispatch({
//           type: 'userMgt/getRoleList',
//           payload: { userId },
//           resolve,
//         });
//         console.log(resolve);

//       });
//     }
//   };

//   useEffect(() => {

//   }, [])

//   const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);

//   const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
//   const [selectedKeys, setSelectedKeys] = useState([]);

//   const onChange = nextTargetKeys => {
//     console.log('targetKeys:', nextTargetKeys);s
//     setTargetKeys(nextTargetKeys);
//   };

//   const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {

//     setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
//   };

//   return (
//     <Transfer
//       dataSource={mockData}
//       titles={['查询用户可添加角色列表', '查询用户角色列表']}
//       targetKeys={targetKeys}
//       selectedKeys={selectedKeys}
//       onChange={onChange}
//       onSelectChange={onSelectChange}
//       render={item => item.title}
//     />
//   );
// };

// export default connect(({ loading, userMgt }) => ({
//   loading: loading.models.userMgt,
//   userMgt,
//   usetListData: userMgt.usetListData,
// }))(TableCopy);

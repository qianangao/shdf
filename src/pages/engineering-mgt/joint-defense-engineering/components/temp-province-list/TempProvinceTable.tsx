import React from 'react';
import { Table } from 'antd';
import { connect } from 'umi';

const TempProvinceTable = ({ projectTemporaryProvinceEntityList, style = {} }) => {
  const columns = [
    {
      title: '序号',
      render: (text, render, index) => `${index + 1}`,
      width: 64,
      align: 'center',
      dataIndex: 'id',
      key: 'id',
    },
    { title: '成员省份名称', align: 'center', dataIndex: 'provinceCode' },
    { title: '联络员', align: 'center', dataIndex: 'contacts' },
    { title: '联系电话', align: 'center', dataIndex: 'contactPhone' },
    { title: '年份', align: 'center', dataIndex: 'year' },
  ];

  return (
    <div>
      <Table
        dataSource={projectTemporaryProvinceEntityList}
        columns={columns}
        rowKey="provinceId"
        style={style}
      />
    </div>
  );
};

export default connect(({ defenseEngineering }) => ({
  projectTemporaryProvinceEntityList: defenseEngineering.projectTemporaryProvinceEntityList,
}))(TempProvinceTable);

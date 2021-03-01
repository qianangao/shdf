import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, Modal } from 'antd';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { checkPhone } from '@/utils/validators';

const TempProvinceTable = ({
  projectTemporaryProvinceEntityList,
  disabled,
  onChange,
  add = false,
  style = {},
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (add) {
      setDataSource([]);
    } else {
      setDataSource([]);
      setDataSource([...projectTemporaryProvinceEntityList]);
    }
  }, [projectTemporaryProvinceEntityList]);

  const [form] = AdvancedForm.useForm();
  const [id, setId] = useState(1);

  const confirmDelete = ids => {
    const data = dataSource;
    data.forEach(item => {
      if (item.id === ids) {
        data.splice(ids - 1, 1);
        setDataSource([...data]);
      }
    });
  };

  const addFeedback = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      setId(id + 1);
      values.id = id;
      const arr = [];
      arr.push(values);
      setDataSource([...dataSource, ...arr]);
      onChange && onChange([...dataSource, ...arr]);
    });
    handleCancel();
  };

  const formItems = [
    {
      label: '临时省份',
      name: 'provinceCode',
      span: 2,
      rules: [
        { required: true, message: '请输入名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '年份',
      name: 'year',
      span: 2,
      rules: [{ required: true, message: '请输入年份!', whitespace: true }],
    },
    {
      label: '联络员',
      name: 'contacts',
      span: 2,
      rules: [{ required: true, message: '请输入联络员' }],
    },
    {
      label: '联系电话',
      name: 'contactPhone',
      span: 2,
      rules: [
        { required: true, message: '请输入手机号码!' },
        {
          validator: checkPhone,
        },
      ],
    },
  ];

  const columns = [
    {
      title: '序号',
      render: (text, render, index) => `${index + 1}`,
      width: 64,
      align: 'center',
      dataIndex: 'id',
      key: 'id',
    },
    // { title: '序号', align: 'center', dataIndex: 'id', hideInSearch: true },
    { title: '成员省份名称', align: 'center', dataIndex: 'provinceCode' },
    { title: '联络员', align: 'center', dataIndex: 'contacts' },
    { title: '联系电话', align: 'center', dataIndex: 'contactPhone' },
    { title: '年份', align: 'center', dataIndex: 'year' },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (dom, data, index) => [
        <Popconfirm
          title="你确定要删除该临时成员省份吗？"
          onConfirm={() => confirmDelete(index + 1)}
          okText="是"
          cancelText="否"
        >
          <Button type="link" size="small">
            {add && '删除'}
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      {/* {visible && ( */}
      <Button
        type="primary"
        onClick={() => addFeedback()}
        style={{ marginBottom: 8 }}
        disabled={disabled}
      >
        {add && '新增'}
      </Button>
      {/* )} */}
      <Table dataSource={dataSource} columns={columns} rowKey="provinceId" style={style} />
      <Modal
        title="临时成员省份"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width="580px"
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          padding: '30px 60px',
        }}
        zIndex={3000}
      >
        <AdvancedForm fields={formItems} form={form} />
      </Modal>
    </div>
  );
};

export default connect(({ dictionaryMgt }) => ({
  projectTemporaryProvinceEntityList: dictionaryMgt.projectTemporaryProvinceEntityList,
}))(TempProvinceTable);

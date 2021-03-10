import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, Modal } from 'antd';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { checkPhone } from '@/utils/validators';

const ProvinceListTable = ({
  projectProvinceEntityList,
  disabled,
  onChange,
  add = false,
  edit = false,
  style = {},
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(add || edit);
    if (add) {
      setDataSource([]);
    } else {
      setDataSource([]);
      setDataSource([...projectProvinceEntityList]);
    }
  }, [projectProvinceEntityList]);

  const [form] = AdvancedForm.useForm();
  const [id, setId] = useState(1);

  const confirmDelete = ele => {
    const data = dataSource;
    data.forEach(item => {
      if (item.id === ele.id || item.provinceId === ele.provinceId) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].feedbackId === ele.feedbackId) {
            data.splice(i, 1);
          }
        }
        setDataSource([...data]);
        onChange && onChange([...data]);
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
      label: '成员省份名称',
      name: 'provinceCode',
      span: 2,
      rules: [
        { required: true, message: '请输入名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
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
    { title: '成员省份', align: 'center', dataIndex: 'provinceCode' },
    { title: '联络员', align: 'center', dataIndex: 'contacts' },
    { title: '联系电话', align: 'center', dataIndex: 'contactPhone' },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (dom, data, index) => [
        <Popconfirm
          title="你确定要删除该成员省份吗？"
          onConfirm={() => confirmDelete({ id: index + 1, provinceId: data.provinceId })}
          okText="是"
          cancelText="否"
        >
          <Button type="link" size="small">
            {flag && '删除'}
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => addFeedback()}
        style={{ marginBottom: 8 }}
        disabled={disabled}
      >
        {flag && '新增'}
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="provinceId" style={style} />
      <Modal
        title="成员省份"
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
  projectProvinceEntityList: dictionaryMgt.projectProvinceEntityList,
}))(ProvinceListTable);
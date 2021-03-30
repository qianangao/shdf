import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, Modal } from 'antd';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { checkPhone } from '@/utils/validators';

const ProvinceListTable = ({
  projectProvinceEntityList,
  disabled,
  onChange,
  add,
  edit,
  style = {},
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // 判断，add或edit有一个为true，页面都处于可编辑状态，可以新增，删除
    setFlag(add || edit);
    if (add) {
      // 当add为true，新增数据，表格中的数据为空
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
      label: '临时省份',
      name: 'provinceCode',
      span: 2,
    },
    {
      label: '年份',
      name: 'year',
      span: 2,
    },
    {
      label: '联络人',
      name: 'contacts',
      span: 2,
    },
    {
      label: '联络电话',
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
        title="临时省份"
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

export default connect(({ defenseEngineering }) => ({
  projectProvinceEntityList: defenseEngineering.projectProvinceEntityList,
}))(ProvinceListTable);

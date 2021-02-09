import React, { useState } from 'react';
import { Button, Table, Popconfirm, Modal, Radio } from 'antd';
// import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const SummaryFeedbackTable = ({ visible, feedListData, disabled }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([] || feedListData);
  // const [arr, setArr] = useState([]);
  const [form] = AdvancedForm.useForm();
  const [id, setId] = useState(1);
  //   const { tableRef } = specialAction;

  const confirmDelete = ids => {
    const data = dataSource;
    data.forEach(item => {
      if (item.id === ids) {
        data.splice(ids - 1, 1);
        setDataSource(data);
      }
    });
  };

  const addFeedback = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      setId(id + 1);
      values.id = id;
      const arr = [];
      arr.push(values);
      setDataSource([...dataSource, ...arr]);
    });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const formItems = [
    {
      label: '名称',
      name: 'feedbackName',
      span: 2,
      rules: [
        { required: true, message: '请输入名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '反馈类型',
      name: 'feedbackType',
      span: 2,
      rules: [{ required: true, message: '请选择!' }],
      render: (
        <Radio.Group>
          <Radio value="0">总反馈</Radio>
          <Radio value="1">阶段反馈</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 2,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 2,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },
    {
      label: '反馈要求',
      name: 'feedbackRequire',
      span: 4,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
  ];
  // const dataSource = [
  //   {
  //     key: '1',
  //     feedbackName: '反馈阶段1',
  //     startDate: '2020-12-03',
  //     endDate: '2020-12-14',
  //     feedbackRequire: '反馈要求11111111',
  //   },
  //   {
  //     key: '2',
  //     feedbackName: '反馈阶段2',
  //     startDate: '2020-12-03',
  //     endDate: '2020-12-14',
  //     feedbackRequire: '反馈要求2222222222',
  //   },
  // ];

  const columns = [
    // {
    //   title:'序号',
    //   render:(text,render, index) => `${index+1}`,
    //   width:64,
    //   align: "center",
    //   dataIndex: 'id',
    //   key:'id'
    // },
    { title: '序号', align: 'center', dataIndex: 'id', hideInSearch: true },
    { title: '名称', align: 'center', dataIndex: 'feedbackName', hideInSearch: true },
    { title: '开始日期', align: 'center', dataIndex: 'startDate', hideInSearch: true },
    { title: '截止日期', align: 'center', dataIndex: 'endDate', hideInSearch: true },
    { title: '反馈要求', align: 'center', dataIndex: 'feedbackRequire', hideInSearch: true },
    // {visible &&
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (dom, data, index) => (
        <Popconfirm
          title="你确定要删除该反馈要求吗？"
          onConfirm={() => confirmDelete(index + 1)}
          okText="是"
          cancelText="否"
        >
          <Button type="link" size="small" disabled={disabled}>
            删除
          </Button>
        </Popconfirm>
      ),
    },
    // },
  ];

  return (
    <div>
      {visible && (
        <Button
          type="primary"
          onClick={() => addFeedback()}
          style={{ marginBottom: 8 }}
          disabled={disabled}
        >
          新增
        </Button>
      )}
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
      <Modal
        title="阶段反馈要求"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width="40vw"
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          padding: '30px 60px',
        }}
      >
        <AdvancedForm fields={formItems} form={form} />
      </Modal>
    </div>
  );
};

export default connect(({ specialAction }) => ({ feedListData: specialAction.feedListData }))(
  SummaryFeedbackTable,
);

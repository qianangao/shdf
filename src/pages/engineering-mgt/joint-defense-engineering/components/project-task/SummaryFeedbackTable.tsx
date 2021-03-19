import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, Modal, Radio } from 'antd';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const SummaryFeedbackTable = ({
  dispatch,
  feedListData,
  disabled = false,
  onChange,
  select = false,
  add = false,
  edit = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (edit) {
      setDataSource([]);
    } else {
      setDataSource([...feedListData]);
    }
  }, [feedListData]);

  const [form] = AdvancedForm.useForm();
  const [id, setId] = useState(1);

  const confirmDelete = ele => {
    const data = dataSource;
    data.forEach(item => {
      if (item.id === ele.id || item.feedbackId === ele.feedbackId) {
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

  const handleSelect = ids => {
    const data = dataSource;
    data.forEach(item => {
      if (item.feedbackId === ids) {
        const arr = [];
        arr.push(item);
        onChange && onChange(arr);
        dispatch({
          type: `defenseEngineering/selectFeedbackData`,
          payload: arr,
        });
      }
    });
  };
  const addFeedback = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDataSource([]);
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
      label: '名称',
      name: 'feedbackName',
      span: 4,
      rules: [
        { required: true, message: '请输入名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '反馈类型',
      name: 'feedbackType',
      span: 4,
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
      span: 4,
      rules: [{ required: true, message: '请选择开始日期' }],
      type: 'date',
    },
    {
      label: '截止日期',
      name: 'endDate',
      span: 4,
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

  const columns = [
    {
      title: '序号',
      render: (text, render, index) => `${index + 1}`,
      width: 64,
      align: 'center',
      dataIndex: 'id',
      key: 'id',
    },
    { title: '名称', align: 'center', dataIndex: 'feedbackName' },
    {
      title: '反馈类型',
      align: 'center',
      dataIndex: 'feedbackType',
      render: text => <span>{text === 0 ? '总反馈' : '阶段反馈'}</span>,
    },
    { title: '开始日期', align: 'center', dataIndex: 'startDate' },
    { title: '截止日期', align: 'center', dataIndex: 'endDate' },
    { title: '反馈要求', align: 'center', dataIndex: 'feedbackRequire' },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (dom, data, index) => [
        <Popconfirm
          title="你确定要删除该反馈要求吗？"
          onConfirm={() => confirmDelete({ id: index + 1, feedbackId: data.feedbackId })}
          okText="是"
          cancelText="否"
        >
          <Button type="link" size="small" disabled={disabled}>
            {add && '删除'}
          </Button>
        </Popconfirm>,
        <Button type="link" size="small" onClick={() => handleSelect(data.feedbackId)}>
          {select && '选择'}
        </Button>,
      ],
    },
  ];

  return (
    <div>
      {add && (
        <Button
          type="primary"
          onClick={() => addFeedback()}
          style={{ marginBottom: 8 }}
          disabled={disabled}
        >
          新增
        </Button>
      )}
      <Table dataSource={dataSource} columns={columns} rowKey="taskId" />
      <Modal
        title="阶段反馈要求"
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
  feedListData: defenseEngineering.feedListData,
}))(SummaryFeedbackTable);

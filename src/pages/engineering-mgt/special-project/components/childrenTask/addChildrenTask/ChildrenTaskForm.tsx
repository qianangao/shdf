import React, { useRef, useState, forwardRef } from 'react';
// import { Select, Button } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
// import FeedbackTable from './FeedbackTable';
import SummaryFeedbackTable from '../feedback/SummaryFeedbackTable';

const ChildrenTaskForm = props => {
  const { form, visible } = props;
  const feedRef = useRef();
  // const [data,setData] = useState([])
  const [tableData, setTableData] = useState([]);
  // useEffect(()=>{
  //   const a = feedRef.current && feedRef.current.handle_query()
  //   setData(a)
  // })

  // 通过forwardRef转发ref到DOM
  // 使用useImperativeHandle自定义ref暴露
  // useImperativeHandle(ref,()=>({
  //   handleQuery
  // }))

  // // 需要暴露的函数
  // const handleQuery=()=>{
  //   return data
  // }
  const onChange = data => {
    setTableData([...data]);
  };
  const formItems = [
    // { label: 'id', name: 'bookId', hidden: true },
    {
      label: '子任务名称',
      name: 'taskName',
      span: 8,
      rules: [
        { required: true, message: '请输入子任务名称!', whitespace: true },
        { max: 30, message: '长度请小于30位!' },
      ],
    },
    {
      label: '保密等级',
      name: 'secrecyLevel',
      span: 8,
      rules: [{ required: true, message: '请选择保密等级' }],
      enumsLabel: 'subject_secrecy_level',
    },
    {
      label: '开始日期',
      name: 'startDate',
      span: 8,
      rules: [{ required: true, message: '请选择开始日期!' }],
      type: 'date',
    },
    { name: 'segmentation', type: 'segmentation' },
    {
      label: '截止日期',
      name: 'endDate',
      span: 8,
      rules: [{ required: true, message: '请选择截止日期!' }],
      type: 'date',
    },
    { name: 'segmentation', type: 'segmentation' },
    {
      label: '任务描述',
      name: 'taskDescription',
      span: 24,
      rules: [
        { required: true, message: '请输入!' },
        { max: 300, min: 0, message: '输入文字过长，内容不能超过300字' },
      ],
      type: 'textarea',
    },
    // {
    //   label: '阶段反馈要求',
    //   name: 'specialTaskFeedbackList',
    //   span: 4,
    //   render: <SummaryFeedbackTable visible={visible} />,
    // },
    {
      label: '反馈要求',
      name: 'specialTaskFeedbackList',
      span: 24,
      // rules: [{ required: true, message: '请输入!' }],
      render: (
        <SummaryFeedbackTable
          visible={visible}
          ref={feedRef}
          onChange={onChange}
          value={tableData}
          add
        />
      ),
      // render: <SummaryFeedbackTable visible={visible} ref={feedRef} value={form.feedbackRequire} onChange={tableChange}/>,
    },
    {
      label: '附件列表',
      name: 'fileIds',
      span: 24,
      type: 'upload',
    },
  ];

  return <AdvancedForm form={form} fields={formItems} />;
};

const ChildrenForm = forwardRef(ChildrenTaskForm);
ChildrenForm.useForm = AdvancedForm.useForm;
export default ChildrenForm;

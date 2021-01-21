import React from 'react';
import { connect } from 'umi';
import {
  Form,
  Input,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Col,
  Row,
  Spin,
  InputNumber,
} from 'antd';
import { formatDate } from '@/utils/format';
import UploadInput from '@/components/UploadInput';
import EditorInput from '../EditorInput';

const AdvancedFormItem = ({
  enums,
  type,
  span = 1, // span传 4 占据整行
  visible = true,
  render,
  enumsLabel,
  enumsItems,
  switchEnums,
  hidden,
  disabled,
  extraProps,
  ...resField
}) => {
  let fieldInput = <Input disabled={disabled} />;

  if (!visible) {
    return null;
  }

  if (type === 'segmentation') {
    return <Col span={24} />;
  }

  if (hidden) {
    return (
      <Form.Item hidden {...resField}>
        {fieldInput}
      </Form.Item>
    );
  }

  if (render) {
    fieldInput = render;
  } else if (enumsItems) {
    fieldInput = (
      <Select disabled={disabled}>
        {enumsItems &&
          Object.keys(enumsItems).map(key => (
            <Select.Option key={key} value={key}>
              {enumsItems[key]}
            </Select.Option>
          ))}
      </Select>
    );
  } else if (enumsLabel) {
    fieldInput = (
      <Select disabled={disabled}>
        {enums[enumsLabel] &&
          Object.keys(enums[enumsLabel]).map(key => (
            <Select.Option key={key} value={key}>
              {enums[enumsLabel][key]}
            </Select.Option>
          ))}
      </Select>
    );
  } else if (type === 'date') {
    resField.valuePropName = 'value';
    resField.getValueFromEvent = value => (value ? value.format('YYYY-MM-DD') : '');
    resField.getValueProps = str => ({ value: formatDate(str, 'YYYY-MM-DD') });

    fieldInput = (
      <DatePicker
        disabled={disabled}
        style={{ width: '100%' }}
        format="YYYY-MM-DD"
        {...extraProps}
      />
    );
  } else if (type === 'dateTime') {
    resField.valuePropName = 'value';
    resField.getValueFromEvent = value => (value ? value.format('YYYY-MM-DD HH:mm:ss') : '');
    resField.getValueProps = str => ({ value: formatDate(str, 'YYYY-MM-DD HH:mm:ss') });

    fieldInput = (
      <DatePicker
        disabled={disabled}
        showTime
        style={{ width: '100%' }}
        format="YYYY-MM-DD HH:mm:ss"
        {...extraProps}
      />
    );
  } else if (type === 'time') {
    resField.valuePropName = 'value';
    resField.getValueFromEvent = value => (value ? value.format('HH:mm:ss') : '');
    resField.getValueProps = str => ({ value: formatDate(str, 'HH:mm:ss') });

    fieldInput = <TimePicker disabled={disabled} style={{ width: '100%' }} format="HH:mm:ss" />;
  } else if (type === 'switch') {
    resField.valuePropName = 'checked';

    if (switchEnums) {
      resField.getValueFromEvent = checked => (checked ? switchEnums[1] : switchEnums[0]);
      resField.getValueProps = value => ({ checked: value === switchEnums[1] });
    } else {
      resField.getValueFromEvent = checked => (checked ? 1 : 0);
      resField.getValueProps = value => ({ checked: value === 1 });
    }

    fieldInput = <Switch disabled={disabled} checkedChildren="是" unCheckedChildren="否" />;
  } else if (type === 'upload') {
    fieldInput = <UploadInput disabled={disabled} />;
  } else if (type === 'image') {
    fieldInput = <UploadInput type="image" disabled={disabled} />;
  } else if (type === 'number') {
    fieldInput = <InputNumber disabled={disabled} {...extraProps} />;
  } else if (type === 'textarea') {
    fieldInput = <Input.TextArea disabled={disabled} autoSize={{ minRows: 3, maxRows: 5 }} />;
  } else if (type === 'editor') {
    fieldInput = <EditorInput disabled={disabled} />;
  } else {
    fieldInput = <Input disabled={disabled} />;
  }

  return (
    <Col
      span={Math.min(24, 12 * span)}
      lg={Math.min(24, 12 * span)}
      xl={Math.min(24, 8 * span)}
      xxl={Math.min(24, 6 * span)}
    >
      <Form.Item {...resField}>{fieldInput}</Form.Item>
    </Col>
  );
};

const AdvancedFormInstance = ({
  form,
  fields = [],
  headerRender,
  footerRender,
  initialValues,
  fieldChange,
  enums,
  loading = false,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  dispatch, // 为了将dispatch从props中移除
  ...props
}) => {
  const onValuesChange = (changedValues, allValues) => {
    fieldChange &&
      fieldChange(Object.keys(changedValues)[0], Object.values(changedValues)[0], allValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      {...props}
    >
      <Spin spinning={loading}>
        {headerRender || null}
        <Row gutter={24}>
          {fields.map(
            field =>
              (
                <AdvancedFormItem
                  key={field.key || field.name}
                  form={form}
                  enums={enums}
                  {...field}
                />
              ) || null,
          )}
        </Row>
        {footerRender || null}
      </Spin>
    </Form>
  );
};

AdvancedFormInstance.useForm = Form.useForm;

const AdvancedForm = connect(({ global }) => ({
  enums: global.enums,
}))(AdvancedFormInstance);

export default AdvancedForm;

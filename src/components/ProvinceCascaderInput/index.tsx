import { connect } from 'umi';
import { Cascader } from 'antd';
import React, { useEffect, useState } from 'react';

const ProvinceCascaderInput = ({ provinceData, value, onChange, disabled, dispatch }) => {
  const [selectData, setSelectData] = useState({});
  useEffect(() => {
    dispatch({
      type: 'globalProvince/getData',
      payload: {
        id: '1000', // 初始id
      },
    });
  }, []);

  useEffect(() => {
    if (value) {
      setSelectData({
        value: value.value,
        label: value.label,
      });
    }
  }, [value]);

  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    dispatch({
      type: 'globalProvince/getData',
      payload: {
        id: targetOption.value,
      },
    });
  };

  const onChangeHandler = (values, selectedOptions) => {
    const labels = selectedOptions.map(option => option.label);
    const data = {
      label: labels.join('/'),
      value: values.join('/'),
    };

    setSelectData(data);

    onChange && onChange(data.value ? data : null);
  };

  const displayRender = () => {
    return selectData.label || '';
  };

  return (
    <Cascader
      value={selectData.value && selectData.value.split('/')}
      options={provinceData}
      loadData={loadData}
      disabled={disabled}
      onChange={onChangeHandler}
      displayRender={displayRender}
    />
  );
};

export default connect(({ globalProvince }) => ({
  provinceData: globalProvince.provinceData,
}))(ProvinceCascaderInput);

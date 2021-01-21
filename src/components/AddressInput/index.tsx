import React, { useEffect, useRef, useState } from 'react';

const AddressInput = ({ value, onChange }) => {
  const bmapRef = useRef({});
  const [isInit, setIsInit] = useState(false);

  const handleDeal = async handleValue => {
    const getPoint = () => {
      return new Promise(resolve => {
        const myGeo = new BMap.Geocoder();
        myGeo.getPoint(
          handleValue,
          point => {
            resolve(point);
          },
          '@#￥￥￥#@@',
        );
      });
    };

    const point = await getPoint();
    if (point) {
      const addressData = {
        address: handleValue,
        latitude: point.lat,
        longitude: point && point.lng,
      };
      onChange && onChange(addressData);
    }
  };
  useEffect(() => {
    bmapRef.current = new window.BMap.Autocomplete({
      input: 'submitId',
      onSearchComplete: () => {
        isInit && bmapRef.current.hide();
        setIsInit(false);
      },
    });

    bmapRef.current.addEventListener('onconfirm', e => {
      const { province, city, district, street, business } = e.item.value;
      handleDeal(province + city + district + street + business);
    });
  }, []);
  useEffect(() => {
    if (value && value.address) {
      bmapRef.current.setInputValue(value.address);
      setIsInit(true);
    }
  }, [value]);

  return (
    <span>
      <input
        type="text"
        id="submitId"
        style={{
          width: '100%',
          border: '1px solid #cccccc',
          height: '32px',
        }}
      />
    </span>
  );
};

export default AddressInput;

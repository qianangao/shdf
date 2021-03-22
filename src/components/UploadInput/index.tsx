import { connect } from 'umi';
import { Button, Upload, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import UploadItem from './UploadItem';

/**
 * 上传表单组件
 * @param value  {
        url, 文件地址
        id, 文件id
        name, 文件名称
      },
 * @param type 文件类型 image、 excel
 */
const UploadInput = ({
  enums,
  enumsLabel,
  value,
  actionRef,
  type = '',
  onChange,
  disabled = false,
  dispatch,
  maxNum = 9,
  form,
}) => {
  const [loading, setLoading] = useState(false);
  const [upFileList, setUpFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [secrecyLevel, setSecrecyLevel] = useState(undefined);
  const [fileSecrecyLevel, setFileSecrecyLevel] = useState(undefined);

  const setFile = ({ fileName, url, id }) => {
    setUpFileList([
      {
        url,
        uid: id,
        name: fileName,
        status: 'done',
        secrecyLevel,
      },
    ]);
  };

  const verifyImgFile = file => {
    const isImage =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/bmp' ||
      file.type === 'image/gif';

    if (!isImage) {
      message.error('仅支持上传图片，请选择图片进行上传！');
    }

    const isLt10M = file.size / 1024 / 1024 < 10;

    if (!isLt10M) {
      message.error('图片大小不能超过 10MB!');
    }

    return isImage && isLt10M;
  };
  const verifyVideoFile = file => {
    const isVideo =
      file.type === 'video/mp4' || file.type === 'video/flv' || file.type === 'video/avi';

    if (!isVideo) {
      message.error('仅支持上传视频，请选择视频进行上传！');
    }

    const isLt500M = file.size / 1024 / 1024 < 500;

    if (!isLt500M) {
      message.error('视频大小不能超过 500MB!');
    }

    return isVideo && isLt500M;
  };

  const verifyFile = file => {
    console.warn('file.type: ', file.type);

    const isLt50M = file.size / 1024 / 1024 < 50;

    if (!isLt50M) {
      message.error('文件大小不能超过 50MB!');
    }

    return isLt50M;
  };

  const callback = (index, pointList) => {
    const list = [];
    upFileList.forEach((item, current) => {
      if (current === index) {
        const preFile = {
          keyPointInfo: pointList,
          url: item.url,
          uid: item.uid,
          name: item.name,
          status: item.status,
        };
        list.push(preFile);
      } else {
        list.push(item);
      }
    });
    setUpFileList([...list]);
    onChange && onChange([...list]);
  };

  const uploadFile = file => {
    if (upFileList.length >= maxNum) {
      message.warn(`附件不能超过${maxNum}个！`);
    } else {
      const preFile = {
        url: '',
        uid: file.uid,
        name: file.name,
        status: 'uploading',
        secrecyLevel,
      };
      setUpFileList([...upFileList, preFile]);
      onChange && onChange([...upFileList, preFile]);

      setLoading(true);
      new Promise(resolve => {
        dispatch({
          type: 'global/uploadFile',
          payload: {
            secrecyLevel,
            file,
          },
          resolve,
        });
      })
        .then(data => {
          setLoading(false);
          if (!data.error) {
            const tempFile = {
              url: data.url,
              uid: data.fileId,
              name: data.fileName,
              status: 'done',
              secrecyLevel,
            };
            setUpFileList([...upFileList, tempFile]);
            onChange && onChange([...upFileList, tempFile]);
            message.success('文件上传成功！');
          } else {
            const errFile = {
              url: '',
              uid: file.uid,
              name: file.name,
              status: 'error',
              secrecyLevel,
            };
            setUpFileList([...upFileList, errFile]);
            onChange && onChange([...upFileList, errFile]);
            message.warning('上传文件失败，请重试！');
          }
        })
        .catch(_ => {
          setLoading(false);
          const pFile = {
            url: '',
            uid: file.uid,
            name: file.name,
            status: 'error',
            secrecyLevel,
          };
          setUpFileList([...upFileList, pFile]);
          onChange && onChange([...upFileList, pFile]);
        });
    }
  };

  const beforeUpload = file => {
    let shouldUpdate = true;
    if (type === 'uploadSecrecy' && (!fileSecrecyLevel || fileSecrecyLevel === '')) {
      message.error('请选择文件密级！');
      return false;
    }
    if (type === 'image') {
      shouldUpdate = verifyImgFile(file);
    } else if (type === 'userPhoto') {
      shouldUpdate = verifyImgFile(file);
    } else if (type === 'excel') {
      shouldUpdate = verifyExcelFile(file);
    } else if (type === 'video') {
      shouldUpdate = verifyVideoFile(file);
    } else {
      shouldUpdate = verifyFile(file);
    }

    if (type === 'userPhoto') {
      onChange && onChange([file]);
    } else {
      shouldUpdate && uploadFile(file);
    }

    return false;
  };

  const verifyExcelFile = file => {
    const fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
    const isExcel = fileType === 'xlsx' || file.type === 'xls';

    if (!isExcel) {
      message.error('仅支持上传excel文件，请选择对应文件进行上传！');
    }

    const isLt50M = file.size / 1024 / 1024 < 50;

    if (!isLt50M) {
      message.error('文件大小不能超过 50MB!');
    }

    return isExcel && isLt50M;
  };
  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ setFile });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { setFile };
    }
  }, []);

  useEffect(() => {
    if (value) {
      setUpFileList(value);
    }
  }, [value]);

  useEffect(() => {
    const level = form && form.getFieldValue(['secrecyLevel']);
    setSecrecyLevel(level);
    if (!level || !fileSecrecyLevel || level < fileSecrecyLevel) {
      setFileSecrecyLevel(level);
    }
  }, [{ ...form }]);

  const onChangeFile = info => {
    if (info.file && info.file.status === 'removed') {
      setUpFileList([...info.fileList]);
      onChange && onChange([...info.fileList]);
    }
  };

  const imgUploadButton =
    upFileList && upFileList.length > 0 ? null : (
      <div key="imgUpload">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    );

  const onClickInner = e => {
    e.stopPropagation();
  };

  const singleChange = values => {
    setFileSecrecyLevel(values);
  };

  return (
    <>
      <Upload
        disabled={disabled}
        fileList={upFileList}
        listType={type === 'image' ? 'picture-card' : 'text'}
        beforeUpload={beforeUpload}
        itemRender={(originNode, file, currFileList) => (
          <UploadItem
            enums={enums}
            type={type}
            originNode={originNode}
            file={file}
            fileList={currFileList}
            callback={callback}
          />
        )}
        onPreview={file => {
          type === 'image' ? setPreviewVisible(true) : window.open(file.url);
        }}
        onChange={onChangeFile}
      >
        {type === 'image' ? (
          imgUploadButton
        ) : (
          <div style={{ display: 'flex' }}>
            <Button
              style={{ marginRight: 15, marginBottom: 10 }}
              key="normalUpload"
              icon={<UploadOutlined />}
              disabled={upFileList.length === maxNum}
            >
              {type === 'userPhoto' ? '更换头像' : '点击上传'}
            </Button>
            {type === 'uploadSecrecy' && (
              <Select
                style={{ width: 120 }}
                placeholder="请选择密级"
                onChange={singleChange}
                value={fileSecrecyLevel}
                onClick={onClickInner}
              >
                {enumsLabel
                  ? enums[enumsLabel] &&
                    Object.keys(enums[enumsLabel]).map(key => {
                      if (key <= secrecyLevel) {
                        return (
                          <Select.Option key={key} value={key}>
                            {enums[enumsLabel][key]}
                          </Select.Option>
                        );
                      }
                      return '';
                    })
                  : enums.object_secrecy_level &&
                    Object.keys(enums.object_secrecy_level).map(key => {
                      if (key <= secrecyLevel) {
                        return (
                          <Select.Option key={key} value={key}>
                            {enums.object_secrecy_level[key]}
                          </Select.Option>
                        );
                      }
                      return '';
                    })}
              </Select>
            )}
          </div>
        )}
      </Upload>

      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => {
          setPreviewVisible(false);
        }}
      >
        <img alt="preview" style={{ width: '100%' }} src={upFileList[0] && upFileList[0].url} />
      </Modal>
    </>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(UploadInput);

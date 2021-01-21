import React, { useEffect, useRef } from 'react';
import Editor from 'wangeditor';
import { message } from 'antd';
import { connect } from 'umi';

const EditorInput = ({ value, onChange, disabled, dispatch }) => {
  const editorRef = useRef({});
  const editor = useRef({});

  useEffect(() => {
    editor.current = new Editor(editorRef.current);
    editor.current.customConfig.onchange = html => {
      const getHTMLOff = /<(?:.|\s)*?>/g;
      if (html) {
        const transformed = html.replace(getHTMLOff, '');
        if (transformed.length >= 5000) {
          message.error('输入文字超长,不能超过5000字！');
        } else {
          const content = editor.current.txt.html();
          onChange && onChange(content === '<p><br></p>' ? '' : content);
        }
      }
    };
    editor.current.customConfig.uploadFileName = 'file';
    editor.current.customConfig.uploadImgServer = '/ceph';
    editor.current.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
    editor.current.customConfig.customAlert = info => {
      message.error(`${info}！`);
    };
    editor.current.customConfig.customUploadImg = (files, insert) => {
      if (files.length > 1) {
        message.warning('一次请仅上传一张图片！');
      }

      new Promise(resolve => {
        dispatch({
          type: 'global/uploadFile',
          payload: {
            file: files[0],
          },
          resolve,
        });
      })
        .then(data => {
          insert(data.url);
        })
        .catch(_ => {});
    };

    editor.current.customConfig.menus = [
      // 设置富文本的菜单功能
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'link', // 插入链接
      'justify', // 对齐方式
      'image', // 插入图片
    ];
    editor.current.create();
  }, []);

  useEffect(() => {
    editor.current.txt.html(value);
  }, [value]);
  useEffect(() => {
    editor.current.$textElem.attr('contenteditable', !disabled);
  }, [disabled]);

  return <div ref={editorRef} />;
};

export default connect(() => ({}))(EditorInput);

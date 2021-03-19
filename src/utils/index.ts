import { message } from 'antd';
import request from 'umi-request';

export function parseTime(timeArg, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  let time = timeArg;

  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });

  return timeStr;
}

/**
 *  导出csv文件
 * @param {*} data
 * @param {*} title 文件名称
 */
export function downloadCSVFile(data, title) {
  return downLoaddownloadBlobFile('csv', data, title);
}

/**
 *  导出Excel文件
 * @param {*} data
 * @param {*} title 文件名称
 */
export function downloadExcelFile(data, title) {
  return downLoaddownloadBlobFile('xlsx', data, title);
}
/**
 *  导出Excel文件
 * @param {*} data
 * @param {*} title 文件名称
 */
export function downloadXlsFile(data, title) {
  return downLoaddownloadBlobFile('xls', data, title);
}

function downLoaddownloadBlobFile(type, data, title) {
  if (data.type === 'application/json') {
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', () => {
      const { result } = fileReader;
      try {
        if (result) {
          const res = JSON.parse(result);
          if (res && res.msg) {
            message.warning(res.msg);
          }
        } else {
          message.warning('导出数据出现异常');
        }
      } catch (error) {
        message.warning('导出数据出现异常');
      }
    });
    fileReader.readAsText(data, 'utf-8');
    return Promise.resolve(fileReader);
  }

  let applicationType = '';
  switch (type) {
    case 'csv':
      applicationType = 'application/octet-stream;charset=UTF-8';
      break;
    case 'xls':
      applicationType = 'application/vnd.ms-excel';
      break;
    case 'xlsx':
      applicationType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    default:
      applicationType = 'application/octet-stream;charset=UTF-8';
      break;
  }

  const url = new Blob([data], { type: applicationType });

  return Promise.resolve(url)
    .then(blob => {
      const aa: HTMLAnchorElement =
        document.getElementById('link_do_not_delete') || document.createElement('a');
      aa.href = URL.createObjectURL(blob);
      aa.setAttribute('download', `${title || parseTime(new Date())}.${type}`);
      aa.click();
      window.URL.revokeObjectURL(aa.href);
    })
    .catch(err => {
      message.error('文件下载异常，请稍后重试！');
      throw err;
    });
}

export function printElement(element) {
  // TODO 建议使用iframe，不改变页面结构
  // window.document.body.innerHTML = element.outerHTML;
  // window.print();
  // window.location.reload();
  // return;
  return new Promise(resolve => {
    let iframe = document.getElementById('printIframe');

    if (iframe) {
      const doc = iframe.contentWindow.document;
      doc.body.innerHTML = element.outerHTML;

      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      resolve();

      if (navigator.userAgent.indexOf('MSIE') > 0) {
        document.body.removeChild(iframe);
      }
    } else {
      iframe = document.createElement('IFRAME');
      iframe.setAttribute('id', 'printIframe');
      iframe.src = window.location.href;
      iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:500px;top:500px;');
      document.body.appendChild(iframe);
      iframe.onload = () => {
        const doc = iframe.contentWindow.document;
        doc.body.innerHTML = element.outerHTML;

        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        resolve();

        if (navigator.userAgent.indexOf('MSIE') > 0) {
          document.body.removeChild(iframe);
        }
      };
    }
  });
}

/**
 * 文件异步下载
 * @param {*} url 文件地址
 * @param {*} filename 文件名
 */
export function downloadFileByUrl(url, filename) {
  const FILES_SERVER = '/files_server/';
  return request(FILES_SERVER + url, {
    responseType: 'blob',
  })
    .then(blob => {
      const aa: HTMLAnchorElement =
        document.getElementById('link_do_not_delete') || document.createElement('a');
      aa.href = window.URL.createObjectURL(blob);
      aa.download = filename;
      aa.click();
      window.URL.revokeObjectURL(aa.href);
    })
    .catch(err => {
      message.error('文件下载异常，请稍后重试！');
      throw err;
    });
}

/**
 * 格式化分页的后台数据
 * @param {*} url 文件地址
 * @param {*} filename 文件名
 */
export function formatPageData(data) {
  const { records, current, total, size } = data;

  return {
    data: records,
    page: current,
    pageSize: size,
    success: true,
    total,
  };
}

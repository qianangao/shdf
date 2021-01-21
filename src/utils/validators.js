// =================================== ⬇ 身份证校验相关逻辑 =========================================

// 15位转18位身份证号
const changeFivteenToEighteen = cardInput => {
  let card = cardInput;
  if (card.length === 15) {
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let cardTemp = 0;
    let i;
    card = `${card.substr(0, 6)}19${card.substr(6, card.length - 6)}`;
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i];
    }
    card += arrCh[cardTemp % 11];
    return card;
  }
  return card;
};
// 校验位的检测
const checkParity = cardInput => {
  // 15位转18位
  const card = changeFivteenToEighteen(cardInput);
  const len = card.length;
  if (len === 18) {
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let cardTemp = 0;
    let i;
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i];
    }
    const valnum = arrCh[cardTemp % 11];
    if (valnum === card.substr(17, 1)) {
      return true;
    }
    return false;
  }
  return false;
};

// 校验日期
const verifyBirthday = (year, month, day, birthday) => {
  const now = new Date();
  const nowYear = now.getFullYear();
  // 年月日是否合理
  if (
    birthday.getFullYear() === Number(year) &&
    birthday.getMonth() + 1 === Number(month) &&
    birthday.getDate() === Number(day)
  ) {
    // 判断年份的范围（3岁到200岁之间)
    const time = nowYear - year;
    if (time >= 0 && time <= 200) {
      return true;
    }
    return false;
  }
  return false;
};
// 检查生日是否正确
const checkBirthday = card => {
  const len = card.length;
  // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
  if (len === 15) {
    const reFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    const arrData = card.match(reFifteen);
    const year = arrData[2];
    const month = arrData[3];
    const day = arrData[4];
    const birthday = new Date(`19${year}/${month}/${day}`);
    return verifyBirthday(`19${year}`, month, day, birthday);
  }
  // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
  if (len === 18) {
    const reEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    const arrData = card.match(reEighteen);
    const year = arrData[2];
    const month = arrData[3];
    const day = arrData[4];
    const birthday = new Date(`${year}/${month}/${day}`);
    return verifyBirthday(year, month, day, birthday);
  }
  return false;
};

// =================================== ⬆ 身份证校验相关逻辑 ======================================

/**
 * 身份证表单校验
 * @param {*} rule
 * @param {*} value 需校验的值
 * @param {*} callback form回调函数
 */
export const checkIdCard = (rule, value, callback) => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  try {
    const Reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    const city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 ',
    };
    if (!value) {
      callback();
    } else if (!Reg.test(value)) {
      callback('身份证不符合规范');
    } else if (!city[value.substr(0, 2)]) {
      callback('身份证地址编码不合规范');
    } else if (!checkBirthday(value)) {
      callback('身份证生日不合规范');
    } else if (!checkParity(value)) {
      callback('身份证校验码不合规范');
    } else {
      callback();
    }
  } catch (error) {
    callback(error);
  }
};

/**
 * 手机号表单校验
 * @param {*} rule
 * @param {*} value 需校验的值
 * @param {*} callback form回调函数
 */
export const checkPhone = (rule, value, callback) => {
  const isMob = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (value && !isMob.test(value)) {
    callback('手机号码输入不合法！');
  } else {
    callback();
  }
};
/**
 * 固定电话表单校验
 * @param {*} rule
 * @param {*} value 需校验的值
 * @param {*} callback form回调函数
 */
export const checkTelephone = (rule, value, callback) => {
  const isTelephone = /^0\d{2,3}-\d{7,8}$/;
  if (value && !isTelephone.test(value)) {
    callback('固定电话输入不合法！');
  } else {
    callback();
  }
};

/**
 * 联系电话表单校验
 * @param {*} rule
 * @param {*} value 需校验的值
 * @param {*} callback form回调函数
 */
export const checkAllTel = (rule, value, callback) => {
  const isMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; // 手机号
  const isTel = /^0\d{2,3}-\d{7,8}$/; // 固定电话
  if ((value && isMobile.test(value)) || isTel.test(value)) {
    callback();
  } else {
    callback('联系电话输入不合法！');
  }
};

/**
 * 统一社会编码校验
 * @param {*} rule
 * @param {*} value 需校验的值
 * @param {*} callback form回调函数
 */
export const checkCreditCode = (rule, value, callback) => {
  const isMob = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
  if (value && !isMob.test(value)) {
    callback('统一社会编码不合法');
  } else {
    callback();
  }
};

// =================================== ⬇ 网址输入检验相关逻辑 =========================================

/**
 * 网址表单校验
 * @param {*} rule
 * @param {*} value 需校验的值
 * @param {*} callback form回调函数
 */
export const checkUrl = (rule, value, callback) => {
  // eslint-disable-next-line no-useless-escape
  const strRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if (value === '' || value === null || strRegex.test(value) === false) {
    callback('请输入以http://或者 https://开头的正确网址！');
  } else {
    callback();
  }
};

/**
 * 邮编表单校验
 * @param {*} rule
 * @param {*} value 需校验的值
 * @param {*} callback form回调函数
 */
export const checkPost = (rule, value, callback) => {
  const reg = /^[0-9]{6}$/;
  if (value && !reg.test(value)) {
    callback('邮编格式不合法');
  } else {
    callback();
  }
};

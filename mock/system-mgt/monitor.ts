const getMonitorCount = (req, res) => {
  res.json({
    code: 0,
    msg: 'success',
    data: {
      cadreTotalNum: 278, //当前老干部总人数
      staffTotalNum: 11, //当前工作人员总人数
      addNum: 8, //当月新增老干部人数
      cadreActiveNum: null, //当月老干部活跃数
      staffActiveNum: 7, //当月工作人员活跃数
      orgTotalNum: 747, //当前系统总单位数
      workLoginNum: 11, //工作人员登陆总数
      lgbLoginNum: 22, //老干部登陆总数
    },
  });
};

const getMonitorLgbs = (req, res) => {
  res.json({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 2,
      isMore: 0,
      totalPage: 1,
      startIndex: 0,
      items: [
        {
          id: '402883e973e5c2ce0173e5c2ce9d', //id
          organizationId: 'organizationId', //单位id
          organizationName: 'organizationName', //单位名称
          realName: 'realName', //用户名
          dictSex: 'dictSex', //性别
          dateOfBirth: 'dateOfBirth', //出生日期
          startWorkTime: 'startWorkTime', //开始工作时间
          phonenumber: 'phonenumber', //手机号
          timeOfLogin: 'timeOfLogin', //最近登录时间
        },
      ],
    },
  });
};

export default {
  'GET /monitoring-center': getMonitorCount,
  'GET /monitoring-center/user': getMonitorLgbs,
};

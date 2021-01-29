const noResponse = (req, res) => {
  res.send({
    code: 10000,
    msg: 'success',
    data: {},
  });
};

const getOrgTree = (req, res) => {
  const { id } = req.query;

  const a = {
    code: 10000,
    msg: 'success',
    data: [
      {
        id: '1' + id, //id
        sort: null,
        organizationName: '测试单位1', //单位名称
        parentEmployerId: id || '1000', //父单位id
        parentOrganizationName: '省委老干部局', //父单位名称
        isLgbMinistry: null,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3', //单位性质
        organizationTelphone: null,
        dictRank: 1, //单位级别
        children: null,
        isSubunit: 1,
        gmtCreate: null,
        communityAddress: null,
      },
      {
        id: '2' + id, //id
        sort: 0,
        organizationName: '测试单位2',
        parentEmployerId: id || '1000', //父单位id
        parentOrganizationName: '省委老干部局',
        isLgbMinistry: 0,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
        organizationTelphone: 'string',
        dictRank: 1,
        children: null,
        isSubunit: 1,
        gmtCreate: null,
        communityAddress: null,
      },
      {
        id: '3' + id, //id
        sort: 0,
        organizationName: '测试单位3',
        parentEmployerId: id || '1000', //父单位id
        parentOrganizationName: '省委老干部局',
        isLgbMinistry: 0,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
        organizationTelphone: 'string',
        dictRank: 1,
        children: null,
        isSubunit: 0,
        gmtCreate: null,
        communityAddress: null,
      },
    ],
  };

  return res.json(a);
};

const searchOrgTree = (req, res) => {
  const a = {
    code: 10000,
    msg: 'success',
    data: [
      {
        id: '1000', //id
        sort: null,
        organizationName: '全扫demo', //单位名称
        parentEmployerId: '0', //父单位id
        parentOrganizationName: null,
        isLgbMinistry: null,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3', //单位性质
        organizationTelphone: null,
        dictRank: null,
        children: [
          //子单位信息
          {
            id: '2c948a827409c4aa017409c4aa63',
            sort: null,
            organizationName: '测试单位',
            parentEmployerId: '1000',
            parentOrganizationName: '省委老干部局',
            isLgbMinistry: null,
            dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
            organizationTelphone: null,
            dictRank: null,
            children: [
              {
                id: '4028b23f738f519401738f321b9',
                sort: null,
                organizationName: '测试单位1-1',
                parentEmployerId: '1000',
                parentOrganizationName: '省委老干部局',
                isLgbMinistry: null,
                dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
                organizationTelphone: null,
                dictRank: null,
                children: null,
                isSubunit: null,
                gmtCreate: '2020-07-27T08:09:15.000+0000',
                communityAddress: null,
              },
            ],
            isSubunit: 1,
            gmtCreate: '2020-08-20T02:48:38.000+0000',
            communityAddress: null,
          },
          {
            id: '4028b23f738f519401738f5194b9',
            sort: null,
            organizationName: '测试单位',
            parentEmployerId: '1000',
            parentOrganizationName: '省委老干部局',
            isLgbMinistry: null,
            dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
            organizationTelphone: null,
            dictRank: null,
            children: null,
            isSubunit: null,
            gmtCreate: '2020-07-27T08:09:15.000+0000',
            communityAddress: null,
          },
        ],
        isSubunit: null,
        gmtCreate: '2018-09-12T10:41:25.000+0000',
        communityAddress: null,
      },
    ],
  };
  return res.json(a);
};

const getOrgList = (req, res) => {
  const a = {
    code: 10000,
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
          id: '2c948a827409c4aa017409c4aa63', //id
          sort: null,
          organizationName: '测试单位1', //单位名称
          parentEmployerId: '1000', //父单位id
          parentOrganizationName: '省委老干部局', //父单位名称
          isLgbMinistry: null,
          dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3', //单位性质
          organizationTelphone: null,
          dictRank: 1, //单位级别
          children: null,
          isSubunit: null,
          gmtCreate: null,
          communityAddress: null,
        },
        {
          id: '4028b23f738f519401738f5194b9',
          sort: 0,
          organizationName: '测试单位2',
          parentEmployerId: '1000',
          parentOrganizationName: '省委老干部局',
          isLgbMinistry: 0,
          dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
          organizationTelphone: 'string',
          dictRank: 1,
          children: null,
          isSubunit: null,
          gmtCreate: null,
          communityAddress: null,
        },
        {
          id: '4028b23f738f519401738f5194b3',
          sort: 0,
          organizationName: '测试单位3',
          parentEmployerId: '1000',
          parentOrganizationName: '省委老干部局',
          isLgbMinistry: 0,
          dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
          organizationTelphone: 'string',
          dictRank: 1,
          children: null,
          isSubunit: null,
          gmtCreate: null,
          communityAddress: null,
        },
        {
          id: '4028b23f738f519401738f5194b4',
          sort: 0,
          organizationName: '测试单位4',
          parentEmployerId: '1000',
          parentOrganizationName: '省委老干部局',
          isLgbMinistry: 0,
          dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
          organizationTelphone: 'string',
          dictRank: 1,
          children: null,
          isSubunit: null,
          gmtCreate: null,
          communityAddress: null,
        },
      ],
    },
  };
  return res.json(a);
};

const getOrgItem = (req, res) => {
  const a = {
    code: 10000,
    msg: 'success',
    data: {
      id: '4028b23f738f519401738f5194b4',
      sort: 0,
      organizationName: '测试单位4',
      parentEmployerId: '1000',
      parentOrganizationName: '省委老干部局',
      isLgbMinistry: 0,
      dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
      organizationTelphone: 'string',
      dictRank: 1,
      children: null,
      isSubunit: null,
      gmtCreate: null,
      communityAddress: null,
    },
  };
  return res.json(a);
};

const staffInfo = [];

for (let i = 0; i < 20; i++) {
  staffInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    organizationId: '1000', //单位id
    realName: '伍仟' + i, //姓名
    homeAddressDiy: null,
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dictNation: '8adcf7c96a48fae4016a49260741', //民族
    dateOfBirth: '2020-08-12', //出生日期
    dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
    startWorkTime: '2020-08-12', //参加工作时间
    originalUnitAndPosition: '局长' + i, //原工作单位及职务
    dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //级别
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    phonenumber: '1865555555' + i, //电话号码
    dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
    spouseName: null,
    childrenNum: null,
    idCard: '440103199003077458', //身份证号
    nowThePipeUnits: '现管单位', //现管单位
    nowThePipeUnitsId: '40fd998a6f42a78d016f45ff33ee', //现管单位id
    partyName: '离退休党支部', //支部名称
  });
}

const list = (req, res) => {
  res.send({
    code: 10000,
    msg: 'success',
    data: {
      current: 1,
      size: 10,
      total: 20,
      pages: 2,
      records: staffInfo,
    },
  });
};

export default {
  'GET /shdf/organization/directly-child': getOrgTree,
  'GET /shdf/organization/all-child': searchOrgTree,
  'GET /shdf/organization/child': searchOrgTree,
  'POST /shdf/organization': noResponse,
  'PUT /shdf/organization': noResponse,
  'DELETE /shdf/organization': noResponse,
  'GET /shdf/organization': getOrgList,
  'GET /shdf/organizationItem': getOrgItem,
  'GET /shdf/users': list,
};

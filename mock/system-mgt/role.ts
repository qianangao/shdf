const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const roleList = (req, res) => {
  res.send({
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
          id: '402882866a4dba7f016a4dbbba05', //id
          roleName: '工作人员（请勿删除）', //角色名称
          isAdmin: 0, //是否管理员 0 否 1 是
          remark: '工作人员（请勿删除）', //角色描述
          path: null,
          name: null,
          component: null,
          hideInMenu: null,
          gmtCreate: null,
          gmtModified: null,
          isDeleted: null,
          createUserId: null,
          updateUserId: null,
          createOrgId: null,
        },
        {
          id: '402882866a4dba7f016a4dba84d1',
          roleName: '单位管理员（请勿删除）',
          isAdmin: 1,
          remark: '单位管理员（请勿删除）',
          path: null,
          name: null,
          component: null,
          hideInMenu: null,
          gmtCreate: null,
          gmtModified: null,
          isDeleted: null,
          createUserId: null,
          updateUserId: null,
          createOrgId: null,
        },
      ],
    },
  });
};

const getRules = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: [
      {
        id: '01', //id
        parentId: '00', //父菜单id
        ruleName: '离退休干部', //菜单名称
        routes: [
          //子菜单信息
          {
            id: '01-01',
            parentId: '01',
            ruleName: '信息维护',
            routes: [],
          },
          {
            id: '01-02',
            parentId: '01',
            ruleName: '信息维护2',
            routes: [],
          },
          {
            id: '01-03',
            parentId: '01',
            ruleName: '信息维护3',
            routes: [],
          },
        ],
      },
      {
        id: '02', //id
        parentId: '00', //父菜单id
        ruleName: '琼崖本色', //菜单名称
        routes: [
          //子菜单信息
          {
            id: '02-01',
            parentId: '01',
            ruleName: '支部信息',
            routes: [],
          },
          {
            id: '02-02',
            parentId: '01',
            ruleName: '支部信息2',
            routes: [],
          },
          {
            id: '02-03',
            parentId: '01',
            ruleName: '支部信息3',
            routes: [],
          },
        ],
      },
    ],
  });
};

const getRuleId = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: ['01-01', '02-02'],
  });
};

export default {
  'POST /role': noResponse,
  'PUT /role/:id': noResponse,
  'DELETE /role': noResponse,
  'GET /role': roleList,
  'GET /role/:id': noResponse,
  'GET /rule': getRules,
  'GET /role/:roleId/rule': getRuleId,
  'POST /role/update_rule': noResponse,
};

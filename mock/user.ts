import md from 'utility';
import CryptoJS from 'crypto-js';

export default {
  'POST /login': (req, res) => {
    const { password, username } = req.body;

    const encrypt = word => {
      const key = CryptoJS.enc.Utf8.parse('liantong20190410');
      const srcs = CryptoJS.enc.Utf8.parse(word);
      const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      return encrypted.toString();
    };

    if (password === md.md5('123456') && username === encrypt('admin')) {
      res.send({
        code: 0,
        msg: 'success',
        data: {
          username: 'admin',
          token: 'eeea150168d9f6e0fd2c9e53e4614ae1',
          userInfo: {
            id: '1',
            account: 'admin',
            name: '请勿删除',
            roleList: ['402882866a4dab69016a4dab69dc'],
            roleNames: ['超级管理员'],
            organizationId: '1000',
            organizationName: '省委老干部局',
            dictSubordinate: null,
            dictSubordinateName: null,
            nowThePipeUnits: null,
            nowThePipeUnitsName: null,
            createOrgId: '1000',
            partyId: null,
            isCommunity: 0,
            communityId: null,
            imUserId: 'FIF8F8ff',
            systemBelong: '市委老干部局',
            dictRank: 0,
            community: null,
            isAdmin: 1,
          },
          authorityList: ['01-01', '02', '02-02', '08'],
          dataAuthSql: null,
          version: 'v1',
          isRefresh: 0,
          delegatee: null,
          unwrappingSerializer: false,
        },
      });
      return;
    }

    if (password === md.md5('1234567') && username === 'admin') {
      res.send({
        msg: '暂无权限',
        code: '000100',
        data: null,
      });
      return;
    }

    if (password === md.md5('123456') && username === encrypt('user')) {
      res.send({
        code: 0,
        msg: 'success',
        data: {
          username: 'user',
          token: 'dwaf532fsa352r1daw24',
          userInfo: {
            id: '2',
            account: 'user',
            name: '当时超',
            authorityList: ['page1', 'page11', 'page13'],
          },
        },
      });
      return;
    }

    res.status(403).send({
      msg: '暂无权限',
      code: '000100',
      data: null,
    });
  },
  'POST /logout': (req, res) => {
    res.send({
      code: 0,
      msg: 'success',
      data: {},
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

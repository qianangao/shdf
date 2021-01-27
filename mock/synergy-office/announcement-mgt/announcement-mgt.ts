const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

let announcementItems: any = [];
const announcement = (req: any) => {
  const { noticeStatus, noticeTitle } = req.query;
  if (noticeTitle === undefined){
    announcementItems = [];
    let count: number;
    switch (noticeStatus) {
      case 'drafts':
        count = 3;
        break
      case 'publish':
        count = 5;
        break
      default:
        count = 10;
        break
    }
    for (let i = 0; i < count; i++) {
      announcementItems.push({
        "noticeId": `3308256841627734016${i}`,//主键ID
        "receiptHandle": 0,		//是否需要回执处理(0是 1否)
        "noticeContent": "关于处理色情出版物的规定要求内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",		//公告内容
        "noticeStatus": i,		//公告状态（0草稿 1已发布 3待审核 5已通过 7已发布 9已关闭 -1已驳回 -3已撤回）
        "publishDept": null,		// 发布部门
        "secrecyData": null,		//数据完整性标识
        "softDelete": 0,		//软删除标识 0正常   1删除
        "lastUpdateTime": "2021-01-25 14:54",	//最近一次操作时间
        "remindWays": 0,		//提醒方式
        "createTime": "2018-08-25 14:54",//创建时间
        "secrecyLevel": null,		//密级标识
        "lastUpdateUser": null,	//最近一次操作人
        "includeFile": null,		//是否包含附件
        "noticeTitle": `关于处理色情出版物的规定要求${i}`,	//公告标题
        "createUser": "admin"		//创建人
      });
    }
    return announcementItems
  }

  const items: any = [];
  announcementItems.map(item => {
    if (item.noticeTitle.indexOf(noticeTitle) !== -1){
      items.push(item);
    }
  });
  return items;
}

const noticeList = (req, res) => {
  res.send({
    code: 1,
    msg: 'success',
    data: {
      current: 1,
      size: 20,
      total: 10,
      isMore: 0,
      totalPage: 1,
      startIndex: 0,
      records: announcement(req),
    },
  });
};

const getNoticeDetail = (req, res) => {
  const { id } = req.query;
  res.send({
    code: 1,
    msg: 'success',
    data: {
      "noticeId": "3308256841627734016",//主键ID
      "receiptHandle": 0,		//是否需要回执处理(0是 1否)
      "noticeContent": "关于处理色情出版物的规定要求内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",		//公告内容
      "noticeStatus": 0,		//公告状态（0草稿 1已发布 3待审核 5已通过 7已发布 9已关闭 -1已驳回 -3已撤回）
      "publishDept": "全国SHDF办公室",		// 发布部门
      "secrecyData": null,		//数据完整性标识
      "softDelete": 0,		//软删除标识 0正常   1删除
      "lastUpdateTime": "2021-01-25 14:54",	//最近一次操作时间
      "remindWays": 0,		//提醒方式
      "createTime": "2018-08-25 14:54",//创建时间
      "secrecyLevel": null,		//密级标识
      "lastUpdateUser": null,	//最近一次操作人
      "includeFile": null,		//是否包含附件
      "noticeTitle": "关于处理色情出版物的规定要求"+id,	//公告标题
      "createUser": "admin"		//创建人
    },
  });
};
export default {
  'GET /notices': noticeList,
  'GET /notice/:id': getNoticeDetail,
  'POST /noticeDetail1': getNoticeDetail,
  'PUT /user/:id': noResponse,
  'DELETE /user': noResponse,
};

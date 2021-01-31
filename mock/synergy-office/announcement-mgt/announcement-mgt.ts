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
        count = 7;
        break
    }
    for (let i = -2; i < count; i++) {
      announcementItems.push({
        "noticeId": `3308256841627734016${i+2}`,//主键ID
        "receiptHandle": 0,		//是否需要回执处理(0是 1否)
        "noticeContent": "关于处理色情出版物的规定要求内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",		//公告内容
        "noticeStatus": i*2+1,		//公告状态（0草稿 1已发布 3待审核 5已通过 7已发布 9已关闭 -1已驳回 -3已撤回）
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
    code: 10000,
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
    "code":10000,
    "msg":"成功",
    "data":{
      "noticeId":"3309354112020807680",
      "noticeContent":"<p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p><p>1111<br></p>",
      "noticeStatus":-3,
      "publishDept":"发布部门",
      "secrecyData":null,
      "receiptHandle":0,
      "remindWays":"0",
      "visibleRange":null,
      "secrecyLevel":1,
      "includeFile":0,
      "noticeTitle":"demo1",
      "softDelete":0,
      "createUser":null,
      "createTime":"2021-01-29T08:46:42.403+00:00",
      "lastUpdateUser":"yangc223",
      "lastUpdateTime":"2021-01-29T08:55:56.866+00:00",
      "ext1":null,
      "ext2":null,
      "ext3":null
    }
  });
};
const getHandleSituation = (req, res) => {
  const { pageNum } = req.query;
  res.send({
    "code":10000,
    "msg":"成功",
    "data":{
      "records":situation(req),
      "total":30,
      "size": pageNum.length,
      "current":pageNum,
      "orders":[

      ],
      "optimizeCountSql":true,
      "hitCount":false,
      "countId":null,
      "maxLimit":null,
      "searchCount":true,
      "page":2
    }
  });
};
let situationList: any = [];
const situation = (req: any) => {
  const { pageNum, readingAccount, readingState } = req.query;
  if (readingState === undefined && readingAccount === undefined){
    let count: number;
    switch (pageNum) {
      case '1':
        count = 20;
        break
      default:
        count = 10;
        break
    }
    situationList = [];
    for (let i = 0; i < count; i++) {
      situationList.push({
        "readingId":`3308887287038353408${i}`,
        "noticeId":`3308898160389857280${i}`,
        "noticeTitle":null,
        "readingAccount":`yangc${i}`,
        "readingState":1,
        "readingOrg":null,
        "replyContent":"回复内容回复内容",
        "createUser":`yangc${i}`,
        "createTime":"2021-01-28T01:51:42.654+00:00",
        "softDelete":0,
        "lastUpdateUser":`yangc${i}`,
        "lastUpdateTime":"2021-01-29T01:45:45.525+00:00",
        "ext1":null,
        "ext2":null,
        "ext3":null
      });
    }
    return situationList
  }

  const items: any = [];

  situationList.map(item => {
    if (item.readingState.toString() === readingState && item.readingAccount.indexOf(readingAccount) !== -1){
      items.push(item);
    }
    if (readingState === undefined && item.readingAccount.indexOf(readingAccount) !== -1){
      items.push(item);
    }
    if (readingAccount === undefined && item.readingState === readingState){
      items.push(item);
    }
  });
  return items;
}
export default {
  'GET /shdf/notices': noticeList,
  'GET /shdf/notice': getNoticeDetail,
  'POST /shdf/noticeDetail': getNoticeDetail,
  'GET /shdf/notice/record/deal': getHandleSituation,
  'DELETE /shdf/user': noResponse,
};

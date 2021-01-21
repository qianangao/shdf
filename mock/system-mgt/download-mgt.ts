const fileItems = [];

for (let i = 0; i < 10; i++) {
  fileItems.push({
    id: '2' + i, //id
    fileName: i + '导出.xls',
    fileUrl: '/40dee3268a3f69246377636cce.xls', //文件地址
    status: 1, //状态 0-导出中，1-可下载，2-导出失败
    userType: 1, //0-老干部，1-工作人员
  });
}

const getExportFiles = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 10,
      isMore: 0,
      totalPage: 1,
      startIndex: 0,
      items: fileItems,
    },
  });
};
export default {
  'GET /download_center/user/all': getExportFiles,
};

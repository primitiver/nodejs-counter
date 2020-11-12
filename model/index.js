module.exports = {
  // 增
  insert(colName, insertDta) {
    return new Promise((resolve, reject) => {
      colName.insertMany(insertDta, (err) => {
        if (err) throw err;
        resolve();
      });
    });
  },
  // 删
  del(colName, deleteDate, deleteNum) {
    let deleteType = deleteNum === 1 ? "deleteMany" : "deleteOne";
    return new Promise((resolve, reject) => {
      colName[deleteType](deleteDate, (err) => {
        if (err) throw err;
        resolve();
      });
    });
  },
  // 修改
  update(colName, whereDate, updateDate, updateNum) {
    let updateType = updateNum === 1 ? "updateMany" : "updateOne";
    return new Promise((resolve, reject) => {
      colName[updateType](whereDate, updateDate, (err) => {
        if (err) throw err;
        resolve();
      });
    });
  },
  // 查
  find(colName, whereDate, showDate) {
    console.log(colName);
    return new Promise((resolve, reject) => {
      colName.find(whereDate, showDate).exec((err, data) => {
        if (err) throw err;
        resolve(data);
      });
    });
  },
  // 排序
  sort(colName, whereDate, showDate, sortDate) {
    return new Promise((resolve, reject) => {
      colName
        .find(whereDate, showDate)
        .sort(sortDate)
        .exec((err, data) => {
          if (err) throw err;
          resolve(data);
        });
    });
  },
  // 计数
  count(colName) {
    return new Promise((resolve, reject) => {
      colName.count().exec((err, data) => {
        if (err) throw err;
        resolve(data);
      });
    });
  },
  // 查找某一字段的分类
  distinct(colName, type) {
    return new Promise((resolve, reject) => {
      colName.distinct(type).exec((err, data) => {
        if (err) throw err;
        resolve(data);
      });
    });
  },
  // 分页
  paging(colName, whereDate, showDate, limit, count) {
    return new Promise((resolve, reject) => {
      colName
        .find(whereDate, showDate)
        .limit(limit)
        .skip(count * limit)
        .exec((err, data) => {
          if (err) throw err;
          console.log(data);
          resolve(data);
        });
    });
  },
};

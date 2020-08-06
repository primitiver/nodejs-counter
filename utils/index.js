module.exports = {
  hans_query(query, req) {
    for (let item in query) {
      if (!item) {
        return true;
      } else {
        if (req.includes(item)) {
          return true;
        }
      }
    }
  },
};

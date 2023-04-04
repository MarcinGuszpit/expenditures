function extractErrors(errorsObj) {
  let results = {};

  errorsObj.forEach((error) => {
    const resultsKeys = Object.keys(results);
    const index = resultsKeys.findIndex((key) => {
      return key === error.param;
    });

    if (index >= 0) {
      results[error.param].msgs.push(error.msg);
    } else {
      results[error.param] = {
        msgs: [error.msg],
      };
    }
  });
  return results;
}

module.exports = {
  extractErrors,
};

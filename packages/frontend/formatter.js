module.exports.format = function (msgs) {
  return Object.entries(msgs).reduce((acc, [id, msg]) => {
    return [
      ...acc,
      {
        term: id,
        definition: msg.defaultMessage,
        comment: msg.description,
      },
    ];
  });
};

module.exports.compile = function (msgs) {
  const results = {};

  for (const [id, msg] of Object.entries(msgs)) {
    results[id] = msg.definition;
  }

  return results;
};

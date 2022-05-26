function parseAuthorizationHeader(value) {
  return value?.replace('Bearer ', '');
}

module.exports = {
  parseAuthorizationHeader,
};

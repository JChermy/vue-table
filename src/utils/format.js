const CHANGE_TYPE_ENUM = {
  '1': '直接改写',
  '2': '间接改写',
  '3': '不改写',
  '4': '补充',
  'default': '/'
}

export default {
  changetype(val) {
    return CHANGE_TYPE_ENUM[val] || CHANGE_TYPE_ENUM['default']
  }
}

const FIELDS_CONFIG = {
  changetype: {
    enums: [
      { 'text': '直接改写', 'value': 1 },
      { 'text': '建议改写', 'value': 2 },
      { 'text': '不改写', 'value': 3 },
      { 'text': '补充', 'value': 4 }
    ],
    defaultText: '/'
  },
  action: {
    enums: [
      { 'text': '新增', 'value': 'add' },
      { 'text': '编辑', 'value': 'edit' },
      { 'text': '删除', 'value': 'delete' },
      { 'text': '发布', 'value': 'publish' }
    ]
  },
  module: {
    enums: [
      { 'text': '大促类型', 'value': 'saletype' },
      { 'text': '楼层置顶', 'value': 'floortype' }
    ]
  },
  isdelete: {
    enums: [
      { 'text': '正常', 'value': 0 },
      { 'text': '已删除', 'value': 1 }
    ],
    defaultText: '/'
  },
  isvalid: {
    enums: [
      { 'text': '未生效', 'value': 0, 'type': 'default', tag: 'el-tag' },
      { 'text': '已生效', 'value': 1, 'type': 'success', tag: 'el-tag' }
    ],
    defaultText: ''
  }
}

export const fields = Object.keys(FIELDS_CONFIG)

export function getFieldText(field, value) {
  const enums = FIELDS_CONFIG[field] ? FIELDS_CONFIG[field]['enums'] : []
  const result = enums.find((item) => {
    return item['value'] === value
  })
  return result ? result['text'] : FIELDS_CONFIG[field]['defaultText']
}

export function getFieldEnums(field) {
  return FIELDS_CONFIG.hasOwnProperty(field) ? FIELDS_CONFIG[field]['enums'] : []
}

const cacheFieldMethods = {}

export function createFieldMethod(field) {
  if (cacheFieldMethods[field]) {
    return cacheFieldMethods[field]
  }
  cacheFieldMethods[field] = function(val, row) {
    return val === row[field]
  }
  return cacheFieldMethods[field]
}

export const isArry = Array.isArray
export const isNotEmptyArray = (val: any) => isArry(val) && val.length > 0

export function generateRandomString(length = 5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars[randomIndex]
  }
  return result
}

// 常见的姓氏
const surnames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴']

// 常见的名字（这里只列出几个例子，实际可以扩展）
const names = ['伟', '娟', '明', '强', '磊', '敏', '静', '丽', '涛', '军']

// 随机生成姓和名
export function generateChineseName() {
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const name = names[Math.floor(Math.random() * names.length)] + names[Math.floor(Math.random() * names.length)]
  return surname + name
}

// 一些个性化签名模板
const templates = [
  '生活不止眼前的苟且，还有诗和远方。',
  '人生如茶，苦涩之后是清香。',
  '我不怕别人笑话我，但我怕自己笑话自己。',
  '做自己喜欢的事，才是最幸福的事情。',
  '岁月如歌，感谢一路有你。',
  '未来可期，我愿拼搏。',
  '今天的努力，决定明天的辉煌。',
  '每一天，都是新的开始。',
  '岁月静好，时光不负。',
  '别让昨天的泪水，浪费今天的笑容。'
];

// 随机生成个性化签名
export function generateSignature() {
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
}




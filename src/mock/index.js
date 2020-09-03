import Mock from 'mockjs'
const Random = Mock.Random

const btnGet = ['primary', 'danger', 'text', 'link']
const btnPost = ['ghost', 'dashed', 'default']
const mockBtnPostData = () => Mock.mock({
  'list|10': [{
    'date': '@date',
    'date-yyyy-MM-dd': '@date(yyyy-MM-dd)',
    'date-yy-MM-dd': '@date(yy-MM-dd)',
    'date-y-MM-dd': '@date(y-MM-dd)',
    'date-y-M-d': '@date(y-M-d)',
    'line-through': '------------------------------------------------',
    'timessss': '@time', //随机的时间字符串,
    'time-format': '@time()', //指示生成的时间字符串的格式, default: 'HH: mm: ss',
    'time-format-1': '@time("A HH:mm:ss")',
    'time-format-2': '@time("a HH:mm:ss")',
    'time-format-3': '@time("HH:mm:ss")',
    'time-format-4': '@time("H:m:s")',
    'datetime': '@datetime("yyyy-MM-dd A HH:mm:ss")', //返回一个随机的日期和时间字符串
    'dateNow': '@now("second")' //获取当前完整时间
  }]
})
const mockBtnGetData = () => Mock.mock({
  'list|1-20': [{
    'id|+1': 1,
    'isBoolean': '@boolean(10, 0, true)',//百分之百的true
    'naturalNumber': '@natural(1, 1000)', //大于等于零的整数
    'integer': '@integer(0)', //随机整数
    'float': '@float(1, 100, 3, 6)', //随机浮点数, 
    'character': '@character("upper")', //一个随机字符
    'string': '@string("lower", 5, 20)', //一串随机字符串
    'range': '@range(1, 10, 2)', //一个整形数组，步长为2
    "array": [
      "a", "b", 'c', 'd', 'e',
      'f'
    ]
  }]
})

btnGet.forEach(item => {
  Mock.mock(`/dev/${item}`, 'get', mockBtnGetData())
})

btnPost.forEach(item => {
  Mock.mock(`/dev/${item}`, 'post', mockBtnPostData())
})
const imageSize = [
  '300x250', '250x250', '240x400', '336x280',
  '180x150', '720x300', '468x60', '234x60',
  '88x31', '120x90', '120x60', '120x240',
  '125x125', '728x90', '160x600', '120x600',
  '300x600'
]
// Random.image()
// Random.image( size )
// Random.image( size, background )
// Random.image( size, background, text )
// Random.image( size, background, foreground, text )
// Random.image( size, background, foreground, format, text )
Mock.mock(`/dev/mockImage`, 'get', Mock.mock({
  'status': 200,
  'lists': imageSize.map((item, index) => {
    return Random.image(item, Random.color(), Random.color(), Random.cword(1, 3))
  })
}))



import Mock from 'mockjs'


Mock.mock('/dev/primary', 'get', Mock.mock({
  'list|1-100': [{
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
}))


Mock.mock('/dev/ghost', 'post', Mock.mock({
  'dateList|10': [{
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
}))
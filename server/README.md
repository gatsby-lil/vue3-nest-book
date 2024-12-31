需要完成的功能todo: 2024/12/15

1. 注册
2. 登陆
3. 图书列表
4. 后端接口返回统一的数据格式
5. 后端数据格式校验
   5.1 必填项和数据类型
   5.2 自定义校验规则
   5.3 可选参数的设定
   5.4 设置默认值
6. 报错处理
   6.1 捕获错误
   6.2 报错信息国际化
7. 删除用户超级管理员才有权限删除用户
8. 查询接口过滤部分字段，只返回指定字段

学习：

2024/12/14 - 2024/12/15

1. 验证器
   1.1 注入依赖作用域useContainer(app.select(AppModule), { fallbackOnErrors:true })
2. \*provider的才可以注入依赖
3. 验证器默认值转换Transform
4. @validate的使用
5. 基于创建用户的dto，生成更新用户的dto

2024/12/17

1. 密码加密bcrypt库
2. exports本质是为了项目代码的规范
   例如A模块(AModule)如果想使用B模块(BModule)的BService
   B模块: exports: [BService] providers: [BService]
   A模块: imports: [BModule]

2024/12/18

1. 对用户的手机号进行转换
2. 日期格式进行转换

2024/12/19

1. 使用@ClassSerializerInterceptor和@SerializeOptions
   同时配合使用装饰器: @Exclude @Expose @Transform  
   当进行查询时, 使用该装饰器
   @Exclude 适用于查询的过滤返回
   @Expose 返回一个实体未定义的字段
   对Vo的数据进行过滤, 需要在实体中进行操作

2024/12/24

1. 建立用户和角色的关系
2. 按照创建时间排序

record:

1. 实体的类名和表名一致时, 无需取新名字, 否则要在Entity('表名')传入表名
2. 新增用户
3. 学习装饰器
   @IsArray(),
   @ArrayNotEmpty(),
   @IsInt({each: true})
4. typeorm
   order 排序

5. 用户关联角色
   5.1 需要获取用户的实体 typeorm的create方法
   5.2 获取角色的实体
   5.3 用户的实体关联字段赋值查找出的用户实体
   5.4 typeorm的save方法, 保存赋值后的实体

2024/12/27

1. 处理树形结构
   装饰器: @TreeRepository装饰的Entity 可以调用findTree方法 返回树形菜单
   不传递参数, 则返回父子关系
   findTree方法传递参数: {relations: ['parent', 'children']}, 返回父对子的关系, 以及子对父的关系

2024/12/31

1. dto使用装饰器@IsEnum配合@Transform会有些问题类型无法被转换

# 酒店资料维护说明

## 维护原则

界面程序只负责展示和筛选，酒店内容只保存在 `data/hotels/`。正常新增、修改、归档酒店时，不修改 HTML、CSS 或 JavaScript。

## 新增酒店

1. 复制 `data/templates/hotel.template.json`。
2. 使用稳定、简短的英文 ID，例如 `aana-resort`。
3. 文件名与 ID 保持一致，例如 `aana-resort.json`。
4. 草拟阶段保持 `"status": "draft"`。
5. 完成资料核验后改为 `"status": "published"`。
6. 将 `hotels/aana-resort.json` 加入 `data/index.json`。
7. 修改 `contentVersion`。建议格式为 `年.月.日.当日序号`。
8. 修改 `updatedAt`。
9. 运行 `npm run validate`。

## 修改酒店

只修改对应酒店 JSON。价格、图片或核验资料变化时，同时更新：

- `pricing.verifiedAt`
- `verification.updatedAt`
- `verification.summary`
- `data/index.json` 的 `contentVersion`
- `data/index.json` 的 `updatedAt`

## 归档和排除

不直接删除历史资料：

- 暂停营业、长期关闭或资料失效：使用 `archived`。
- 经核验不符合审美与筛选要求：使用 `excluded`。
- 未完成核验：使用 `draft`。

网站只展示 `published`。

## 图片规则

每张图片必须记录：

- `url`：图片地址。
- `type`：整体环境、水体、道路、建筑与植物、公共空间等。
- `source`：酒店官网、可靠旅行媒体或实景资料来源。
- `verified`：是否已确认与酒店对应。

正式收录至少需要两张图片，三张以上更完整。封面优先使用能表现酒店整体环境与空间关系的图片。

## 价格规则

- 币种统一为人民币。
- 基准为两位成人入住一间基础房、每晚价格。
- `minimum` 和 `maximum` 使用数字。
- `display` 只负责页面显示。
- 超过 180 天未复核会产生校验提醒。

## 介绍规则

每家酒店固定保留四个章节：

1. 地理位置与周边
2. 场地布局
3. 建筑、水体与植物
4. 抵达与实际条件

每个章节至少 60 个汉字。内容应包含可核验事实，不使用通用宣传语或面向观众的说教语言。

## 自动检查

`npm run validate` 会检查：

- 索引与酒店文件是否一致；
- ID 是否重复；
- 状态、等级和评分是否有效；
- 最低价是否高于最高价；
- 优点和缺点是否缺失；
- 四段介绍是否完整；
- 图片、携程和官网链接格式；
- 核验日期和价格更新时间；
- 图片数量及资料是否过期。

错误会阻止 GitHub Pages 发布，提醒不会阻止发布。

## 缓存与发布

页面每次打开时会使用无缓存请求读取 `data/index.json`，再根据 `contentVersion` 请求酒店文件。成功读取的数据会保存在浏览器本地缓存中；临时网络异常时显示最近一次成功数据。

更新酒店资料不再改动程序文件，也不需要更换资源文件名。

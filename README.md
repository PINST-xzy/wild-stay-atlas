# 野栖度假收藏馆

公开地址：<https://pinst-xzy.github.io/wild-stay-atlas/>

网站采用数据驱动结构。页面、筛选和详情布局与酒店资料相互独立；新增或修改酒店时，只更新 `data/` 目录。

## 日常更新

1. 复制 `data/templates/hotel.template.json`。
2. 将文件保存为 `data/hotels/<hotel-id>.json`。
3. 填写资料并将文件路径加入 `data/index.json`。
4. 更新 `data/index.json` 的 `contentVersion` 和 `updatedAt`。
5. 运行 `npm run validate`。
6. 提交到 `main` 分支，GitHub Pages 自动校验并发布。

完整说明见 [`docs/maintenance.md`](docs/maintenance.md)。

## 状态

- `draft`：草稿，不在网站展示。
- `published`：正式收录。
- `archived`：历史归档，不在网站展示。
- `excluded`：已排除，不在网站展示。

## 核心文件

- `data/index.json`：酒店数据索引和内容版本。
- `data/hotels/`：每家酒店的独立资料。
- `schema/hotel.schema.json`：数据结构规范。
- `scripts/validate-hotels.mjs`：发布前校验。
- `app-20260724-data.js`：稳定的页面渲染程序。

管理后台与私有写入接口不包含在本公开仓库中。

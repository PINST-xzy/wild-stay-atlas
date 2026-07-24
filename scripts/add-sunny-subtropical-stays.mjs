import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const today = "2026-07-24";
const img = (url, type, source = "酒店官网") => ({ url, type, source, verified: true });
const wix = id => `https://static.wixstatic.com/media/${id}`;
const singha = id => `https://www.singharaja-garden.com/cms/bilder/${id}.jpg`;
const turtle = (folder, file) => `https://images.squarespace-cdn.com/content/v1/69ae520fbc890f0279e04bef/${folder}/${file}`;
const roots = path => `https://www.thegreatroots.com/wp-content/uploads/${path}`;

const common = {
  schemaVersion: 1,
  status: "published",
  pricingDate: today,
};

const stays = [
  {
    ...common,
    id: "sarinbuana-eco-lodge",
    identity: {
      name: "萨林布阿纳生态小屋",
      englishName: "Sarinbuana Eco Lodge",
      country: "印度尼西亚",
      region: "巴厘岛塔巴南",
      locality: "巴图卡鲁山南坡",
      placeLabel: "印度尼西亚 · 巴厘岛塔巴南",
      hotelType: "山地生态小屋"
    },
    classification: {
      grade: "B", gradeLabel: "高度匹配", collection: "lodging",
      tags: ["天然泳池", "永久农业花园", "山地雨林", "独立木屋", "瀑布溪流", "阳光林隙"],
      waterTypes: ["天然泳池", "山间河流", "瀑布与水潭"],
      tradeoffs: ["位置偏远", "山地天气变化快", "设施偏生态型"]
    },
    pricing: { currency: "CNY", minimum: 700, maximum: 1400, display: "¥700–1,400", basis: "两位成人入住一栋基础小屋，每晚常见参考；税费、餐食与季节需按日期复核", verifiedAt: today },
    scores: { aesthetic: 93, value: 90, water: 90, greenery: 97, architecture: 88, exploration: 96 },
    editorial: {
      oneLine: "六栋小屋散落在巴图卡鲁山坡的果树、香料和雨林之间，天然池、河流与瀑布让水不再只是背景。",
      reason: "这里最动人的并非某一栋建筑，而是从餐厅、花园、树屋到天然池与河谷的连续过程。成熟树冠把小屋拆散隐藏，阳光从香蕉叶和果树缝隙落到坡地；水则从场内天然池延伸到清澈河段和瀑布。它有 Bambu Indah 那种“先走进环境、再发现住处”的空间次序，同时价格和规模更亲近。",
      advantages: [
        "官方确认场内有天然泳池、清澈河流与瀑布，亲水体验并非标准蓝色泳池替代品",
        "永久农业花园、成熟果树和邻近雨林形成多层植物，而不是草坪加椰树",
        "仅六栋独立小屋，建筑之间留有足够的林地、坡地和步行距离",
        "晴天时山坡拥有明亮林隙和远山光线，绿意浓密却不显得阴沉"
      ],
      disadvantages: [
        { level: "明显取舍", text: "山地位置偏远，从乌布或仓古通常仍需约一个半小时车程。" },
        { level: "轻微提醒", text: "雨季湿度、虫鸣和阵雨明显，天然水域状态也会随天气变化。" }
      ],
      fit: "喜欢明亮热带山林、天然水体、少量木屋和步行探索，并愿意用交通便利性换取安静的人。",
      notFit: "需要城市餐饮、夜生活、全天候大型设施或高度标准化服务的人。"
    },
    profile: {
      surroundingsSummary: "位于巴图卡鲁山约七百米海拔的农业与雨林交界，周边是传统村落、稻田、香料果园、山地河流和雨林徒步路径。",
      sections: [
        { title: "地理位置与周边", text: "小屋位于巴厘岛中西部塔巴南的巴图卡鲁山坡，远离南部海岸连续开发带。周边不是单一景点，而是稻田、传统村落、咖啡与可可种植地、山地雨林共同组成的生活景观；从住宿可安排穿越村落、梯田和森林的向导步行，适合把两三天都留在当地。" },
        { title: "场地布局", text: "场地顺着坡度展开，六栋形态各异的小屋并不排成一列，而是由果树、香料植物、菜园、石阶和弯曲小径逐段分隔。餐厅、树梢瑜伽空间、桑拿与天然池散布其间，移动时会经历开阔远景、树冠阴影和溪谷湿润区，空间有明显层次。" },
        { title: "建筑、水体与植物", text: "建筑以木、竹、石材和高挑屋顶为主，尺度接近林中住宅。永久农业花园提供香蕉、木瓜、咖啡、香料和高大乔木的复合层次；天然泳池的颜色与周围植物相近，河流和瀑布又把水体从人工管理的场地带到更野生的山谷，接近理想中的连续水环境。" },
        { title: "抵达与实际条件", text: "从乌布或仓古出发通常约一个半小时，机场出发会更久，最后一段进入山地乡村道路。这里海拔较高，早晚比巴厘南部凉爽，全年都可能下雨；四月至十月更容易遇到明亮干爽的画面，雨季则溪流充沛、植物更浓，但道路和徒步条件更湿滑。" }
      ],
      spatialRelationship: "小屋、花园、天然池、河谷和雨林沿山坡逐层出现，建筑始终被植物切碎，场地边界感很弱。",
      access: "乌布或仓古车程约 1.5 小时；建议预约接送，并至少连住两晚。"
    },
    media: {
      cover: wix("485b1c_b31a6b4b63824ed8b0639fba2d4359d4~mv2.jpg"),
      gallery: [
        img(wix("485b1c_b31a6b4b63824ed8b0639fba2d4359d4~mv2.jpg"), "山坡整体与树冠"),
        img(wix("485b1c_48ac9b608e314439bf0b999b6288bcb0~mv2.jpg"), "建筑藏于植物"),
        img(wix("485b1c_bcbc057e1d774245b1fc3936c8c0a866~mv2.jpeg"), "木屋外景"),
        img(wix("485b1c_90a6ba0314364eeca492db6a179bdc07~mv2.jpg"), "天然泳池"),
        img(wix("485b1c_7ecdfa17c02349efbb57f30a31ffbb1d~mv2.jpg"), "花园与步道"),
        img(wix("485b1c_de1427a9f7c44f50b3423b67e7f32366~mv2.jpg"), "客房内景"),
        img(wix("485b1c_ebf247eea19f4b3fbe0b5f2347d982e1~mv2.jpg"), "半开放公共空间"),
        img(wix("485b1c_8b75d5cea029453f8fc288b83df0ab02~mv2.jpg"), "河流与植物"),
        img(wix("485b1c_0d6545f8ecf34a999fcb6a43bfb4f212~mv2.jpg"), "阳光下的坡地花园"),
        img(wix("485b1c_10649ad3d5a24fd6a3c532a9706101f9~mv2.jpg"), "木屋起居空间"),
        img(wix("485b1c_13a476ca512f4a97ac56bff80d0ab0f2~mv2.jpg"), "餐饮与花园"),
        img(wix("485b1c_16a2e9b8da5c487ea6c87a10c44eeec4~mv2.jpg"), "林间休息区"),
        img(wix("485b1c_5368cea6ad9f48c4b2629266001d6d0d~mv2.jpg"), "小屋阳台"),
        img(wix("485b1c_5d99397d6ba041849880542f83ec265c~mv2.jpg"), "室内木构细节"),
        img(wix("485b1c_65acfbebb530406faac2dd8b364c5fc7~mv2.jpg"), "周边村落与山地"),
        img(wix("485b1c_7c64fdc1aa63429e9901b3c9e075a644~mv2.jpg"), "周边稻田与农业景观"),
        img(wix("485b1c_acd0afa337b04e5cbcaca66261f47e7a~mv2.jpg"), "瀑布亲水"),
        img(wix("485b1c_af7fe41bc3da4dccbd9bd2dcc01ef764~mv2.jpg"), "林下道路"),
        img(wix("485b1c_caf51c0920c54724bbbfdb151ac6af7d~mv2.jpg"), "周边雨林徒步"),
        img(wix("485b1c_e5b21a6cc5f94d3d94ce5e3c91429006~mv2.jpg"), "花园餐桌")
      ]
    },
    links: { ctrip: "https://www.ctrip.com/hotels/list?city=723", official: "https://www.baliecolodge.com/" },
    verification: { status: "verified", summary: "已核对官网营业信息、六栋小屋、天然泳池、河流瀑布、永久农业花园与交通描述；图片均来自酒店官网。价格为常见参考区间，需按日期复核。", updatedAt: today, sources: ["酒店官网", "官方图库", "公开预订价格"] }
  },
  {
    ...common,
    id: "bali-lush",
    identity: { name: "巴厘葱郁民宿", englishName: "Bali Lush", country: "印度尼西亚", region: "巴厘岛塔巴南", locality: "曼加斯村", placeLabel: "印度尼西亚 · 巴厘岛塔巴南", hotelType: "稻田花园民宿" },
    classification: {
      grade: "C", gradeLabel: "明亮田园取舍", collection: "lodging",
      tags: ["柚木老屋", "稻田边缘", "热带花园", "阳光泳池", "村落生活", "高性价比"],
      waterTypes: ["花园泳池", "稻田灌溉水系"], tradeoffs: ["泳池形状较规则", "内部天然水体少", "设计感弱于核心收藏"]
    },
    pricing: { currency: "CNY", minimum: 550, maximum: 1200, display: "¥550–1,200", basis: "两位成人入住基础木屋，每晚常见参考；房型与日期差异明显", verifiedAt: today },
    scores: { aesthetic: 87, value: 94, water: 68, greenery: 91, architecture: 86, exploration: 82 },
    editorial: {
      oneLine: "它不靠奇观取胜，而是把老柚木屋、明亮花园和仍在耕作的稻田接成一种松弛的乡村日常。",
      reason: "Bali Lush 的水景不够野生，但它很好地补上了“阳光丰沛、植物繁盛、住起来舒服”的一类选择。古老柚木屋有宽檐和通风的廊道，四周不是精修草坪，而是香蕉、椰子、花木和稻作农业。晴天的光线在木色、叶片和水面之间来回反射，气质比幽暗雨林更轻盈。",
      advantages: ["老柚木屋与热带花园之间尺度亲切，室内外转换自然", "周边仍是村落和稻田，走出院门就能看到农业景观", "价格相对克制，适合作为长住或路线中的舒适停留", "官方图库同时覆盖外景、室内、泳池、餐饮与周边田野"],
      disadvantages: [{ level: "明显取舍", text: "泳池较规则，且酒店内部没有河流、泉池或瀑布。" }, { level: "轻微提醒", text: "魅力偏田园生活和老屋花园，不是强烈的野生沉浸感。" }],
      fit: "更在意阳光、植物、老木屋与舒适价格，愿意减少水景要求的人。",
      notFit: "把天然河流、可探索水域或建筑实验性视为必要条件的人。"
    },
    profile: {
      surroundingsSummary: "位于塔巴南乡村腹地，院落外连接稻田、灌溉沟渠、村道和小型聚落，环境明亮开阔又保留热带植物包裹。",
      sections: [
        { title: "地理位置与周边", text: "Bali Lush 位于巴厘岛塔巴南县乡村，离南部密集旅游带有一段距离。附近不是连续商业街，而是稻田、灌溉沟渠、寺庙和村庄住宅组成的农业网络；适合慢走、骑行或以包车探索塔巴南山海之间的村落，也能把住宿本身当作安静停留点。" },
        { title: "场地布局", text: "几栋名称各异的传统柚木屋围绕花园、泳池和餐饮空间展开。院落尺度不大，却通过树木、花丛、廊道和高差形成多个可停留的小区域；房屋之间不会一览无余，既有明亮水面，也有屋檐下的阴影，整体比大型度假村更像一组被植物重新组织的乡居。" },
        { title: "建筑、水体与植物", text: "核心建筑是回收或保存下来的爪哇柚木屋，深色木材、雕花门窗与白色织物形成温暖但不浮夸的内景。泳池本身偏规则，是明确妥协；好在香蕉、棕榈、开花灌木和稻田边缘软化了池岸，水面在晴天承担反光和降温作用，而不是视觉中心。" },
        { title: "抵达与实际条件", text: "从巴厘南部机场或仓古前往通常需要较长车程，具体时间受道路拥堵影响。乡村位置意味着步行可达餐饮和商店有限，更适合安排司机或在住宿用餐。旱季光线更通透，稻田颜色取决于耕作周期；雨季植被更丰盛，但道路湿滑、蚊虫和短时强降雨也更明显。" }
      ],
      spatialRelationship: "老柚木屋围绕小型花园和泳池散置，院墙之外立即接上稻田与村路，内部精致度和外部农业感保持平衡。",
      access: "从仓古约 1.5 小时上下，机场通常更久；建议预约接送或包车。"
    },
    media: {
      cover: wix("046d7e_975e0949279f4bf9882b4cd7a71c3645~mv2.jpg"),
      gallery: [
        img(wix("046d7e_975e0949279f4bf9882b4cd7a71c3645~mv2.jpg"), "花园与木屋"),
        img(wix("046d7e_65022e29642248708120bd2342a28391~mv2.jpg"), "泳池与热带植物"),
        img(wix("046d7e_a83514bfd6304d0887b05df485b3f7c7~mv2.jpg"), "柚木屋外景"),
        img(wix("046d7e_5dc2d45dffec4de39bfb32d3d8a16df4~mv2.jpg"), "客房内景"),
        img(wix("046d7e_f2f95521324f4f42b39235dde40bd3a4~mv2.jpg"), "廊道与花园"),
        img(wix("046d7e_105c97c29caa4222b031dd2bccfcad33~mv2.jpg"), "浴室细节"),
        img(wix("046d7e_97785446db154f9282ff3c9fc82f9fe8~mv2.jpg"), "公共起居空间"),
        img(wix("046d7e_fb131fb8d63a48f480c946fbd2b14b8b~mv2.jpg"), "餐饮空间"),
        img(wix("046d7e_0227d1a048994a5799b4608ce6f19fd3~mv2.jpg"), "阳光泳池"),
        img(wix("046d7e_0949e6389090452a8907962bd07203e6~mv2.jpg"), "木屋室内"),
        img(wix("046d7e_23faaa7d5e24470e8e7949f73b04a159~mv2.jpg"), "花园小径"),
        img(wix("046d7e_4d2f96066e554eb28f208cb2f0c92a3e~mv2.jpg"), "卧室与木构"),
        img(wix("046d7e_5eeab6b7584345ac9baef16faac13a11~mv2.jpg"), "林下休息区"),
        img(wix("046d7e_6903640b6d854666b58f0388822b0bad~mv2.jpg"), "庭院外景"),
        img(wix("046d7e_78810f3f78c14211848a2de36658d602~mv2.jpg"), "周边稻田"),
        img(wix("046d7e_89f84a8d8c8046e0bcd7d7032148ba66~mv2.jpg"), "周边村路"),
        img(wix("046d7e_a1b34b622049453c95d50fe2a2e73424~mv2.jpg"), "房间露台"),
        img(wix("046d7e_abf59cffbea84a0f9d5d840ac0219c05~mv2.jpg"), "热带花木"),
        img(wix("046d7e_c83f9b1ad38a4f42bd6a24fc44c4c7a0~mv2.jpg"), "室内陈设"),
        img(wix("046d7e_ee009838299841dfa91ab67a2053e31d~mv2.jpg"), "周边农业景观")
      ]
    },
    links: { ctrip: "https://www.ctrip.com/hotels/list?city=723", official: "https://www.balilush.com/" },
    verification: { status: "verified", summary: "已核对官网的房型、柚木屋、花园泳池、乡村稻田位置与公开图库；图片均来自酒店官网。价格为常见参考，需按日期复核。", updatedAt: today, sources: ["酒店官网", "官方图库", "公开预订价格"] }
  },
  {
    ...common,
    id: "singharaja-garden",
    identity: { name: "辛哈拉贾花园生态小屋", englishName: "Singharaja Garden Agro & Eco Lodge", country: "斯里兰卡", region: "西部省", locality: "佩拉瓦塔", placeLabel: "斯里兰卡 · 佩拉瓦塔", hotelType: "农业生态小屋" },
    classification: {
      grade: "B", gradeLabel: "小尺度核心候选", collection: "lodging",
      tags: ["三公顷山坡", "仅三栋小屋", "天然瀑布池", "稻田水系", "有机农园", "热带阳光"],
      waterTypes: ["天然瀑布池", "淡水泳池", "稻田灌溉水系"], tradeoffs: ["交通偏远", "服务规模很小", "部分空间朴素"]
    },
    pricing: { currency: "CNY", minimum: 500, maximum: 1100, display: "¥500–1,100", basis: "两位成人入住基础房或小屋，每晚参考；套餐、餐食与接送另行核对", verifiedAt: today },
    scores: { aesthetic: 91, value: 94, water: 87, greenery: 96, architecture: 84, exploration: 91 },
    editorial: {
      oneLine: "三公顷梯田山坡只放下三栋小屋，天然瀑布池、茶园与稻作水系把住宿藏进真正的农业地景。",
      reason: "它的巧妙之处在于稀疏：建筑数量极少，大片空间仍留给茶、稻田、椰树、果园和未整理的热带坡地。不同小屋面对不同植物与水体，Tea Garden 靠近天然瀑布池，Paddy Field 面向梯田和类似灌溉渠的淡水池。这里没有大型度假村的完成感，却更接近一座能居住的植物园与农场。",
      advantages: ["约三公顷场地仅有三栋主题小屋、主屋和瑜伽空间，密度非常低", "天然瀑布池与农业水系让水有来源和方向，不只是装饰", "茶园、稻田、椰树与野生坡地形成丰富而明亮的热带层次", "价格通常处于可实践区间，适合把预算留给较长停留"],
      disadvantages: [{ level: "明显取舍", text: "住宿偏远且规模很小，不能期待大型酒店式餐饮与全天服务。" }, { level: "轻微提醒", text: "部分建筑和室内更偏朴素生态旅馆，设计精致度不均匀。" }],
      fit: "喜欢植物、农业、水系和少量建筑共同组成场地，并接受朴素服务的人。",
      notFit: "更在意豪华客房、丰富夜间活动或标准五星设施的人。"
    },
    profile: {
      surroundingsSummary: "三公顷梯田山坡位于斯里兰卡西南湿润地带，周边有橡胶、茶与稻作农业、村落道路和通往热带森林的乡间景观。",
      sections: [
        { title: "地理位置与周边", text: "小屋位于斯里兰卡西南部湿润地区的乡村山坡，并非海滨度假带。周围的橡胶、茶、稻田和村落构成连续农业景观，气候足以支撑浓密常绿植物；若安排车辆，可把住宿与西南部雨林、乡镇市场和种植园路线组合，但这里本身更适合慢下来观察场地。" },
        { title: "场地布局", text: "约三公顷的梯田坡地只建设三栋独立主题小屋、主屋和带公寓的瑜伽厅，建筑之间保留很长的植物和步行间隔。茶园小屋、稻田小屋与其他房间各自面对不同景观，小径沿坡地穿过农园、水池与林荫，视线经常被椰树和灌木切断。" },
        { title: "建筑、水体与植物", text: "建筑大量使用黏土、天然石材、砖和木材，色彩接近土壤。天然瀑布池隐藏在茶园与椰树之间，另一处淡水池借用了稻田灌溉水渠的形态；水体没有夺目的蓝色硬边，而是与坡地农业一起出现。强烈日照落在稻叶和棕榈上，使浓绿环境仍保持通透。" },
        { title: "抵达与实际条件", text: "这里不在常规城市酒店交通线上，最好预先与住宿确认接送、餐食和活动安排。西南季风会显著改变雨量、道路和水体状态，晴季更容易看到照片中的明亮层次，雨季则瀑布和植物最丰盛。生态型住宿意味着昆虫、蛙鸣和泥土气味都是体验的一部分。" }
      ],
      spatialRelationship: "极少量的土木建筑沿梯田坡地拉开距离，茶园、稻田、椰林与水池占据主体，人在小径中不断切换农业与林下空间。",
      access: "建议从科伦坡或南部线路预约车辆前往，并提前确认最后一段乡村道路。"
    },
    media: {
      cover: singha(1187),
      gallery: [
        img(singha(1187), "山坡场地整体"), img(singha(1188), "小屋与热带植物"), img(singha(1189), "梯田小径"),
        img(singha(1190), "天然瀑布池"), img(singha(1191), "水体与林下植物"), img(singha(1192), "亲水区域"),
        img(singha(1216), "茶园小屋外景"), img(singha(1223), "客房内景"), img(singha(1224), "木构与露台"),
        img(singha(1297), "稻田小屋"), img(singha(1304), "淡水池与植物"), img(singha(1306), "公共空间"),
        img(singha(1323), "周边农业景观"), img(singha(1324), "周边村落绿地"), img(singha(1325), "周边热带坡地"),
        img(singha(909), "餐饮与休息空间"), img(singha(903), "花园细节"), img(singha(1274), "小屋室内")
      ]
    },
    links: { ctrip: "https://www.ctrip.com/hotels/list?city=6047", official: "https://www.singharaja-garden.com/cms/en-the-lodge/" },
    verification: { status: "verified", summary: "已核对官网的三公顷场地、建筑数量、天然瀑布池、茶园与稻田小屋说明；图片来自酒店官网。价格为参考区间，需直接询价复核。", updatedAt: today, sources: ["酒店官网", "官方图库", "场地与房型介绍"] }
  },
  {
    ...common,
    id: "bamboo-turtles-ecolodge",
    identity: { name: "竹龟生态小屋", englishName: "Bamboo Turtles Ecolodge", country: "印度尼西亚", region: "巴厘岛吉安雅", locality: "乌布洛敦都", placeLabel: "印度尼西亚 · 乌布南部", hotelType: "河谷竹屋民宿" },
    classification: {
      grade: "B", gradeLabel: "河谷竹屋候选", collection: "lodging",
      tags: ["五栋竹屋", "Wos 河谷", "浓密树冠", "河景阳台", "小型泳池", "半开放浴室"],
      waterTypes: ["Wos 河", "河谷泳池"], tradeoffs: ["泳池具有无边设计", "水体接近但并非处处可进入", "位于乌布南部开发区边缘"]
    },
    pricing: { currency: "CNY", minimum: 700, maximum: 1400, display: "¥700–1,400", basis: "两位成人入住基础竹屋，每晚常见参考；税费与日期需复核", verifiedAt: today },
    scores: { aesthetic: 91, value: 89, water: 82, greenery: 96, architecture: 91, exploration: 80 },
    editorial: {
      oneLine: "五栋竹屋贴着 Wos 河谷树冠展开，阳台、半开放浴室和泳池把视线与河声持续带进居住空间。",
      reason: "它不是完整的大型聚落，更像把几间轻巧竹屋嵌进一段浓密河谷。优势来自近距离的树冠、河声和空气：从房间、露台到泳池都能感到水在下方流动，竹构弧线又减弱了建筑边界。虽然泳池带有无边缘视觉，仍因尺度小、植被贴近和真实河流存在而值得保留。",
      advantages: ["仅五栋竹屋，建筑轻、密度低，树冠在画面中始终比建筑更强", "Wos 河位于场地下方，河声与湿润空气进入阳台和公共区", "房间、浴室、外景和泳池均有完整官方图库，实际空间容易判断", "位置比偏远山区更便于与乌布餐饮和活动组合"],
      disadvantages: [{ level: "明显取舍", text: "主泳池采用面向河谷的无边设计，仍带有一定观景型空间逻辑。" }, { level: "轻微提醒", text: "场地规模有限，可探索性弱于拥有河滩、瀑布和大花园的生态小屋。" }],
      fit: "想住进浓密明亮的乌布河谷，重视竹构、树冠和室内外连续感的人。",
      notFit: "完全排斥无边泳池，或希望在酒店内部长距离徒步和直接下河的人。"
    },
    profile: {
      surroundingsSummary: "位于乌布南部洛敦都的 Wos 河谷边缘，周边是村落、稻田残片、工作室和通往乌布城区的道路，场内树冠明显浓于外部。",
      sections: [
        { title: "地理位置与周边", text: "住宿位于乌布中心以南的洛敦都，靠近 Wos 河穿过的低地。周边既有巴厘村落、稻田和林带，也受到乌布南部开发扩张影响；优点是前往乌布餐厅、寺庙和手工艺村相对容易，回到场内后又能迅速进入被河谷树冠隔开的安静环境。" },
        { title: "场地布局", text: "五栋竹制小屋依河谷坡度布置，公共泳池、餐饮和休息空间集中在可看见树冠与河谷的位置。场地不像大型度假村拥有很长路线，而是利用高差、植物遮挡和弯曲竹构制造私密感；从入口走向房间时，外部村路的存在感会逐渐被叶片和流水声替代。" },
        { title: "建筑、水体与植物", text: "竹屋以拱形骨架、编织表皮和宽阔开口为核心，室内大量保留竹材本色，半开放浴室让光与植物进入。Wos 河是真实环境底层，泳池则位于河谷上方并采用无边缘处理，这是审美妥协；但由于水面不大、树冠贴近池岸，整体没有普通悬崖酒店的空旷观景台感。" },
        { title: "抵达与实际条件", text: "从乌布中心驾车通常比西部山区住宿方便，但高峰期道路拥堵会拉长时间。河谷环境湿度高，雨季的河声、苔藓与蚊虫更明显；旱季上午和午后的斜光更容易穿过树冠，呈现用户偏好的明亮亚热带感。预订时可优先确认朝向河谷且遮挡较少的房型。" }
      ],
      spatialRelationship: "五栋竹屋沿河谷高差排列，树冠包围房间与小型公共区，真实河流在下方提供持续声音和湿度。",
      access: "从乌布中心驾车约 20–35 分钟，机场约 1–1.5 小时，均受拥堵影响。"
    },
    media: {
      cover: turtle("41e4fae9-4f4c-474f-b7f7-946d9c4b7893", "01.jpg"),
      gallery: [
        img(turtle("41e4fae9-4f4c-474f-b7f7-946d9c4b7893", "01.jpg"), "河谷整体"),
        img(turtle("70f17b71-9add-4919-a495-e9d5dc513296", "02.jpg"), "竹屋与树冠"),
        img(turtle("0d0cf6df-f098-4125-9807-9f8a5f5c1ad3", "03.jpg"), "客房内景"),
        img(turtle("73a496dd-00ad-475e-bb58-0d2529b596a1", "04.jpg"), "半开放浴室"),
        img(turtle("4d839e06-f726-4c4e-af14-6b3248d564fa", "05.jpg"), "卧室与竹构"),
        img(turtle("4b8c35ff-476a-4847-a77e-425997d7a6cc", "06.jpg"), "露台与植物"),
        img(turtle("b751da10-98ce-4b2a-b7c6-25987ae79644", "07.jpg"), "泳池与河谷"),
        img(turtle("331a977f-da79-45e9-8a0f-030489d46c3c", "08.jpg"), "公共休息区"),
        img(turtle("f0056dcb-d085-42a3-adb9-c64c5677cbdf", "09.jpg"), "建筑外景"),
        img(turtle("84ecc61b-4c97-4063-aa50-7ca773df92ca", "10.jpg"), "林下道路"),
        img(turtle("80c74bce-88c0-44b8-8ac7-94df06af0df3", "11.jpg"), "室内细节"),
        img(turtle("855ef352-3e15-40ff-9275-208dbee89dbb", "12.jpg"), "餐饮空间"),
        img(turtle("a1cb48a6-98f9-4cf1-aa5e-6d87d0928d5f", "13.jpg"), "河景阳台"),
        img(turtle("e01349de-0504-49ae-958e-04fb2a8b5b47", "14.jpg"), "热带花园"),
        img(turtle("e6590705-c500-4636-9ce8-1b751bbd6879", "15.jpg"), "水面与树影"),
        img(turtle("fde075d5-2700-4e72-b1a1-df20ad972da4", "16.jpg"), "周边 Wos 河谷"),
        img(turtle("e0b96725-6cf6-46a9-a98a-ca8802607791", "17.jpg"), "周边村落绿地"),
        img(turtle("149c0eae-6941-4c89-9d28-7acf84f7efa5", "18.jpg"), "黄昏公共区"),
        img(turtle("10308bb6-0c82-4d60-85a1-423ab53c3b6c", "19.jpg"), "夜间竹屋"),
        img(turtle("0619f922-f5a1-4cb8-a5bb-30a93288fc9f", "20.jpg"), "室内外连接")
      ]
    },
    links: { ctrip: "https://www.ctrip.com/hotels/list?city=723", official: "https://bambooturtleecolodge.com/" },
    verification: { status: "verified", summary: "已核对官网现行营业、五栋竹屋、Wos 河位置、泳池、Spa 和房间配置；20 张图片均来自酒店官方图库。价格需按日期复核。", updatedAt: today, sources: ["酒店官网", "官方图库", "公开预订价格"] }
  },
  {
    ...common,
    id: "great-roots-forestry-hot-spring",
    identity: { name: "大板根森林温泉酒店", englishName: "Great Roots Forestry Spa Resort", country: "中国台湾", region: "新北市", locality: "三峡区", placeLabel: "中国台湾 · 新北三峡", hotelType: "森林温泉度假酒店" },
    classification: {
      grade: "C", gradeLabel: "森林温泉取舍", collection: "resort",
      tags: ["亚热带森林", "温泉", "二十公顷园区", "森林步道", "鱼池花园", "家庭度假"],
      waterTypes: ["温泉池", "园林池塘", "山地溪沟"], tradeoffs: ["酒店建筑体量较大", "温泉区人工感明显", "部分设施偏传统家庭度假村"]
    },
    pricing: { currency: "CNY", minimum: 900, maximum: 1900, display: "¥900–1,900", basis: "两位成人入住基础房，每晚常见参考；周末、假期与含温泉套餐差异较大", verifiedAt: today },
    scores: { aesthetic: 84, value: 84, water: 82, greenery: 97, architecture: 68, exploration: 94 },
    editorial: {
      oneLine: "真正稀缺的是酒店背后二十公顷的低海拔亚热带森林：温泉之后可以直接走进巨大板根、蕨类和湿润林径。",
      reason: "这不是建筑美学型酒店，主体楼和温泉设施都偏传统；它值得收录，是因为森林并非远处背景，而是度假区可以长时间步行进入的核心。老茶园留下的二十公顷场地包含森林、鱼池、花园和步道，巨大板根与蕨类提供强烈包裹感。它以较容易抵达、价格相对可控的方式，把温泉和真实亚热带林地放在一起。",
      advantages: ["二十公顷园区保留大面积低海拔亚热带森林，可在住宿期间反复进入", "温泉、池塘、林径与湿润植物共同提供多种接近水的方式", "距离台北都市圈不远，实际抵达门槛低于偏远雨林酒店", "对家庭或同行偏好不同的人更友好，设施完整但仍有自然内容"],
      disadvantages: [{ level: "明显取舍", text: "客房楼与温泉馆建筑设计普通，无法提供 Bambu Indah 式的建筑融入感。" }, { level: "明显取舍", text: "部分温泉池形态规则、人工设施较多，繁忙时会削弱安静氛围。" }],
      fit: "重视可步行森林、温泉和交通可达性，愿意弱化建筑审美的人。",
      notFit: "要求每一处公共空间都保持小型、野生和高度设计感的人。"
    },
    profile: {
      surroundingsSummary: "度假区位于三峡山区，前身为茶园，约二十公顷场地中保存低海拔亚热带森林、板根植物、鱼池、花园和环形步道。",
      sections: [
        { title: "地理位置与周边", text: "酒店位于新北市三峡区山区，从台北都市圈可以公路抵达，却已经进入湿润的低海拔亚热带环境。周边以山林、溪谷、茶业历史和乡村道路为主；若延长停留，可与三峡老街、满月圆一带山林或北部温泉路线组合，但酒店自身的森林面积已足以安排半日慢走。" },
        { title: "场地布局", text: "场地体量明显大于小型民宿，客房楼、餐饮、温泉馆、花园和森林区分区存在。真正值得花时间的是从人工园林逐步进入旧茶园和原生次生林的过程：鱼池与开阔花园之后，步道转入树冠遮蔽、板根裸露和蕨类密集的林下，空间由家庭度假村渐变成森林。" },
        { title: "建筑、水体与植物", text: "温泉池和客房建筑并不精巧，部分水池规则且带有设施感；植物却拥有足够的年代和体量，巨大板根、藤本、蕨类与成熟乔木形成强包裹。水以温泉池、园林池塘和山地湿润沟谷出现，虽没有自然河流贯穿建筑，却能把泡汤与长距离森林步行接在一天之内。" },
        { title: "抵达与实际条件", text: "从台北市区自驾通常约一小时上下，公共交通可行但换乘与班次需要提前核对。北台湾冬季和雨季常有阴雨，照片中的绿意会更浓却未必阳光丰沛；想获得明亮舒适的亚热带观感，可优先选择春末至秋季的稳定晴天，并避开周末亲子客流高峰。" }
      ],
      spatialRelationship: "人工温泉与客房区位于前段，步道把人引向大面积成熟森林；自然不是建筑内部的一部分，却是整个度假区最有分量的腹地。",
      access: "台北市区自驾约 1 小时上下；公共交通需经三峡转乘，建议核对酒店接驳。"
    },
    media: {
      cover: roots("2021/07/foresto亞熱帶雨林4-2500x1666-1.jpeg"),
      gallery: [
        img(roots("2021/07/foresto亞熱帶雨林4-2500x1666-1.jpeg"), "亚热带森林整体"),
        img(roots("2021/07/2021.forest-reath-scaled.jpg"), "森林步道"),
        img(roots("2021/07/2021.oxysen-antiepidemic-scaled.jpg"), "林下板根与蕨类"),
        img(roots("2021/08/14525048231135-scaled.jpg"), "园区外景"),
        img(roots("2021/08/home-1024x768-1.jpg"), "建筑与花园"),
        img(roots("2016/12/5d8f82f78d051137810ffb697caf03f9.jpg"), "温泉池"),
        img(roots("2016/12/69ad9c3fa373bb91de000c6238b871d5.jpg"), "露天温泉"),
        img(roots("2016/12/daca87228944f9e73b0c20c529c692b1.jpg"), "水景与植物"),
        img(roots("2017/01/ae5f99eff03e7da2aec6324ecb54551e.jpg"), "客房内景"),
        img(roots("2017/01/be00b0d0e4f4fcdc5ae184d9d55c484c.jpg"), "公共空间"),
        img(roots("2017/03/bc83eba82019e24cb4178312a407fed6.jpg"), "餐饮空间"),
        img(roots("2017/06/977f9bc9f80258440e322ef0a08c31c4-1.jpg"), "家庭房与设施"),
        img(roots("2020/05/e0d27867cde5fda66035e0ac28b06e07.jpg"), "园林池塘"),
        img(roots("2020/05/40b5470a620039084a036e7f6901ba61-600x290-1.jpg"), "周边三峡山地"),
        img(roots("2020/05/fc49dc5772df334dbd79963d1221df4e-600x290-1.jpg"), "周边森林环境"),
        img(roots("2021/09/0014-1920x1080-1.jpg"), "园区道路"),
        img(roots("2021/09/50033e9e9410e97c2c1ec848b2c84644-1920x1080-1.jpg"), "森林活动区域"),
        img(roots("2020/02/dabangan-2.jpg"), "度假区整体")
      ]
    },
    links: { ctrip: "https://www.ctrip.com/hotels/list?city=617", official: "https://www.thegreatroots.com/en/" },
    verification: { status: "verified", summary: "已核对酒店官网现行营业、二十公顷旧茶园森林、温泉和园区设施；图片来自酒店官网媒体库。价格需按具体日期、房型与温泉套餐复核。", updatedAt: today, sources: ["酒店官网", "台湾观光资料", "官方媒体库"] }
  }
];

for (const stay of stays) {
  delete stay.pricingDate;
  await writeFile(join(root, "data", "hotels", `${stay.id}.json`), `${JSON.stringify(stay, null, 2)}\n`);
}

const indexPath = join(root, "data", "index.json");
const index = JSON.parse(await readFile(indexPath, "utf8"));
for (const stay of stays) {
  const entry = `hotels/${stay.id}.json`;
  if (!index.hotels.includes(entry)) index.hotels.push(entry);
}
index.contentVersion = "2026.07.24.9";
index.updatedAt = today;
await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Added ${stays.length} stays with ${stays.reduce((n, stay) => n + stay.media.gallery.length, 0)} verified gallery images.`);

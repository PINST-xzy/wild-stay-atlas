import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const today = "2026-07-24";
const commons = {
  khao: [
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Khao%20Sok%2C%20Cheow%20Lan%20Lake%2C%20Surat%20Thani%2C%20Thailand.jpg?width=1600", "周边国家公园湖泊"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Khao%20Sok%20primary%20tropical%20rainforest%2C%20southern%20Thailand.jpg?width=1600", "周边原生雨林"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Khao%20Sok%20National%20Park%20Surat%20Thani%20Thailand.jpg?width=1600", "周边森林道路"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Khao%20Sok%20river.jpg?width=1600", "周边 Sok 河"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Footbridge%20in%20Khao%20Sok%20National%20Park.jpg?width=1600", "周边雨林步桥"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Bamboo%20forest%20in%20Khao%20Sok%20National%20Park.jpg?width=1600", "周边竹林步道"]
  ],
  bukit: [
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Bukit%20Lawang%2C%20Langkat%20Regency%2C%20North%20Sumatra%2C%20Indonesia.jpg?width=1600", "周边河岸村落"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Reka%20Bahorok%2C%20Bukit%20Lawang%2C%20Sumatra%2C%20Indonezija.JPG?width=1600", "周边 Bahorok 河"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Wisata%20Air%20Bukit%20Lawang.jpg?width=1500", "周边亲水活动"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Bukit%20Lawang%20bridge%20over%20Bohorok.jpg?width=1600", "周边跨河吊桥"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Kawasan%20Hutan%20Bukit%20Lawang.jpg?width=1600", "周边勒塞尔山雨林"],
    ["https://commons.wikimedia.org/wiki/Special:FilePath/Sungai%20Bahorok%204.jpg?width=1600", "周边河流水体"]
  ]
};

const image = (url, type, source) => ({ url, type, source, verified: true });
const surrounding = (rows, source) => rows.map(([url, type]) => image(url, type, source));

function record({id, name, englishName, country, region, locality, hotelType, tags, waterTypes, tradeoffs, price, scores, oneLine, reason, advantages, disadvantages, fit, notFit, surroundingsSummary, sections, spatialRelationship, access, cover, gallery, ctrip, official, sources}) {
  return {
    schemaVersion: 1, id, status: "published",
    identity: {name, englishName, country, region, locality, placeLabel: `${country} · ${locality}`, hotelType},
    classification: {grade: "C", gradeLabel: "性价比取舍", collection:"lodging", tags, waterTypes, tradeoffs},
    pricing: {currency:"CNY", minimum:price[0], maximum:price[1], display:`¥${price[0]}–${price[1]}`, basis:"两位成人入住一间基础房，每晚参考；日期与税费需复核", verifiedAt:today},
    scores,
    editorial: {oneLine, reason, advantages, disadvantages, fit, notFit},
    profile: {surroundingsSummary, sections, spatialRelationship, access},
    media: {cover, gallery},
    links: {ctrip, official},
    verification: {status:"verified", summary:"已核对官网位置、房型、场地环境、主要水体与抵达条件；价格按官网公开起价或当地常见区间换算，预订前需按日期复核。", updatedAt:today, sources}
  };
}

const khaoCtrip = "https://www.ctrip.com/hotels/list?city=60220";
const bukitCtrip = "https://www.ctrip.com/hotels/list?city=60221";

const lodgings = [
  record({
    id:"our-jungle-house", name:"我们的丛林之家", englishName:"Our Jungle House", country:"泰国", region:"泰国南部", locality:"考索国家公园", hotelType:"河岸树屋与雨林旅馆",
    tags:["树屋","河岸","私人雨林","林间小径","无空调"], waterTypes:["Sok 河","河滩","雨林溪流"], tradeoffs:["无空调","房内无网络","多虫潮湿","设施朴素"],
    price:[480,1150], scores:{aesthetic:91,value:91,water:86,greenery:97,architecture:80,exploration:93},
    oneLine:"树屋和平房分散在河岸私人雨林中，房门外就是林间小径、河声和石灰岩山体。",
    reason:"这里的优势不是房间豪华，而是住宿真正进入雨林内部。树屋和平房在约十二英亩林地中拉开距离，公共餐厅、河滩、按摩亭和短途步道沿河组织，住客可以直接下到水边或从住宿区步行进入林下空间。",
    advantages:["树屋、河岸、林间道路和树冠处于同一连续空间","场地内有可接近的河滩和三条短途雨林步道","基础房价明显低于多数设计型雨林度假村"],
    disadvantages:[{level:"明显取舍",text:"房间无空调、电视和房内网络，主要依靠遮阴与自然通风。"}, {level:"轻微提醒",text:"开放式环境意味着昆虫、野生动物声音和潮湿感都更明显。"}],
    fit:"愿意牺牲标准化设施，换取真正河岸雨林包裹感的人。", notFit:"需要空调、安静隔音、无虫环境或完整城市服务的人。",
    surroundingsSummary:"位于 Khlong Sok 河岸，住宿区外仍是考索村落、国家公园雨林、石灰岩山体与通往 Cheow Lan 湖的活动网络。",
    sections:[
      {title:"地理位置与周边",text:"住宿位于素叻他尼府考索国家公园入口附近的 Khlong Sok 河岸。周围不是独立景观围墙，而是雨林、河流、石灰岩山体和小型旅游村落连续出现；餐饮与基础商店可在村内解决，Cheow Lan 湖需要另外乘车进入。"},
      {title:"场地布局",text:"树屋与地面平房分散在约十二英亩私人雨林中，彼此保持距离。餐厅和酒吧面向河流，河滩、按摩亭与三条短步道嵌入林下；从房间到公共区域需要沿着树木、坡地和河岸小径移动。"},
      {title:"建筑、水体与植物",text:"建筑以木材、竹材、茅草感屋面和开放式阳台为主，树屋抬离地面但并非高处观景台。Sok 河紧邻住宿区，部分房型能听见或看见河流；成熟热带树木、藤蔓和林下植物比建筑更占据视野。"},
      {title:"抵达与实际条件",text:"通常从素叻他尼、普吉或甲米乘车抵达考索，再由道路进入住宿。房间没有空调和房内网络，夜间会有虫鸣与动物活动；雨季河况、道路湿滑和活动取消风险需要提前考虑。"}
    ],
    spatialRelationship:"树屋与平房散置在河岸雨林，餐厅、河滩、按摩亭和步道由林下道路串联，水体属于日常活动空间而非远景。",
    access:"从素叻他尼约两小时车程；普吉或甲米通常约三至四小时，具体接送按官网确认。",
    cover:"https://www.khaosokaccommodation.com/_next/image?q=75&url=%2Fimages%2Fpages%2Fhome%2Fhero.jpg&w=3840",
    gallery:[
      image("https://www.khaosokaccommodation.com/_next/image?q=75&url=%2Fimages%2Fpages%2Fhome%2Fhero.jpg&w=3840","树屋与雨林","酒店官网"),
      image("https://www.khaosokaccommodation.com/_next/image?q=75&url=%2Fimages%2Fpages%2Frooms%2Froom-video-poster.jpg&w=3840","住宿整体","酒店官网"),
      image("https://www.khaosokaccommodation.com/_next/image?q=75&url=%2Fimages%2Fpages%2Four-resort%2Frestaurant.jpg&w=3840","河岸餐厅","酒店官网"),
      image("https://www.khaosokaccommodation.com/_next/image?q=75&url=%2Fimages%2Fpages%2Four-resort%2Fbeach.jpg&w=3840","场地内河滩","酒店官网"),
      image("https://www.khaosokaccommodation.com/_next/image?q=75&url=%2Fimages%2Fpages%2Four-resort%2Ftrails.jpg&w=3840","林间步道","酒店官网"),
      image("https://www.khaosokaccommodation.com/_next/image?q=75&url=%2Fimages%2Fpages%2Four-resort%2Fresort.jpg&w=3840","周边农场与雨林","酒店官网"),
      ...surrounding(commons.khao,"Wikimedia Commons")
    ], ctrip:khaoCtrip, official:"https://www.khaosokaccommodation.com/", sources:["酒店官网","考索国家公园公开实景","近期住宿资料"]
  }),
  record({
    id:"our-jungle-camp", name:"我们的丛林营地", englishName:"Our Jungle Camp", country:"泰国", region:"泰国南部", locality:"考索国家公园", hotelType:"河岸生态营地与树屋",
    tags:["树屋","竹屋","夯土屋","有机农场","河岸"], waterTypes:["Sok 河","雨林溪流"], tradeoffs:["开放式房间","无空调","现金结算","设施简单"],
    price:[500,980], scores:{aesthetic:87,value:93,water:83,greenery:94,architecture:77,exploration:91},
    oneLine:"竹木树屋、平房、农田和河流组成朴素的雨林聚落，价格没有因自然环境被抬到收藏级。",
    reason:"场地夹在考索雨林与 Sok 河之间，住宿类型从树屋、竹屋到夯土平房都有。建筑设计感不如 Bambu Indah，但河流、稻田、农场、林下树屋和石灰岩背景共同构成完整环境，适合作为性价比取舍型核心候选。",
    advantages:["官网基础平房起价约2240泰铢，整体价格相对可控","树屋、河流、稻田和有机农场提供多种场地层次","房屋使用竹木等天然材料并保持开放通风"],
    disadvantages:[{level:"明显取舍",text:"建筑细部和公共空间较朴素，不能期待精品设计酒店的完成度。"}, {level:"轻微提醒",text:"开放式无空调住宿可能闷热、多虫，部分消费需要现金结算。"}],
    fit:"把自然位置、河流和价格放在服务精致度之前的人。", notFit:"需要封闭空调房、强隔音和成熟度假村服务的人。",
    surroundingsSummary:"位于考索村外缘，Sok 河、农田、石灰岩山体和国家公园雨林共同包围住宿。",
    sections:[
      {title:"地理位置与周边",text:"营地位于素叻他尼府 Klong Sok，处在国家公园雨林、Sok 河和乡村农田之间。周边可进入考索国家公园，也可前往 Cheow Lan 湖；附近不是城市商业区，活动、接送和餐饮主要依靠营地或考索村。"},
      {title:"场地布局",text:"树屋、双层家庭树屋、河景平房、稻田平房和夯土屋分散设置，开放式会所、餐厅和有机农场承担公共活动。建筑不形成整齐排布，而是根据河岸、林地和农田穿插，步行过程比单一观景面更重要。"},
      {title:"建筑、水体与植物",text:"树屋和平房使用竹、木等天然材料，部分抬高约四米进入树冠，另一些贴近河流或稻田。Sok 河是住宿边界和活动水体，植物以自然雨林和农场种植混合，不是规则草坪式园林。"},
      {title:"抵达与实际条件",text:"从素叻他尼、普吉或甲米需要长途车辆接驳。房间多为风扇和纱帐，没有空调，开放结构会带来昆虫、湿气和自然声；官网公开价格以泰铢计，家庭树屋价格明显高于基础平房。"}
    ],
    spatialRelationship:"河流、树屋、稻田、农场与开放式公共空间彼此穿插，建筑服从既有自然与农业地形。",
    access:"从素叻他尼约两小时车程；也可由普吉、甲米或苏梅方向组合车船抵达。",
    cover:"https://roadtriptohappiness.nl/wp-content/uploads/2022/03/Our-Jungle-Camp-Eco-Resort-3.jpg",
    gallery:[
      image("https://roadtriptohappiness.nl/wp-content/uploads/2022/03/Our-Jungle-Camp-Eco-Resort-3.jpg","营地整体","Roadtrip to Happiness 实住资料"),
      image("https://roadtriptohappiness.nl/wp-content/uploads/2022/03/Our-Jungle-Camp-Eco-Resort-8.jpg","林间树屋","Roadtrip to Happiness 实住资料"),
      image("https://roadtriptohappiness.nl/wp-content/uploads/2022/03/Our-Jungle-Camp-Eco-Resort.jpg","河岸平房","Roadtrip to Happiness 实住资料"),
      image("https://roadtriptohappiness.nl/wp-content/uploads/2022/03/Our-Jungle-Camp-Eco-Resort-6.jpg","树屋与植被","Roadtrip to Happiness 实住资料"),
      image("https://roadtriptohappiness.nl/wp-content/uploads/2022/03/Our-Jungle-Camp-Eco-Resort-4.jpg","公共自然环境","Roadtrip to Happiness 实住资料"),
      image("https://chimptrips.com/wp-content/uploads/2023/08/Treehouse-at-Our-Jungle-Cam.jpg","树屋与河岸","Chimptrips 实住资料"),
      ...surrounding(commons.khao,"Wikimedia Commons")
    ], ctrip:khaoCtrip, official:"https://www.khaosokecoresort.com/", sources:["酒店官网","官网房型页","考索公开实景"]
  }),
  record({
    id:"ecotravel-cottages", name:"生态旅行小屋", englishName:"EcoTravel Cottages", country:"印度尼西亚", region:"北苏门答腊", locality:"武吉拉旺", hotelType:"雨林边缘精品民宿",
    tags:["雨林阳台","河谷村落","竹木建筑","小型民宿","高性价比"], waterTypes:["Bahorok 河","Landak 河","雨林溪流"], tradeoffs:["酒店内部水景少","规模很小","依赖村落公共环境"],
    price:[330,720], scores:{aesthetic:85,value:95,water:77,greenery:94,architecture:78,exploration:91},
    oneLine:"房间本身朴素，但阳台、河谷村落和勒塞尔山雨林把低价住宿放进了完整的自然生活环境。",
    reason:"这家小型住宿不像大型度假村那样塑造人工水景，价值主要来自武吉拉旺本身。竹木和茅草感建筑藏在热带植物中，阳台面对雨林；出门即可进入河岸、吊桥、村落小径和国家公园活动网络。",
    advantages:["价格远低于高端雨林酒店，房间仍保留宽阳台与雨林视野","住宿位于武吉拉旺河谷生活网络中，徒步和亲水不依赖酒店设施","规模小、天然材料较多，没有大型泳池和草坪问题"],
    disadvantages:[{level:"明显取舍",text:"酒店内部没有丰富公共水景，主要水体来自周边河流。"}, {level:"轻微提醒",text:"更像条件较好的雨林民宿，公共设施和服务项目有限。"}],
    fit:"希望用较低预算住在雨林河谷，并接受把公共环境当作度假空间的人。", notFit:"期待酒店内部拥有完整泳池、水疗和精致公共空间的人。",
    surroundingsSummary:"位于武吉拉旺村与 Gunung Leuser 国家公园边缘，河流、吊桥、雨林入口和村落餐饮都在步行活动范围内。",
    sections:[
      {title:"地理位置与周边",text:"住宿位于北苏门答腊武吉拉旺，靠近 Gunung Leuser 国家公园入口。村落沿 Bahorok 河狭长展开，周围有河岸餐厅、吊桥、步行小径和雨林徒步服务；Landak 河与周边村庄可通过当地活动到达。"},
      {title:"场地布局",text:"住宿规模较小，以两层小屋、客房阳台、花园植物和半开放休息区域组成，不具备大型度假村的复杂公共设施。真正的空间延伸发生在门外：沿村落小径和吊桥连接河岸、餐饮与雨林入口。"},
      {title:"建筑、水体与植物",text:"建筑使用竹、木、石材与茅草感屋檐，房间和阳台由浓密热带植物遮挡。酒店内部水体较弱，但 Bahorok 河、Landak 河和雨林溪流构成周边体验，属于以目的地弥补场地水景的典型取舍。"},
      {title:"抵达与实际条件",text:"从棉兰机场或市区乘车通常约四至五小时，抵达村落后根据具体位置步行或短途转运。住宿条件比最基础河岸木屋完整，但仍应预期潮湿、虫鸣、村落道路不平和雨季河况变化。"}
    ],
    spatialRelationship:"小型花园住宿作为武吉拉旺河谷网络中的落脚点，内部空间简单，外部河流、吊桥、村落与雨林承担主要魅力。",
    access:"从棉兰乘车约四至五小时；可由住宿安排接送，进入上游区域可能仍需步行。",
    cover:"https://www.sumatra-ecotravel.com/wp-content/uploads/2018/12/EcoTravel-Cottages-1024x768.jpg",
    gallery:[
      image("https://www.sumatra-ecotravel.com/wp-content/uploads/2018/12/EcoTravel-Cottages-1024x768.jpg","住宿整体","酒店官网"),
      image("https://www.sumatra-ecotravel.com/wp-content/uploads/2020/06/EcoTravel-Cottages-Bukit-Lawang-copy.jpg","建筑与植物","酒店官网"),
      image("https://commons.wikimedia.org/wiki/Special:FilePath/EcoLodgeBukitLawang.JPG?width=1600","周边生态住宿形态","Wikimedia Commons"),
      image("https://commons.wikimedia.org/wiki/Special:FilePath/Sungai%20Bahorok%203.jpg?width=1600","周边河岸植被","Wikimedia Commons"),
      image("https://commons.wikimedia.org/wiki/Special:FilePath/BukitLawang.jpg?width=1600","周边河谷聚落","Wikimedia Commons"),
      image("https://commons.wikimedia.org/wiki/Special:FilePath/Bukit%20lawang.jpg?width=1600","周边村落与雨林","Wikimedia Commons"),
      ...surrounding(commons.bukit,"Wikimedia Commons")
    ], ctrip:bukitCtrip, official:"https://www.sumatra-ecotravel.com/ecotravel-cottages/", sources:["酒店官网","武吉拉旺公开实景","当地活动资料"]
  }),
  record({
    id:"sumatra-orangutan-explore-guesthouse", name:"苏门答腊红毛猩猩探索民宿", englishName:"Sumatra Orangutan Explore Guesthouse", country:"印度尼西亚", region:"北苏门答腊", locality:"武吉拉旺", hotelType:"河岸家庭民宿",
    tags:["河岸阳台","雨林正对面","小型民宿","空调房","低价"], waterTypes:["Bahorok 河","雨林溪流"], tradeoffs:["建筑普通","房间数量少","公共空间简单"],
    price:[150,310], scores:{aesthetic:82,value:99,water:89,greenery:95,architecture:62,exploration:92},
    oneLine:"建筑谈不上设计感，但约一两百元就能从阳台正对 Bahorok 河和勒塞尔山雨林。",
    reason:"它最能体现这次扩展的意义：不必把每一家住宿都要求成 Bambu Indah。民宿只有少量客房，建筑普通，但处在河岸最关键的位置；阳台、河声、对岸雨林和步行可达的村落餐饮提供了极高的环境回报。",
    advantages:["官网公开双人房约30万印尼盾，性价比极高","位于 Bahorok 河岸，对面直接是勒塞尔山雨林","少量客房提供空调、热水和网络，基础舒适度高于许多河岸木屋"],
    disadvantages:[{level:"明显取舍",text:"建筑和公共空间设计感较弱，魅力主要来自位置而非酒店营造。"}, {level:"轻微提醒",text:"一层部分房型视线会被餐厅遮挡，应优先选择二层河景阳台。"}],
    fit:"预算有限，但非常看重河流、雨林视野和步行探索的人。", notFit:"追求建筑美学、园林细节或完整度假村公共设施的人。",
    surroundingsSummary:"民宿位于 Bahorok 河岸，距原有客栈约120米，步行可达武吉拉旺中心、餐厅和其他河岸住宿。",
    sections:[
      {title:"地理位置与周边",text:"民宿建在武吉拉旺 Bahorok 河岸，对面就是 Gunung Leuser 雨林。它仍靠近村落中心和餐厅，步行即可进入河岸生活区；国家公园徒步、漂流和村落活动可由当地向导组织，不需要入住昂贵度假村。"},
      {title:"场地布局",text:"建筑规模很小，由四间家庭房、一间标准双人房、餐厅和阳台组成。二层房间获得最完整的河流与雨林视线，一层阳台会经过餐厅区域；它不是可长时间探索的封闭园林，场地魅力需要与外部河岸共同理解。"},
      {title:"建筑、水体与植物",text:"建筑为普通的当地小型旅馆形态，天然材料与设计表达有限。真正强势的是紧邻建筑的 Bahorok 河和对岸连续雨林，阳台将水声、树冠与村落活动直接带入住宿体验，属于位置优于建筑的高性价比候选。"},
      {title:"抵达与实际条件",text:"从棉兰乘车约四至五小时抵达武吉拉旺，再沿村落道路或河岸步行进入。官网公开标准双人房约30万盾、家庭房约40万至50万盾；房间数量少，应提前询价，并明确要求二层河景阳台。"}
    ],
    spatialRelationship:"小型客房楼贴近河岸布置，以阳台直接连接河流和对岸雨林；酒店内部简单，外部村落与雨林构成主要公共空间。",
    access:"从棉兰机场或市区乘车约四至五小时，最后一段根据车辆停靠位置步行进入。",
    cover:"https://static.wixstatic.com/media/9db3f0_f573ddcb8baf4b46a17e843232db6b7c~mv2.jpg",
    gallery:[
      image("https://static.wixstatic.com/media/9db3f0_f573ddcb8baf4b46a17e843232db6b7c~mv2.jpg","民宿整体与雨林","酒店官网"),
      image("https://static.wixstatic.com/media/9db3f0_a3c9a7131f37488ea0ee9b8a2becf858~mv2.jpg","河景阳台","酒店官网"),
      image("https://static.wixstatic.com/media/9db3f0_ac2bf546ef0f4ac2a0a6f41427869255~mv2.jpg","客房与植物","酒店官网"),
      image("https://static.wixstatic.com/media/9db3f0_c2bf37926b644619b97560681368e667~mv2.jpg","公共区域","酒店官网"),
      image("https://static.wixstatic.com/media/9db3f0_0561b33d230b452caca2ab2fd93b156e~mv2.jpg","建筑外部","酒店官网"),
      image("https://static.wixstatic.com/media/9db3f0_f198772955bb4fbe916fe0c24e0cc058~mv2.jpg","河流与对岸雨林","酒店官网"),
      ...surrounding(commons.bukit,"Wikimedia Commons")
    ], ctrip:bukitCtrip, official:"https://www.sumatra-orangutan-explore.com/our-new-lodge-sumatra-orangutan-explore", sources:["民宿官网","官网房价与房型说明","武吉拉旺公开实景"]
  })
];

for (const lodging of lodgings) {
  await writeFile(join(root, "data", "hotels", `${lodging.id}.json`), `${JSON.stringify(lodging, null, 2)}\n`);
}

const indexPath = join(root, "data", "index.json");
const index = JSON.parse(await readFile(indexPath, "utf8"));
for (const lodging of lodgings) {
  const path = `hotels/${lodging.id}.json`;
  if (!index.hotels.includes(path)) index.hotels.push(path);
}
index.contentVersion = "2026.07.24.8";
index.updatedAt = today;
await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);

const bukitPath = join(root, "data", "destinations", "bukit-lawang.json");
const bukit = JSON.parse(await readFile(bukitPath, "utf8"));
bukit.profile.stayStrategy = "优先查看 Sumatra Orangutan Explore Guesthouse 的二层河景房、EcoTravel Cottages，或河岸中上游约30万至50万印尼盾的基础木屋；先确认阳台是否真正面向河流与雨林，不必为豪华设施提高预算。";
bukit.verification.updatedAt = today;
await writeFile(bukitPath, `${JSON.stringify(bukit, null, 2)}\n`);

const furnasPath = join(root, "data", "destinations", "furnas.json");
const furnas = JSON.parse(await readFile(furnasPath, "utf8"));
furnas.profile.stayStrategy = "优先检索 Furnas 镇中心的 Atlantic 3 Bicas、Vale dos Encantos、Quinta de Santana 等家庭旅馆或花园客房，把预算留给公共温泉、植物园和租车；这些住宿不是景观核心，但步行位置和价格更实用。";
furnas.verification.updatedAt = today;
await writeFile(furnasPath, `${JSON.stringify(furnas, null, 2)}\n`);

console.log(`Added ${lodgings.length} lodging records`);

import {readFile,readdir,writeFile} from "node:fs/promises";
import {join} from "node:path";
import {fileURLToPath} from "node:url";

const root=fileURLToPath(new URL("..",import.meta.url));
const hotelDir=join(root,"data","hotels");
const destinationDir=join(root,"data","destinations");
const imgPattern=/餐|食|菜|早餐|晚餐|restaurant|dining|food|厨房|烧烤|火锅/i;

const cuisines={
  bali:{
    style:"巴厘传统饮食重香料、椰香与炭火，常把米饭、蔬菜、肉类和数种参巴组合在同一餐桌上；它不是单纯的“东南亚辣味”，而是姜黄、南姜、香茅、椰丝和新鲜香草共同形成的复合香气。",
    highlights:[
      {name:"Nasi Campur",description:"米饭配蔬菜、参巴、鸡肉或鱼及多种小菜，是最日常也最能观察不同家庭风味的一盘。"},
      {name:"Lawar",description:"切细蔬菜、椰丝、香料与肉类拌合而成，口感和香气层次鲜明。"},
      {name:"Sate Lilit",description:"鱼肉或鸡肉拌椰丝与香料后缠在竹签、香茅梗上炭烤，是巴厘代表性烤物。"},
      {name:"Sambal Matah",description:"生香茅、红葱、辣椒与青柠调成的鲜辣参巴，常与烤鱼和米饭同食。"}
    ]
  },
  southThailand:{
    style:"泰国南部菜受海洋、马来半岛和热带香料影响，味道通常比中部更直接：酸、辣、姜黄、椰奶与大量新鲜海产并行。雨林内陆又会加入竹笋、野菜、河鱼和简单炭烤。",
    highlights:[
      {name:"Gaeng Som",description:"以罗望子和辣椒形成酸辣汤底，常煮鱼、虾或蔬菜，是南泰最鲜明的味型。"},
      {name:"Khao Yam",description:"米饭拌香草、豆芽、椰丝和咸鲜酱汁，清爽且能体现南部植物香气。"},
      {name:"姜黄海鲜",description:"姜黄、蒜和胡椒常用于鱼虾炖煮或煎炒，香气浓而不依赖甜味。"},
      {name:"林地家常菜",description:"竹笋、蕨菜、香蕉花和河鱼会随季节进入雨林旅馆餐桌。"}
    ]
  },
  trat:{
    style:"泰国达叻府的饮食建立在海湾渔获、果园和泰柬边境香料之上。海鲜新鲜直接，地方菜又偏爱罗望子、胡椒与酸叶；榴莲、红毛丹和蛇皮果等果园收成也会进入甜品与饮料。",
    highlights:[
      {name:"Kaeng Mu Chamuang",description:"猪肉与 chamuang 酸叶慢炖，酸香能平衡肉脂，是达叻和泰国东部的传统菜。"},
      {name:"海湾炭烤海鲜",description:"鱼、虾、鱿鱼和贝类以炭烤或清蒸突出鲜度，蘸酸辣海鲜汁。"},
      {name:"胡椒蟹与海鲜",description:"附近地区出产胡椒，常与蟹、虾和贝类组合成辛香而鲜甜的菜。"},
      {name:"东部热带水果",description:"榴莲、山竹、红毛丹和蛇皮果随季节出现，果香是当地餐桌的重要部分。"}
    ]
  },
  indonesiaSumatra:{
    style:"北苏门答腊的饮食比旅游区常见印尼菜更辛香浓厚。巴塔克、马来与米南风味在此交会，姜花、安达利曼花椒、椰奶、酸味和炭烤共同塑造山林与河谷餐桌。",
    highlights:[
      {name:"Soto Medan",description:"椰奶香料汤配鸡肉或牛肉、土豆和香草，汤体浓郁，是棉兰代表性日常食物。"},
      {name:"Arsik",description:"巴塔克风格香料炖鱼，以安达利曼花椒、姜黄和酸味形成独特辛香。"},
      {name:"Nasi Padang",description:"米饭搭配仁当、咖喱、蔬菜与参巴，多盘共享，适合旅行中尝试多种味道。"},
      {name:"热带水果",description:"榴莲、红毛丹、香蕉和木瓜在北苏门答腊很常见，成熟季节尤其有吸引力。"}
    ]
  },
  philippines:{
    style:"薄荷岛和菲律宾中部的传统味道以醋、青柑、椰子、海鱼和炭火为主，酸味负责提鲜而不是厚重调味。家常餐桌常把海鲜、米饭、汤菜和腌渍物一起分享。",
    highlights:[
      {name:"Kinilaw",description:"鲜鱼用醋或青柑汁、姜、洋葱和辣椒腌拌，是海岛最直接的鲜味表达。"},
      {name:"Inihaw",description:"鱼、鱿鱼、鸡肉或猪肉用炭火烤制，搭配酱油、醋和青柑蘸汁。"},
      {name:"Utan Bisaya",description:"以南瓜、秋葵、茄子和叶菜煮成的维萨亚家常蔬菜汤，清淡而有季节感。"},
      {name:"Bohol Calamay",description:"糯米粉、椰奶和糖慢熬成黏软甜点，是薄荷岛传统伴手味道。"}
    ]
  },
  sriLanka:{
    style:"斯里兰卡饮食以米饭和多碟咖喱为基本结构，椰奶、椰丝、咖喱叶、肉桂、辣椒和酸味共同出现。南部与山地小旅馆的魅力，往往在每天不同的蔬菜咖喱和家庭配方。",
    highlights:[
      {name:"Rice & Curry",description:"米饭搭配数种蔬菜咖喱、扁豆、鱼或鸡和酸辣配菜，是最完整的斯里兰卡日常餐。"},
      {name:"Hoppers",description:"发酵米浆与椰奶烙成碗形薄饼，可加入鸡蛋，常作为早餐或晚间小食。"},
      {name:"Pol Sambol",description:"新鲜椰丝、辣椒、青柠和洋葱拌成的鲜辣配菜，几乎能唤醒所有主食。"},
      {name:"Kithul Treacle",description:"孔雀椰树花蜜熬成糖浆，常配水牛凝乳，是山地和乡村常见甜味。"}
    ]
  },
  costaRica:{
    style:"哥斯达黎加乡村餐桌强调新鲜、朴素和饱足：米饭、黑豆、鸡蛋、肉类、车前蕉与热带水果是基础。雨林与太平洋沿岸地区还会加入鲜鱼、青柑和农园可可。",
    highlights:[
      {name:"Gallo Pinto",description:"米饭与黑豆、香草和甜椒炒制，搭配鸡蛋、奶酪或车前蕉，是经典早餐。"},
      {name:"Casado",description:"米饭、黑豆、沙拉、熟车前蕉与肉或鱼组成的日常定食，均衡且实在。"},
      {name:"Ceviche",description:"沿海鲜鱼以青柑汁、洋葱和香菜腌制，酸香清爽，适合炎热气候。"},
      {name:"可可与热带水果",description:"萨拉皮基等雨林地区盛产可可、菠萝、木瓜和香蕉，常进入饮料与甜点。"}
    ]
  },
  mexicoChiapas:{
    style:"恰帕斯饮食由玉米、豆类、辣椒、可可和本地香草构成，玛雅传统与高地、雨林物产彼此叠加。味道不只辛辣，更重视烘烤玉米、酸味与烟熏香。",
    highlights:[
      {name:"Chiapas Tamal",description:"玉米面团包入肉、蔬菜或香料，以香蕉叶蒸熟，质地湿润且带叶香。"},
      {name:"Pozol",description:"玉米面与可可调成的传统饮品，清凉、有谷物感，适合湿热雨林。"},
      {name:"Mole Chiapaneco",description:"辣椒、香料、坚果或可可构成层次复杂的酱汁，常配鸡肉。"},
      {name:"高地咖啡与可可",description:"恰帕斯是重要咖啡和可可产区，小庄园风味比标准酒店咖啡更值得尝试。"}
    ]
  },
  panamaCaribbean:{
    style:"博卡斯德尔托罗的加勒比饮食把椰奶、海鱼、根茎、车前蕉和岛屿香料放在一起，黑人加勒比与原住民传统都能在汤锅、米饭和炭烤中被尝到。",
    highlights:[
      {name:"Rondón",description:"鱼、海鲜、椰奶、木薯、芋头和车前蕉慢炖成浓汤，是加勒比海岸代表菜。"},
      {name:"椰香米饭",description:"米饭以椰奶烹煮，常搭配炖豆、鱼或鸡，香气温和浓郁。"},
      {name:"Patacones",description:"青车前蕉压扁油炸，外脆内软，是海鲜和炖菜常见配菜。"},
      {name:"当日海鱼",description:"红鲷、龙虾和其他渔获随季节供应，清烤或椰汁炖煮最能表现海岛风味。"}
    ]
  },
  vietnamDanang:{
    style:"岘港与广南饮食讲究香草、米制品、花生和鱼露之间的平衡，既有海港海鲜，也有非常具体的街头面食。整体比厚重宴席更轻快、明亮。",
    highlights:[
      {name:"Mì Quảng",description:"少量浓汤拌宽米面、香草、花生、米饼和虾肉，是广南—岘港最有辨识度的面。"},
      {name:"Bánh Xèo",description:"姜黄米浆煎成薄脆饼，包虾肉、豆芽与香草，再蘸鱼露。"},
      {name:"Bún Chả Cá",description:"鱼饼米粉汤清鲜带甜，配番茄、南瓜或卷心菜，是当地日常早餐。"},
      {name:"岘港海鲜",description:"贝类、虾、鱿鱼和鱼以清蒸、炭烤或酸辣做法呈现，重点是当日鲜度。"}
    ]
  },
  taiwanMountain:{
    style:"台湾山林温泉地区的餐桌常把当季山菜、竹笋、茶、溪鱼与炖汤放在一起；三峡又有茶业与老街点心传统。味道重视食材本身，不一定追求复杂摆盘。",
    highlights:[
      {name:"山菜与竹笋",description:"蕨类、过猫、时令竹笋以快炒、凉拌或煮汤呈现，最能对应森林季节。"},
      {name:"茶香料理",description:"三峡碧螺春等茶可进入茶饭、甜点或佐餐饮品，香气清雅。"},
      {name:"溪鱼与土鸡",description:"山地餐厅常见盐烤溪鱼、白斩或药膳土鸡，适合多人分享。"},
      {name:"老街豆制与点心",description:"豆腐、豆干和老街烘焙可补充温泉酒店之外的地方日常。"}
    ]
  },
  yunnanDai:{
    style:"西双版纳傣味依赖香茅、青柠、芫荽、薄荷、辣椒和炭火，酸、辣、鲜与植物香气非常突出。许多菜用芭蕉叶包裹或直接烧烤，和热带植物环境天然相合。",
    highlights:[
      {name:"香茅草烤鱼",description:"整鱼填入香草，以香茅捆扎炭烤，鱼肉吸收柑橘与草本香气。"},
      {name:"舂鸡脚与舂菜",description:"辣椒、青柠、蒜和香草共同舂拌，酸辣爽脆，是傣味鲜明的小食。"},
      {name:"菠萝紫米饭",description:"紫糯米与菠萝同蒸，果香和米香柔和，既可作主食也可作甜点。"},
      {name:"芭蕉叶包烧",description:"肉、鱼、菌菇或蔬菜与香料包入芭蕉叶烤制，保留水分和植物清香。"}
    ]
  },
  huasteca:{
    style:"墨西哥 Huasteca 的传统饮食围绕玉米、香蕉叶、干辣椒、猪肉、豆类和本地咖啡展开。许多菜具有节庆与集体分享属性，份量大、香气厚，和湿润山地环境形成强烈反差。",
    highlights:[
      {name:"Zacahuil",description:"巨型玉米粽以粗磨玉米面、辣椒和猪肉填制，包香蕉叶长时间烘烤，是 Huasteca 标志性节庆食物。"},
      {name:"Enchiladas Huastecas",description:"玉米饼蘸辣椒酱，配奶酪、洋葱和肉类，味道直接而有烟熏感。"},
      {name:"Cecina",description:"薄切腌牛肉煎烤后配豆泥、玉米饼与莎莎，是当地扎实的日常餐。"},
      {name:"山地咖啡",description:"Xilitla 周边湿润高地适合咖啡种植，小型烘焙与甜面包构成当地早餐。"}
    ]
  }
};

const hotelCuisine={
  "aana":"trat","bali-lush":"bali","bamboo-turtles-ecolodge":"bali","bambu":"bali","ulaman":"bali",
  "sarinbuana-eco-lodge":"bali","ecotravel-cottages":"indonesiaSumatra","sumatra-orangutan-explore-guesthouse":"indonesiaSumatra",
  "fox-firefly-cottages":"philippines","loboc-river-resort":"philippines","great-roots-forestry-hot-spring":"taiwanMountain",
  "kumbukriver":"sriLanka","singharaja-garden":"sriLanka","casitas-del-rio":"costaRica","ecolodge-las-nubes":"mexicoChiapas",
  "naman":"vietnamDanang","our-jungle-camp":"southThailand","our-jungle-house":"southThailand",
  "rambala-jungle-lodge":"panamaCaribbean","rayavadee":"southThailand","royal-waterlily-hotel":"yunnanDai"
};

const hotelSetting={
  "aana":"红树林河口旁的开放餐厅和水岸用餐区，海鲜与泰国东部菜比国际自助更值得留意。",
  "bali-lush":"稻田花园中的小型餐区，适合早餐、咖啡和家庭式巴厘餐。",
  "bamboo-turtles-ecolodge":"河谷竹屋的开放公共区，餐桌规模不大，环境与水声比餐厅排场更突出。",
  "bambu":"河谷、菜园与天然泳水附近的开放餐厅；菜单常把自有农园与巴厘传统做法结合。",
  "ulaman":"竹构公共空间中的餐厅兼具设计感与田野视野，适合把晚餐作为场地体验的一部分。",
  "sarinbuana-eco-lodge":"热带花园中的餐桌与农园关系紧密，蔬菜、香草和水果随收成变化。",
  "ecotravel-cottages":"武吉拉旺村落边缘的家庭式餐区，印尼家常菜和北苏门答腊味道并行。",
  "sumatra-orangutan-explore-guesthouse":"家庭民宿餐桌靠近河岸，餐食更像住进当地生活而非酒店餐厅。",
  "fox-firefly-cottages":"河岸竹木公共区与周边薄荷岛小餐馆共同构成用餐选择。",
  "loboc-river-resort":"湿地与河流景观旁的餐厅，适合尝试当日河鲜、海鲜和维萨亚家常菜。",
  "great-roots-forestry-hot-spring":"温泉度假酒店餐厅适合山菜、竹笋和热汤；也可延伸到三峡老街茶食。",
  "kumbukriver":"河岸生态小屋的开放餐桌，以多碟咖喱和家庭式共享餐最符合环境。",
  "singharaja-garden":"农业生态园中的休息与餐饮空间，适合观察斯里兰卡蔬菜咖喱和香料使用。",
  "casitas-del-rio":"热带花园民宿的餐饮空间偏早餐与简餐，传统菜可在周边小镇补充。",
  "ecolodge-las-nubes":"社区木屋餐厅以当地食材和实用家常菜为主，恰帕斯玉米、可可与咖啡是重点。",
  "naman":"竹构餐厅、海滨用餐和岘港市区小吃可以形成从度假村到地方街食的两层体验。",
  "our-jungle-camp":"河岸营地餐厅供应南泰家常菜，雨林活动后适合酸辣汤、咖喱和炭烤。",
  "our-jungle-house":"河岸餐厅处于树冠和石灰岩山谷之间，食物朴素，场景非常完整。",
  "rambala-jungle-lodge":"雨林小屋餐桌强调偏远环境中的当日食材；加勒比椰香和海产可在区域餐饮中补足。",
  "rayavadee":"洞穴餐厅、海滩餐厅与正式泰餐厅并存，环境戏剧性强，但需要提前确认营业与着装。",
  "royal-waterlily-hotel":"植物园内餐厅适合以傣味作为主线，再延伸到版纳村寨与夜市小吃。"
};

const hotelNotes={
  "aana":"酒店菜单可能以国际菜和常规泰餐为主，传统达叻菜是否供应应以当日菜单为准。",
  "bali-lush":"小型民宿菜单会随入住率和农园收成变化，复杂菜式最好提前预约。",
  "bamboo-turtles-ecolodge":"餐饮选择有限，特殊饮食和晚餐供应需提前沟通。",
  "bambu":"部分餐饮和体验价格高于普通乌布餐馆，菜品与开放情况需按入住日期确认。",
  "ulaman":"酒店内餐饮偏精品度假村定价，传统菜可能采用现代化呈现。",
  "sarinbuana-eco-lodge":"偏远位置不便临时换餐，是否含三餐应与房价一起核对。",
  "ecotravel-cottages":"民宿餐饮不等同正式餐厅，部分地方菜需提前提出。",
  "sumatra-orangutan-explore-guesthouse":"家庭厨房按人数准备，口味、辣度与用餐时间应提前沟通。",
  "fox-firefly-cottages":"酒店内餐食与周边地方餐馆需区分，营业时间可能较早结束。",
  "loboc-river-resort":"旅游型餐厅也会供应国际菜，传统菜建议按菜名主动选择。",
  "great-roots-forestry-hot-spring":"温泉套餐、晚餐和早餐的包含口径随房型变化，三峡老街饮食属于周边体验。",
  "kumbukriver":"偏远小屋通常使用固定菜单，素食和过敏需求要提前说明。",
  "singharaja-garden":"农园餐以当季食材为主，菜式数量不应按大型酒店预期。",
  "casitas-del-rio":"民宿本身未必供应完整晚餐，当地传统菜主要依靠周边餐馆。",
  "ecolodge-las-nubes":"社区餐饮朴素且供应受交通影响，咖啡、可可与复杂菜品不一定每天齐全。",
  "naman":"酒店餐厅定价高于岘港街头小店；传统面食建议同时在市区品尝。",
  "our-jungle-camp":"套餐与单点供应会变化，南泰菜辣度通常较高，可提前沟通。",
  "our-jungle-house":"偏远雨林位置使菜单有限，晚餐最好提前确认。",
  "rambala-jungle-lodge":"区域传统菜与酒店实际供应不能等同，偏远住宿通常需要预约餐食。",
  "rayavadee":"洞穴餐厅并非每天或全天开放，且酒店餐饮整体价格较高。",
  "royal-waterlily-hotel":"酒店菜单可能偏大众化，真正传统傣味可结合周边村寨或市区餐馆。"
};

for(const file of await readdir(hotelDir)){
  if(!file.endsWith(".json")) continue;
  const path=join(hotelDir,file);
  const hotel=JSON.parse(await readFile(path,"utf8"));
  const key=hotelCuisine[hotel.id];
  if(key){
    const c=cuisines[key];
    hotel.food={
      summary:`${hotel.identity.name}所在地区的传统饮食有清晰的地方性。${c.style}`,
      setting:hotelSetting[hotel.id],
      highlights:c.highlights,
      caveat:hotelNotes[hotel.id]
    };
  }
  if(hotel.food){
    const matches=(hotel.media?.gallery||[]).filter(item=>imgPattern.test(`${item.caption||""} ${item.type||""}`)).slice(0,3);
    if(matches.length) hotel.food.images=matches.map(item=>({url:item.url,caption:item.caption||item.type,source:item.source||"酒店图库"}));
  }
  await writeFile(path,`${JSON.stringify(hotel,null,2)}\n`);
}

const destinationCuisine={
  "bukit-lawang":{c:"indonesiaSumatra",setting:"村中家庭餐馆、河岸旅馆和前往雨林前后的简餐共同组成味觉体验。",note:"景区餐馆常把辣度调低；想尝安达利曼等巴塔克风味，应主动询问。"},
  "khao-sok-cheow-lan":{c:"southThailand",setting:"考索村、河岸旅馆和漂浮木屋餐厅以套餐与南泰家常菜为主。",note:"湖上住宿多为固定套餐，菜品选择和辣度需要提前沟通。"},
  "koh-kood":{c:"trat",setting:"西岸海湾餐厅、Ao Yai 等渔村和家庭小店最适合尝当日海产。",note:"不同海湾餐馆密度差异很大，偏远住宿应确认晚餐与交通。"},
  "xilitla-las-pozas":{c:"huasteca",setting:"Xilitla 镇中心市场、小餐馆与咖啡店可形成完整的 Huasteca 饮食路线。",note:"Zacahuil 体量很大且常在特定日期制作，并非每家餐馆每天供应。"}
};
const extraDestinations={
  furnas:{
    summary:"Furnas 的传统饮食与火山地热直接相连。最具代表性的 Cozido das Furnas 把牛肉、猪肉、香肠、卷心菜、土豆和根茎放入锅中，再埋入湖边地热土壤慢煮数小时；甜面包、岛产奶酪、菠萝与茶构成更轻盈的一面。",
    setting:"Lagoa das Furnas 地热烹煮区、镇内传统餐馆和面包店共同构成体验。",
    highlights:[
      {name:"Cozido das Furnas",description:"利用火山地热慢煮的肉类蔬菜炖锅，土豆、卷心菜和多种香肠吸收浓郁肉汁。"},
      {name:"Bolo Lêvedo",description:"圣米格尔岛柔软微甜的圆形发面饼，常夹黄油、奶酪或肉作为早餐。"},
      {name:"亚速尔奶酪",description:"群岛牧场奶源制成从温和到成熟的多种奶酪，适合与本地面包同食。"},
      {name:"岛产茶与菠萝",description:"圣米格尔拥有欧洲少见的茶园和温室菠萝，香气清晰，适合平衡炖锅的厚重。"}
    ],caveat:"地热炖锅通常需预约且份量大，适合多人共享；不同餐厅配料会略有差别。"
  },
  "kurokawa-onsen":{
    summary:"黑川温泉的饮食属于熊本—阿苏山地体系：旅馆会席以季节山菜、河鱼、豆腐和精巧小皿展开，阿苏赤牛、马肉和温泉甜点则提供更鲜明的地域记忆。",
    setting:"温泉旅馆的一泊二食会席是主轴，温泉街小店补充点心、牛肉和便携小食。",
    highlights:[
      {name:"旅馆会席料理",description:"按季节依次呈现前菜、刺身、烧物、锅物和甜品，器皿与山地时令同样重要。"},
      {name:"阿苏赤牛",description:"熊本阿苏地区放牧赤牛肉味清晰、脂肪相对克制，可做陶板烧或牛肉饭。"},
      {name:"山女鱼与山菜",description:"盐烤河鱼、竹笋、蕨菜和菌菇体现森林河谷的季节变化。"},
      {name:"温泉甜点",description:"布丁、牛奶冰淇淋和铜锣烧等温泉街点心适合在泡汤巡游间隙食用。"}
    ],caveat:"一泊二食通常需要提前选择时间，过敏与忌口必须预先告知；热门小店可能提前售罄。"
  },
  wulai:{
    summary:"乌来的传统饮食以泰雅族山林智慧为核心：小米、马告、竹筒饭、山菜、溪鱼和烤肉把森林气味带到餐桌。温泉街商业小吃很多，但真正值得寻找的是原住民食材与香料。",
    setting:"乌来老街、泰雅料理餐厅和温泉旅馆晚餐可分别体验小吃、山产与套餐。",
    highlights:[
      {name:"马告料理",description:"山胡椒带柠檬与胡椒香，可用于烤肉、香肠、鸡汤和调味盐。"},
      {name:"竹筒饭",description:"糯米或小米放入竹筒蒸烤，带竹香，是山地活动中便于携带的传统主食。"},
      {name:"小米与小米酒",description:"小米在泰雅饮食与仪式中具有重要位置，可做饭、粥、甜点或发酵饮品。"},
      {name:"山菜与溪鱼",description:"过猫、山苏、竹笋和盐烤溪鱼体现乌来河谷的季节物产。"}
    ],caveat:"老街部分商品更偏观光化；若要完整泰雅风味，应选择明确标注原住民料理的餐厅。"
  }
};

for(const file of await readdir(destinationDir)){
  if(!file.endsWith(".json")) continue;
  const path=join(destinationDir,file);
  const d=JSON.parse(await readFile(path,"utf8"));
  if(destinationCuisine[d.id]){
    const row=destinationCuisine[d.id],c=cuisines[row.c];
    d.food={summary:c.style,setting:row.setting,highlights:c.highlights,caveat:row.note};
  }else if(extraDestinations[d.id]) d.food=extraDestinations[d.id];
  await writeFile(path,`${JSON.stringify(d,null,2)}\n`);
}

const indexPath=join(root,"data","index.json");
const index=JSON.parse(await readFile(indexPath,"utf8"));
index.contentVersion="2026.07.25.1";
index.updatedAt="2026-07-25";
await writeFile(indexPath,`${JSON.stringify(index,null,2)}\n`);
console.log("Food culture added to all hotels and destinations.");

const stays = [
  {
    id:"bambu", name:"巴姆布印达酒店", en:"Bambu Indah", place:"印度尼西亚 · 乌布", region:"东南亚",
    grade:"A", kind:"河谷生态酒店", priceMin:1900, priceMax:3600, price:"¥1,900–3,600", score:98, value:52,
    waterScore:98, greenScore:98, designScore:97, exploreScore:96,
    waterTypes:["天然泉池","河流","瀑布"], tradeoffs:["价格偏高","坡地台阶"],
    tags:["天然泉池","阿勇河","竹木建筑","低密度","审美标杆"],
    oneLine:"泉池、河谷、竹桥与建筑共同组成一条可以进入的自然路径。",
    reason:"成熟树冠遮住大部分建筑，石阶和竹桥一路下探河谷；天然泉池不是附属设施，而是公共空间的核心。",
    pros:["水体真正进入场地内部，人与水的接触方式丰富","建筑体量低，旧木、竹、石材与植物之间边界很弱","林下路径、台阶和桥梁带来很强的探索感"],
    cons:["常见房价明显超过实住预算","河谷高差大，部分区域台阶很多","热门房型和旺季价格波动明显"],
    fit:"愿意为完整空间体验提高预算，并且不介意坡地步行。",
    notFit:"更在意交通便利、无障碍动线或稳定低价。",
    intro:"Bambu Indah 位于巴厘岛乌布外围的阿勇河谷。酒店从山脊向河岸分层展开，上部邻近稻田与树冠，下部沿河布置天然泉池、餐厅和河畔客房。场地内有十五处以上泉水池，石砌小径、竹桥、隧道和坡地台阶连接不同高度的公共空间；客房由竹构、回收柚木老屋及独立设计建筑组成。",
    profile:[
      {title:"地理位置与周边",text:"酒店位于巴厘岛乌布外围的阿勇河谷一侧，场地上缘邻近稻田和村落，下缘抵达阿勇河岸。周边不是连续商业街区，主要景观由河谷、Bongkasa 稻田、热带树冠和乡村道路组成；前往乌布中心通常依赖车辆。"},
      {title:"场地布局",text:"酒店并非一栋集中式建筑，而是从山脊到河岸逐层展开的聚落。接待、餐饮、客房、泉池和河畔休息空间位于不同高程，石砌小径、竹桥、隧道、台阶与竹制升降设施将它们串联。河畔房型与上部公共区域之间存在明显高差。"},
      {title:"建筑、水体与植物",text:"场地内有十五处以上天然泉水池，泉池与阿勇河共同构成下部公共空间。竹构新建筑、回收柚木老屋、石材平台和开放式亭子分散在成熟植被中，部分建筑从树冠和坡地之间露出；水体、道路与住宿空间并非彼此独立。"},
      {title:"抵达与实际条件",text:"不同房型的地形条件差异很大。靠近上部村落的客房移动相对平缓，部分河畔房距接待区域需要数百级台阶；官网个别房型标注约五百五十至六百四十级。坡地、开放式空间、昆虫和潮湿环境均属于实际住宿条件。"}
    ],
    surroundings:"阿勇河谷、Bongkasa 稻田与热带林地",
    landscape:"石阶、竹桥和林下路径一路下探河谷，泉池与阿勇河贯穿主要公共体验。",
    access:"位于乌布外缘河谷；部分河畔房距离接待区域较远，坡地移动量较大。",
    verify:"官方图库与场地资料已核验；价格需按日期复核", updated:"2026-07-23",
    image:"https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/67584a50c8274a5585679da1_bamboo_indah_explore2.avif",
    gallery:["https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/67584a50c8274a5585679da1_bamboo_indah_explore2.avif","https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/67584a4645b17081ef73a824_bamboo_indah_explore1.avif","https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/67585166d3efeeedb45bed57_bamboo_indah_explore_pools2.avif","https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/67584b0008bb0a232a4605f0_bamboo_indah_explore_pools3.avif"],
    ctrip:"https://www.trip.com/hotels/bali-hotel-detail-685401/bambu-indah-a-hardy-artisanal-hotel/", official:"https://www.bambuindah.com/explore"
  },
  {
    id:"aana", name:"阿娜度假村及别墅", en:"AANA Resort & Villas", place:"泰国 · 象岛", region:"东南亚",
    grade:"A", kind:"红树林河口度假村", priceMin:350, priceMax:900, price:"¥350–900", score:82, value:94,
    waterScore:91, greenScore:82, designScore:61, exploreScore:84,
    waterTypes:["天然河流","红树林","海湾"], tradeoffs:["设施简单","泳池略规则","交通不便"],
    tags:["天然河道","红树林","皮划艇","低价","乘船到海滩"],
    oneLine:"价格很低，但河道、码头、皮划艇和接驳船构成了完整的水路体验。",
    reason:"低层建筑沿河道展开，可从酒店码头划艇或乘船穿过水路抵达海滩，是首批名单中最容易实际入住的一家。",
    pros:["天然河道紧贴公共区域，水不是远处景观","常见价格低，预算压力小","从码头到海滩的水上移动过程有辨识度"],
    cons:["客房和公共设施比较普通，部分区域显旧","泳池形态较规则，建筑设计感不强","抵达象岛需要渡轮，交通时间较长"],
    fit:"把价格和水边体验放在前面，能接受设施普通与交通折腾。",
    notFit:"追求精致竹构、全新硬件或完整雨林包裹感。",
    intro:"AANA 位于泰国达叻府象岛西岸，坐落在 Klong Prao 河道尽端，靠近 Klong Prao Beach。低层客房与公共空间沿河岸分布，码头、皮划艇和接驳船构成主要移动方式。由曼谷前往通常需先到达叻，再乘渡轮上岛；酒店所处区域以河口、水道、热带植被和海滩为主要环境。",
    profile:[
      {title:"地理位置与周边",text:"酒店位于泰国达叻府象岛西岸，处在 Klong Prao 河道尽端并接近 Klong Prao Beach。周边同时具有河口、海湾、红树林式水岸和岛屿山地背景，不是单纯面对海滩的一线排布。象岛西岸分布有餐馆和度假设施，但密度与城市海滨区不同。"},
      {title:"场地布局",text:"低层客房、别墅和公共设施沿河岸与内部绿地布置，码头是场地中很明确的节点。河道把酒店与海滩连接起来，住客可在水边停留，也可通过皮划艇或接驳船移动；这种水路关系比建筑本身更有辨识度。"},
      {title:"建筑、水体与植物",text:"建筑风格和客房硬件较为常规，优势不在精细设计，而在天然河道进入酒店内部。成熟热带植物靠近水岸、道路和低层建筑，公共泳池仍然较规则；自然水域与人工泳池在场地中同时存在。"},
      {title:"抵达与实际条件",text:"从曼谷前往通常先抵达达叻府码头，再乘渡轮进入象岛，之后沿岛上道路到达酒店。交通耗时受航班、陆路和渡轮班次影响。酒店价格较低，但设施维护、客房新旧和偏远交通需要与具体房型及近期评价一并核对。"}
    ],
    surroundings:"Klong Prao 河口、象岛西岸与 Klong Prao Beach",
    landscape:"河道、码头、皮划艇和接驳船构成主要空间线索，植被密度高于普通海滨度假村。",
    access:"先抵达达叻府并乘渡轮上岛；酒店位于 Klong Prao 河道末端。",
    verify:"场地水路与酒店位置已核验；房态和含税价待日期复核", updated:"2026-07-23",
    image:"https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-90.jpg",
    gallery:["https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-90.jpg","https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-15.jpg","https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-16.jpg","https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-55.jpg"],
    ctrip:"https://www.trip.com/hotels/koh-chang-hotel-detail-709821/aana-resort-villas-koh-chang/", official:"https://www.aanaresort.com/blog-details.php?id=24"
  },
  {
    id:"ulaman", name:"乌拉曼生态奢华度假村", en:"Ulaman Eco Luxury Resort", place:"印度尼西亚 · 巴厘岛塔巴南", region:"东南亚",
    grade:"A", kind:"竹构生态度假村", priceMin:2900, priceMax:4600, price:"¥2,900–4,600", score:91, value:38,
    waterScore:88, greenScore:88, designScore:99, exploreScore:83,
    waterTypes:["河流","瀑布","生态湖"], tradeoffs:["价格偏高","私人泳池依赖"],
    tags:["曲线竹构","夯土","绿屋顶","生态湖","设计完成度高"],
    oneLine:"建筑与人工水面高度融合，完成度很高，但价格和私人泳池依赖都明显。",
    reason:"曲线竹构、夯土、绿屋顶与人工水面交叠，公共空间跨在水与林地之上，视觉和结构都很有辨识度。",
    pros:["竹构、夯土和曲线屋顶的设计完成度极高","公共空间跨水展开，水景与建筑关系紧密","外围稻田、椰林和河流补足自然环境"],
    cons:["价格远高于预算，实际入住性价比低","部分宣传重点仍落在私人泳池房型","自然河谷的野生感不如 Bambu Indah"],
    fit:"把建筑设计放在首位，预算较宽松。",
    notFit:"更看重天然水域、低价或不希望依赖私人泳池。",
    intro:"Ulaman 位于巴厘岛塔巴南县的稻田与椰林之间，官方资料标注距仓古约二十分钟车程。度假村以曲线竹构、夯土、绿屋顶和再生材料为主要建筑语言，公共建筑围绕水面展开，场地同时连接河流、瀑布和河畔水疗区域。周边不是成熟商业街区，整体环境更接近巴厘岛乡野腹地。",
    profile:[
      {title:"地理位置与周边",text:"Ulaman 位于巴厘岛塔巴南县的稻田和椰林之间，官方资料标注距仓古约二十分钟车程。酒店外围以农田、乡村道路和低密度聚落为主，不处在步行商业区；仓古与巴厘岛南部交通拥堵会使实际车程产生较大变化。"},
      {title:"场地布局",text:"度假村由多组曲线建筑、客房、庭院水面、河畔水疗空间和林间道路组成。公共建筑围绕水面展开，桥、平台和弧形边界强化了连续性。整体规划比自然形成的河谷聚落更精密，建筑本身在视野中占据较强位置。"},
      {title:"建筑、水体与植物",text:"竹构、夯土、再生材料和绿屋顶构成主要建筑语言。人工水面、生物过滤湖、河流与瀑布共同出现，但不同水体的自然程度并不相同。椰林、稻田和河岸植物提供外围环境，部分客房仍以私人泳池作为重要配置。"},
      {title:"抵达与实际条件",text:"酒店位于乡野腹地，日常外出主要依赖包车或网约车。周边餐饮和购物不如仓古集中，适合停留在度假村内部活动。房价通常明显超过两千元预算，房型、私人泳池配置和新旧区域会影响实际体验。"}
    ],
    surroundings:"塔巴南稻田、椰林、河流与乡村道路",
    landscape:"竹构与水面形成强烈建筑场景，稻田、椰林和河流提供外围自然背景。",
    access:"位于塔巴南稻田与椰林之间，实际车程受巴厘岛交通影响。",
    verify:"官网环境、建筑与水体图片已核验；价格待日期复核", updated:"2026-07-23",
    image:"https://images.prismic.io/ulaman/ag1WEqYofJOwHaJg_eco-luxury-resort-bali.jpg?auto=format%2Ccompress",
    gallery:["https://images.prismic.io/ulaman/ag1WEqYofJOwHaJg_eco-luxury-resort-bali.jpg?auto=format%2Ccompress","https://images.prismic.io/ulaman/ag1WW6YofJOwHaJj_ulamanbali.jpg?auto=format%2Ccompress","https://images.prismic.io/ulaman/ZjNFm0MTzAJOCfDW_best-spa-bali.jpg?auto=format%2Ccompress","https://images.prismic.io/ulaman/agwj-6YofJOwHWxU_5--Poolside-Villa-.jpg?auto=format%2Ccompress"],
    ctrip:"https://www.trip.com/hotels/bali-hotel-detail-69355833/ulaman-eco-luxury-resort/", official:"https://ulamanbali.com/"
  },
  {
    id:"rayavadee", name:"瑞亚维德酒店", en:"Rayavadee", place:"泰国 · 甲米莱利", region:"东南亚",
    grade:"B", kind:"石灰岩海湾度假村", priceMin:3500, priceMax:7000, price:"¥3,500–7,000", score:86, value:30,
    waterScore:82, greenScore:90, designScore:82, exploreScore:88,
    waterTypes:["白沙滩","海湾"], tradeoffs:["价格偏高","泳池略规则","内部水景少"],
    tags:["三面海滩","石灰岩","成熟椰林","独立亭屋","白沙滩特例"],
    oneLine:"林下路径和石灰岩环境极好，但它是白沙滩特例，不是内部水系型酒店。",
    reason:"独立亭屋散布在成熟椰林和巨大石灰岩之间，林下路径连接三处真实海滩，环境比建筑更有存在感。",
    pros:["成熟植被、石灰岩和三面海滩形成连续空间","低层亭屋藏在林下，建筑体量克制","从林间步行抵达海滩的过程完整"],
    cons:["酒店内部天然水系较少","主泳池较规则，不属于核心偏好","旺季房价极高，更多适合收藏"],
    fit:"白沙滩质量和林下空间优先，预算较宽松。",
    notFit:"一定需要泉池、河流或可探索公共水域。",
    intro:"Rayavadee 位于泰国甲米府帕南半岛，处在甲米海洋国家公园的石灰岩地貌与热带植被之间。酒店共有九十四座双层亭屋和七座别墅，分散在椰林及花园内，步行可到 Railay、Phranang 等海滩。半岛与甲米陆路不直接相通，酒店通常由专用码头乘船抵达；周边同时存在公共海滩、岩洞与攀岩活动区域。",
    profile:[
      {title:"地理位置与周边",text:"Rayavadee 位于泰国甲米府帕南半岛，处在甲米海洋国家公园边缘。石灰岩峭壁、椰林、安达曼海和三面海滩构成周边环境；Railay 与 Phranang 海滩均可从酒店步行抵达，邻近区域同时是公共海滩和攀岩目的地。"},
      {title:"场地布局",text:"九十四座双层亭屋和七座别墅分散在热带花园与椰林中，林下道路连接住宿、餐厅、泳池和不同海滩。建筑没有沿一条海岸线集中排开，而是嵌在半岛内部；从客房到海滩通常经历一段被植被和岩壁包围的步行路径。"},
      {title:"建筑、水体与植物",text:"低层亭屋的尺度较克制，成熟乔木和石灰岩地貌比建筑更醒目。酒店核心水体验来自真实海滩与海湾，而不是内部河流或泉池；公共泳池形态较规则，因此它属于白沙滩特例，而非天然内水体型酒店。"},
      {title:"抵达与实际条件",text:"帕南半岛没有与甲米市区直接相连的普通道路，酒店住客通常从酒店码头乘船抵达，公共访客也依赖长尾船。海况和天气可能影响船程。三处海滩并非完全私有，旺季和白天会有外来游客，安静程度随位置与时段变化。"}
    ],
    surroundings:"帕南半岛、三面海滩、石灰岩壁与国家公园",
    landscape:"成熟植被、石灰岩与海滩构成连续林下路径，海滩属于国家公园公共海岸。",
    access:"通常经甲米的酒店码头乘船进入帕南半岛。",
    verify:"海滩可达性、林下环境与位置关系已核验", updated:"2026-07-23",
    image:"https://www.rayavadee.com/en/images/flora-nature.jpg",
    gallery:["https://www.rayavadee.com/en/images/flora-nature.jpg","https://www.rayavadee.com/en/images/idx-raya-activities.jpg"],
    ctrip:"https://www.trip.com/hotels/krabi-hotel-detail-998426/rayavadee/", official:"https://www.rayavadee.com/en/destination.php"
  },
  {
    id:"naman", name:"纳曼度假村", en:"Naman Retreat", place:"越南 · 岘港", region:"东南亚",
    grade:"C", kind:"竹构海滨度假村", priceMin:800, priceMax:1800, price:"¥800–1,800", score:73, value:86,
    waterScore:63, greenScore:70, designScore:88, exploreScore:58,
    waterTypes:["海滩","人工水景"], tradeoffs:["泳池略规则","草坪偏多","植被普通"],
    tags:["竹构","绿墙","庭院水景","预算内","设施完整"],
    oneLine:"预算内的设计型补充，竹构很突出，但整体仍接近常规海滨度假村。",
    reason:"竹构公共空间、绿墙、庭院水面与热带植物形成清晰设计线索，价格比收藏级酒店容易落地。",
    pros:["竹构餐厅和绿墙辨识度高","多数日期有机会落在预算内","设施相对完整，实际入住门槛低"],
    cons:["泳池形态规则，草坪面积明显","水体以人工庭院和泳池为主","空间探索感与植物包裹感一般"],
    fit:"想在预算内获得明确设计感和成熟设施。",
    notFit:"坚持天然河流、泉池或浓密雨林环境。",
    intro:"Naman Retreat 位于越南岘港海岸的 Truong Sa 路，处在岘港市区与会安古城之间，面向连续白沙滩。五行山距酒店约五公里，周边以大型海滨度假区、高尔夫设施和沿海公路为主。酒店采用竹、石材、绿墙和庭院水景组织公共空间，整体规模及设施完整度高于小型生态旅馆。",
    profile:[
      {title:"地理位置与周边",text:"Naman Retreat 位于越南岘港海岸的 Truong Sa 路，处在岘港市区与会安古城之间，面向连续白沙滩。五行山距酒店约五公里；沿海一带分布大型度假村、高尔夫设施和宽阔道路，环境开阔但并非密集街区。"},
      {title:"场地布局",text:"酒店规模大于小型生态旅馆，客房、别墅、餐饮、水疗、泳池、草坪和海滩沿纵深展开。竹构公共建筑和绿墙构成主要识别点，庭院水景位于建筑之间；整体道路清晰、设施完整，空间秩序也更接近成熟海滨度假村。"},
      {title:"建筑、水体与植物",text:"竹、石材、绿墙和开放式结构被大量用于公共空间，局部植物贴近墙面与屋顶。水体主要由人工庭院、规则泳池和海滩组成，缺少天然河流或泉池；草坪和开阔区域所占比例高于核心审美样本。"},
      {title:"抵达与实际条件",text:"从岘港机场、市区或会安前往均以车辆为主，位置适合作为岘港与会安之间的中点。酒店外部步行商业有限，餐饮和日常活动较依赖度假村内部或打车。它的优势是预算相对可控、设施成熟，妥协点是天然水域与植被包裹感不足。"}
    ],
    surroundings:"岘港—会安海岸、白沙滩、五行山与度假区带",
    landscape:"竹构餐厅和绿墙具有辨识度，水景以人工庭院与泳池为主。",
    access:"位于岘港与会安之间，周边商业较少，进城需要打车。",
    verify:"官网建筑与公共空间图片已核验；沙滩状况仍需按季节复核", updated:"2026-07-23",
    image:"https://namanbackend.mediaone.dev/uploads/images/blog/9_GreenTextureWall_%281%29.jpg",
    gallery:["https://namanbackend.mediaone.dev/uploads/images/blog/9_GreenTextureWall_%281%29.jpg","https://namanbackend.mediaone.dev/uploads/images/experience/biking.jpg","https://namanbackend.mediaone.dev/uploads/images/blog/89837b3c0cf2d6ac8fe3.jpg"],
    ctrip:"https://www.trip.com/hotels/da-nang-hotel-detail-2321451/naman-retreat/", official:"https://namanretreat.com/en"
  }
];

const app = document.querySelector("#app");
const gradeName = {A:"核心匹配", B:"白沙滩特例", C:"取舍候选"};
const state = {price:"all", grade:"all", water:"all", compromise:"all", sort:"editor", query:""};
let favorites = new Set(JSON.parse(localStorage.getItem("wild-stay-favorites") || "[]"));

const icon = {
  heart: id => `<span class="heart">${favorites.has(id) ? "♥" : "♡"}</span>`,
  check: `<span class="check">✓</span>`
};

function saveFavorites(){
  localStorage.setItem("wild-stay-favorites", JSON.stringify([...favorites]));
}
function toggleFavorite(id){
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  saveFavorites();
  const params=new URLSearchParams(location.search),current=params.get("stay"),fast=params.get("quick");
  current ? detail(current,false) : fast ? quick(fast,false) : home(false);
}
function priceLabel(s){
  if(s.priceMax <= 600) return "低价";
  if(s.priceMin <= 1000) return "预算友好";
  if(s.priceMin <= 2000) return "预算内";
  return "收藏级";
}
function scoreRow(label, value){
  return `<div class="score-row"><span>${label}</span><div><i style="width:${value}%"></i></div><b>${value}</b></div>`;
}
function scoreStars(value){
  const filled=Math.round(value/20);
  return `<span class="star-scale" aria-label="${value}分">${[1,2,3,4,5].map(i=>`<i class="${i<=filled?"on":""}">◆</i>`).join("")}</span>`;
}
function scoreWord(value){return value>=95?"极高":value>=85?"很高":value>=75?"较高":value>=60?"中等":"较低"}
function visibleStays(){
  let rows = stays.filter(s => {
    const text = `${s.name}${s.en}${s.place}${s.kind}${s.tags.join("")}`.toLowerCase();
    const priceOK = state.price==="all" ||
      (state.price==="600" && s.priceMin<=600) ||
      (state.price==="1000" && s.priceMin<=1000) ||
      (state.price==="2000" && s.priceMin<=2000) ||
      (state.price==="over" && s.priceMin>2000);
    return priceOK &&
      (state.grade==="all" || s.grade===state.grade) &&
      (state.water==="all" || s.waterTypes.includes(state.water)) &&
      (state.compromise==="all" || s.tradeoffs.includes(state.compromise)) &&
      text.includes(state.query.toLowerCase());
  });
  if(state.sort==="value") rows.sort((a,b)=>b.value-a.value);
  else if(state.sort==="score") rows.sort((a,b)=>b.score-a.score);
  else if(state.sort==="low") rows.sort((a,b)=>a.priceMin-b.priceMin);
  else rows.sort((a,b)=>a.grade.localeCompare(b.grade)||b.value-a.value);
  return rows;
}

function filterGroup(title, key, options){
  return `<div class="filter-row"><b>${title}</b><div>${options.map(([value,label]) =>
    `<button class="${state[key]===value?"active":""}" data-filter="${key}" data-value="${value}">${label}</button>`).join("")}</div></div>`;
}
function card(s){
  return `<article class="lab-card" data-quick="${s.id}" tabindex="0">
    <button class="fav-card" data-fav="${s.id}" aria-label="收藏">${icon.heart(s.id)}</button>
    <div class="card-photo" style="background-image:url('${s.image}')">
      <span class="grade grade-${s.grade}">${s.grade} · ${gradeName[s.grade]}</span>
      <span class="price-state">${priceLabel(s)}</span>
    </div>
    <div class="card-main">
      <p class="location">${s.place} · ${s.kind}</p>
      <h3>${s.name}</h3><p class="english">${s.en}</p>
      <div class="quick-scores">
        <span><b>${s.score}</b> 审美</span><span><b>${s.value}</b> 性价比</span>
        <span><b>${s.waterScore}</b> 水体</span><span><b>${s.greenScore}</b> 植被</span>
      </div>
      <div class="tag-list">${s.tags.slice(0,5).map(t=>`<span>${t}</span>`).join("")}</div>
      <p class="one-line">${s.oneLine}</p>
      <div class="mini-verdict"><div><b>优点</b>${s.pros[0]}</div><div class="minus"><b>取舍</b>${s.cons[0]}</div></div>
      <div class="card-foot"><div><strong>${s.price}</strong><small>每间 / 晚参考</small></div><div class="card-links"><button data-quick="${s.id}">快速判断</button><button data-deep="${s.id}">深度档案 <span>→</span></button></div></div>
    </div>
  </article>`;
}

function home(push=true){
  if(push) history.pushState(null,"",location.pathname);
  const rows = visibleStays();
  app.innerHTML = `
    <nav class="topbar"><a class="brand" href="#"><span>野</span><b>野栖度假收藏馆</b></a>
      <div><button id="showFav">收藏 ${favorites.size}</button><a href="#finder">筛选酒店</a></div></nav>
    <header class="home-hero"><div class="hero-shade"></div><div class="hero-copy">
      <span class="overline">WILD STAY ATLAS · VERIFIED RESORT FILES</span>
      <h1>水流心不竞，<br><i>云在意俱迟。</i></h1>
      <cite>杜甫《江亭》</cite>
      <p>全球度假酒店的价格、空间、水体与取舍档案。</p>
      <a href="#finder">酒店目录 <span>↓</span></a>
    </div>
    <div class="hero-board">
      <div><b>${stays.length}</b><span>已建档</span></div><div><b>${stays.filter(s=>s.priceMin<=2000).length}</b><span>预算内</span></div>
      <div><b>${stays.filter(s=>s.grade==="A").length}</b><span>核心匹配</span></div><div><b>${favorites.size}</b><span>已收藏</span></div>
    </div></header>
    <main id="finder" class="finder">
      <section class="finder-head"><div><span class="overline dark">HOTEL FINDER</span><h2>酒店筛选</h2></div>
        <p>所有价格均为两位成人入住一间基础房的常见参考价。</p></section>
      <section class="filter-panel">
        ${filterGroup("每晚预算","price",[["all","不限"],["600","¥600以内"],["1000","¥1,000以内"],["2000","¥2,000以内"],["over","超预算收藏"]])}
        ${filterGroup("匹配类型","grade",[["all","全部"],["A","核心匹配"],["B","白沙滩特例"],["C","取舍候选"]])}
        ${filterGroup("关键水体","water",[["all","不限"],["天然泉池","天然泉池"],["天然河流","天然河流"],["白沙滩","白沙滩"],["生态湖","生态水面"]])}
        ${filterGroup("可接受取舍","compromise",[["all","不限"],["设施简单","设施简单"],["泳池略规则","泳池略规则"],["交通不便","位置偏远"],["植被普通","植被普通"]])}
        <div class="filter-tools"><input id="query" value="${state.query}" placeholder="搜索酒店、地区、材料或水体"><select id="sort">
          <option value="editor" ${state.sort==="editor"?"selected":""}>编辑精选</option>
          <option value="value" ${state.sort==="value"?"selected":""}>性价比优先</option>
          <option value="score" ${state.sort==="score"?"selected":""}>审美匹配优先</option>
          <option value="low" ${state.sort==="low"?"selected":""}>价格从低到高</option>
        </select><button id="reset">重置</button></div>
      </section>
      <section class="results-head"><div><b>${rows.length}</b> 家符合当前条件</div><span>资料更新至 2026-07-23</span></section>
      <section class="hotel-grid">${rows.length ? rows.map(card).join("") : `<div class="empty"><b>没有符合当前组合的酒店</b><span>当前结果为 0</span></div>`}</section>
    </main>
    <footer><div class="brand"><span>野</span><b>野栖度假收藏馆</b></div><p>私人使用的全球度假酒店筛选与核验档案。</p></footer>`;

  document.querySelectorAll("[data-filter]").forEach(btn=>btn.onclick=()=>{
    state[btn.dataset.filter]=btn.dataset.value; home(false);
    requestAnimationFrame(()=>document.querySelector("#finder")?.scrollIntoView());
  });
  document.querySelectorAll(".lab-card").forEach(cardEl=>{
    cardEl.onclick=e=>{if(!e.target.closest("button")) quick(cardEl.dataset.quick)};
    cardEl.onkeydown=e=>{if(e.key==="Enter") quick(cardEl.dataset.quick)};
  });
  document.querySelectorAll("button[data-quick]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();quick(btn.dataset.quick)});
  document.querySelectorAll("[data-deep]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();detail(btn.dataset.deep)});
  document.querySelectorAll("[data-fav]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();toggleFavorite(btn.dataset.fav)});
  document.querySelector("#query").oninput=e=>{state.query=e.target.value; clearTimeout(window.searchTimer); window.searchTimer=setTimeout(()=>home(false),180)};
  document.querySelector("#sort").onchange=e=>{state.sort=e.target.value;home(false)};
  document.querySelector("#reset").onclick=()=>{Object.assign(state,{price:"all",grade:"all",water:"all",compromise:"all",sort:"editor",query:""});home(false)};
  document.querySelector("#showFav").onclick=()=>{
    state.query="";
    document.querySelector(".hotel-grid").innerHTML=[...favorites].length ? stays.filter(s=>favorites.has(s.id)).map(card).join("") : `<div class="empty"><b>暂无收藏记录</b><span>0 家酒店</span></div>`;
    document.querySelector(".results-head div").innerHTML=`<b>${favorites.size}</b> 家已收藏`;
    document.querySelector("#finder").scrollIntoView();
    document.querySelectorAll(".lab-card").forEach(cardEl=>cardEl.onclick=e=>{if(!e.target.closest("button")) quick(cardEl.dataset.quick)});
    document.querySelectorAll("button[data-quick]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();quick(btn.dataset.quick)});
    document.querySelectorAll("[data-deep]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();detail(btn.dataset.deep)});
    document.querySelectorAll("[data-fav]").forEach(btn=>btn.onclick=()=>toggleFavorite(btn.dataset.fav));
  };
}

function quick(id,push=true){
  const s=stays.find(x=>x.id===id)||stays[0];
  if(push) history.pushState({quick:id},"",`?quick=${s.id}`);
  scrollTo(0,0);
  const hasSevere=s.priceMin>2000||s.grade==="C";
  const severe=hasSevere?s.cons.slice(0,1):[], moderate=hasSevere?s.cons.slice(1,2):s.cons.slice(0,2), light=s.cons.slice(2);
  app.innerHTML=`<main class="quick-page">
    <header class="quick-hero" style="background-image:url('${s.image}')">
      <div class="quick-shade"></div>
      <nav class="quick-nav"><button id="quickBack">← 返回收藏馆</button><div><button data-fav="${s.id}">${icon.heart(s.id)} 收藏</button><button id="quickShare">分享</button></div></nav>
      <div class="quick-title">
        <div class="archive-index">ARCHIVE NO. ${String(stays.indexOf(s)+1).padStart(3,"0")} <i></i> VERIFIED FILE</div>
        <span class="grade grade-${s.grade}">${s.grade} · ${gradeName[s.grade]}</span>
        <p>${s.place} · ${s.kind}</p>
        <h1>${s.name}</h1><em>${s.en}</em>
        <div class="quick-tags">${s.tags.slice(0,5).map(t=>`<span>${t}</span>`).join("")}</div>
      </div>
      <section class="overlay-panel">
        <div class="panel-caption"><span>MATCH PROFILE</span><b>六项档案指标</b></div>
        <div class="overlay-scores">
          <div><span>审美匹配<small>AESTHETIC</small></span>${scoreStars(s.score)}<em>${scoreWord(s.score)}</em><b>${s.score}</b></div>
          <div><span>水体参与<small>WATER</small></span>${scoreStars(s.waterScore)}<em>${scoreWord(s.waterScore)}</em><b>${s.waterScore}</b></div>
          <div><span>植被包裹<small>GREENERY</small></span>${scoreStars(s.greenScore)}<em>${scoreWord(s.greenScore)}</em><b>${s.greenScore}</b></div>
          <div><span>建筑融合<small>DESIGN</small></span>${scoreStars(s.designScore)}<em>${scoreWord(s.designScore)}</em><b>${s.designScore}</b></div>
          <div><span>探索感<small>EXPLORATION</small></span>${scoreStars(s.exploreScore)}<em>${scoreWord(s.exploreScore)}</em><b>${s.exploreScore}</b></div>
          <div><span>性价比<small>VALUE</small></span>${scoreStars(s.value)}<em>${scoreWord(s.value)}</em><b>${s.value}</b></div>
        </div>
        <div class="overlay-facts">
          <div><span>参考价格</span><strong>${s.price} / 晚</strong></div>
          <div><span>水体</span><strong>${s.waterTypes.join(" · ")}</strong></div>
          <div><span>价格定位</span><strong>${priceLabel(s)}</strong></div>
          <div class="relation-mini"><span>场地关系 · SCHEMATIC</span><div class="relation-line"><i>植被</i><b></b><i>建筑</i><b></b><i>步道</i><b></b><i>水体</i></div></div>
        </div>
      </section>
      <a class="quick-down" href="#judgement">QUICK FILE ↓</a>
    </header>

    <section id="judgement" class="judgement-wrap">
      <header><span>QUICK VERDICT</span><h2>快速判断</h2><p>价格、环境指标与取舍摘要</p></header>
      <article class="judgement-card">
        <div class="judgement-lead"><span>一句话结论</span><p>${s.oneLine}</p></div>
        <section class="basic-intro">
          <div class="basic-intro-title"><span>BASIC PROFILE</span><h3>基本介绍</h3></div>
          <div class="profile-sections">${s.profile.map((item,i)=>`<section><b>${String(i+1).padStart(2,"0")}</b><div><h4>${item.title}</h4><p>${item.text}</p></div></section>`).join("")}</div>
          <div class="location-facts">
            <div><span>所在地</span><b>${s.place}</b></div>
            <div><span>周边环境</span><b>${s.surroundings}</b></div>
            <div><span>抵达方式</span><b>${s.access}</b></div>
          </div>
        </section>
        <div class="judgement-reason"><h3>推荐理由</h3><p>${s.reason}</p></div>
        <div class="quick-procon">
          <section><h3>主要优点</h3>${s.pros.map(x=>`<p>${icon.check}<span>${x}</span></p>`).join("")}</section>
          <section><h3>主要缺点</h3>
            ${severe.map(x=>`<p><i class="risk high">可能淘汰</i><span>${x}</span></p>`).join("")}
            ${moderate.map(x=>`<p><i class="risk mid">明显取舍</i><span>${x}</span></p>`).join("")}
            ${light.map(x=>`<p><i class="risk low">轻微提醒</i><span>${x}</span></p>`).join("")}
          </section>
        </div>
        <div class="quick-who"><div><b>匹配人群</b><p>${s.fit}</p></div><div><b>可能不匹配</b><p>${s.notFit}</p></div></div>
      </article>
      <aside class="quick-file">
        <h3>基础资料</h3>
        <dl><div><dt>匹配类型</dt><dd>${gradeName[s.grade]}</dd></div><div><dt>酒店类型</dt><dd>${s.kind}</dd></div>
          <div><dt>水体形式</dt><dd>${s.waterTypes.join("、")}</dd></div><div><dt>参考价格</dt><dd>${s.price}</dd></div>
          <div><dt>核验状态</dt><dd>${s.verify}</dd></div><div><dt>最近更新</dt><dd>${s.updated}</dd></div></dl>
        <button id="openDeep">进入深度档案 <span>→</span></button>
        <a href="${s.ctrip}" target="_blank">携程预订 / 查价 <span>↗</span></a>
      </aside>
      <section class="attribute-board">
        <header><span>ATTRIBUTE BOARD</span><h3>特征总览</h3></header>
        <div>${s.tags.map((t,i)=>`<article><b>${String(i+1).padStart(2,"0")}</b><span>${t}</span><i>${i<2?"核心特征":i<4?"空间特征":"补充标签"}</i></article>`).join("")}</div>
      </section>
    </section>
    <section class="immersion-strip" style="background-image:url('${s.gallery[1]||s.image}')">
      <div></div><article><span>LOCATION & SURROUNDINGS</span><h2>${s.place}</h2><p>${s.surroundings}</p></article>
    </section>
    <section class="quick-preview">
      <div><span>DEEP FILE PREVIEW</span><h2>深度档案</h2><p>空间拆解、实景图片、交通、资料来源与核验记录</p></div>
      <div class="preview-images">${s.gallery.slice(0,3).map((url,i)=>`<figure><img src="${url}" alt="${s.name}资料预览${i+1}" loading="lazy"></figure>`).join("")}</div>
      <button id="openDeepBottom">打开完整档案</button>
    </section>
    <div class="quick-mobile-bar"><button data-fav="${s.id}">${icon.heart(s.id)} 收藏</button><button id="mobileDeep">深度档案</button><a href="${s.ctrip}" target="_blank">${s.price}<small>携程查价</small></a></div>
    <footer><div class="brand"><span>野</span><b>野栖度假收藏馆</b></div><p>快速判断 · ${s.name}</p></footer>
  </main>`;
  document.querySelector("#quickBack").onclick=()=>home();
  document.querySelectorAll("[data-fav]").forEach(btn=>btn.onclick=()=>toggleFavorite(s.id));
  ["openDeep","openDeepBottom","mobileDeep"].forEach(key=>document.querySelector(`#${key}`).onclick=()=>detail(s.id));
  document.querySelector("#quickShare").onclick=async()=>{try{await navigator.clipboard.writeText(location.href);document.querySelector("#quickShare").textContent="链接已复制"}catch{}};
}

function detail(id, push=true){
  const s=stays.find(x=>x.id===id) || stays[0];
  if(push) history.pushState({id},"",`?stay=${s.id}`);
  scrollTo(0,0);
  app.innerHTML=`<main class="detail">
    <header class="detail-hero" style="background-image:url('${s.image}')"><div class="detail-gradient"></div>
      <nav class="detail-nav"><button id="back">← 返回馆藏</button><div><button data-fav="${s.id}">${icon.heart(s.id)} 收藏</button><button id="share">分享</button></div></nav>
      <div class="detail-title"><span class="grade grade-${s.grade}">${s.grade} · ${gradeName[s.grade]}</span>
        <p>${s.place} · ${s.kind}</p><h1>${s.name}</h1><em>${s.en}</em>
        <p class="detail-one">${s.oneLine}</p>
      </div>
      <aside class="hero-score">
        <div><b>${s.score}</b><span>审美匹配</span></div><div><b>${s.value}</b><span>性价比</span></div>
        <div><b>${s.price}</b><span>每间 / 晚参考</span></div>
      </aside>
    </header>
    <nav class="section-nav"><a href="#overview">30秒判断</a><a href="#analysis">空间拆解</a><a href="#gallery">实景图片</a><a href="#facts">档案信息</a><a href="#sources">核验来源</a></nav>

    <section id="overview" class="detail-section overview">
      <div class="section-label"><span>01</span><p>THE SHORT ANSWER</p><h2>30秒判断</h2></div>
      <div class="verdict-card">
        <div class="tag-list">${s.tags.map(t=>`<span>${t}</span>`).join("")}</div>
        <div class="deep-intro"><b>基本介绍</b><div class="deep-profile">${s.profile.map((item,i)=>`<section><span>${String(i+1).padStart(2,"0")}</span><h4>${item.title}</h4><p>${item.text}</p></section>`).join("")}</div><dl><div><dt>所在地</dt><dd>${s.place}</dd></div><div><dt>周边环境</dt><dd>${s.surroundings}</dd></div></dl></div>
        <p class="recommend"><b>收录理由</b>${s.reason}</p>
        <div class="pro-con"><div><h3>明确优点</h3>${s.pros.map(x=>`<p>${icon.check}${x}</p>`).join("")}</div>
          <div class="cons"><h3>主要缺点</h3>${s.cons.map(x=>`<p><span class="cross">×</span>${x}</p>`).join("")}</div></div>
        <div class="who"><div><b>匹配人群</b><p>${s.fit}</p></div><div><b>可能不匹配</b><p>${s.notFit}</p></div></div>
      </div>
      <aside class="metric-card"><h3>四项核心指标</h3>${scoreRow("水体参与",s.waterScore)}${scoreRow("植被包裹",s.greenScore)}${scoreRow("建筑设计",s.designScore)}${scoreRow("探索感",s.exploreScore)}
        <small>分数用于馆内横向比较，不代表酒店星级。</small></aside>
    </section>

    <section id="analysis" class="detail-section analysis-new">
      <div class="section-label"><span>02</span><p>SPATIAL READING</p><h2>空间拆解</h2></div>
      <div class="analysis-grid">
        <article><span>水</span><h3>${s.waterTypes.join(" · ")}</h3><p>${s.reason}</p></article>
        <article><span>路</span><h3>场地动线</h3><p>${s.landscape}</p></article>
        <article><span>抵达</span><h3>位置与交通成本</h3><p>${s.access}</p></article>
        <article><span>取舍</span><h3>${s.tradeoffs.join(" · ")}</h3><p>${s.cons.join("；")}。</p></article>
      </div>
    </section>

    <section id="gallery" class="gallery-new"><div class="gallery-head"><span>03 · VERIFIED IMAGES</span><h2>环境与公共空间实景</h2></div>
      <div class="gallery-grid">${s.gallery.map((url,i)=>`<figure><img src="${url}" alt="${s.name}实景${i+1}" loading="${i?"lazy":"eager"}"><figcaption>${["整体环境","水体与路径","公共空间","建筑与植物"][i]||"实景资料"}</figcaption></figure>`).join("")}</div></section>

    <section id="facts" class="detail-section facts">
      <div class="section-label"><span>04</span><p>FILE CARD</p><h2>档案信息</h2></div>
      <div class="facts-card">
        <div><span>国家 / 地区</span><b>${s.place}</b></div><div><span>酒店类型</span><b>${s.kind}</b></div>
        <div><span>匹配等级</span><b>${s.grade} · ${gradeName[s.grade]}</b></div><div><span>参考价</span><b>${s.price} / 晚</b></div>
        <div><span>水体形式</span><b>${s.waterTypes.join("、")}</b></div><div><span>主要取舍</span><b>${s.tradeoffs.join("、")}</b></div>
        <div><span>核验状态</span><b>${s.verify}</b></div><div><span>最近更新</span><b>${s.updated}</b></div>
      </div>
    </section>

    <section id="sources" class="detail-section sources-new">
      <div class="section-label"><span>05</span><p>SOURCES</p><h2>查价与核验</h2></div>
      <div class="source-buttons"><a class="primary" href="${s.ctrip}" target="_blank">携程预订 / 查价 <span>↗</span></a>
        <a href="${s.official}" target="_blank">酒店官网 / 官方图库 <span>↗</span></a><p>价格随旅行日期、税费、早餐与取消政策变化。</p></div>
    </section>
    <div class="mobile-action"><button data-fav="${s.id}">${icon.heart(s.id)} 收藏</button><a href="${s.ctrip}" target="_blank"><span>${s.price}</span>携程查价</a></div>
    <footer><div class="brand"><span>野</span><b>野栖度假收藏馆</b></div><button id="backBottom">返回全部酒店 ↑</button></footer>
  </main>`;
  document.querySelector("#back").onclick=()=>home();
  document.querySelector("#backBottom").onclick=()=>home();
  document.querySelectorAll("[data-fav]").forEach(btn=>btn.onclick=()=>toggleFavorite(s.id));
  document.querySelector("#share").onclick=async()=>{try{await navigator.clipboard.writeText(location.href);document.querySelector("#share").textContent="链接已复制"}catch{location.hash=""}};
}

window.onpopstate=()=>{
  const params=new URLSearchParams(location.search),deep=params.get("stay"),fast=params.get("quick");
  deep ? detail(deep,false) : fast ? quick(fast,false) : home(false);
};
const params=new URLSearchParams(location.search),initial=params.get("stay"),initialQuick=params.get("quick");
initial ? detail(initial,false) : initialQuick ? quick(initialQuick,false) : home(false);

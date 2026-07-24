import {readFile,writeFile} from "node:fs/promises";
import {join} from "node:path";
import {fileURLToPath} from "node:url";

const root=fileURLToPath(new URL("..",import.meta.url));
const commons=title=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title).replaceAll("%2F","%252F")}?width=1600`;
const item=(url,type,source="酒店官网")=>({url,type,source,verified:true});
const place=(title,caption)=>({url:commons(title),caption});

const hotelAdditions={
  "aana-resort":[
    item("https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-9.jpg","林下建筑","Chillpainai 实景资料"),
    item("https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-99.jpg","河道与平台","Chillpainai 实景资料"),
    item("https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-79.jpg","园林公共空间","Chillpainai 实景资料"),
    item("https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-100.jpg","建筑与水岸","Chillpainai 实景资料"),
    item("https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-60.jpg","植被包裹","Chillpainai 实景资料"),
    item("https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-56.jpg","休息平台","Chillpainai 实景资料"),
    item("https://chillpainai.com/storage/scoop/16809/aana-villas-koh-chang-104.jpg","周边水岸","Chillpainai 实景资料")
  ],
  "bambu-indah":[
    item("https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/6758080922839a57f999c286_explore-gif-4.avif","水边活动"),
    item("https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/67586ebd86997d85e3db8572_bambu_indah_navigation_explore.avif","场地整体"),
    item("https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/673e14f4050252442ce8a2b7_Nature-walk-3.avif","周边自然步道"),
    item("https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/67584f71d93374017c8551a1_bamboo_indah_explore_rice.avif","周边稻田"),
    item("https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/673e155241c1f56b7aa0024d_rice-harvest-3.avif","周边农业景观"),
    item("https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/6758675254835b868a6beddc_bamboo_indah_explore_bamboo_tour2.avif","竹林与建造"),
    item("https://cdn.prod.website-files.com/670679253a76d7a19e5969ee/67585085f9312e6bd8fdc7cd_bamboo_indah_explore_best_of_bali5.avif","周边自然环境")
  ],
  "ulaman":[
    item("https://images.prismic.io/ulaman/Zo56FB5LeNNTw_Xp_ulaman-.jpg?auto=format%2Ccompress","度假村全景"),
    item("https://images.prismic.io/ulaman/ZotMNx5LeNNTw4r1_ulaman.jpg?auto=format%2Ccompress","建筑群与植被"),
    item("https://images.prismic.io/ulaman/agwb7KYofJOwHWq5_eco-luxury-villa-bali.jpg?auto=format%2Ccompress","竹构住宿"),
    item("https://images.prismic.io/ulaman/ZjemEkMTzAJOCioq_ulaman.jpg?auto=format%2Ccompress","林下公共空间"),
    item("https://images.prismic.io/ulaman/agwg7KYofJOwHWvQ_eco-resort-bali.jpg?auto=format%2Ccompress","建筑与水面"),
    item("https://images.prismic.io/ulaman/ZoogWx5LeNNTw3oY_lakevilla.jpg?auto=format%2Ccompress","生态湖住宿"),
    item("https://images.prismic.io/ulaman/ag1MraYofJOwHaFe_cocoon-bamboo-villa-bali-outside-view.jpg?auto=format%2Ccompress","竹屋外部")
  ],
  "naman-retreat":[
    item("https://namanbackend.mpoint.vn/uploads/images/Hayhay-Restaurant.jpg","竹构餐厅"),
    item("https://namanbackend.mpoint.vn/uploads/images/accommondation/Bliss-Sunlit-pool.jpg","住宿区水景"),
    item("https://namanbackend.mpoint.vn/uploads/Rooms/Room_Babylon.jpg","绿化客房区域"),
    item("https://namanbackend.mpoint.vn/uploads/images/Sitini-Pool-Bar.jpg","公共泳池与植被"),
    item("https://namanbackend.mpoint.vn/uploads/images/commons/Pure-Bliss.jpg","水疗花园"),
    item("https://namanbackend.mpoint.vn/uploads/images/offer/Accommodation/Garden-villa.jpg","花园别墅"),
    item("https://namanbackend.mpoint.vn/uploads/Tet%202025/5.%20cycling.jpg","场地道路")
  ],
  "rayavadee":[
    item("https://www.rayavadee.com/en/banners/accom-banner8.jpg","园林住宿区"),
    item("https://www.rayavadee.com/en/banners/accom-banner1.jpg","热带建筑"),
    item("https://www.rayavadee.com/en/banners/accom-banner4.jpg","建筑与林缘"),
    item("https://www.rayavadee.com/en/banners/accom-banner5.jpg","公共园林"),
    item("https://www.rayavadee.com/en/banners/accom-banner6.jpg","住宿与植被"),
    item("https://www.rayavadee.com/en/images/home-accom.jpg","住宿区整体"),
    item("https://www.rayavadee.com/en/images/tgt3.jpg","洞穴餐厅与海滩")
  ]
};

const destinationAdditions={
  "koh-kood":[
    place("Ko Kut, Klong Chao Waterfall - panoramio.jpg","Klong Chao 瀑布与林下水潭"),
    place("Ko Kut, Thailand, Fishing Boat - panoramio.jpg","海湾渔船与岛屿生活"),
    place("Koh Kut, Thailand, Bang Bao Bay at sunset.jpg","Bang Bao 海湾环境"),
    place("Koh Kut, Thailand, Bang Bao, Twilight.jpg","海湾聚落黄昏"),
    place("Koh Kut, Thailand, Eastern Bay, Fishing boat.jpg","东岸海湾与渔船"),
    place("Koh Kut, Thailand, Eastern Bay.jpg","东岸树林与水面"),
    place("Koh Kut, Thailand, Island waterfall and lake.jpg","岛内瀑布与水池"),
    place("Ko Kut, Soneva Kiri, Jetty - panoramio.jpg","岛屿栈桥与水路")
  ],
  "khao-sok-cheow-lan":[
    place("Early dawn on Cheow Lan Lake, Khao Sok, Surat Thani, Thailand.jpg","乔兰湖晨雾"),
    place("Footbridge in Khao Sok National Park.jpg","雨林内部步桥"),
    place("Bamboo forest in Khao Sok National Park.jpg","竹林步道"),
    place("1022-khao-sok-national-park-01.jpg","国家公园水陆环境"),
    place("1022-khao-sok-national-park-02.jpg","湖岸植被"),
    place("1022-khao-sok-national-park-03.jpg","雨林与石灰岩"),
    place("1022-khao-sok-national-park-04.jpg","支流与山体"),
    place("Khao Sok National Park (50739124073).jpg","周边雨林景观")
  ],
  "furnas":[
    place("20220519.Parque Terra Nostra.-011.4.jpg","植物园林下水岸"),
    place("20220519.Parque Terra Nostra.-011.5.jpg","温泉园林细部"),
    place("Furnas - Parco terra Nostra 02.JPG","Terra Nostra 园林空间"),
    place("Furnas Geothermal Pool (14715917249).jpg","Furnas 地热水池"),
    place("Hot bath at Furnas (526369835).jpg","山谷温泉浴池"),
    place("Morning steam. - panoramio.jpg","清晨地热蒸汽"),
    place("Parque Terra Nostra (14875972936).jpg","成熟植物与园路"),
    place("Parque Terra Nostra hot spring (51841119360).jpg","公共温泉与周边植物")
  ],
  "kurokawa-onsen":[
    place("Hotspring Foot Bath (31379962991).jpg","温泉街足汤"),
    place("Riverside Foot Bath (31385192561).jpg","河岸公共足汤"),
    place("Kurokawa Onsen-1.jpg","温泉聚落街巷"),
    place("Kurokawa Onsen-2.jpg","木构建筑与树林"),
    place("Kurokawaonsen2.jpg","温泉街周边"),
    place("Yumotosō -Kurokawa Onsen.jpg","河岸旅馆"),
    place("黒川温泉 (268551239).jpg","温泉街步行空间"),
    place("黒川温泉 (268552393).jpg","河谷建筑与植物")
  ],
  "bukit-lawang":[
    place("Bukit Lawang bridge over Bohorok.jpg","跨越 Bohorok 河的吊桥"),
    place("Bukit lawang.jpg","河岸村落"),
    place("BukitLawang 1600.JPG","村落与国家公园边缘"),
    place("BukitLawang.JPG","河谷住宿环境"),
    place("EcoLodgeBukitLawang.JPG","周边生态住宿"),
    place("Kawasan Hutan Bukit Lawang.jpg","勒塞尔山雨林与河流"),
    place("Sungai Bahorok 4.jpg","Bahorok 河水体"),
    place("Sungai Bahorok 5.jpg","河岸植被与活动")
  ],
  "xilitla-las-pozas":[
    place("Cascada en Pozas de Edward James.jpg","园林天然瀑布"),
    place("Cascada Jardín Edward James.jpg","雨林瀑布与构筑物"),
    place("Cascada, Las Pozas.jpg","Las Pozas 水体"),
    place("Cambio de nivel, se abren caminos. Xilitla (3683239926).jpg","园林高差与路径"),
    place("Arco surrealista.jpg","植物包裹的拱门"),
    place("Baño surrealista.jpg","水池与超现实建筑"),
    place("Edward James Las Pozas Pillars.jpg","林间柱廊"),
    place("Entrada al Jardín Surrealista de Edward James.jpg","园林入口与植被")
  ],
  "wulai":[
    place("2010-12-29 buildings along Nanshih River in Wulai.jpg","沿南势溪建筑"),
    place("2010-12-29 river in Wulai.jpg","河流与山谷"),
    place("2010-12-29 Valley in Wulai.jpg","乌来河谷全貌"),
    place("2012-07-03 Wulai in Moonlight from the side of the Wulai River.jpg","河岸夜景"),
    place("Wulai Nanshi River-02.2023-09-12.jpg","南势溪近岸环境"),
    place("Wulai Nanshi River-03.2023-09-12.jpg","河谷植被与水面"),
    place("Nanshih Stream, Wulai. 南勢溪經烏來街區 - panoramio.jpg","河流穿过温泉街"),
    place("烏來信賢步道 - panoramio (5).jpg","周边森林步道")
  ]
};

async function merge(dir,id,rows){
  const path=join(root,"data",dir,`${id}.json`);
  const data=JSON.parse(await readFile(path,"utf8"));
  const seen=new Set(data.media.gallery.map(x=>decodeURIComponent(x.url.split("?")[0]).toLowerCase()));
  for(const row of rows){
    const key=decodeURIComponent(row.url.split("?")[0]).toLowerCase();
    if(!seen.has(key)){data.media.gallery.push(row);seen.add(key);}
  }
  await writeFile(path,`${JSON.stringify(data,null,2)}\n`);
}
for(const [id,rows] of Object.entries(hotelAdditions)) await merge("hotels",id,rows);
for(const [id,rows] of Object.entries(destinationAdditions)) await merge("destinations",id,rows);
console.log("Gallery enrichment complete");

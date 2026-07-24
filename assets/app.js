let stays=[];
let destinations=[];
let contentUpdatedAt="";
let dataNotice="";

function normalizeHotel(raw){
  return {
    id:raw.id,
    status:raw.status,
    name:raw.identity.name,
    en:raw.identity.englishName,
    place:raw.identity.placeLabel,
    region:raw.identity.region,
    grade:raw.classification.grade,
    collection:raw.classification.collection||"resort",
    kind:raw.identity.hotelType,
    priceMin:raw.pricing.minimum,
    priceMax:raw.pricing.maximum,
    price:raw.pricing.display,
    score:raw.scores.aesthetic,
    value:raw.scores.value,
    waterScore:raw.scores.water,
    greenScore:raw.scores.greenery,
    designScore:raw.scores.architecture,
    exploreScore:raw.scores.exploration,
    waterTypes:raw.classification.waterTypes,
    tradeoffs:raw.classification.tradeoffs,
    tags:raw.classification.tags,
    oneLine:raw.editorial.oneLine,
    reason:raw.editorial.reason,
    pros:raw.editorial.advantages,
    cons:raw.editorial.disadvantages.map(item=>item.text),
    disadvantageRecords:raw.editorial.disadvantages,
    fit:raw.editorial.fit,
    notFit:raw.editorial.notFit,
    profile:raw.profile.sections,
    surroundings:raw.profile.surroundingsSummary,
    landscape:raw.profile.spatialRelationship,
    access:raw.profile.access,
    verify:raw.verification.summary,
    updated:raw.verification.updatedAt,
    verificationStatus:raw.verification.status,
    image:raw.media.cover,
    gallery:raw.media.gallery.map(item=>item.url),
    galleryRecords:raw.media.gallery,
    food:raw.food||null,
    ctrip:raw.links.ctrip,
    official:raw.links.official
  };
}

async function loadHotelData(){
  const stamp=Date.now();
  const manifestResponse=await fetch(`data/index.json?ts=${stamp}`,{cache:"no-store"});
  if(!manifestResponse.ok) throw new Error(`manifest ${manifestResponse.status}`);
  const manifest=await manifestResponse.json();
  const rows=await Promise.all(manifest.hotels.map(async path=>{
    const response=await fetch(`data/${path}?v=${encodeURIComponent(manifest.contentVersion)}&ts=${stamp}`,{cache:"no-store"});
    if(!response.ok) throw new Error(`${path} ${response.status}`);
    return response.json();
  }));
  const published=rows.filter(item=>item.status==="published").map(normalizeHotel);
  if(!published.length) throw new Error("no published hotels");
  if(new Set(published.map(item=>item.id)).size!==published.length) throw new Error("duplicate hotel id");
  stays=published;
  const destinationRows=await Promise.all((manifest.destinations||[]).map(async path=>{
    const response=await fetch(`data/${path}?v=${encodeURIComponent(manifest.contentVersion)}&ts=${stamp}`,{cache:"no-store"});
    if(!response.ok) throw new Error(`${path} ${response.status}`);
    return response.json();
  }));
  destinations=destinationRows.filter(item=>item.status==="published");
  contentUpdatedAt=manifest.updatedAt;
  localStorage.setItem("wild-stay-data-cache",JSON.stringify({hotels:published,updatedAt:manifest.updatedAt,contentVersion:manifest.contentVersion}));
}

const app = document.querySelector("#app");
const gradeName = {A:"核心匹配", B:"白沙滩特例", C:"取舍候选"};
const state = {price:"all", grade:"all", water:"all", compromise:"all", sort:"editor", query:""};
let activeCollection="resort";
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
function uniqueImages(cover,records=[]){
  const rows=[{url:cover,caption:"整体环境"},...records.map((item,i)=>typeof item==="string"?{url:item,caption:`实景 ${i+1}`}:{url:item.url,caption:item.caption||item.type||`实景 ${i+1}`})];
  return rows.filter((item,i)=>item.url&&rows.findIndex(other=>other.url===item.url)===i);
}
function imageScope(image){
  return /周边|村落|街|河谷|海湾|岛屿|稻田|农业|步道|抵达|东岸|夜景|渔船/.test(image.caption||"")?"surroundings":"core";
}
function galleryFilters(){
  return `<div class="gallery-filters"><button class="active" data-gallery-filter="all">全部影像</button><button data-gallery-filter="core">核心空间</button><button data-gallery-filter="surroundings">周边环境</button></div>`;
}
function bindGalleryFilters(scope){
  document.querySelectorAll(`${scope} [data-gallery-filter]`).forEach(button=>button.onclick=()=>{
    document.querySelectorAll(`${scope} [data-gallery-filter]`).forEach(item=>item.classList.toggle("active",item===button));
    document.querySelectorAll(`${scope} figure[data-scope]`).forEach(figure=>figure.hidden=button.dataset.galleryFilter!=="all"&&figure.dataset.scope!==button.dataset.galleryFilter);
  });
}
function photoMosaic(images,label){
  const rows=images.slice(0,3);
  return `<div class="photo-mosaic ${rows.length<3?"photo-mosaic-short":""}">
    ${rows.map((image,i)=>`<figure class="${i===0?"photo-main":""}"><img src="${image.url}" alt="${label} · ${image.caption}" loading="${i?"lazy":"eager"}"></figure>`).join("")}
    <span class="photo-count">${images.length} 张实景</span>
  </div>`;
}
function openLightbox(images,index=0){
  let current=index;
  const layer=document.createElement("div");
  layer.className="photo-lightbox";
  const draw=()=>{const image=images[current];layer.innerHTML=`<button class="lightbox-close">×</button><button class="lightbox-prev">←</button><figure><img src="${image.url}" alt="${image.caption}"><figcaption><b>${String(current+1).padStart(2,"0")} / ${String(images.length).padStart(2,"0")}</b>${image.caption}</figcaption></figure><button class="lightbox-next">→</button>`;layer.querySelector(".lightbox-close").onclick=()=>layer.remove();layer.querySelector(".lightbox-prev").onclick=()=>{current=(current-1+images.length)%images.length;draw()};layer.querySelector(".lightbox-next").onclick=()=>{current=(current+1)%images.length;draw()};};
  layer.onclick=e=>{if(e.target===layer)layer.remove()};
  draw();document.body.appendChild(layer);
}
function bindPhotoViewer(scope,images){
  document.querySelectorAll(`${scope} [data-photo-index]`).forEach(el=>el.onclick=e=>{e.stopPropagation();openLightbox(images,Number(el.dataset.photoIndex)||0)});
}
function visibleStays(){
  let rows = stays.filter(s => {
    const foodText=s.food?`${s.food.summary||""}${(s.food.highlights||[]).map(item=>`${item.name}${item.description}`).join("")}`:"";
    const text = `${s.name}${s.en}${s.place}${s.kind}${s.tags.join("")}${foodText}`.toLowerCase();
    const priceOK = state.price==="all" ||
      (state.price==="600" && s.priceMin<=600) ||
      (state.price==="1000" && s.priceMin<=1000) ||
      (state.price==="2000" && s.priceMin<=2000) ||
      (state.price==="over" && s.priceMin>2000);
    return s.collection===activeCollection && priceOK &&
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
  const images=uniqueImages(s.image,s.galleryRecords);
  return `<article class="lab-card" data-quick="${s.id}" tabindex="0">
    <button class="fav-card" data-fav="${s.id}" aria-label="收藏">${icon.heart(s.id)}</button>
    <div class="card-photo">
      ${photoMosaic(images,s.name)}
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
      <div class="card-foot"><div class="card-price"><strong>${s.price}</strong><small>每间 / 晚参考</small></div><div class="card-links">
        <button type="button" class="entry-quick" data-quick="${s.id}" aria-label="打开${s.name}简介页"><b>简介页</b><small>快速判断</small></button>
        <button type="button" class="entry-deep" data-deep="${s.id}" aria-label="打开${s.name}详情页"><b>详情页</b><small>完整档案 <span>→</span></small></button>
      </div></div>
    </div>
  </article>`;
}

function home(push=true,collection=activeCollection){
  activeCollection=collection;
  if(push) history.pushState({view:collection},"",`${location.pathname}?view=${collection==="lodging"?"lodgings":"resorts"}`);
  const rows = visibleStays();
  const isLodging=activeCollection==="lodging";
  const pageTitle=isLodging?"民宿与自然旅居":"度假酒店与度假村";
  const pageCount=stays.filter(s=>s.collection===activeCollection).length;
  app.innerHTML = `
    <nav class="topbar"><a class="brand" href="#"><span>野</span><b>野栖度假收藏馆</b></a>
      <div><button id="openResorts" class="${!isLodging?"nav-current":""}">度假酒店 ${stays.filter(s=>s.collection==="resort").length}</button><button id="openLodgings" class="${isLodging?"nav-current":""}">民宿旅居 ${stays.filter(s=>s.collection==="lodging").length}</button><button id="openDestinations">度假地 ${destinations.length}</button><button id="showFav">收藏 ${favorites.size}</button></div></nav>
    <header class="home-hero"><div class="hero-shade"></div><div class="hero-copy">
      <span class="overline">WILD STAY ATLAS · ${isLodging?"LODGE & HOMESTAY FILES":"VERIFIED RESORT FILES"}</span>
      <h1>水流心不竞，<br><i>云在意俱迟。</i></h1>
      <cite>杜甫《江亭》</cite>
      <p>${isLodging?"树屋、河岸木屋、生态旅馆、温泉宿与家庭民宿。":"具有完整场地体验的度假酒店与大型度假村档案。"}</p>
      <div class="hero-actions"><a href="#finder">${pageTitle} <span>↓</span></a><button id="switchCollection">${isLodging?"查看度假酒店":"查看民宿旅居"} <span>→</span></button><button id="heroDestinations">度假地档案 <span>→</span></button></div>
    </div>
    <div class="hero-board">
      <div><b>${pageCount}</b><span>本页建档</span></div><div><b>${stays.filter(s=>s.collection===activeCollection&&s.priceMin<=2000).length}</b><span>预算内</span></div>
      <div><b>${stays.filter(s=>s.collection===activeCollection&&s.value>=90).length}</b><span>高性价比</span></div><div><b>${favorites.size}</b><span>已收藏</span></div>
    </div></header>
    <main id="finder" class="finder">
      <section class="finder-head"><div><span class="overline dark">${isLodging?"LODGE FINDER":"RESORT FINDER"}</span><h2>${pageTitle}</h2></div>
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
      ${dataNotice?`<div class="data-notice">${dataNotice}</div>`:""}
      <section class="results-head"><div><b>${rows.length}</b> 家符合当前条件</div><span>资料更新至 ${contentUpdatedAt||"—"}</span></section>
      <section class="hotel-grid">${rows.length ? rows.map(card).join("") : `<div class="empty"><b>没有符合当前组合的住宿</b><span>当前结果为 0</span></div>`}</section>
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
  document.querySelector("#openDestinations").onclick=()=>destinationHome();
  document.querySelector("#openResorts").onclick=()=>home(true,"resort");
  document.querySelector("#openLodgings").onclick=()=>home(true,"lodging");
  document.querySelector("#switchCollection").onclick=()=>home(true,isLodging?"resort":"lodging");
  document.querySelector("#heroDestinations").onclick=()=>destinationHome();
}

const destinationState={type:"all",price:"all",sort:"editor",query:""};

function destinationRows(){
  let rows=destinations.filter(d=>{
    const text=`${d.identity.name}${d.identity.englishName}${d.identity.country}${d.identity.region}${d.identity.type}${d.classification.tags.join("")}`;
    const typeOK=destinationState.type==="all"||d.identity.type.includes(destinationState.type);
    const priceOK=destinationState.price==="all"||(destinationState.price==="600"&&d.pricing.minimum<=600)||(destinationState.price==="1000"&&d.pricing.minimum<=1000);
    return typeOK&&priceOK&&text.toLowerCase().includes(destinationState.query.toLowerCase());
  });
  if(destinationState.sort==="public") rows.sort((a,b)=>b.scores.publicness-a.scores.publicness);
  else if(destinationState.sort==="budget") rows.sort((a,b)=>b.scores.affordability-a.scores.affordability);
  else if(destinationState.sort==="water") rows.sort((a,b)=>b.scores.water-a.scores.water);
  else rows.sort((a,b)=>b.scores.aesthetic-a.scores.aesthetic);
  return rows;
}

function destinationCard(d){
  const images=uniqueImages(d.media.cover,d.media.gallery);
  return `<article class="destination-card" data-destination="${d.id}">
    <div class="destination-image">
      ${photoMosaic(images,d.identity.name)}
      <span>地区档案</span>
      <b>${d.identity.type}</b>
    </div>
    <div class="destination-copy">
      <p>${d.identity.placeLabel}</p><h3>${d.identity.name}</h3><em>${d.identity.englishName}</em>
      <div class="destination-metrics">
        <span><b>${d.scores.publicness}</b>环境公共性</span><span><b>${d.scores.water}</b>水体参与</span>
        <span><b>${d.scores.greenery}</b>植被包裹</span><span><b>${d.scores.affordability}</b>平价可得</span>
      </div>
      <p class="destination-summary">${d.editorial.oneLine}</p>
      <div class="tag-list">${d.classification.tags.map(tag=>`<span>${tag}</span>`).join("")}</div>
      <div class="destination-card-foot"><strong>${d.pricing.display}<small>两人一间 / 晚参考</small></strong><button>查看地区档案 →</button></div>
    </div>
  </article>`;
}

function destinationHome(push=true){
  if(push) history.pushState({destinations:true},"",`${location.pathname}?view=destinations`);
  scrollTo(0,0);
  const rows=destinationRows();
  app.innerHTML=`<main class="destination-index">
    <nav class="topbar"><a class="brand" href="#"><span>野</span><b>野栖度假收藏馆</b></a><div><button id="backResorts">度假酒店</button><button id="backLodgings">民宿旅居</button><span class="nav-current">度假地档案</span></div></nav>
    <header class="destination-hero" style="background-image:url('${destinations[0]?.media.cover||""}')"><div></div><section>
      <span>DESTINATION ARCHIVES · ${String(destinations.length).padStart(2,"0")} FILES</span>
      <h1>度假地档案</h1>
      <p>岛屿、河谷、湖区与温泉聚落。重点记录不依赖昂贵酒店也能获得的自然体验。</p>
    </section><aside><b>环境公共性</b><p>水体、道路与自然空间是否由整个地区共享，而非只属于单一酒店。</p></aside></header>
    <section class="destination-finder">
      <header><div><span>DESTINATION FINDER</span><h2>地区筛选</h2></div><p>${rows.length} 个已核验地区</p></header>
      <div class="destination-controls">
        <div><b>环境类型</b>${[["all","全部"],["岛屿","岛屿"],["雨林","雨林 / 湖区"],["温泉","温泉聚落"]].map(([v,l])=>`<button data-dtype="${v}" class="${destinationState.type===v?"active":""}">${l}</button>`).join("")}</div>
        <div><b>最低价</b>${[["all","不限"],["600","¥600以内"],["1000","¥1,000以内"]].map(([v,l])=>`<button data-dprice="${v}" class="${destinationState.price===v?"active":""}">${l}</button>`).join("")}</div>
        <div class="destination-search"><input id="destinationQuery" value="${destinationState.query}" placeholder="搜索国家、地区、水体或环境类型"><select id="destinationSort">
          <option value="editor">综合匹配</option><option value="public" ${destinationState.sort==="public"?"selected":""}>环境公共性</option>
          <option value="budget" ${destinationState.sort==="budget"?"selected":""}>平价可得</option><option value="water" ${destinationState.sort==="water"?"selected":""}>水体参与</option>
        </select></div>
      </div>
      <div class="destination-grid">${rows.map(destinationCard).join("")||`<div class="empty"><b>暂无符合条件的地区</b></div>`}</div>
    </section>
    <footer><div class="brand"><span>野</span><b>野栖度假收藏馆</b></div><p>度假地档案 · 更新至 ${contentUpdatedAt}</p></footer>
  </main>`;
  document.querySelector("#backResorts").onclick=()=>home(true,"resort");
  document.querySelector("#backLodgings").onclick=()=>home(true,"lodging");
  document.querySelectorAll("[data-destination]").forEach(el=>el.onclick=()=>destinationDetail(el.dataset.destination));
  document.querySelectorAll("[data-dtype]").forEach(btn=>btn.onclick=()=>{destinationState.type=btn.dataset.dtype;destinationHome(false)});
  document.querySelectorAll("[data-dprice]").forEach(btn=>btn.onclick=()=>{destinationState.price=btn.dataset.dprice;destinationHome(false)});
  document.querySelector("#destinationQuery").oninput=e=>{destinationState.query=e.target.value;clearTimeout(window.destinationTimer);window.destinationTimer=setTimeout(()=>destinationHome(false),180)};
  document.querySelector("#destinationSort").onchange=e=>{destinationState.sort=e.target.value;destinationHome(false)};
}

function destinationDetail(id,push=true){
  const d=destinations.find(item=>item.id===id)||destinations[0];
  const destinationImages=uniqueImages(d.media.cover,d.media.gallery);
  if(push) history.pushState({destination:id},"",`${location.pathname}?destination=${d.id}`);
  scrollTo(0,0);
  app.innerHTML=`<main class="destination-detail">
    <header class="destination-detail-hero" style="background-image:url('${d.media.cover}')"><div class="detail-gradient"></div>
      <nav class="detail-nav"><button id="backDestinations">← 返回度假地</button><div><button id="shareDestination">分享</button></div></nav>
      <section><span>${d.identity.placeLabel} · ${d.identity.type}</span><h1>${d.identity.name}</h1><em>${d.identity.englishName}</em><p>${d.editorial.oneLine}</p></section>
      <aside><div><b>${d.scores.publicness}</b><span>环境公共性</span></div><div><b>${d.scores.affordability}</b><span>平价可得</span></div><div><b>${d.pricing.display}</b><span>每晚参考</span></div></aside>
    </header>
    <nav class="section-nav"><a href="#destinationVerdict">地区判断</a><a href="#destinationMap">落脚区域</a><a href="#destinationBudget">住宿预算</a><a href="#destinationGallery">实景</a><a href="#destinationFacts">实际条件</a></nav>
    <section id="destinationVerdict" class="destination-section destination-verdict">
      <header><span>01 · DESTINATION VERDICT</span><h2>为什么值得单独建档</h2></header>
      <article><p class="destination-reason">${d.editorial.reason}</p><div class="pro-con"><div><h3>成立之处</h3>${d.editorial.advantages.map(x=>`<p>${icon.check}${x}</p>`).join("")}</div>
      <div class="cons"><h3>明确取舍</h3>${d.editorial.disadvantages.map(x=>`<p><i class="risk ${x.level==="明显取舍"?"mid":"low"}">${x.level}</i>${x.text}</p>`).join("")}</div></div></article>
      <aside class="destination-scoreboard">${scoreRow("环境公共性",d.scores.publicness)}${scoreRow("水体参与",d.scores.water)}${scoreRow("植被包裹",d.scores.greenery)}${scoreRow("可探索性",d.scores.exploration)}${scoreRow("平价可得",d.scores.affordability)}${scoreRow("抵达便利",d.scores.accessEase)}</aside>
    </section>
    <section id="destinationMap" class="destination-section destination-areas"><header><span>02 · AREA READING</span><h2>住在哪里</h2><p>${d.profile.spatialLogic}</p></header>
      <div>${d.profile.baseAreas.map((area,i)=>`<article><b>${String(i+1).padStart(2,"0")}</b><h3>${area.name}</h3><p>${area.fit}</p></article>`).join("")}</div></section>
    <section id="destinationBudget" class="destination-section destination-budget"><header><span>03 · STAY STRATEGY</span><h2>住宿预算</h2><p>${d.profile.stayStrategy}</p></header>
      <div>${d.pricing.budgetBands.map(band=>`<article><span>${band.label}</span><b>${band.range}</b></article>`).join("")}<p>${d.pricing.note}</p></div></section>
    <section id="destinationGallery" class="destination-gallery"><header><span>04 · PLACE IMAGES</span><h2>地区影像档案</h2><p>${destinationImages.length} 张 · 点击查看完整画面</p>${galleryFilters()}</header><div>${destinationImages.map((image,i)=>`<figure data-photo-index="${i}" data-scope="${imageScope(image)}"><img src="${image.url}" alt="${image.caption}" loading="${i?"lazy":"eager"}"><figcaption><b>${String(i+1).padStart(2,"0")}</b><i>${imageScope(image)==="core"?"核心空间":"周边环境"}</i>${image.caption}</figcaption></figure>`).join("")}</div></section>
    <section id="destinationFacts" class="destination-section destination-facts"><header><span>05 · PRACTICAL FILE</span><h2>实际条件</h2></header><div>
      <article><span>如何接近水</span><p>${d.profile.waterAccess}</p></article><article><span>抵达方式</span><p>${d.profile.access}</p></article>
      <article><span>季节变化</span><p>${d.profile.season}</p></article><article><span>资料状态</span><p>${d.verification.summary}</p></article>
      <nav><a class="primary" href="${d.links.ctrip}" target="_blank">携程住宿查价 ↗</a><a href="${d.links.map}" target="_blank">地图查看 ↗</a><a href="${d.links.primary}" target="_blank">主要核验资料 ↗</a></nav>
    </div></section>
    <footer><div class="brand"><span>野</span><b>野栖度假收藏馆</b></div><button id="backDestinationsBottom">返回度假地档案 ↑</button></footer>
  </main>`;
  document.querySelector("#backDestinations").onclick=()=>destinationHome();
  document.querySelector("#backDestinationsBottom").onclick=()=>destinationHome();
  document.querySelector("#shareDestination").onclick=async()=>{try{await navigator.clipboard.writeText(location.href);document.querySelector("#shareDestination").textContent="链接已复制"}catch{}};
  bindPhotoViewer("#destinationGallery",destinationImages);
  bindGalleryFilters("#destinationGallery");
}

function quick(id,push=true){
  const s=stays.find(x=>x.id===id)||stays[0];
  activeCollection=s.collection;
  if(push) history.pushState({quick:id},"",`?quick=${s.id}`);
  scrollTo(0,0);
  const records=s.disadvantageRecords||s.cons.map((text,i)=>({level:i===2?"轻微提醒":"明显取舍",text}));
  const severe=records.filter(item=>item.level==="可能淘汰").map(item=>item.text);
  const moderate=records.filter(item=>item.level==="明显取舍").map(item=>item.text);
  const light=records.filter(item=>item.level==="轻微提醒").map(item=>item.text);
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
  document.querySelector("#quickBack").onclick=()=>home(true,s.collection);
  document.querySelectorAll("[data-fav]").forEach(btn=>btn.onclick=()=>toggleFavorite(s.id));
  ["openDeep","openDeepBottom","mobileDeep"].forEach(key=>document.querySelector(`#${key}`).onclick=()=>detail(s.id));
  document.querySelector("#quickShare").onclick=async()=>{try{await navigator.clipboard.writeText(location.href);document.querySelector("#quickShare").textContent="链接已复制"}catch{}};
}

function detail(id, push=true){
  const s=stays.find(x=>x.id===id) || stays[0];
  activeCollection=s.collection;
  const hotelImages=uniqueImages(s.image,s.galleryRecords);
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
    <nav class="section-nav"><a href="#overview">30秒判断</a><a href="#analysis">空间拆解</a>${s.food?'<a href="#food">美食风味</a>':""}<a href="#gallery">实景图片</a><a href="#facts">档案信息</a><a href="#sources">核验来源</a></nav>

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

    ${s.food?`<section id="food" class="detail-section food-file">
      <div class="section-label"><span>03</span><p>TABLE & PLACE</p><h2>美食与地方风味</h2></div>
      <div class="food-lead"><p>${s.food.summary}</p><dl><div><dt>用餐场景</dt><dd>${s.food.setting}</dd></div>${s.food.caveat?`<div><dt>需要留意</dt><dd>${s.food.caveat}</dd></div>`:""}</dl></div>
      <div class="food-grid">${(s.food.highlights||[]).map((item,i)=>`<article><span>${String(i+1).padStart(2,"0")}</span><h3>${item.name}</h3><p>${item.description}</p></article>`).join("")}</div>
    </section>`:""}

    <section id="gallery" class="gallery-new"><div class="gallery-head"><span>${s.food?"04":"03"} · VERIFIED IMAGES</span><h2>环境与公共空间影像</h2><p>${hotelImages.length} 张 · 点击查看完整画面</p>${galleryFilters()}</div>
      <div class="gallery-grid">${hotelImages.map((image,i)=>`<figure data-photo-index="${i}" data-scope="${imageScope(image)}"><img src="${image.url}" alt="${s.name} · ${image.caption}" loading="${i?"lazy":"eager"}"><figcaption><b>${String(i+1).padStart(2,"0")}</b><i>${imageScope(image)==="core"?"核心空间":"周边环境"}</i>${image.caption}</figcaption></figure>`).join("")}</div></section>

    <section id="facts" class="detail-section facts">
      <div class="section-label"><span>${s.food?"05":"04"}</span><p>FILE CARD</p><h2>档案信息</h2></div>
      <div class="facts-card">
        <div><span>国家 / 地区</span><b>${s.place}</b></div><div><span>酒店类型</span><b>${s.kind}</b></div>
        <div><span>匹配等级</span><b>${s.grade} · ${gradeName[s.grade]}</b></div><div><span>参考价</span><b>${s.price} / 晚</b></div>
        <div><span>水体形式</span><b>${s.waterTypes.join("、")}</b></div><div><span>主要取舍</span><b>${s.tradeoffs.join("、")}</b></div>
        <div><span>核验状态</span><b>${s.verify}</b></div><div><span>最近更新</span><b>${s.updated}</b></div>
      </div>
    </section>

    <section id="sources" class="detail-section sources-new">
      <div class="section-label"><span>${s.food?"06":"05"}</span><p>SOURCES</p><h2>查价与核验</h2></div>
      <div class="source-buttons"><a class="primary" href="${s.ctrip}" target="_blank">携程预订 / 查价 <span>↗</span></a>
        <a href="${s.official}" target="_blank">酒店官网 / 官方图库 <span>↗</span></a><p>价格随旅行日期、税费、早餐与取消政策变化。</p></div>
    </section>
    <div class="mobile-action"><button data-fav="${s.id}">${icon.heart(s.id)} 收藏</button><a href="${s.ctrip}" target="_blank"><span>${s.price}</span>携程查价</a></div>
    <footer><div class="brand"><span>野</span><b>野栖度假收藏馆</b></div><button id="backBottom">返回${s.collection==="lodging"?"民宿与自然旅居":"度假酒店与度假村"} ↑</button></footer>
  </main>`;
  document.querySelector("#back").onclick=()=>home(true,s.collection);
  document.querySelector("#backBottom").onclick=()=>home(true,s.collection);
  document.querySelectorAll("[data-fav]").forEach(btn=>btn.onclick=()=>toggleFavorite(s.id));
  document.querySelector("#share").onclick=async()=>{try{await navigator.clipboard.writeText(location.href);document.querySelector("#share").textContent="链接已复制"}catch{location.hash=""}};
  bindPhotoViewer("#gallery",hotelImages);
  bindGalleryFilters("#gallery");
}

window.onpopstate=()=>{
  const params=new URLSearchParams(location.search),deep=params.get("stay"),fast=params.get("quick"),destination=params.get("destination"),view=params.get("view");
  destination?destinationDetail(destination,false):view==="destinations"?destinationHome(false):deep ? detail(deep,false) : fast ? quick(fast,false) : home(false,view==="lodgings"?"lodging":"resort");
};

async function init(){
  app.innerHTML=`<div class="data-loading"><span>野</span><p>正在读取酒店档案</p></div>`;
  try{
    await loadHotelData();
  }catch(error){
    console.error("Hotel data load failed",error);
    const cached=JSON.parse(localStorage.getItem("wild-stay-data-cache")||"null");
    if(cached?.hotels?.length){
      stays=cached.hotels;
      contentUpdatedAt=cached.updatedAt;
      dataNotice="酒店资料读取异常，当前显示最近一次缓存。";
    }else{
      app.innerHTML=`<div class="data-loading data-error"><span>!</span><p>酒店资料暂时无法读取</p><button onclick="location.reload()">重新载入</button></div>`;
      return;
    }
  }
  const params=new URLSearchParams(location.search),initial=params.get("stay"),initialQuick=params.get("quick"),initialDestination=params.get("destination"),view=params.get("view");
  initialDestination?destinationDetail(initialDestination,false):view==="destinations"?destinationHome(false):initial ? detail(initial,false) : initialQuick ? quick(initialQuick,false) : home(false,view==="lodgings"?"lodging":"resort");
}
init();

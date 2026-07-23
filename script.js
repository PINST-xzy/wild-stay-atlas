const hotels = [
  {
    name: "莫干山溪谷隐宿",
    city: "浙江湖州",
    region: "华东",
    budget: "mid",
    price: "约 1280 元/晚",
    drive: "高铁 55 分钟",
    score: 92,
    scenes: ["山野", "团建"],
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=80",
    desc: "适合小团队包栋、山林徒步和安静会议，公共客厅与户外草坪条件完整。"
  },
  {
    name: "腾冲热海私汤度假",
    city: "云南保山",
    region: "西南",
    budget: "high",
    price: "约 2380 元/晚",
    drive: "机场 40 分钟",
    score: 95,
    scenes: ["温泉", "山野"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    desc: "温泉体验突出，房间私密度高，适合疗愈型假期和高预算情侣出行。"
  },
  {
    name: "陵水海岸亲子营地",
    city: "海南陵水",
    region: "华南",
    budget: "high",
    price: "约 2680 元/晚",
    drive: "机场 75 分钟",
    score: 89,
    scenes: ["海岛", "亲子"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    desc: "海滩、泳池和儿童活动丰富，适合亲子长住，但旺季价格波动明显。"
  },
  {
    name: "安吉竹海设计酒店",
    city: "浙江安吉",
    region: "华东",
    budget: "mid",
    price: "约 1580 元/晚",
    drive: "高铁 70 分钟",
    score: 90,
    scenes: ["山野", "亲子"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    desc: "设计感和亲子配套平衡，餐饮稳定，适合作为周末短途度假候选。"
  },
  {
    name: "阿勒泰雪山木屋",
    city: "新疆阿勒泰",
    region: "西北",
    budget: "low",
    price: "约 880 元/晚",
    drive: "机场 65 分钟",
    score: 84,
    scenes: ["山野", "团建"],
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    desc: "景观强、季节性强，适合冬季滑雪和摄影，但交通与天气风险需要预留。"
  },
  {
    name: "惠州海湾轻度假",
    city: "广东惠州",
    region: "华南",
    budget: "low",
    price: "约 760 元/晚",
    drive: "深圳 80 分钟",
    score: 82,
    scenes: ["海岛", "团建"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    desc: "预算友好，适合公司短途活动和海边放松，对精致服务要求高时需谨慎。"
  }
];

const grid = document.querySelector("#hotelGrid");
const template = document.querySelector("#hotelCardTemplate");
const searchInput = document.querySelector("#searchInput");
const regionFilter = document.querySelector("#regionFilter");
const budgetFilter = document.querySelector("#budgetFilter");
const sceneFilter = document.querySelector("#sceneFilter");
const matchCount = document.querySelector("#matchCount");
const topPick = document.querySelector("#topPick");
const resetButton = document.querySelector("#resetButton");

function matchesHotel(hotel) {
  const query = searchInput.value.trim().toLowerCase();
  const region = regionFilter.value;
  const budget = budgetFilter.value;
  const scene = sceneFilter.value;
  const text = [hotel.name, hotel.city, hotel.region, hotel.desc, ...hotel.scenes].join(" ").toLowerCase();

  return (
    (!query || text.includes(query)) &&
    (region === "all" || hotel.region === region) &&
    (budget === "all" || hotel.budget === budget) &&
    (scene === "all" || hotel.scenes.includes(scene))
  );
}

function render() {
  const filtered = hotels.filter(matchesHotel).sort((a, b) => b.score - a.score);
  grid.innerHTML = "";
  matchCount.textContent = filtered.length;
  topPick.textContent = filtered[0] ? filtered[0].name : "无匹配";

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "没有匹配的酒店，试试放宽预算或体验条件。";
    grid.appendChild(empty);
    return;
  }

  filtered.forEach((hotel) => {
    const card = template.content.cloneNode(true);
    card.querySelector("img").src = hotel.image;
    card.querySelector("img").alt = hotel.name;
    card.querySelector(".location").textContent = `${hotel.city} · ${hotel.region}`;
    card.querySelector("h2").textContent = hotel.name;
    card.querySelector(".score").textContent = hotel.score;
    card.querySelector(".desc").textContent = hotel.desc;
    card.querySelector(".price").textContent = hotel.price;
    card.querySelector(".drive").textContent = hotel.drive;

    const tags = card.querySelector(".tags");
    hotel.scenes.forEach((scene) => {
      const tag = document.createElement("span");
      tag.textContent = scene;
      tags.appendChild(tag);
    });

    grid.appendChild(card);
  });
}

[searchInput, regionFilter, budgetFilter, sceneFilter].forEach((control) => {
  control.addEventListener("input", render);
  control.addEventListener("change", render);
});

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  regionFilter.value = "all";
  budgetFilter.value = "all";
  sceneFilter.value = "all";
  render();
});

render();

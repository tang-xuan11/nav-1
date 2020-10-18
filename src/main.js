const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const $logo = $(".logo");
const $wrapper = $(".wrapper");
const imgArr = [
  "wrapper",
  "wrapper1",
  "wrapper2",
  "wrapper3",
  "wrapper4",
  "wrapper5",
  "wrapper6",
  "wrapper7",
  "wrapper8",
  "wrapper9",
  "wrapper10",
  "wrapper11",
  "wrapper12",
  "wrapper13",
  "wrapper14",
  "wrapper15",
  "wrapper16",
  "wrapper17",
  "wrapper18",
];
$logo.click(function () {
  const imgIndex = parseInt(Math.random() * (imgArr.length - 1));
  const currentImg = imgArr[imgIndex];
  $wrapper.removeClass().addClass(currentImg);
  $.cookie("wrapper_class", currentImg, { path: "/", expires: 10 });
});

const hashMap = xObject || [
  {
    logo: "https://favicon.link/www.bilibili.com/",
    url: "https://www.bilibili.com/",
  },
  {
    logo: "https://favicon.link/www.github.com",
    url: "https://github.com",
  },
  {
    logo: "https://favicon.link/www.zhihu.com/",
    url: "https://www.zhihu.com/",
  },
  {
    logo: "https://favicon.link/www.jd.com/",
    url: "https://www.jd.com/",
  },
  {
    logo: "https://favicon.link/www.taobao.com/",
    url: "https://www.taobao.com/",
  },
];
const simplifyUrl = (url) => {
  if (url) {
    return url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/.*/, "");
  }
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
        <div class="tile-icon">
          <img src="${node.logo}" class="favicon">
        </div>
          <p class="link">${simplifyUrl(node.url)}</p>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入新增网站的网址");
  if (url === null) {
    return;
  }
  if (url === "") {
    return alert("网址不能为空");
  }
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: "https://favicon.link/" + url,
    url: url,
  });

  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

function fn() {
  $(document).on("keypress", (e) => {
    console.log(e);
    const { key } = e;
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url);
      }
    }
  });
}
let cookie_skin = $.cookie("wrapper_class");
if (cookie_skin !== null) {
  $wrapper.removeClass().addClass(cookie_skin);
}

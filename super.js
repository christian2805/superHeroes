// 5d88749efd86cb75861e2600
get();
function get() {
  fetch("https://frontend3-17ab.restdb.io/rest/supa", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": " 5d88749efd86cb75861e2600",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      heroes.forEach(hero => {
        const template = document.querySelector("template").content;
        const copy = template.cloneNode(true);
        copy.querySelector("h1").textContent = hero.name;
        copy.querySelector("h2").textContent = hero.realname;
        copy.querySelector("p").textContent = hero.powers;
        document.querySelector("#app").appendChild(copy);
      });
    });
}

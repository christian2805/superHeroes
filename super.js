// 5d88749efd86cb75861e2600

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
      heroes.forEach(addHeroesToTheDom);
      console.log(heroes);
    });
}
get();
function addHeroesToTheDom(hero) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h1").textContent = hero.name;
  copy.querySelector("h2").textContent = hero.realname;
  copy.querySelector("p").textContent = hero.powers;
  copy.querySelector(".age").textContent = hero.age;
  document.querySelector("#app").appendChild(copy);
}

function post() {
  const data = {
    name: "The Poopman",
    realname: "johnnyBoi",
    powers: "SuperSleep\nSuperPoop",
    age: 2
  };

  const postData = JSON.stringify(data);
  fetch("https://frontend3-17ab.restdb.io/rest/supa", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": " 5d88749efd86cb75861e2600",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(e => e.json())
    .then(data => {
      console.log(data);
      addHeroesToTheDom(data);
    });
}
document.querySelector(".adding").addEventListener("click", e => {
  post();
});
// document.querySelector(".del").addEventListener("click", e => {
//   deleteHero(hero);
// });
// function deleteHero(id) {
//   console.log("wat");
//   fetch("https://frontend3-17ab.restdb.io/rest/supa", {
//     method: "delete",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       "x-apikey": " 5d88749efd86cb75861e2600",
//       "cache-control": "no-cache"
//     }
//   })
//     .then(res => res.json())
//     .then(data => console.log(data));
//   console.log("delete");
// }

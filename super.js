// databaseKey: 5d88749efd86cb75861e2600
// Slides: https://kea-alt-del.dk/courses/2019/autumn/frontend
const heroName = document.querySelector("#heroName");
const realName = document.querySelector("#realName");
const heroPowers = document.querySelector("#heroPowers");
const heroAge = document.querySelector("#heroAge");
const form = document.querySelector("#form");
const form2 = document.querySelector("#form2");
function get() {
  fetch("https://frontend3-17ab.restdb.io/rest/supa", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d88749efd86cb75861e2600",
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
  copy.querySelector("article.hero").dataset.heroid = hero._id;
  copy.querySelector("h1").textContent = hero.name;
  copy.querySelector("h2").textContent = hero.realname;
  copy.querySelector("p").textContent = hero.powers;
  copy.querySelector(".age").textContent = hero.age;
  copy.querySelector(".del").addEventListener("click", () => {
    deleteHero(hero._id);
    fetchAndPopulate(id);
  });
  copy.querySelector(".edit").addEventListener("click", () => {
    fetchAndPopulate(hero._id);
    console.log(hero.name);
    console.log(hero.powers);
  });
  document.querySelector("#app").prepend(copy);
}
function fetchAndPopulate(id) {
  fetch(`https://frontend3-17ab.restdb.io/rest/supa/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d88749efd86cb75861e2600",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      console.log(heroes.powers);
      form2.elements.name.value = heroes.name;
      form2.elements.powers.value = heroes.powers;
      form2.elements.age.value = heroes.age;
      form2.elements.realname.value = heroes.realname;
      form2.elements.id.value = heroes._id;
      heroes.forEach(addHeroesToTheDom);
      console.log(heroes.name);
    });
}
function post() {
  const data = {
    name: heroName.value,
    realname: realName.value,
    powers: heroPowers.value,
    age: heroAge.value
  };
  addHeroesToTheDom(data);
  console.log(data);

  const postData = JSON.stringify(data);
  fetch("https://frontend3-17ab.restdb.io/rest/supa", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d88749efd86cb75861e2600",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(e => e.json())
    .then(data => {
      console.log(data);
      form2.elements.name.value = heroName;
      console.log("shit", heroName);
    });
}
form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();

  console.log(heroName, realName, heroPowers, heroAge);

  post(heroName, realName, heroPowers, heroAge);
});

function deleteHero(id) {
  console.log("wat");
  fetch("https://frontend3-17ab.restdb.io/rest/supa/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": " 5d88749efd86cb75861e2600",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(lol => {
      document.querySelector(`.hero[data-heroid="${id}"]`).remove();
    });
}

form2.addEventListener("submit", evt => {
  console.log("submit the edit");
  evt.preventDefault();
  put();
});
// form.elements.name.addEventListener("input", e => {
//   document.querySelector("h4").textContent = form.elements.name.value;
// });
form.elements.heroName.addEventListener("blur", ele => {
  if (form.elements.heroName.checkValidity()) {
    form.elements.heroName.classList.remove("notValid");
  } else {
    form.elements.heroName.classList.add("notValid");
  }
});
function put() {
  console.log(form2.elements.name.value);

  let data = {
    name: form2.elements.name.value,
    realname: form2.elements.realname.value,
    age: form2.elements.age.value,
    powers: form2.elements.powers.value,
    id: form2.elements.id.value
  };

  let postData = JSON.stringify(data);
  const superID = form2.elements.id.value;
  fetch(`https://frontend3-17ab.restdb.io/rest/supa/` + superID, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d88749efd86cb75861e2600",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(updatedHero => {
      const parentElement = document.querySelector(`.hero[data-heroid="${updatedHero._id}"]`);

      parentElement.querySelector("h1").textContent = updatedHero.name;
      parentElement.querySelector("h2").textContent = updatedHero.realname;
      parentElement.querySelector("p").textContent = updatedHero.age;
    });
}
// just some shit
document.querySelector(".make").addEventListener("click", openSidebar);
document.querySelector(".edit").addEventListener("click", openSidebar2);
function openSidebar() {
  console.log("lort");
  if (!(form.style.display == "grid")) {
    form.style.display = "grid";
  } else {
    form.style.display = "none";
  }
}
function openSidebar2() {
  console.log("lort");
  if (!(form2.style.display == "grid")) {
    form2.style.display = "grid";
  } else {
    form2.style.display = "none";
  }
}

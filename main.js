//Main Variables
let htmlInputField = document.querySelector(".repos-app input");
let htmlGetBtn = document.querySelector(".repos-app .get-button");
let htmlDataHolder = document.querySelector(".repos-app .data-holder");

htmlGetBtn.onclick = function () {
  getRepos();
};

//Get Repos Function
function getRepos() {
  if (htmlInputField.value == "") makeItMe();
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.github.com/users/${htmlInputField.value}/repos`);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        //find file
        let repos = JSON.parse(xhr.responseText);
        repos.length > 0 ? createAllRepo(repos) : noReposWithHim();
      } else {
        //no find the file
        badUserName();
      }
    }
  };
}

//function to create repo boxes box box
function createAllRepo(repos) {
  htmlDataHolder.innerHTML = ""; //free it frist for the next time
  htmlDataHolder.className = "data-holder find-files";
  for (let i = 0; i < repos.length; i++) {
    createBox(repos[i]);
  }
}

function createBox(repoObj) {
  let box = document.createElement("div");
  box.className = "box";
  //create the img
  let img = document.createElement("img");
  img.src = `Images/${Math.trunc(Math.random() * 2)}.jpg`; //will change later;
  box.appendChild(img);
  //create text
  let txtDiv = document.createElement("div");
  txtDiv.className = "text";
  let repoName = document.createElement("h3");
  repoName.textContent = repoObj.name;
  let repoDescription = document.createElement("p");
  repoDescription.textContent = repoObj.description || "No Description";
  txtDiv.append(repoName, repoDescription);
  //create info
  let info = document.createElement("div");
  info.classList = "info";
  let repoLink = document.createElement("a");
  repoLink.classList = "visit-btn";
  repoLink.href = `https://github.com/${htmlInputField.value}/${repoObj.name}`;
  repoLink.setAttribute("target", "_blank");
  repoLink.textContent = "VISIT";
  //create span1
  let spn1 = document.createElement("span");
  let icn1 = document.createElement("i");
  icn1.className = "fa-regular fa-eye";
  let objWatcher = document.createTextNode(repoObj.watchers_count);
  spn1.append(icn1, objWatcher);
  //crate span2
  let spn2 = document.createElement("span");
  let icn2 = document.createElement("i");
  icn2.className = "fa-regular fa-heart";
  let objStars = document.createTextNode(repoObj.stargazers_count);
  spn2.append(icn2, objStars);
  //append in info
  info.append(repoLink, spn1, spn2);
  //append in box, dataholder
  box.append(txtDiv, info);
  htmlDataHolder.appendChild(box);
}

function noReposWithHim() {
  htmlDataHolder.innerHTML = ""; //free it frist for the next time
  htmlDataHolder.className = "data-holder not-find-files";
  htmlDataHolder.textContent = "No Repositers For This User.";
}

function badUserName() {
  htmlDataHolder.innerHTML = ""; //free it frist for the next time
  htmlDataHolder.className = "data-holder not-find-files";
  htmlDataHolder.textContent = "Wrong User Name";
}

function makeItMe() {
  htmlInputField.value = "";
  htmlInputField.value = "AhmedSaa3d";
}

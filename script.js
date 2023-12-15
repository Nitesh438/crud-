let form = document.querySelector("form");//target form
let main = document.querySelector(".main");
let call = document.querySelector("#call");
form.addEventListener("submit", (event) => {//event on submit button
  let name = event.target.uname.value;//target event all values

  let email = event.target.email.value;

  let phone = event.target.phone.value;

  let checkStatus = 0;

  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];//show localstorage on console.log and handle the null value.
  for (let val of userData) {
    if (val.email == email || val.phone == phone) {
      checkStatus = 1;
      break;
    }
  }
  if (checkStatus == 1) {
    alert("Email or Phone are already exists");
  } else {
    userData.push({
      name: name,
      email: email,
      phone: phone,
    });
    localStorage.setItem("userDetails", JSON.stringify(userData));
    event.target.reset();
  }
  displayData();

  // console.log(userData);
  // console.log(name, email, phone);

  event.preventDefault();//pages not reloads.
});

let displayData = () => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  let finalData = "";
  userData.forEach((element, i) => {//${element.name} means show values on dynamically.
    finalData += ` <div class="items">
  <span onclick='removeData(${i})'>&times;</span> 
  <h5>Name</h5>
  <div>${element.name} </div>

  <h5>Email</h5>
  <div>${element.email} </div>

  <h5>Phone</h5>
  <div>${element.phone} </div>
</div>`;
  });
  main.innerHTML = finalData;
};
let removeData = (index) => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  userData.splice(index, 1);

  localStorage.setItem("userDetails", JSON.stringify(userData));
  displayData();
};
call.addEventListener("click",()=>{
  localStorage.clear("userDetails")
displayData();

})

displayData();

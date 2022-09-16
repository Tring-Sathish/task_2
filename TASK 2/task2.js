let details = [
  {
    id: 1,
    email: "abc@gmail.com",
    firstname: "abcde",
    lastname: "lmnop",
    phoneno: 1234567890,
    dob: "01-01-2001",
    gender: "Male",
  },
  {
    id: 2,
    email: "cde@gmail.com",
    firstname: "fghij",
    lastname: "qrstr",
    phoneno: 0987654321,
    dob: "02-01-2001",
    gender: "Female",
  },
];

function getData() {
  let str = localStorage.getItem("Data");
  if (str != null && JSON.parse(str).length != 0) {
    details = JSON.parse(str);
  }
}
getData();

let idnum = 0;
if (details.length != 0) {
  idnum = details[details.length - 1].id;
}

function addData() {
  if (document.getElementById("terms").checked) {
    
    if (document.getElementById("id").value != "") {
      var index = details.findIndex((l) => l.id == document.getElementById("id").value);
      details[index].id = document.getElementById("id").value;
      details[index].email = document.getElementById("email").value;
      details[index].firstname = document.getElementById("fname").value;
      details[index].lastname = document.getElementById("lname").value;
      details[index].phoneno = document.getElementById("phno").value;
      details[index].dob = document.getElementById("dob").value;
      let gen;
      if (document.getElementById("male").checked) {
        gen = document.getElementById("male").value;
      } else if (document.getElementById("female").checked) {
        gen = document.getElementById("female").value;
      }
      details[index].gender = gen;
      showData();
    } 
    
    else {
      let gen;
      if (document.getElementById("male").checked) {
        gen = document.getElementById("male").value;
      } else if (document.getElementById("female").checked) {
        gen = document.getElementById("female").value;
      }
      idnum = idnum + 1;
      details.push({
        id: idnum,
        email: document.getElementById("email").value,
        firstname: document.getElementById("fname").value,
        lastname: document.getElementById("lname").value,
        phoneno: document.getElementById("phno").value,
        dob: document.getElementById("dob").value,
        gender: gen,
      });
    }
    document.getElementById("email").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("phno").value = "";
  }
  localStorage.setItem("Data", JSON.stringify(details));
  showData();
  location.reload();
}

let i = 0;

function showData() {
  var table = document.getElementById("regtable");
  for (; i < details.length; i++) {
    let row = table.insertRow();
    let idcell = row.insertCell(0);
    let emailcell = row.insertCell(1);
    let fnamecell = row.insertCell(2);
    let lnamecell = row.insertCell(3);
    let phnocell = row.insertCell(4);
    let dobcell = row.insertCell(5);
    let gendercell = row.insertCell(6);
    let actioncell = row.insertCell(7);
    idcell.innerHTML = details[i].id;
    emailcell.innerHTML = details[i].email;
    fnamecell.innerHTML = details[i].firstname;
    lnamecell.innerHTML = details[i].lastname;
    phnocell.innerHTML = details[i].phoneno;
    dobcell.innerHTML = details[i].dob;
    gendercell.innerHTML = details[i].gender;
    actioncell.innerHTML = "<button onclick = editData(" + details[i].id + ");>Edit</button><br/><button onclick = remove(" +details[i].id +")>Delete</button>";
  }
}
showData();

function remove(id) {
  var index = details.findIndex((l) => l.id == id);
  details.splice(index, 1);
  localStorage.setItem("Data", JSON.stringify(details));
  document.getElementById("regtable").deleteRow(index);
}

function editData(id) {
  var index = details.findIndex((l) => l.id == id);
  document.getElementById("id").value = details[index].id;
  document.getElementById("email").value = details[index].email;
  document.getElementById("fname").value = details[index].firstname;
  document.getElementById("lname").value = details[index].lastname;
  document.getElementById("phno").value = details[index].phoneno;
  document.getElementById("dob").value = details[index].dob;
  document.getElementsByName("gender").value = details[index].gender;
}

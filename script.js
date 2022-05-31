// * Artinya Penting
// ! Artinya Penjelasan Materi
// Komentar biasa pada project ini

const inputBox = document.getElementById("inputBox"),
  push = document.getElementById("push"),
  alerts = document.getElementsByClassName("alert")[0],
  confirms = document.getElementsByClassName("confirm")[0];

inputBox.addEventListener("keyup", () => {
  let userData = inputBox.value;
  if (userData.length != 0) {
    push.classList.add("active");
  } else {
    push.classList.remove("active");
  }
});

// Menaruh di window scope agar saat web direload otomatis akan langsung menjalankan function Showtasks();
showTasks();

let getLocalStorage = localStorage.getItem("New TODO");
listArr = JSON.parse(getLocalStorage);

// * Untuk mengaktifkan pesan alerts diawal membuka web jika tugas kosong!
// if (listArr == 0) {
//   myAlerts("Tidak ada tugas!");
// }

// Memberikan Event pada saat Tombol ditekan
push.onclick = () => {
  let userData = inputBox.value;
  if (userData.length >= 30) {
    return myAlerts("the characters included are so many!");
  } else if (userData.length < 1) {
    return myAlerts("Univolved value!");
  }
  let getLocalStorage = localStorage.getItem("New TODO"); // ! getItem('key') Penjelasan dari get item adalah, isi dari key di getItem harus sama dengan key pada setItem. Jika tidak, maka listArr yang dipush tidak akan masuk kedalam array yang akan ditambahkan kedalam setItem di localStorage.
  if (getLocalStorage == null) {
    // Jika di localStorage yang mempunyai key New TODO dan tidak ada valuenya (null), maka akan masuk kesini dan membuat array kosong lalu dimasukkan kedalam variable listArr. agar dapat menggunakan method push untuk menambahkan data yang dimaukan oleh user lewat input. (Method push digunakan Khusus tipe data array saja!)
    listArr = [];
  } else {
    // Jika di localStorage yang mempunyai key New TODO dan ada valuenya (tidak null), maka akan masuk kesini dan tampilkan isi dari localStorage dalam bentuk JSON. lalu dimasukkan kedalam variable listArr.
    listArr = JSON.parse(getLocalStorage);
  }
  if (listArr.length >= 10) {
    return myAlerts("Take a break, you've done too much activity!");
  } else {
    listArr.push(userData);
    // setelah menambahkan Data pada array yang di input oleh user, perbarui data localStorage dan tampilkan.
    localStorage.setItem("New TODO", JSON.stringify(listArr)); // ! setItem('key', value) Penjelasan dari setItem, isi dari key harus sama dengan key pada getItem('key') */
    showTasks();
  }
};

function showTasks() {
  let getLocalStorage = localStorage.getItem("New TODO");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  const pendingNUmb = document.querySelector(".pendingNumb");
  pendingNUmb.textContent = listArr.length; // menampilkan nomor pending sesuai isi dari listArry.length

  let newLiTag = "";
  const tasks = document.querySelector(".tasks");
  listArr.forEach((element, index) => {
    newLiTag += `<li class="task">${index + 1}. ${element} <button onclick="deleteTask(${index});" class="delete"><i class='bx bxs-trash'></i></button></li>`;
  });
  tasks.innerHTML = newLiTag;

  inputBox.value = ""; // * agar pada saat selesai mengirim data dari inputbox, inputbox akan berubah menjadi string kosong.
}

// Membuat Function untuk mendelete Tasks
function deleteTask(index) {
  // Menampilkan value dari localStorage yang memiliki key New TODO saja.
  let getLocalStorage = localStorage.getItem("New TODO");
  listArr = JSON.parse(getLocalStorage);
  // Menghapus index tertentu pada li
  listArr.splice(index, 1) && listArr.length - 1;
  //   Setelah menghapus li, Perbarui lagi data localStorage dan tampilkan.
  localStorage.setItem("New TODO", JSON.stringify(listArr)); // ! setItem('key', value) Penjelasan dari setItem, isi dari key harus sama dengan key pada getItem('key') */
  showTasks();
}

function deleteAll() {
  listArr = []; // mengosongkan array dari var listArr
  //   Setelah menghapus semua li, Perbarui lagi data localStorage dan tampilkan.
  localStorage.setItem("New TODO", JSON.stringify(listArr)); // ! setItem('key', value) Penjelasan dari setItem, isi dari key harus sama dengan key pada getItem('key') */
  showTasks();
}

inputBox.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    let userData = inputBox.value;
    if (userData.length >= 30) {
      return myAlerts("the characters included are so many!");
    } else if (userData.length < 1) {
      return myAlerts("Univolved value!");
    }
    let getLocalStorage = localStorage.getItem("New TODO"); // ! getItem('key') Penjelasan dari get item adalah, isi dari key di getItem harus sama dengan key pada setItem. Jika tidak, maka listArr yang dipush tidak akan masuk kedalam array yang akan ditambahkan kedalam setItem di localStorage.
    if (getLocalStorage == null) {
      // Jika di localStorage yang mempunyai key New TODO dan tidak ada valuenya (null), maka akan masuk kesini dan membuat array kosong lalu dimasukkan kedalam variable listArr. agar dapat menggunakan method push untuk menambahkan data yang dimaukan oleh user lewat input. (Method push digunakan Khusus tipe data array saja!)
      listArr = [];
    } else {
      // Jika di localStorage yang mempunyai key New TODO dan ada valuenya (tidak null), maka akan masuk kesini dan tampilkan isi dari localStorage dalam bentuk JSON. lalu dimasukkan kedalam variable listArr.
      listArr = JSON.parse(getLocalStorage);
    }
    if (listArr.length >= 10) {
      return myAlerts("Take a break, you've done too much activity!");
    } else {
      listArr.push(userData);
      // setelah menambahkan Data pada array yang di input oleh user, perbarui data localStorage dan tampilkan.
      localStorage.setItem("New TODO", JSON.stringify(listArr)); // ! setItem('key', value) Penjelasan dari setItem, isi dari key harus sama dengan key pada getItem('key') */
      showTasks();
    }
  }
});

function myAlerts(error) {
  const alertMsg = document.querySelector(".alert-msg");
  alerts.style.top = "30px";

  alertMsg.innerHTML = error;

  setTimeout(() => {
    alerts.style.top = "-120px";
  }, 2000);
}

function deleteAllConfirm() {
  let getLocalStorage = localStorage.getItem("New TODO");
  listArr = JSON.parse(getLocalStorage);

  if (listArr.length < 1) {
    return myAlerts("No Tasks!");
  }

  const confirmMsg = document.querySelector(".confirm-msg");
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  confirms.style.top = "20px";

  confirmMsg.innerHTML = "Are You Sure!?";

  yes.onclick = () => {
    // console.log("yes");
    deleteAll();
    return (confirms.style.top = "-250px");
  };
  no.onclick = () => {
    // console.log("no");
    return (confirms.style.top = "-250px");
  };
}

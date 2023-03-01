<template>
  <div
    class="d-flex justify-content-center d-flex align-items-center"
    style="color: white"
  >
    <h1>Menu</h1>
  </div>
  <div class="d-flex justify-content-center d-flex align-items-center">
    <div class="row" style="color: white">
      ชื่อเมนูไทย : <input type="text" v-model="menu.nameTH" /><br />
      ชื่อเมนูEng : <input type="text" v-model="menu.nameEng" /><br />
      ราคา : <input type="number" v-model="menu.price" /><br />
      รายละเอียด : <input type="text" v-model="menu.detail" /> <br />
      <div class="row mt-2 gap-4">
        <button
          type="button"
          class="btn btn-primary col"
          @click="($event) => addUserData()"
        >
          เพิ่มข้อมูล
        </button>
        <!--<button class="col" @click="($event) => addUserData()">เพิ่มข้อมูล</button>-->
        <button type="button" class="btn btn-primary col" @click="($event) => showMenu()">
          เเสดงเมนู
        </button>
        <!--<button class="col" @click="($event) => showMenu()">เเสดงเมนู</button>-->
        <button type="button" class="btn btn-danger col" @click="($event) => quit()">
          quit
        </button>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <div style="width: 70%">
      <table class="table" style="color: white">
        <thead>
          <tr>
            <th scope="col">ชื่อ</th>
            <th scope="col">Eng</th>
            <th scope="col">ราคา</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <!--<table>
      <tr>
        <td>ชื่อ</td>
        <td>Eng</td>
        <td>ราคา</td>
        <td>รายละเอียด</td>
      </tr>-->
        <tr v-for="(menuItem, index) in allMenu" :key="index">
          <td>{{ menuItem.data.nameTH }}</td>
          <td>{{ menuItem.data.nameEng }}</td>
          <td>{{ menuItem.data.price }}</td>
          <td>{{ menuItem.data.detail }}</td>
          <!--<td>{{ menuItem.data.id }}</td>-->
          <br />
          <td>
            <div>
              <button
                type="button"
                class="btn btn-danger"
                @click="($event) => deleteMenu(menuItem.id)"
              >
                del
              </button>
            </div>
          </td>
          <!--<td><button @click="($event) => deleteMenu(menuItem.id)">del</button></td>-->
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../main";
import { doc, deleteDoc } from "firebase/firestore";
import router from "../router";

const menu = ref({ nameTH: "", nameEng: "", price: 1, detail: "" });

const allMenu = ref([]);

async function addUserData() {
  try {
    const docRef = await addDoc(collection(db, "foodmenu"), menu.value);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  /*try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}*/
}
async function showMenu() {
  const querySnapshot = await getDocs(collection(db, "foodmenu"));
  querySnapshot.forEach((doc) => {
    //doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const myDoc = ref({ id: doc.id, data: doc.data() });
    //allMenu.value.push(doc.data());
    allMenu.value.push(myDoc.value);
  });
}
async function deleteMenu(id) {
  await deleteDoc(doc(db, "foodmenu", id));
  await deleteDoc(doc(db, "foodmenu", allMenu.value.pop(id)));
}
function quit() {
  router.push("home");
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<template>
  <div class="d-flex justify-content-center d-flex align-items-center text-white">
    <h1>Welcome</h1>
  </div>
  <div class="d-flex justify-content-center d-flex align-items-center">
    <div class="m-2">
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label text-white">Email</label>
        <input type="text" placeholder="email" v-model="email" />
      </div>
      <div class="mb-3" style="color: black">
        <label for="formGroupExampleInput2" class="form-label text-white">Password</label>
        <input type="password" name="pwd" id="" v-model="pwd" />
      </div>
      <!--<div>
        Email : <input type="text" placeholder="email" v-model="email" /> Password :<input
          type="password"
          name="pwd"
          id=""
          v-model="pwd"
        />-->
      <div class="row">
        <div class="gropbtn row gap-3">
          <button
            @click="($event) => login()"
            type="button"
            class="btn btn-secondary col"
          >
            Login
          </button>
          <button
            @click="($event) => Register()"
            type="button"
            class="btn btn-secondary col"
          >
            Register
          </button>
          <button
            @click="($event) => GoogleLogin()"
            type="button"
            class="btn btn-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-google"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
              />
            </svg></button
          ><br />
        </div>
      </div>
      <!--<button @click="($event) => login()">Login</button>
        <button @click="($event) => Register()">Register</button>
        <button @click="($event) => GoogleLogin()">GoogleLogin</button><br><br>-->
    </div>
  </div>
  <!--<div>
      ชื่อเมนูไทย : <input type="text" v-model="menu.nameTH" /><br />
      ชื่อเมนูEng : <input type="text" v-model="menu.nameEng" /><br />
      ราคา : <input type="number" v-model="menu.price" /><br />
      รายละเอียด : <input type="text" v-model="menu.detail" /> <br />
  
      <button @click="($event) => addUserData()">เพิ่มข้อมูล</button>
      <button @click="($event) => showMenu()">เเสดงเมนู</button>
    </div>
    <div>
      <table>
        <tr>
          <td>ชื่อ</td>
          <td>Eng</td>
          <td>ราคา</td>
          <td>รายละเอียด</td>
        </tr>
        <tr v-for="(menuItem, index) in allMenu" :key="index">
          <td>{{ menuItem.nameTH }}</td>
          <td>{{ menuItem.nameEng }}</td>
          <td>{{ menuItem.price }}</td>
          <td>{{ menuItem.detail }}</td>
          <td>{{ menuItem.id }}</td>
          <br />
          <td><button @click="($event) => deleteMenu(menuItem.id)">del</button></td>
        </tr>
      </table>
    </div>-->
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../main";
import { doc, deleteDoc } from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const email = ref("");
const pwd = ref("");
const menu = ref({ nameTH: "", nameEng: "", price: 0, detail: "" });

const allMenu = ref([]);

function login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user =" + user);
      router.push("about");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
}
function Register() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      // ..
    });
}

function GoogleLogin() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("token =" + token + "" + user);
      router.push("/about");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode + errorMessage + email + credential);
    });
}
async function addUserData() {
  try {
    const docRef = await addDoc(collection(db, "foodmenu"), menu.value);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function showMenu() {
  const querySnapshot = await getDocs(collection(db, "foodmenu"));
  querySnapshot.forEach((doc) => {
    //doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const myDoc = ref({ id: doc.id, data: doc.data() });
    //allMenu.value.push(doc.data());
    allMenu.value.push(doc.data(myDoc.value));
  });
}
async function deleteMenu(myDoc) {
  await deleteDoc(doc(db, "foodmenu", myDoc.value));
}
</script>

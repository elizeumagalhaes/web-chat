var input = document.getElementById("msg");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        enviarMSG();
    }
});

var button = document.getElementById("send-btn");
button.addEventListener("click", function () {
    enviarMSG();
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

var firebaseConfig = {
    apiKey: "AIzaSyBB0aMpzrs-VTxRJHT1ZHFyMItB2arDiWQ",
    authDomain: "uebichat.firebaseapp.com",
    projectId: "uebichat",
    storageBucket: "uebichat.appspot.com",
    messagingSenderId: "921E681746733",
    appId: "1:921681746733:web:f4ae558e75cf749ea451a4",
    measurementId: "G-9CFMN9KZFR"
};

const app = initializeApp(firebaseConfig);

var db = getDatabase(app);
const dbRef = ref(db, 'exemplo');

var meuhtml = "";

var nomeUsuario = prompt("Digite seu nome");

if (nomeUsuario === "" || !nomeUsuario) {
    nomeUsuario = "Anônimo";
}

onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    meuhtml = "";
    snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        console.log(key);
        console.log(childSnapshot.val().nome);
        console.log(childSnapshot.val().mensagem);

        if (nomeUsuario == childSnapshot.val().nome){
            meuhtml += '<div class="msg"><div class="self"><div class="me"><b>' + childSnapshot.val().nome + '<div class="horario-msg"><i>' + childSnapshot.val().horario + '</i></div></b><span>' + childSnapshot.val().mensagem + '</span></div></div></div>' 
        } else {
            meuhtml += '<div class="msg"><div class="conteudo"><div class="another"><b>' + childSnapshot.val().nome + '<div class="horario-msg"><i>' + childSnapshot.val().horario + '</i></div></b><span>' + childSnapshot.val().mensagem + '</span></div></div></div>'
        }
    });
    atualizarHTML();
});

function enviarMSG() {

    var datahj = new Date();
    var hora = datahj.getHours() + ":" + datahj.getMinutes() + ":" + datahj.getSeconds()

    push(ref(db, 'exemplo'), {
        nome: nomeUsuario,
        horario: hora,
        mensagem: document.getElementById("msg").value
    });

    document.getElementById("msg").value = "";
}

function atualizarHTML() {
    document.getElementById("conteudo").innerHTML = meuhtml
    ajustarScroll();
}

function ajustarScroll() {
    console.log("corrirgir scroll");
    var divConteudo = document.getElementById("conteudo");
    divConteudo.scrollTop = divConteudo.scrollHeight;
}

// function removerDB(){
//     var itemkey = document.getElementsById("msgapagar.dataset.key");
//     console.log(itemkey)
//     remove(ref(db, 'exemplo/' + itemkey))
// }
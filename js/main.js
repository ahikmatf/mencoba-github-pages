function klik() {
    alert("alohamora beybeh");
}

// (function () {
//     console.log("mam", window.location)
//     if (window.location.href == "http://localhost:8001/signin.html" || window.location.href == "http://localhost:8001/signup.html") {
        
//     } else if (getCookie("tokenaing") == "") {
//         window.location = "/signin.html";
//     }
// })()

function signUp() {
    // debugger
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    fullName = document.getElementById('fullName').value;
    password = document.getElementById('password').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/api/signup");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "username": name,
        "email": email,
        "password": password,
        "fullname": fullName
    }));
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Data Berhasil Di Submit dengan Status Code: " + this.status);
            window.location = "/signin.html";
        } else if (this.readyState == 4) {
            alert("Data gagal di input: " + this.status);
        }
    };

    // alert("Ini Adalah Name Twitter: "+name);
    // console.log(name);
    // tambah(3, 5);
}

function signIn() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("POST", "http://localhost:5000/login");
    xmlRequest.setRequestHeader("Content-Type", "application/json");
    xmlRequest.send(JSON.stringify({
        "username": username,
        "password": password
    }));
    xmlRequest.onreadystatechange = function () {
        // console.log("status", this.status)
        if (this.readyState == 4 && this.status == 200) {
            // alert("SignIn berhasil dengan status code :"+this.status);
            alert(this.response); // check type output data
            // console.log(JSON.parse(this.response).email);

            // window.email = JSON.parse(this.response).email;
            // localStorage.setItem('email', JSON.parse(this.response).email);
            // localStorage.getItem("email");
            document.cookie = "tokenaing=" + this.response
            window.location = "/";
        } else if (this.readyState == 4) {
            alert("SignIn gagal dengan status code :" + this.status);
        }
    };
}

function addTweet() {
    // variabel buat dikirim ke db
    tweet = document.getElementById('tweet-box').value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/postTweet");
    xmlHttp.setRequestHeader("Content-Type", "application/json");   
    xmlHttp.send(JSON.stringify({
        "name": tweet,
        "salary": Math.random() * 1000000
    }));
    // xmlHttp.onreadystatechange = function () {
    //     alert(this.status)
    //     if (this.readyState == 4 && this.status == 200) {
    //         masukanTweet = JSON.parse(this.response);
    //         console.log(masukanTweet);

    //         document.getElementById('feed-box').insertAdjacentHTML("afterbegin", `<div class="tweet">
    //         <img src="assets/image1.jpg" alt="foto orang" />
    //         <h3>${masukanTweet.email}</h3>
    //         <p>${masukanTweet.tweet}</p>
    //         <span>${masukanTweet.date}</span>
    //     </div>`);

    //     } 
    // };
    // alert(tweet);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function allTweet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:5000/getTweet");
    xmlHttp.setRequestHeader("Authorization", getCookie("tokenaing"))
    xmlHttp.onreadystatechange = function () {
        // console.log("mas", this.response, this.status)

        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
            JSON.parse(this.response).forEach(function (data, index) {
                console.log("walau ke ujung dunia", data)
                    document.getElementById('feed-box').insertAdjacentHTML("afterbegin", `<div class="tweet">
            <img src="assets/image1.jpg" alt="foto orang" />
            <h3>Wow</h3>
            <p>${data.content}</p>
            <span>${data.date}</span>
            </br>

        </div>`);
            });
        } else if (this.readyState == 4 && this.status != 200) {
            alert("Error dengan status code: " + this.status + " " + this.statusText);
        }
    };
    xmlHttp.send();
}

function deleteTweet(data){
    // console.log(data); // <button type="submit" onclick="deleteTweet(this)" class="delete" id="del1">Delete</button>
    // console.log(data.id); // del1
    // console.log(document.getElementById(data.id).closest(".tweet")); 
    // // <div class="tweet">
    // //         <img src="assets/image1.jpg" alt="foto orang">
    // //         <h3>pisan@haha.com</h3>
    // //         <p>Hahahahahhahahahahah</p>
    // //         <span>2018-10-24 09:47:59.102079</span>
    // //         <br>
    // //         <div>
    // //             <button type="submit" onclick="deleteTweet(this)" class="delete" id="del1">Delete</button>
    // //         </div>
    // //     </div>
    // console.log(document.getElementById(data.id).closest(".tweet").querySelectorAll('p')); // NodeList [p]
    // console.log(document.getElementById(data.id).closest(".tweet").querySelectorAll('p')[0].innerText); // Hahahahahhahahahahah

    parent = document.getElementById(data.id).closest(".tweet");
    tweet = parent.querySelectorAll('p')[0].innerText;
    email = parent.querySelectorAll('h3')[0].innerText;
    date = parent.querySelectorAll('span')[0].innerText;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", "http://localhost:5000/api/getAllTweet");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "email": email,
        "tweet": tweet,
        "date": date
    }));
}

function deleteTweetCara2(email, tweet, date){
    console.log(email, tweet, date);
}

function addToLocalStorage() {
    localStorage.setItem('username', '@naufal1908')
    localStorage.setItem('fullname', 'Muhamad Iqbal Naufal')
    localStorage.setItem('email', 'naufalopak@gamil.com')
    localStorage.setItem('password', 'asetonmabok')
}


// function tambah(a, b){
//     add = a * b;
//     console.log(add);
// }
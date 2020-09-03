function goSomewhere(x){
	location = x;
}
function signup(){
  var username = document.getElementById('username').value
  var password = document.getElementById('password').value
  var name = document.getElementById('fullname').value
  if(username && password && name){
    username = CryptoJS.SHA256(username).toString();
    password = CryptoJS.SHA256(password).toString();
		db.collection('users')
		.where("username","==",username)
		.get()
		.then(function (snapshot){
			if(snapshot.empty){
				db.collection('users')
    		.add({
      		username: username,
      		avatar: "https://avatars.dicebear.com/api/initials/"+name+".svg",
      		password: password,
      		name: name
    		})
        .then(function (snapshot){
          localStorage.setItem("userToken",snapshot.id)
          localStorage.setItem("username",document.getElementById('username').value)
          localStorage.setItem("name",name)
          location = "/main/hub.html"
        })
			}else{
        document.getElementById("error").style["height"] = "35px";
		    document.getElementById("error").innerHTML = "Your username is the same as another person";
      }
		})
  }else{
		document.getElementById("error").style["height"] = "35px";
		document.getElementById("error").innerHTML = "You didn't fill all of the inputs";
	}
}
function login(){
  var username = document.getElementById('username').value
  var password = document.getElementById('password').value
  if(username && password){
    username = CryptoJS.SHA256(username).toString();
    password = CryptoJS.SHA256(password).toString();
		db.collection('users')
		.where("username","==",username)
		.get()
		.then(function (snapshot){
			if(!(snapshot.empty)){
          localStorage.setItem("userToken",snapshot.id)
          localStorage.setItem("username",document.getElementById('username').value)
          var name = snapshot.value().names
          localStorage.setItem("name",)
          location = "/main/hub.html"
			}else{
        document.getElementById("error").style["height"] = "35px";
		    document.getElementById("error").innerHTML = "That account doesn't exist";
      }
		})
  }else{
		document.getElementById("error").style["height"] = "35px";
		document.getElementById("error").innerHTML = "You didn't fill all of the inputs";
	}
}
function setDivPosts(){
  document.getElementById("everything").innerHTML = "<br><button onclick=\"goSomewhere('submitpost.html')\">Make A Post!</button><h1>Most Popular Posts!</h1><br>";
  db.collection('posts')
  .get()
  .then(function (snapshot){
    var i = 0;
    var length = snapshot.docs.length
    console.log(length)
    while(i < length){
      
    }
  })
}
function newpost(){
  var name = localStorage.getItem("name")
  var text = document.getElementById('text').value
  var image = document.getElementById('imgurl').value
  db.collection('posts')
  .get()
  .then(function(snapshot){
    if(image){
      snapshot.add({
        name: name,
        text: text,
      })
    }else{
      snapshot.add({
        name: name,
        text: text,
        image: image,
      })
    }
  })
}
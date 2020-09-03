db.collection("test")
.orderBy("number",descending: true)
.get()
.then(function (snapshot){
  console.log(snapshot.docs[1]);
})
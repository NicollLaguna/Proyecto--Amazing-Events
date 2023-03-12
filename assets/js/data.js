let data 
async function getData(){
 await fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(Response=> Response.json())
  .then(json => data = json)

  console.log(data)
}

getData()
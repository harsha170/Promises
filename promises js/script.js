function req(method,url){
    return new Promise((resolve,reject) =>{
        var xhr = new XMLHttpRequest()
        xhr.open(method, url )
        xhr.onload = function(){
        if (xhr.status == 200){
            resolve(xhr.response)
        } else{
            reject({
                message: xhr.statusText,
            })
        }
        xhr.onerror = function() {
            reject({
                message: xhr.statusText,
            })
        }
    }
    xhr.send()
})
}

req("GET","https://restcountries.eu/rest/v2/all")
.then((resp) => {
    return JSON.parse(resp);
  })
  .then((result)=>{
      result.filter((x)=>{
        var div = document.getElementById("flag")
        div.innerHTML += `
                <div class="card" style="width: 18rem;">
                <h2>${x.name}</h2>
                    <img class="card-img-top" src="${x.flag}" style="width:80px;height:80px" alt="flag image cap">
                    <div class="card-body">
                    Capital:${x.capital}<br>Region:${x.region}<br>Country codes:${x.alpha3Code}<br>Latlang:${x.latlng}<br>
        </div>
        </div>
        `
    })
})
.catch((error)  => {
    console.log(error)
})

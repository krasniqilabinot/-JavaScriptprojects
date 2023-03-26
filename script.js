let nasaItems = []
const divbody=document.getElementById('near_earth_objects')
const details = document.getElementById("details")

let pageCount = 1


function clearData() {
    details.innerHTML=""
}



async function getData() {
    let list = document.getElementById("myList");
    list.innerHTML = ""
    clearData()
    const year_start = document.getElementById("start_year")
    const year_end = document.getElementById("end_year")
    const res = await axios.get(`https://images-api.nasa.gov/search?year_start=${year_start.value}&year_end=${year_end.value}`)

   
    nasaItems = res.data.collection.items
    nasaItems = nasaItems.slice(0, 30)
    nasaItems.forEach((item) => {
      let li = document.createElement("li");
      let img = document.createElement("img")
      img.src = item.links ? item.links[0].href : "https://www.catipilla.com/wp-content/uploads/2023/02/test-clip-art-cpa-school-test.png"
      li.appendChild(img)
      let liSpan = document.createElement("span")
      liSpan.innerHTML = item.data[0].title;
      li.appendChild(liSpan)
      li.setAttribute('nasa-id', item.data[0].nasa_id)
      list.appendChild(li);
    });

}

let searchButton = document.getElementById("searchBtn")

searchButton.addEventListener('click',(event) => {
    getData()
})

myList.addEventListener("click",(event)=>{
    // console.log(event.target.getAttribute('nasa-id'))
    const selectedNasaId = event.target.getAttribute('nasa-id')
    const itemFound = nasaItems.find((item) => {
        return item.data[0].nasa_id === selectedNasaId 
    })
    if(itemFound) {
       
        clearData()
        let closeIcon=document.createElement("div")
        closeIcon.innerHTML="X"
        closeIcon.setAttribute("class","closeIcon")
        details.appendChild(closeIcon)
        let title = document.createElement("h3")
        title.innerHTML = itemFound.data[0].title
        details.appendChild(title)
        let img = document.createElement("img")
        img.src = itemFound.links ? itemFound.links[0].href : "https://www.catipilla.com/wp-content/uploads/2023/02/test-clip-art-cpa-school-test.png"
        details.appendChild(img)
        let description = document.createElement("div")
        description.innerHTML = itemFound.data[0].description
        details.appendChild(description)

        closeIcon.addEventListener("click",()=>{
            clearData()
        })
    }
    console.log({itemFound})
})


getData()


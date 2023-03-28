let nasaItems = [];
const defaultImage =
  "https://www.catipilla.com/wp-content/uploads/2023/02/test-clip-art-cpa-school-test.png";
const detailsModal = document.getElementById("detailsModal");
const details = document.getElementById("details");
const list = document.getElementById("myList");
const closeIcon = document.getElementById("closeIcon");

let pageNumber = 1;
const pageSize = 10;

function clearData(element) {
  element.innerHTML = "";
}

function closeOpenModal() {
  detailsModal.style.display =
    detailsModal.style.display === "block" ? "none" : "block";
}

function showList() {
  clearData(list);
  nasaItems
    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    .forEach((item) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = item.links ? item.links[0].href : defaultImage;
      li.appendChild(img);
      const liSpan = document.createElement("span");
      liSpan.innerHTML = item.data[0].title;
      li.appendChild(liSpan);
      li.setAttribute("nasa-id", item.data[0].nasa_id);
      list.appendChild(li);
    });
}

function validInputs(yearStart, yearEnd) {
  if (isNaN(yearStart) || isNaN(yearEnd)) {
    alert('Vlerat duhet te jene te tipit numer')
    return false
  }
  if (yearStart.length !== 4 || yearEnd.length !== 4) {
    alert('Vlerat duhet te kene gjatsine 4')
    return false
  }

  return true
}

async function getData() {
  const year_start = document.getElementById("start_year");
  const year_end = document.getElementById("end_year");
  if (validInputs(year_start.value, year_end.value)) {
    clearData(list);
    clearData(details);
    const res = await axios.get(
      `https://images-api.nasa.gov/search?year_start=${year_start.value}&year_end=${year_end.value}`
    );

    nasaItems = res.data.collection.items;
    showList();
  }
}

function addTitleToDetails(itemTitle) {
  const title = document.createElement("h3");
  title.innerHTML = itemTitle;
  details.appendChild(title);
}

function addImageToDetails(url) {
  let img = document.createElement("img");
  img.src = url;
  details.appendChild(img);
}

function addDescriptionToImage(itemDescription) {
  let description = document.createElement("div");
  description.innerHTML = itemDescription;
  details.appendChild(description);
}

closeIcon.addEventListener("click", () => {
  closeOpenModal();
  clearData(details);
});

myList.addEventListener("click", (event) => {
  const selectedNasaId = event.target.getAttribute("nasa-id");
  const itemFound = nasaItems.find((item) => {
    return item.data[0].nasa_id === selectedNasaId;
  });

  if (itemFound) {
    closeOpenModal();
    clearData(details);
    addTitleToDetails(itemFound.data[0].title);
    addImageToDetails(itemFound.links ? itemFound.links[0].href : defaultImage);
    addDescriptionToImage(itemFound.data[0].description);
  }
});

// pagination
const btnPrev = document.getElementById("btn_prev");
const btnNext = document.getElementById("btn_next");

btnNext.addEventListener("click", () => {
  if (pageSize * pageNumber < nasaItems.length) {
    pageNumber += 1;
    showList();
  } else {
    alert("Ju keni arritur ne fund te listes");
  }
});

btnPrev.addEventListener("click", (event) => {
  if (pageNumber > 1) {
    pageNumber -= 1;
    showList();
  } else {
    alert("Ju keni arritur ne fillim te listes");
  }
});

// end pagination

const searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("click", () => {
  pageNumber = 1
  getData();
});

getData();
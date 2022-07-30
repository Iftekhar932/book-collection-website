const foundBox = document.getElementById("found");
const searchBook = () => {
  const searchField = document.getElementById("search-box");
  foundBox.innerText = "";
  const searchText = searchField.value;
  // CLEARING SEARCHFIELD
  searchField.value = "";
  if (searchText === "") {
    foundBox.innerHTML = "<h4>Search box cannot be empty</h4>";
  } else {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data));
  }
};



const displaySearchResult = (books) => {
  const searchResult = document.getElementById("display-box2");
  // CLEARING DISPLAYBOX
  searchResult.textContent = "";
  foundBox.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("mx-auto");
  books.numFound
    ? (foundBox.innerHTML = `<h1>Matched Results:${books.numFound}</h1>
  `)
    : (foundBox.innerHTML = "<h1>No results found</h1>");
  document.getElementById("display-box").appendChild(div);



  books.docs.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");

    /* CHECKING IF THE VALUES ARE AVAILABLE */
    book.first_publish_year
      ? (firstPublishDate = book.first_publish_year)
      : (firstPublishDate = "not available");
    book.author_name
      ? (NameOfAuthor = book.author_name[0])
      : (NameOfAuthor = "not available");
    book.cover_i
      ? (thumbNail = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`)
      : (thumbNail = "white-book-4.jpg");
    book.publisher
      ? (publisherName = `${book.publisher}`)
      : (publisherName = "Not Available");

    div.innerHTML = `
        <div class="card">
          <img src="${thumbNail}" height="500px"  class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <h6 class="card-title">Author Name: ${NameOfAuthor}</h6>
            <p class="card-text">
              First Publish Year : ${firstPublishDate}
            </p>
            <p class="card-text">
               Publisher: ${publisherName}
            </p>
          </div>
        </div>
        `;
    searchResult.appendChild(div);
  });
};

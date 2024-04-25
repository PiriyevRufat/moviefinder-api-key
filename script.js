const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

getMovie =()=> {
    const movieName =movieNameRef.value;
    const APIKey = '8c69cd1e';
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${APIKey}`;
    if (movieName.length <=0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
        return;
    }
    fetch(url)
        .then(resp =>{
            return resp.json();
        })
        .then(data =>{
            if (data.Response ==="True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2><i class="fa-solid fa-clapperboard"></i> ${data.Title}</h2>
                            <div class="rating">
                            <i class="fa-solid fa-star"></i>
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                ${data.Genre.split(",").map(genre => `<div>${genre.trim()}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            } else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
        });
};
searchBtn.addEventListener("click", getMovie);



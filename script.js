document.addEventListener("DOMContentLoaded", () => {
    const filmsList = document.getElementById("films");
    const movieDetails = {
        poster: document.getElementById("poster"),
        title: document.getElementById("title"),
        runtime: document.getElementById("runtime"),
        showtime: document.getElementById("showtime"),
        availableTickets: document.getElementById("available-tickets"),
        description: document.getElementById("description"),
        buyButton: document.getElementById("buy-ticket")
    };

    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(films => {
            filmsList.innerHTML = "";
            films.forEach(film => {
                const filmItem = document.createElement("li");
                filmItem.className = "film item";
                filmItem.textContent = film.title;
                filmItem.dataset.id = film.id;
                filmsList.appendChild(filmItem);

                filmItem.addEventListener("click", () => {
                    displayFilmDetails(film);
                });
            });
            displayFilmDetails(films[0]);
        });

    function displayFilmDetails(film) {
        movieDetails.poster.src = film.poster;
        movieDetails.title.textContent = film.title;
        movieDetails.runtime.textContent = `Runtime: ${film.runtime} minutes`;
        movieDetails.showtime.textContent = `Showtime: ${film.showtime}`;
        const availableTickets = film.capacity - film.tickets_sold;
        movieDetails.availableTickets.textContent = `Available Tickets: ${availableTickets}`;
        movieDetails.description.textContent = film.description;
        movieDetails.buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";

        movieDetails.buyButton.onclick = () => {
            if (availableTickets > 0) {
                film.tickets_sold += 1;
                movieDetails.availableTickets.textContent = `Available Tickets: ${film.capacity - film.tickets_sold}`;
                movieDetails.buyButton.textContent = film.capacity - film.tickets_sold > 0 ? "Buy Ticket" : "Sold Out";
            }
        };
    }
});

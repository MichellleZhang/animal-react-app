import React, { useState } from "react";

function Search() {
  const [pets, setPets] = useState([]);

  const fetchAnimals = (e) => {
    e.preventDefault();

    // Get animal type and zip code
    const animal = document.querySelector("#animal").value;
    const zip = document.querySelector("#zip").value;

    // fetch Pets with provided key and secret
    let key = "2fX4cxD5glhQK4egKgBgHzROhy0G2QE9uk2lfn3yVtcFMaa5p6";
    let secret = "6EeKgGgCFFOHqQm1edjzA35seDf0tS8OkfW4EwlT";
    let token;

    // get authorization token
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      body:
        "grant_type=client_credentials&client_id=" +
        key +
        "&client_secret=" +
        secret,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        token = data.access_token;
      })
      .then(() => {
        // use token to fetch all animals
        fetch(
          `https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => setPets(data.animals))
          .catch((err) => console.error(err));
      });
  };

  return (
    <div class="container">
        
        <form id="pet-form" onSubmit={fetchAnimals}>
            <div class="form-group">
                <label for="animal">Pet Type</label>
                <select id="animal" class="form-control form-control-lg mb-3">
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="bird">Bird</option>
                    <option value="bear">Bear</option>
                </select>
                <input type="text" id="zip" class="form-control form-control-lg" placeholder="Enter your zipcode" />
                <input type="submit" value="Find" class="btn btn-dark btn-lg btn-block mt-3" />
            </div>
    </form>

      <div id="results">
        {pets.length > 0 ? (pets.map((pet) => (
          <div key={pet.id} className="card card-body mb-3">
            <div className="row">
              <div className="col-sm-6">
                <h4>
                  {pet.name} ({pet.age})
                </h4>
                <p className="text-secondary">{pet.breeds.primary}</p>
                <p>
                  {pet.contact.address.city}, {pet.contact.address.state}{" "}
                  {pet.contact.address.postcode}
                </p>
                <ul className="list-group">
                  {pet.contact.phone && (
                    <li className="list-group-item">Phone: {pet.contact.phone}</li>
                  )}
                  {pet.contact.email && (
                    <li className="list-group-item">Email: {pet.contact.email}</li>
                  )}
                    <li className="list-group-item"> Shelter ID: {pet.organization_id}</li>
                </ul>
            </div>
              <div className="col-sm-6">
                <img
                  className="img-fluid rounded-circle mt-2"
                  src={pet.photos[0] ? pet.photos[0].medium : ""}
                  alt=""
                />
              </div>
            </div>
          </div>
        ))
        ) : (
            <h1>No pets found</h1>
        )}
      </div>
    </div>
  );
}

export default Search;




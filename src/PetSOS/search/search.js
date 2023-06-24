import React, { useState } from "react";
<<<<<<< HEAD

function Search() {
  const [pets, setPets] = useState([]);

  const fetchAnimals = (e) => {
    e.preventDefault();

    // Get animal type and zip code
    const animal = document.querySelector("#animal").value;
    const zip = document.querySelector("#zip").value;

    // fetch Pets with provided key and secret
=======
import { Link } from "react-router-dom";

function Search() {
  const [localPets, setLocalPets] = useState([]);
  const [apiPets, setApiPets] = useState([]);
  const [noLocalPetsFound, setNoLocalPetsFound] = useState(false);
  const [noApiPetsFound, setNoApiPetsFound] = useState(false);

  const fetchAnimals = async (e) => {
    e.preventDefault();

    // Get the selected animal type and zipcode
    const animalType = document.getElementById('animal').value;
    const zipcode = document.getElementById('zip').value;

    // Fetch local database pets
    const localPetsResponse = await fetch(`http://localhost:4000/api/pets?type=${animalType}&zipcode=${zipcode}`);
    console.log("getting search js localpets response")
    console.log(localPetsResponse);
    const localPetsData = await localPetsResponse.json();
    console.log("getting search js localPetsData")
    console.log(localPetsData);

    if (localPetsData.length > 0) {
      console.log("in if statement")
      setLocalPets(localPetsData);
      console.log("after localpets data set")
      setNoLocalPetsFound(false);
    } else {
      setLocalPets([]);
      setNoLocalPetsFound(true);
    }

    // Fetch Petfinder API pets
>>>>>>> 77eaf83 (adding search page)
    let key = "2fX4cxD5glhQK4egKgBgHzROhy0G2QE9uk2lfn3yVtcFMaa5p6";
    let secret = "6EeKgGgCFFOHqQm1edjzA35seDf0tS8OkfW4EwlT";
    let token;

<<<<<<< HEAD
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
=======
    // Get authorization token
    const tokenResponse = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      token = tokenData.access_token;

      // Use token to fetch animals from Petfinder API
      const apiPetsResponse = await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=${zipcode}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const apiPetsData = await apiPetsResponse.json();

      if (apiPetsData.animals && apiPetsData.animals.length > 0) {
        setApiPets(apiPetsData.animals);
        setNoApiPetsFound(false);
      } else {
        setApiPets([]);
        setNoApiPetsFound(true);
      }
    }
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
    {/* Render local database results */}
    {!noLocalPetsFound && localPets.length > 0 && (
      <div>
        <h2>Local Database Results:</h2>
        {localPets.map((pet) => (
          <div key={pet.id} className="card card-body mb-3">
            {/* Render the details of the local pet */}
            <div className="row">
              <div className="col-md-8">
                <h4>
                  {pet.name} ({pet.age})
                </h4>
                {/* <p className="text-secondary">{pet.breeds.primary}</p> */}
                <p>
                  {pet.address}, {pet.zipcode}
                </p>
                <ul className="list-group">
                  {pet.phone && <li className="list-group-item">Phone: {pet.phone}</li>}
                  {pet.status && <li className="list-group-item">Status: {pet.status}</li>}
                </ul>
                <Link to={`/details/${pet.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
              <div className="col-md-4">
                <img
                  className="img-fluid rounded-circle mt-2"
                  src={pet.image}
                  alt={`${pet.name} - ${pet.age}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Render Petfinder API results */}
    {!noApiPetsFound && apiPets.length > 0 && (
      <div>
        <h2>Petfinder API Results:</h2>
        {apiPets.map((pet) => (
          <div key={pet.id} className="card card-body mb-3">
            {/* Render the details of the Petfinder API pet */}
            <div className="row">
              <div className="col-md-8">
>>>>>>> 77eaf83 (adding search page)
                <h4>
                  {pet.name} ({pet.age})
                </h4>
                <p className="text-secondary">{pet.breeds.primary}</p>
                <p>
<<<<<<< HEAD
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
=======
                  {pet.contact.address.city}, {pet.contact.address.state} {pet.contact.address.postcode}
                </p>
                <ul className="list-group">
                  {pet.contact.phone && <li className="list-group-item">Phone: {pet.contact.phone}</li>}
                  {pet.contact.email && <li className="list-group-item">Email: {pet.contact.email}</li>}
                  <li className="list-group-item">Shelter ID: {pet.organization_id}</li>
                </ul>
                <Link to={`/details/${pet.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
              <div className="col-md-4">
                <img
                  className="img-fluid rounded-circle mt-2"
                  src={pet.photos[0] ? pet.photos[0].medium : ""}
                  alt={`${pet.name} - ${pet.breeds.primary}`}
>>>>>>> 77eaf83 (adding search page)
                />
              </div>
            </div>
          </div>
<<<<<<< HEAD
        ))
        ) : (
            <h1>No pets found</h1>
        )}
      </div>
    </div>
  );
}

export default Search;



=======
        ))}
      </div>
    )}

    {/* Render no results message */}
    {noLocalPetsFound && noApiPetsFound && localPets.length === 0 && apiPets.length === 0 && (
      <h3>No pets found</h3>
    )}
  </div>
</div>
  );
}
export default Search;
>>>>>>> 77eaf83 (adding search page)

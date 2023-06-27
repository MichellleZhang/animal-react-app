import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./search.css";

function Search() {
  const [localPets, setLocalPets] = useState([]);
  const [apiPets, setApiPets] = useState([]);
  const [noLocalPetsFound, setNoLocalPetsFound] = useState(false);
  const [noApiPetsFound, setNoApiPetsFound] = useState(false);

  useEffect(() => {
    // Check if there are stored search parameters in session storage
    const storedSearchParameters = sessionStorage.getItem("searchParameters");
    if (storedSearchParameters) {
      const { animalType, zipcode } = JSON.parse(storedSearchParameters);
      fetchAnimals(animalType, zipcode);
    }
  }, []);

  const fetchAnimals = async (animalType, zipcode) => {
    // Fetch local database pets
    const localPetsResponse = await fetch(
      `http://localhost:4000/api/pets?type=${animalType}&zipcode=${zipcode}`
    );
    const localPetsData = await localPetsResponse.json();

    if (localPetsData.length > 0) {
      setLocalPets(localPetsData);
      setNoLocalPetsFound(false);
    } else {
      setLocalPets([]);
      setNoLocalPetsFound(true);
    }

    // Fetch Petfinder API pets
    let key = "2fX4cxD5glhQK4egKgBgHzROhy0G2QE9uk2lfn3yVtcFMaa5p6";
    let secret = "6EeKgGgCFFOHqQm1edjzA35seDf0tS8OkfW4EwlT";
    let token;

    // Get authorization token
    const tokenResponse = await fetch(
      "https://api.petfinder.com/v2/oauth2/token",
      {
        method: "POST",
        body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      token = tokenData.access_token;

      // Use token to fetch animals from Petfinder API
      const apiPetsResponse = await fetch(
        `https://api.petfinder.com/v2/animals?type=${animalType}&location=${zipcode}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Get the selected animal type and zipcode
    const animalType = document.getElementById("animal").value;
    const zipcode = document.getElementById("zip").value;

    fetchAnimals(animalType, zipcode);

    // Store the search parameters in session storage
    sessionStorage.setItem(
      "searchParameters",
      JSON.stringify({ animalType, zipcode })
    );
  };

  return (
    <div className="container">
      <div className="search-container">
         <form id="pet-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="animal">Pet Type</label>
          <select
            id="animal"
            className="form-control form-control-lg mb-3"
            defaultValue={sessionStorage.getItem("searchParameters") ? JSON.parse(sessionStorage.getItem("searchParameters")).animalType : ""}
          >
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="bird">Bird</option>
            <option value="bear">Bear</option>
          </select>
          <input
            type="text"
            id="zip"
            className="form-control form-control-lg"
            placeholder="Enter your zipcode"
            defaultValue={sessionStorage.getItem("searchParameters") ? JSON.parse(sessionStorage.getItem("searchParameters")).zipcode : ""}
          />
          <input
            type="submit"
            value="Find"
            className="btn btn-dark btn-lg btn-block mt-3"
          />
        </div>
      </form>
      </div>
     
      <div className="results-container">
      <div id="results">
        {/* Render local database results */}
        {!noLocalPetsFound && localPets.length > 0 && (
          <div>
            <h2>Local Database Results:</h2>
            {localPets.map((pet) => {
              console.log(pet._id, localPets);
              return (
                <div
                  key={pet.id}
                  className="card card-body mb-3"
                  style={{ width: "36rem" }}
                >
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
                        {pet.phone && (
                          <li className="list-group-item">
                            Phone: {pet.phone}
                          </li>
                        )}
                        {pet.status && (
                          <li className="list-group-item">
                            Status: {pet.status}
                          </li>
                        )}
                      </ul>
                      <Link
                        to={`/details/${pet._id}`}
                        state={{localSearchResults:localPets}}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <img
                        className="img-fluid rounded-circle mt-2"
                        src={`/img/${pet.image}`}
                        alt={`${pet.name} - ${pet.age}`}
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Render Petfinder API results */}
        {!noApiPetsFound && apiPets.length > 0 && (
          <div>
            <h2>Petfinder API Results: </h2>
            {apiPets.map((pet) => {
              console.log(pet.id, apiPets);
              return (
                <div
                  key={pet.id}
                  className="card card-body mb-3"
                  style={{ width: "36rem" }}
                >
                  {/* Render the details of the Petfinder API pet */}
                  <div className="row">
                    <div className="col-md-8">
                      <h4>
                        {pet.name} ({pet.age})
                      </h4>
                      <p className="text-secondary">{pet.breeds.primary}</p>
                      <p>
                        {pet.contact.address.city},{" "}
                        {pet.contact.address.state}{" "}
                        {pet.contact.address.postcode}
                      </p>
                      <ul className="list-group">
                        {pet.contact.phone && (
                          <li className="list-group-item">
                            Phone: {pet.contact.phone}
                          </li>
                        )}
                        {pet.contact.email && (
                          <li className="list-group-item">
                            Email: {pet.contact.email}
                          </li>
                        )}
                        <li className="list-group-item">
                          Shelter ID: {pet.organization_id}
                        </li>
                      </ul>
                      <Link
                        to={`/details/${pet.id}`}
                        state={{remoteSearchResults:apiPets}}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <img
                        className="img-fluid rounded-circle mt-2"
                        src={pet.photos[0] ? pet.photos[0].medium : ""}
                        alt={`${pet.name} - ${pet.breeds.primary}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Render no results message */}
        {noLocalPetsFound && noApiPetsFound && localPets.length === 0 && apiPets.length === 0 && (
          <h3>No pets found</h3>
        )}
      </div>
      </div>
    </div>
  );
}

export default Search;
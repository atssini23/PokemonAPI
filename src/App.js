import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList.js";
import Pagination from "./Pagination.js";
import axios from "axios";
import "./styles.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => (cancel = c))
      })
      .then(res => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map(p => p.name));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  function gotoPrevPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <div>
      <PokemonList pokemon={pokemon} />
      <Pagination gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
    </div>
  );
}

export default App;
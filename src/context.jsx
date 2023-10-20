import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const Api = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const [isError, setIsError] = useState({
    show: false,
    msg: "",
  });
  const [query, setQuery] = useState("titanic");

  const fetchApi = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovieData(data.Search);
        setIsError({
          show: false,
          msg: "",
        });
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const callApiFunc = setTimeout(() => {
      fetchApi(`${Api}&s=${query}`);
    }, 1000);
    return () => {
      clearTimeout(callApiFunc);
    };
  }, [query]);

  return (
    <AppContext.Provider
      value={{ movieData, isLoading, isError, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };

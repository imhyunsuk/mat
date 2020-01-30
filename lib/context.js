import { createContext, useContext, useState, useEffect } from 'react';
import useScript from './hooks';


const AppContext = createContext();
export const useAppContext = () => useContext(AppContext)

export const MapProvider = ({children}) => {
  const [query, setQuery] = useState('');
  const [map, setMap] = useState(undefined);
  const searchClick = () => null;

  return (
    <AppContext.Provider value={{query, setQuery, map, setMap, searchClick}}>
      {children}
    </AppContext.Provider>
  )
}

export const AddProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [stores, setStores] = useState([]);
  const [map, setMap] = useState(undefined);
  
  const searchClick = () => {
    const fetchStores = async () => {
      const res = await fetch(
        encodeURI(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&category_group_code=FD6,CE7`
        ),
        {
          headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_SECRET}`
          }
        }
      );
      const data = await res.json();
      setStores(data.documents);
    };

    if (query) fetchStores();
  };

  return (
    <AppContext.Provider value={{ map, setMap, query, setQuery, stores, setStores, searchClick }}>
      {children}
    </AppContext.Provider>
  )
}
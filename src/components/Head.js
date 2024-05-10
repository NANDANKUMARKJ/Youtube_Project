import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = data.json();
    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAdVBMVEX///8AAACvr69YWFgtLS2IiIjm5uaLi4ubm5tvb2+Xl5e+vr6lpaX29vYqKirr6+t6enrg4OBCQkIWFhbU1NRJSUlpaWnHx8fa2to4ODi3t7eQkJC6urr39/cdHR3v7+8NDQ0bGxs2NjYkJCRUVFSBgYFra2sdvEXhAAADPUlEQVR4nO3d7XbpQBgF4CGRILSCUh+lh8P9X+JZKVq6+sex39ld8+7nDvZeIZnJzCQEEREREREREREREbnbsOrPsjTNyuWzbXnVSytt+cCuvPmenS4GqwJ77GCRjLcG5Q2f2LHiecW3987OFBO8vx07UVzgW/CInSeyBbS9KTtOdND774KdJj5ge/4uvlari6vPyxPftT2uPnYUihrV3is7CQXs5rFkJ6E4oOpbsZNQvKDqK9lJKMaq7xGw+vTjfYjPW8cIVZ/HQQdy1MtOQoGb85uxoxC8w9oLc3YWghWuvuDoPcfFEFifv8sPefH5+/f7A20vhAk7UFyw2aqzZ3agqObg9kIo2JEiwrcXwjD15UEXE/Qv96zNDhZFaVNeY5Czw1nrWKwP+lIPRuNdnqRFrzs17U5ERERERER+vW2RJuP9gI2im/Ks3640nTOYp9zdyb5tVd42Y2eL4snmCvTzrrdv0J6PmfoT2Nq0T77W+MGWhZ/V7ECRgW8gG3ae2KAPgV12muj+IutjhyEAbij3dNe96OHqS3+w8QNYe0N2EgrYOiE/441rsLHHgJ2EYoaqT5uyHqItgarvbrD6/I05GhmqvoqdhAK2ytTXqvqLNaq+4OLYw+9wq3Q9PrkAp1y27CwEFa4+h6cwbYDtOZw0wG4s8vWmCP+u7cAOFBVsxPHpyI4UUf4Gr8/R9Qeba7nhZexmsUaj8dZhJ4tgVhi11xTYTvutUd43LO/UYL1up2k5td2MKiIiIiIiIr9dXfXLTorK1RL/gbFv3R0S/97Y0eLsubPCw57A3KrAPjtZJEeT9jxceicbg3m/MTtUTPB9+X6uvcYE/KbS2wJT2NLSD56OzT1ZIuvz9dP9AGzP22boBnBDtJ/1GV+An5hNfKT2M9jDi8ffLvDX62Vt0K0Oqj4vg91bsKX12tOm+u6mjyw+BLbG1ONBGsCjNHx+ZBH3bXd2EgrcMX4OZwyQcwZrdhQC5Bl07CwEyDXi/u69wCOsgrMXRQ3syw5vG6LR78p9PfvhPqztsT98eyHUbs4vRR5jcMXHK4/MbGtWMWJnM5fZfiiwOqS7p3LRa2tToIiIiIiIiIiIiMh/+gdJQ36T/RN9qQAAAABJRU5ErkJggg=="
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 p-2 rounded-r-full bg-gray-200">
          🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-200">
            <ul>
              {Array.isArray(suggestions) &&
                suggestions.map((s) => (
                  <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                    🔍 {s}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="data:image/png;base64,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"
        />
      </div>
    </div>
  );
};

export default Head;

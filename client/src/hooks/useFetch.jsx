
import { useEffect, useState } from "react";

// gives access to the API KEY var specified in -env
const API_KEY = import.meta.env.VITE_GIPHY_API;

// Cache object to store fetched GIFs
const gifCache = {};

// custom hook
const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState("");
    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword); // State to hold the debounced keyword

    // Debouncing logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 500); // 500ms debounce delay

        // Cleanup the timeout if the keyword changes before the timeout completes
        return () => {
            clearTimeout(handler);
        };
    }, [keyword]);

    const fetchGifs = async () => {
        // Check if the GIF for this keyword is already in the cache
        if (gifCache[debouncedKeyword]) {
            setGifUrl(gifCache[debouncedKeyword]); // Use the cached result
            return;
        }

        try {
            // try getting the response from the giphy API
            // in fetch(Ö) we define the API we want to fetch from, 
            // then we need to provide some params (API key), we do this after ? below
            // @note `` instead of '' is used to make a template string where we can use logic in a string
            // someone might submit 2 keywords in the keyword field: we handle this by joining the 2 words without spaces
            // we also limit the hits to 1, we only want 1
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${debouncedKeyword.split(" ").join("")}&limit=1`);
            // NOW THAT WE HAVE THE QUERY WE NEED TO DESTRUCTURE THE DATA FROM THE RESPONSE
            const { data } = await response.json();

            // Store the fetched GIF URL in the cache
            const gifUrl = data[0]?.images.downsized_medium?.url || 'https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284';
            gifCache[debouncedKeyword] = gifUrl;

            setGifUrl(gifUrl);
        } catch (error) {
            // if a new gif is not found, we just use a demo one
            setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
        }
    }

    // @note this is where we actually call the function
    // This says we are calling this whenever the debouncedKeyword changes, if there is a keyword.
    // debouncedKeyword is updated only after the user stops typing for a certain period.
    useEffect(() => {
        if (debouncedKeyword) fetchGifs();
    }, [debouncedKeyword]);

    return gifUrl;
}

export default useFetch;





/*import { useEffect, useState } from "react";

// gives access to the API KEY var specified in -env
const API_KEY = import.meta.env.VITE_GIPHY_API;

// custom hook
const useFecth = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async () => {
        try {
            // try getting the reposnse from the giphy API
            // in fetch(Ö) we define the API we want to fetch from, 
            // then we need to provide some params (API key), we do this after ? below
            // @note `` instead of '' is used to make a remplate string where we can use logic in a string
            // someone might submit 2 keyowrds in the keyword field: we handle this by joining the 2 words without spaces
            // we also limit the hits to 1, we only want 1
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            // NOW THAT WE HAVE THE QUESRY WE NEED TO DESTRUCT THE DATA FROM THE RESPONSE
            const { data } = await response.json();

            setGifUrl(data[0]?.images.downsized_medium?.url)
        } catch (error) {
            // if a new gif is not found, we just use a demo one
            setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
        }
    }

    // @note this is where we actually call the funcion
    // This says we are calling this whenever the keyword changes, if there is a keyword.
    // keyword is coming trhough props to our use fetch cudtom hook
    useEffect(() => {
        if (keyword) fetchGifs();
    }, [keyword]);

    return gifUrl;
}

export default useFecth;*/
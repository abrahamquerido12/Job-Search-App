import { useState, useEffect } from "react";
import axios from "axios";
import Config from "react-native-config";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const rapidApiKey = process.env.RAPID_API_KEY;
  const rapidApiKey = "c91acb59d2msh5f416b7c0f1af42p15e5abjsn8c5cc6041bf1";

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);

      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert(Config.RAPID_API_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);

    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

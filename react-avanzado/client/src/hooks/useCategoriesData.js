import { useEffect, useState } from "react";

const API = `${process.env.REACT_APP_REST_API}/categories`;

export const useCategoriesData = () => {
  const [categories, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(function() {
    setLoading(true);
    window
      .fetch(API)
      .then(res => res.json())
      .then(categories => {
        setCategoriesData(categories);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { error, loading, categories };
};

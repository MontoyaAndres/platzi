import { useEffect, useState } from "react";

export const useCategoriesData = () => {
  const [categories, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(function() {
    setLoading(true);
    window
      .fetch("http://localhost:3500/categories")
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

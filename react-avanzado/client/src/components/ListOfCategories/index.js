import React, { useEffect, useState } from "react";

import { Category } from "../Category";
import { Loading } from "../Loading";
import { List, Item } from "./styles";
import { useCategoriesData } from "../../hooks/useCategoriesData";

function ListOfCategoriesComponent() {
  const [showFixed, setShowFixed] = useState(false);
  const { categories, loading } = useCategoriesData();

  useEffect(() => {
    function onScroll(e) {
      const newShowFixed = window.scrollY > 200;

      if (showFixed !== newShowFixed) {
        setShowFixed(newShowFixed);
      }
    }

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [showFixed]);

  function renderList(fixed) {
    return (
      <List className={fixed ? "fixed" : ""}>
        {loading ? (
          <Loading />
        ) : (
          categories.map(category => (
            <Item key={category.id}>
              <Category {...category} path={`/pet/${category.id}`} />
            </Item>
          ))
        )}
      </List>
    );
  }

  return (
    <>
      {renderList()}
      {showFixed && renderList(true)}
    </>
  );
}

export const ListOfCategories = React.memo(ListOfCategoriesComponent);

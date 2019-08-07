import React from "react";

import { Category } from "../Category";
import { List, Item } from "./styles";

export function ListOfCategories() {
  return (
    <List>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(category => (
        <Item key={category}>
          <Category />
        </Item>
      ))}
    </List>
  );
}

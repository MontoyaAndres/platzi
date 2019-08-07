import React from "react";

import { Link, Image } from "./styles";

const DEFAULT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

export function Category({ cover = DEFAULT_IMAGE, path, emoji = "?" }) {
  return (
    <Link href={path}>
      <Image src={cover} alt="" />
      {emoji}
    </Link>
  );
}

import React, { memo } from "react";

const heart = ({ style }) => <div className="like is-liked" style={style} />;

export default memo(heart);

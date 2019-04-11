import React, { memo, useState, useEffect } from "react";

const isOffline = ({ children }) => {
  const [online, setOnline] = useState(navigator ? navigator.onLine : true);

  useEffect(() => {
    if (!window) return;

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  });

  function goOnline() {
    setOnline(true);
  }

  function goOffline() {
    setOnline(false);
  }

  if (online) {
    return null;
  }

  return <span>{children}</span>;
};

export default memo(isOffline);

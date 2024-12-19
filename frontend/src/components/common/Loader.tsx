import React, { memo } from "react";

type LoaderProps = {
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className = "" }) => {
  return (
    <div className={`loader-backdrop ${className}`}>
      <div className="loader"></div>
    </div>
  );
};

Loader.displayName = "Loader";
export default memo(Loader);

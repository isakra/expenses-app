import React from "react";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return <div className="p-10 bg-gray-200 rounded-3xl">{children}</div>;
};

export default Wrapper;

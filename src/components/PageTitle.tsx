import React from 'react';

type PageTitleProps = {
  title: string;
};
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="p-7 md:p-10 md:mb-5">
      <h1 className="text-3xl font-bold text-gray-800 text-center">{title}</h1>
    </div>
  );
};

export default PageTitle;
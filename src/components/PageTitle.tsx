import React from 'react';

type PageTitleProps = {
  title: string;
};
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="p-5 md:p-3 md:mb-5 flex justify-center md:justify-start">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
    </div>
  );
};

export default PageTitle;
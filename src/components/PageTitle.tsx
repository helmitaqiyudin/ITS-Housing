import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

type PageTitleProps = {
  title: string;
  withBackButton?: boolean;
};
const PageTitle: React.FC<PageTitleProps> = ({ title, withBackButton }) => {
  const router = useRouter();
  return (
    <div className="p-5 md:p-3 md:mb-5 flex justify-between md:justify-start">
      {withBackButton && (
        <div className="mr-5 cursor-pointer self-center" onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </div>
      )}
      <h1 className="text-2xl font-semibold text-gray-800 self-center">{title}</h1>
      <div>
      </div>
    </div>
  );
};

export default PageTitle;
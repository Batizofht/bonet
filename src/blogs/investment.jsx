"use client"
import { useTranslation } from 'react-i18next';

const InvestmentOpportunities = () => {
  const { t } = useTranslation();

  const blogs = t('investmentOpportunities.items', { returnObjects: true });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl text-gray-700 font-bold text-center mt-30 mb-8">
        {t('investmentOpportunities.title').split('in ')[0]} 
        <span className="bg-[#188bff] bg-clip-text text-transparent">
          {`in ${t('investmentOpportunities.title').split('in ')[1]}`}
        </span>
      </h2>
      <div className="space-y-12">
        {blogs.map((blog, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-1/2 rounded-lg shadow-md"
            />
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent mb-4">
                {blog.title}
              </h3>
              <p className="text-gray-500 mb-4">{blog.description}</p>
              <ul className="list-disc pl-5 text-gray-500">
                {blog.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentOpportunities;

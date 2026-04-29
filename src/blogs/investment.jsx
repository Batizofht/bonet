"use client"
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';

const InvestmentOpportunities = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const blogs = t('investmentOpportunities.items', { returnObjects: true });

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Investment
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          {t('investmentOpportunities.title').split('in ')[0]} 
          <span className="text-[#C9A84C]">
            {` in ${t('investmentOpportunities.title').split('in ')[1]}`}
          </span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl">
          Discover promising sectors and strategic investment opportunities in Rwanda's growing economy
        </p>
      </div>

      {/* Investment Articles */}
      <div className="space-y-12">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-start bg-white rounded-xl border border-gray-200 overflow-hidden ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="lg:w-2/5 w-full">
              <div className="relative overflow-hidden h-72 lg:h-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/5 w-full p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {blog.title}
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Latest</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">High Potential</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {blog.description}
              </p>

              {/* Key Points */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-[#C9A84C]" />
                  Key Investment Highlights
                </h4>
                <ul className="space-y-2">
                  {blog.keyPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-600 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full flex-shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => router.push('/contact')}
                className="bg-[#C9A84C] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors duration-200 text-sm"
              >
                Investment Guide
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 border border-gray-200 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Invest in Rwanda?
        </h3>
        <p className="text-gray-500 mb-6 max-w-lg mx-auto">
          Get expert guidance on investment opportunities, legal requirements, and market insights.
        </p>
        <button
          onClick={() => router.push('/consulting')}
          className="bg-[#C9A84C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors duration-200"
        >
          Free Consultation
        </button>
      </div>
    </div>
  );
};

export default InvestmentOpportunities;
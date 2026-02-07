"use client"
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  DollarSign, 
  Building, 
  MapPin, 
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';

const InvestmentOpportunities = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const blogs = t('investmentOpportunities.items', { returnObjects: true });

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full "></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <TrendingUp className="w-6 h-6 text-[#188bff] " />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full "></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {t('investmentOpportunities.title').split('in ')[0]} 
          <span className="bg-[#188bff] bg-clip-text text-transparent">
            {` in ${t('investmentOpportunities.title').split('in ')[1]}`}
          </span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Discover promising sectors and strategic investment opportunities in Rwanda's growing economy
        </p>
      </div>

      {/* Investment Blogs */}
      <div className="space-y-16">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center bg-white rounded-3xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="lg:w-2/5 w-full relative">
              <div className="relative overflow-hidden h-80 lg:h-96">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#188bff] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Investment
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/5 w-full p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#188bff] to-cyan-500 bg-clip-text text-transparent">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Latest</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">High Potential</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {blog.description}
              </p>

              {/* Key Points */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#188bff]" />
                  Key Investment Highlights
                </h4>
                <ul className="space-y-2">
                  {blog.keyPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-[#188bff] rounded-full flex-shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Investment Metrics */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">High ROI</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl">
                  <Building className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Growing Sector</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-xl">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">Rwanda Focus</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push('/contact')}
                  className="flex items-center gap-2 border-2 border-[#188bff] text-[#188bff] px-6 py-3 rounded-xl font-semibold hover:bg-[#188bff] hover:text-white transition-all"
                >
                  <DollarSign className="w-4 h-4" />
                  Investment Guide
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div
        className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-100 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Invest in Rwanda?
          </h3>
          
          <p className="text-gray-600 text-lg mb-6">
            Get expert guidance on investment opportunities, legal requirements, 
            and market insights to make informed investment decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/consulting')}
              className="border-2 border-[#188bff] text-[#188bff] px-8 py-3 rounded-xl font-semibold hover:bg-[#188bff] hover:text-white transition-all"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentOpportunities;
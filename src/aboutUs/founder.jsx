import React from 'react';
import { useTranslation } from 'react-i18next';

const MeetOurFounder = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center text-center py-10 px-5 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">
        {t('founder.meet')} <span className="bg-[#188bff] bg-clip-text text-transparent">{t('founder.founder')}</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full px-6 md:px-12">
        {/* Left Side - Image */}
        <div className="flex flex-col items-center mb-15">
          <img 
            src="../assets/images/3.jpg" 
            alt="Founder" 
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-gray-200"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-700">John Doe</h3>
          <p className="text-gray-600">{t('founder.founderTitle')}</p>
        </div>
        
        {/* Right Side - Description */}
        <div className="w-full text-left md:text-justify -mt-15" style={{ maxWidth: '700px' }}>
          <p className="text-gray-700 leading-relaxed">
            {t('founder.founderDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MeetOurFounder;

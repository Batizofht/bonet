'use client'
import { useState } from "react";

import {
  FaHotel,
  FaHome,
  FaBuilding,
  FaTaxi,
  FaBriefcase,
  FaRegIdBadge,
  FaCertificate,
  FaClipboardCheck,
  FaSearchDollar,
  FaRocket,
  FaHandshake,
  FaChartLine,
  FaHandHoldingUsd,
  FaCogs,
  FaClipboardList,
  FaUsers,
  FaUserTie,
  FaRegFileAlt,
  FaChalkboardTeacher,
  FaMoneyCheckAlt,
  FaUserCog,
} from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuBars() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = usePathname();


  function getActiveClass(path:string) {
    return location === path
      ? "text-blue-500 font-bold"
      : "font-bold text-gray-700 hover:text-blue-500";
  }
  const { t } = useTranslation();
  return (
    <div className="hidden md:flex space-x-6 text-sm  font-medium">
      {/* Home */}
      <Link href="/" className={getActiveClass("/")}>
      {t('menu.home')}
      </Link>

      {/* About us */}
      <Link href="/about" className={getActiveClass("/about")}>
      {t('menu.aboutUs')}
      </Link>

      {/* Services dropdown */}
      <div
        className="relative group"
        onMouseEnter={() => setServicesDropdownOpen(true)}
        onMouseLeave={() => setServicesDropdownOpen(false)}
      >
        <Link href="/services" className={getActiveClass("/services")}>
        {t('menu.services')}
        </Link>

        {servicesDropdownOpen && (
          <div className="absolute left-0 w-64 bg-white border border-gray-300 shadow-lg rounded-md z-50 mt-0">
            {/* Travel & Hospitality */}
            <div className="relative group/travel">
              <div className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group-hover/travel:bg-gray-100 cursor-pointer">
                <span className="flex items-center">
                  <FaHotel className="mr-2 text-blue-400 w-5 h-5" />
                  <a href="/travel" className="hover:text-blue-600">
                  {t('menu.travelAndHospitality')}
                  </a>
                </span>
                <HiChevronRight className="w-4 h-4 text-blue-400" />
              </div>

              {/* Travel submenu */}
              <div className="absolute top-0 left-full ml-px hidden group-hover/travel:block bg-white border border-gray-300 shadow-lg rounded-md w-56 z-50">
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaHome className="mr-2 text-blue-400" /> {t('menu.hotels')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaBuilding className="mr-2 text-blue-400" /> {t('menu.apartments')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaTaxi className="mr-2 text-blue-400" /> {t('menu.transport')}
                </Link>
                <Link
                  href="/bookNow#tourism"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaTaxi className="mr-2 text-blue-400" /> {t('menu.tourism')}
                </Link>
              </div>
            </div>

            {/* Investment & Business Setup */}
            <div className="relative group/invest">
              <div className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group-hover/invest:bg-gray-100 cursor-pointer">
                <span className="flex items-center">
                  <FaBriefcase className="mr-2 text-blue-400 w-5 h-5" />
                  <a href="/investment" className="hover:text-blue-600">
                    {t('menu.investmentAndBusinessSetup')}
                  </a>
                </span>
                <HiChevronRight className="w-4 h-4 text-blue-400" />
              </div>

              {/* Investment submenu */}
              <div className="absolute top-0 left-full ml-px hidden group-hover/invest:block bg-white border border-gray-300 shadow-lg rounded-md w-80 z-50">
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaRegIdBadge className="mr-2 text-blue-400" /> {t('menu.companyRegistration')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaCertificate className="mr-2 text-blue-400" /> {t('menu.investmentCertificate')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaClipboardCheck className="mr-2 text-blue-400" /> {t('menu.businessPermits')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaSearchDollar className="mr-2 text-blue-400" /> {t('menu.marketResearch')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaRocket className="mr-2 text-blue-400" /> {t('menu.operationalSetup')}
                </Link>
              </div>
            </div>

            {/* Business Consulting */}
            <div className="relative group/consulting">
              <div className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group-hover/consulting:bg-gray-100 cursor-pointer">
                <span className="flex items-center">
                  <FaHandshake className="mr-2 text-blue-400 w-5 h-5" />
                  <a href="/consulting" className="hover:text-blue-600">
                    {t('menu.businessConsulting')}
                  </a>
                </span>
                <HiChevronRight className="w-4 h-4 text-blue-400" />
              </div>

              {/* Consulting submenu */}
              <div className="absolute top-0 left-full ml-px hidden group-hover/consulting:block bg-white border border-gray-300 shadow-lg rounded-md w-80 z-50">
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaChartLine className="mr-2 text-blue-400" /> {t('menu.businessPlanning')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaHandHoldingUsd className="mr-2 text-blue-400" /> {t('menu.financialAdvisory')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaCogs className="mr-2 text-blue-400" /> {t('menu.processOptimization')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaClipboardList className="mr-2 text-blue-400" /> {t('menu.projectAuditing')}
                </Link>
              </div>
            </div>

            {/* HR & Admin Support */}
            <div className="relative group/hr">
              <div className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group-hover/hr:bg-gray-100 cursor-pointer">
                <span className="flex items-center">
                  <FaUsers className="mr-2 text-blue-400 w-5 h-5" />
                  <a href="/hrsupport" className="hover:text-blue-600">
                    {t('menu.hrAndAdminSupport')}
                  </a>
                </span>
                <HiChevronRight className="w-4 h-4 text-blue-400" />
              </div>

              {/* HR submenu */}
              <div className="absolute top-0 left-full ml-px hidden group-hover/hr:block bg-white border border-gray-300 shadow-lg rounded-md w-72 z-50">
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaUserTie className="mr-2 text-blue-400" /> {t('menu.recruitment')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaRegFileAlt className="mr-2 text-blue-400" /> {t('menu.hrPolicyDevelopment')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaChalkboardTeacher className="mr-2 text-blue-400" /> {t('menu.employeeTraining')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaMoneyCheckAlt className="mr-2 text-blue-400" /> {t('menu.payrollCompensation')}
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaUserCog className="mr-2 text-blue-400" /> {t('menu.administrativeSupport')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Link href="/bookNow" className={getActiveClass("/bookNow")}>
      {t('menu.bookNow')}
      </Link> 
    </div>
  );
}

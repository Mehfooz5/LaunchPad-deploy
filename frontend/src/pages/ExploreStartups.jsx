import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const StartupCards = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRefs = {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await API.get('/getStartups');
        setStartups(res.data || []);
      } catch (error) {
        setError('Error fetching startups. Please try again later.');
        console.error('Error fetching startups:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  console.log(startups)

  const handleCardClick = (startupId) => {
    navigate(`/startup/${startupId}`);
  };


  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading startups…</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {startups.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">No startups available.</p>
      ) : (
        startups.map((s) => (
          <div
            key={s._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl overflow-hidden w-full flex flex-col cursor-pointer"
            onClick={() => handleCardClick(s._id)}
            role="button"
            tabIndex="0"
          >
            {/* Video */}
            {s.pitch ? (
              <video
                ref={(el) => {
                  if (el) videoRefs[s._id] = el;
                }}
                onMouseEnter={() => videoRefs[s._id]?.play()}
                onMouseLeave={() => {
                  const video = videoRefs[s._id];
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
                muted
                loop
                className="w-full h-64 object-cover bg-black"
                src={s.pitch}
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No Pitch Video
              </div>
            )}

            {/* Content */}
            <div className="p-4 h-[90px]">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{s.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1 text-gray-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 0115 0" />
                </svg>
                <span>{s.founderId?.userId?.fullName || 'Unknown Founder'}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StartupCards;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiSearch, FiMapPin, FiBriefcase, FiFilter } from 'react-icons/fi';
// import { FaRegBuilding, FaRegLightbulb, FaPlay } from 'react-icons/fa';
// import API from '../api/axios';

// const StartupCards = () => {
//   const [startups, setStartups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     country: null,
//     industry: null,
//     stage: null
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStartups = async () => {
//       try {
//         const res = await API.get('/getStartups');
//         setStartups(res.data || []);
//       } catch (error) {
//         setError('Error fetching startups. Please try again later.');
//         console.error('Error fetching startups:', error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStartups();
//   }, []);

//   // Sample filter data - replace with your actual filter options
//   const countries = [
//     { name: 'Denmark', count: 4739 },
//     { name: 'Finland', count: 3370 },
//     { name: 'Iceland', count: 239 },
//     { name: 'Norway', count: 2198 },
//     { name: 'Sweden', count: 2640 }
//   ];

//   const industries = [
//     { name: 'SaaS', count: 1200 },
//     { name: 'Legal', count: 450 },
//     { name: 'IT & Software', count: 1800 }
//   ];

//   const stages = [
//     { name: 'Idea', count: 130 },
//     { name: 'MVP', count: 450 },
//     { name: 'Growth', count: 780 }
//   ];

//   const filteredStartups = startups.filter(startup => {
//     // Apply search filter
//     const matchesSearch = startup.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          startup.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     // Apply country filter
//     const matchesCountry = !filters.country || 
//                          startup.location === filters.country;
    
//     // Apply industry filter
//     const matchesIndustry = !filters.industry || 
//                           (startup.domain && startup.domain.toLowerCase() === filters.industry.toLowerCase());
    
//     // Apply stage filter
//     const matchesStage = !filters.stage || 
//                        (startup.stage && startup.stage.toLowerCase() === filters.stage.toLowerCase());
    
//     return matchesSearch && matchesCountry && matchesIndustry && matchesStage;
//   });

//   const toggleFilter = (type, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [type]: prev[type] === value ? null : value
//     }));
//   };

//   const handleCardClick = (startupId) => {
//     navigate(`/startup/${startupId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[50vh]">
//         <div className="animate-pulse flex space-x-4">
//           <div className="flex-1 space-y-6 py-1">
//             <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-xl shadow-md p-4 space-y-4">
//                   <div className="h-48 bg-gray-200 rounded-xl"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
//         <div className="bg-red-100 p-4 rounded-full mb-4">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
//         <p className="text-gray-600 mb-6 max-w-md">{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Directory</h1>
//           <p className="text-gray-600">Discover innovative startups from the Nordics</p>
//         </div>

//         {/* Search and Filters */}
//         <div className="flex flex-col lg:flex-row gap-6 mb-8">
//           {/* Search Bar */}
//           <div className="flex-1">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name or keyword"
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Mobile Filters Button */}
//           <button className="lg:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-700">
//             <FiFilter className="mr-2" />
//             Filters
//           </button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Filters Sidebar */}
//           <div className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="mb-6">
//               <h3 className="font-medium text-gray-900 mb-3 flex items-center">
//                 <FiMapPin className="mr-2 text-blue-500" />
//                 Countries
//               </h3>
//               <ul className="space-y-2">
//                 {countries.map(country => (
//                   <li key={country.name}>
//                     <button
//                       onClick={() => toggleFilter('country', country.name)}
//                       className={`flex justify-between items-center w-full text-left px-2 py-1 rounded ${filters.country === country.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
//                     >
//                       <span>{country.name}</span>
//                       <span className="text-gray-500 text-sm">{country.count.toLocaleString()}</span>
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-medium text-gray-900 mb-3 flex items-center">
//                 <FiBriefcase className="mr-2 text-blue-500" />
//                 Industry
//               </h3>
//               <ul className="space-y-2">
//                 {industries.map(industry => (
//                   <li key={industry.name}>
//                     <button
//                       onClick={() => toggleFilter('industry', industry.name)}
//                       className={`flex justify-between items-center w-full text-left px-2 py-1 rounded ${filters.industry === industry.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
//                     >
//                       <span>{industry.name}</span>
//                       <span className="text-gray-500 text-sm">{industry.count.toLocaleString()}</span>
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-medium text-gray-900 mb-3 flex items-center">
//                 <FaRegLightbulb className="mr-2 text-blue-500" />
//                 Startup Stage
//               </h3>
//               <ul className="space-y-2">
//                 {stages.map(stage => (
//                   <li key={stage.name}>
//                     <button
//                       onClick={() => toggleFilter('stage', stage.name)}
//                       className={`flex justify-between items-center w-full text-left px-2 py-1 rounded ${filters.stage === stage.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
//                     >
//                       <span>{stage.name}</span>
//                       <span className="text-gray-500 text-sm">{stage.count.toLocaleString()}</span>
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-gray-600">
//                 Showing: <span className="font-medium">{filteredStartups.length}</span> filtered startups
//               </p>
//               <div className="flex items-center">
//                 <span className="text-gray-600 mr-2">Sort by:</span>
//                 <select className="border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-700">
//                   <option>Most recent</option>
//                   <option>Most popular</option>
//                   <option>Most jobs</option>
//                 </select>
//               </div>
//             </div>

//             {/* Startup Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredStartups.length === 0 ? (
//                 <div className="col-span-full text-center py-12">
//                   <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">No startups found</h3>
//                   <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
//                   <button 
//                     onClick={() => {
//                       setSearchTerm('');
//                       setFilters({ country: null, industry: null, stage: null });
//                     }}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     Clear filters
//                   </button>
//                 </div>
//               ) : (
//                 filteredStartups.map(startup => (
//                   <div
//                     key={startup._id}
//                     className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
//                     onClick={() => handleCardClick(startup._id)}
//                   >
//                     {/* Video/Image */}
//                     {startup.pitch ? (
//                       <div className="relative h-48 w-full overflow-hidden bg-black rounded-t-xl">
//                         <video
//                           src={startup.pitch}
//                           muted
//                           loop
//                           className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <div className="bg-white/80 p-3 rounded-full">
//                             <FaPlay className="text-gray-800" />
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="h-48 bg-gray-100 rounded-t-xl flex items-center justify-center text-gray-400">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
//                         </svg>
//                       </div>
//                     )}

//                     {/* Content */}
//                     <div className="p-5">
//                       <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{startup.title}</h3>
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">{startup.description}</p>
                      
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {startup.domain && (
//                           <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
//                             {startup.domain}
//                           </span>
//                         )}
//                         {startup.stage && (
//                           <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
//                             {startup.stage}
//                           </span>
//                         )}
//                       </div>
                      
//                       <div className="flex items-center text-gray-500 text-sm">
//                         <FaRegBuilding className="mr-2" />
//                         <span>{startup.founderId?.userId?.fullName || 'Unknown Founder'}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Popular Startups Section */}
//             {filteredStartups.length > 0 && (
//               <div className="mt-12">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Startups</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {['Relax Gaming', 'Spacemaker AI', 'Too Good To Go', 'Voi Technology'].map(name => (
//                     <div key={name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//                       <h4 className="font-medium text-gray-900">{name}</h4>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StartupCards;
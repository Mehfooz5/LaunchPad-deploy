import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaEdit, FaPlay, FaBuilding, FaMapMarkerAlt, FaHeart, 
  FaThumbsDown, FaInfoCircle, FaPlus, FaEnvelope, FaArrowLeft, 
  FaChartLine, FaFilter, FaSort, FaShareAlt, FaSearch,
  FaRegClock, FaUserTie, FaLightbulb, FaRocket
} from 'react-icons/fa';
import API from '../api/axios';
// import StartupCards from '../components/StartupCards';
import EmptyState from '../Components/EmptyState'
import StartupCardSkeleton from '../Components/StartupCardSkeleton';


const FounderProfile = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await API.get('/getMyStartupProfile');
        setStartups(res.data);
      } catch (err) {
        setError('Failed to load startups');
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  // Close toast notification after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleEdit = (startupId) => {
    navigate(`/update-startup/${startupId}`);
  };

  const handleCreateStartup = () => {
    navigate('/add-startup');
  };

  const handleShare = async (startup) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/startup/${startup._id}`
      );
      setToast({
        show: true,
        message: `Share link for ${startup.title} copied to clipboard!`,
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to copy link',
        type: 'error'
      });
    }
  };

  // Filter and sort startups
  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         startup.stage.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === 'likes') return b.likes - a.likes;
    return 0;
  });

  // Calculate statistics
  const totalStartups = startups.length;
  const totalLikes = startups.reduce((sum, startup) => sum + startup.likes, 0);
  const avgLikes = totalStartups ? (totalLikes / totalStartups).toFixed(1) : 0;
  const activeStartups = startups.filter(s => s.status === 'active').length;

  const getStageIcon = (stage) => {
    switch(stage.toLowerCase()) {
      case 'idea': return <FaLightbulb className="text-yellow-500" />;
      case 'mvp': return <FaRocket className="text-blue-500" />;
      case 'growing': return <FaChartLine className="text-green-500" />;
      default: return <FaUserTie className="text-purple-500" />;
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 py-8 mt-14">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Dashboard
            </button>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">My Startups</span>
            </div>
          </li>
        </ol>
      </nav>
      
      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Founder Dashboard</h1>
              <p className="text-blue-100 max-w-2xl">
                Manage your startup portfolio, track performance, and connect with potential collaborators.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/founder-dm')}
                className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center font-medium shadow-sm"
              >
                <FaEnvelope className="mr-2" /> Messages
              </button>
              {/* <button
                onClick={handleCreateStartup}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center font-medium shadow-sm"
              >
                <FaPlus className="mr-2" /> Add Startup
              </button> */}
            </div>
          </div>
        </div>

        {/* Statistics Bar */}
        {!loading && !error && startups.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 border-b">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-gray-600 font-medium text-sm mb-1">Total Startups</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-800">{totalStartups}</p>
                <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                  <FaBuilding size={18} />
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-gray-600 font-medium text-sm mb-1">Active Startups</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-800">{activeStartups}</p>
                <div className="p-2 rounded-full bg-green-50 text-green-600">
                  <FaChartLine size={18} />
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-gray-600 font-medium text-sm mb-1">Total Likes</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-800">{totalLikes}</p>
                <div className="p-2 rounded-full bg-red-50 text-red-600">
                  <FaHeart size={18} />
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-gray-600 font-medium text-sm mb-1">Avg. Likes</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-800">{avgLikes}</p>
                <div className="p-2 rounded-full bg-purple-50 text-purple-600">
                  <FaThumbsDown size={18} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6 sm:p-8">
          {/* Search and Filter Controls */}
          {!loading && !error && startups.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Stages</option>
                    <option value="idea">Idea</option>
                    <option value="mvp">MVP</option>
                    <option value="growing">Growing</option>
                    <option value="established">Established</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FaFilter className="text-gray-400" />
                  </div>
                </div>
                
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="likes">Most Liked</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FaSort className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              <StartupCardSkeleton />
              <StartupCardSkeleton />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-red-500 mb-4 text-lg font-medium">{error}</div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center mx-auto"
              >
                 Try Again
              </button>
            </div>
          ) : filteredStartups.length === 0 ? (
            searchTerm || filter !== 'all' ? (
              <EmptyState
                icon={<FaSearch size={48} className="text-gray-400" />}
                title="No matching startups found"
                description="Try adjusting your search or filter criteria"
                action={
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilter('all');
                    }}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
                  >
                    Reset Filters
                  </button>
                }
              />
            ) : (
              <EmptyState
                icon={<FaPlus size={48} className="text-blue-400" />}
                title="No startups yet"
                description="You haven't added any startups to your portfolio. Start building something amazing!"
                action={
                  <button
                    onClick={handleCreateStartup}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center mx-auto"
                  >
                    <FaPlus className="mr-2" /> Create Your First Startup
                  </button>
                }
              />
            )
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredStartups.length} of {startups.length} startups
              </div>
              
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {filteredStartups.map((startup) => (
                  <div
                    key={startup._id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Status indicator */}
                    <div className={`h-1.5 ${
                      startup.stage === 'Idea' ? 'bg-yellow-400' : 
                      startup.stage === 'MVP' ? 'bg-blue-400' : 
                      startup.stage === 'Growing' ? 'bg-green-400' : 'bg-purple-400'
                    }`}></div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            {getStageIcon(startup.stage)}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{startup.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 flex items-center">
                              <FaRegClock className="mr-1.5" /> 
                              Created {new Date(startup.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleShare(startup)}
                            className="text-gray-500 hover:text-gray-700 transition p-1.5 rounded-full hover:bg-gray-100"
                            title="Share Startup"
                          >
                            <FaShareAlt size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(startup._id)}
                            className="text-blue-600 hover:text-blue-800 transition p-1.5 rounded-full hover:bg-blue-50"
                            title="Edit Startup"
                          >
                            <FaEdit size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{startup.description}</p>

                      <div className="flex flex-wrap gap-2 text-xs mb-5">
                        <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-medium">
                          {startup.domain}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full font-medium ${
                          startup.stage === 'Idea' ? 'bg-yellow-100 text-yellow-800' : 
                          startup.stage === 'MVP' ? 'bg-blue-100 text-blue-800' : 
                          startup.stage === 'Growing' ? 'bg-green-100 text-green-800' : 
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {startup.stage}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full font-medium flex items-center">
                          <FaMapMarkerAlt className="mr-1" /> {startup.location}
                        </span>
                      </div>

                      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaHeart className="text-red-500 mr-1.5" /> 
                            <span className="font-medium">{startup.likes}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FaThumbsDown className="text-gray-500 mr-1.5" /> 
                            <span className="font-medium">{startup.dislikes}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => navigate(`/startup/${startup._id}`)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white flex items-center ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } animate-fade-in-up`}>
          <div className="mr-3">
            {toast.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
          </div>
          <div>{toast.message}</div>
        </div>
      )}
    </div>
  );
};

export default FounderProfile;
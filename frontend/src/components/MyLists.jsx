import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { removeSavedJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { Bookmark, MapPin, Building2, Clock, DollarSign, Eye, Trash2, ExternalLink } from 'lucide-react';

const MyLists = () => {
  const savedJobs = useSelector(store => store.job.savedJobs) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    // This ensures the component re-renders when savedJobs changes
  }, [savedJobs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <Bookmark className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              My Lists
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your saved job opportunities ({savedJobs.length} jobs)
          </p>
        </div>

        {/* Content */}
        {savedJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Bookmark className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No saved jobs yet</h3>
              <p className="text-gray-500 mb-6">
                Click 'Save For Later' on any job to add it to your list
              </p>
              <Button 
                onClick={() => window.history.back()} 
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Browse Jobs
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {savedJobs.map(job => (
              <div key={job._id} className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 overflow-hidden">
                {/* Job Header */}
                <div className="p-6 border-b border-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h2 className="font-bold text-xl text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                        {job.title}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{job.company?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Bookmark className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  
                  {/* Job Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      <Clock className="w-3 h-3" />
                      {job.jobType}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      <DollarSign className="w-3 h-3" />
                      {job.salary} LPA
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => window.location.href = `/description/${job._id}`}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        dispatch(removeSavedJob(job._id));
                        toast.success('Removed from My Lists');
                      }}
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLists; 
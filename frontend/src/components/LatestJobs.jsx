import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Sparkles } from 'lucide-react';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <div className='text-center mb-12'>
                <div className='flex items-center justify-center gap-2 mb-4'>
                    <Sparkles className='w-5 h-5 text-emerald-500' />
                    <span className='px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm'>
                        Fresh Opportunities
                    </span>
                    <Sparkles className='w-5 h-5 text-emerald-500' />
                </div>
                <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                    Latest <span className='bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>Opportunities</span>
                </h1>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                    Discover the newest job openings from top companies. 
                    Find your next career move with HireNest.
                </p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full text-center py-12'>
                            <div className='text-gray-500 text-lg'>No opportunities available at the moment</div>
                            <p className='text-gray-400 mt-2'>Check back soon for new job postings!</p>
                        </div>
                    ) : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs
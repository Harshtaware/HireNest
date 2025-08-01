import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, TrendingUp, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50'>
            <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
            <div className='relative text-center py-20 px-4'>
                <div className='flex flex-col gap-8 max-w-4xl mx-auto'>
                    <div className='flex items-center justify-center gap-2 mb-4'>
                        <Sparkles className='w-5 h-5 text-emerald-500' />
                        <span className='px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm'>
                            #1 Platform for Career Growth
                        </span>
                        <Sparkles className='w-5 h-5 text-emerald-500' />
                    </div>
                    
                    <h1 className='text-6xl md:text-7xl font-bold leading-tight'>
                        Build Your Career <br />
                        <span className='bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                            Nest at HireNest
                        </span>
                    </h1>
                    
                    <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Discover opportunities that match your skills and aspirations. 
                        Join thousands of professionals who found their dream careers with us.
                    </p>
                    
                    <div className='flex flex-col sm:flex-row w-full max-w-2xl mx-auto gap-4'>
                        <div className='flex flex-1 shadow-xl border border-gray-200 bg-white rounded-2xl items-center gap-4 px-6 py-4'>
                            <Search className='h-5 w-5 text-gray-400' />
                            <input
                                type="text"
                                placeholder='Search for your dream job...'
                                onChange={(e) => setQuery(e.target.value)}
                                className='outline-none border-none w-full text-lg placeholder-gray-400'
                            />
                        </div>
                        <Button 
                            onClick={searchJobHandler} 
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-semibold"
                        >
                            Find Jobs
                        </Button>
                    </div>
                    
                    <div className='flex justify-center items-center gap-8 mt-8 text-sm text-gray-500'>
                        <div className='flex items-center gap-2'>
                            <TrendingUp className='w-4 h-4 text-emerald-500' />
                            <span>10,000+ Jobs Posted</span>
                        </div>
                        <div className='w-px h-4 bg-gray-300'></div>
                        <div className='flex items-center gap-2'>
                            <Users className='w-4 h-4 text-emerald-500' />
                            <span>50,000+ Hired</span>
                        </div>
                        <div className='w-px h-4 bg-gray-300'></div>
                        <div className='flex items-center gap-2'>
                            <Sparkles className='w-4 h-4 text-emerald-500' />
                            <span>95% Success Rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
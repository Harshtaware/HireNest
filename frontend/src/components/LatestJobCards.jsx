import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, Clock } from 'lucide-react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    return (
        <div 
            onClick={() => {
                if (!user) {
                    toast.error('User Not Found');
                    return;
                }
                navigate(`/description/${job._id}`)
            }} 
            className='p-6 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-200 hover:border-emerald-200 hover:scale-[1.02] group'
        >
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    {/* Show company logo if available, else default */}
                    {job?.company?.logo ? (
                        <img src={job.company.logo} alt={job.company.name} className='w-12 h-12 rounded-lg object-cover border border-gray-200 bg-white' />
                    ) : (
                        <div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center'>
                            <Building2 className='w-6 h-6 text-white' />
                        </div>
                    )}
                    <div>
                        <h3 className='font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors'>
                            {job?.company?.name}
                        </h3>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <MapPin className='w-3 h-3' />
                            <span>India</span>
                        </div>
                    </div>
                </div>
                <div className='text-right'>
                    <Badge className='bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0'>
                        {job?.position} Positions
                    </Badge>
                </div>
            </div>
            
            <div className='mb-4'>
                <h2 className='font-bold text-xl text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors'>
                    {job?.title}
                </h2>
                <p className='text-gray-600 text-sm line-clamp-2'>
                    {job?.description}
                </p>
            </div>
            
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Badge variant="outline" className='border-emerald-200 text-emerald-700 hover:bg-emerald-50'>
                        <Clock className='w-3 h-3 mr-1' />
                        {job?.jobType}
                    </Badge>
                    <Badge variant="outline" className='border-blue-200 text-blue-700 hover:bg-blue-50'>
                        {job?.salary} LPA
                    </Badge>
                </div>
                <div className='text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards
import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const salaryRanges = [
    { label: "0 - 3 LPA", min: 0, max: 3 },
    { label: "4 - 11 LPA", min: 4, max: 11 },
    { label: "12 - 27 LPA", min: 12, max: 27 },
    { label: "28 - 50 LPA", min: 28, max: 50 },
];

const Jobs = () => {
    useGetAllJobs();
    const dispatch = useDispatch();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        dispatch(setSearchedQuery(""));
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    useEffect(() => {
        let filteredJobs = allJobs;
        // Salary filter
        const selectedSalary = salaryRanges.find(r => r.label === searchedQuery);
        if (selectedSalary) {
            filteredJobs = filteredJobs.filter(job => {
                // Parse salary as number (handle string/number)
                const salary = Number(job.salary);
                return salary >= selectedSalary.min && salary <= selectedSalary.max;
            });
        } else if (searchedQuery) {
            // Text search fallback
            filteredJobs = filteredJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
        }
        setFilterJobs(filteredJobs)
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}
                                                className="h-full"
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
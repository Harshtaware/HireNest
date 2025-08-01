import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: [
            "Delhi NCR",
            "Bangalore",
            "Hyderabad",
            "Pune",
            "Mumbai",
            "Chennai",
            "Kolkata",
            "Ahmedabad"
        ]
    },
    {
        fitlerType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
            "Cloud Engineer",
            "Data Science",
            "Technical Analyst",
            "Test Engineer",
            "UI/UX Designer",
            "Mobile Developer"
        ]
    },
    {
        fitlerType: "Salary",
        array: [
            "0 - 3 LPA",
            "4 - 11 LPA",
            "12 - 27 LPA",
            "28 - 50 LPA"
        ]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
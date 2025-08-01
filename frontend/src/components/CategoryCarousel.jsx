import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Briefcase, Code, Palette, Database, Globe, Smartphone } from 'lucide-react';

const category = [
    { name: "Frontend Developer", icon: Code, color: "from-blue-500 to-cyan-500" },
    { name: "Backend Developer", icon: Database, color: "from-green-500 to-emerald-500" },
    { name: "Data Science", icon: Briefcase, color: "from-purple-500 to-pink-500" },
    { name: "UI/UX Designer", icon: Palette, color: "from-orange-500 to-red-500" },
    { name: "Full Stack Developer", icon: Globe, color: "from-indigo-500 to-purple-500" },
    { name: "Mobile Developer", icon: Smartphone, color: "from-teal-500 to-cyan-500" }
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='py-16 bg-gradient-to-br from-gray-50 to-white'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                        Explore by <span className='bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>Category</span>
                    </h2>
                    <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                        Find opportunities in your field of expertise. 
                        Browse jobs by category and discover your perfect match.
                    </p>
                </div>
                
                <Carousel className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {
                            category.map((cat, index) => {
                                const IconComponent = cat.icon;
                                return (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <Button 
                                            onClick={() => searchJobHandler(cat.name)} 
                                            variant="outline" 
                                            className="rounded-xl h-20 w-full flex flex-col gap-2 hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                                        >
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${cat.color} flex items-center justify-center`}>
                                                <IconComponent className='w-4 h-4 text-white' />
                                            </div>
                                            <span className='text-sm font-medium'>{cat.name}</span>
                                        </Button>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious className='bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50' />
                    <CarouselNext className='bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50' />
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel
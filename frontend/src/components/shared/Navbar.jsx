import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Bookmark, Home, Briefcase, Search, LogOut, User2, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import logo from '@/assets/LOGO.png';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="HireNest Logo" className='w-8 h-8 rounded-lg object-cover bg-white border border-gray-200' />
                    <h1 className='text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                        Hire<span className='text-gray-800'>Nest</span>
                    </h1>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className='flex items-center gap-2 hover:text-emerald-600 transition-colors'>
                                            <Building2 className='w-4 h-4' />
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className='flex items-center gap-2 hover:text-emerald-600 transition-colors'>
                                            <Briefcase className='w-4 h-4' />
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='flex items-center gap-2 hover:text-emerald-600 transition-colors'>
                                            <Home className='w-4 h-4' />
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className='flex items-center gap-2 hover:text-emerald-600 transition-colors'>
                                            <Briefcase className='w-4 h-4' />
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className='flex items-center gap-2 hover:text-emerald-600 transition-colors'>
                                            <Search className='w-4 h-4' />
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="outline" className='border-gray-300 hover:border-emerald-500 hover:text-emerald-600'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-gray-100 hover:ring-emerald-200 transition-all">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 border-gray-100 shadow-xl">
                                    <div className='p-2'>
                                        <div className='flex gap-3 p-3 bg-gray-50 rounded-lg'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-gray-900'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio || 'Welcome to HireNest!'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-3 gap-1'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors'>
                                                        <User2 className='w-4 h-4 text-gray-600' />
                                                        <Button variant="link" className='p-0 h-auto text-gray-700 hover:text-emerald-600'>
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors'>
                                                <LogOut className='w-4 h-4 text-gray-600' />
                                                <Button onClick={logoutHandler} variant="link" className='p-0 h-auto text-gray-700 hover:text-red-600'>
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
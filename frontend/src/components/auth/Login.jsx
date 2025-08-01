import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Building2, Mail, Lock, User, Briefcase } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [errors, setErrors] = useState({});
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    }

    const validateForm = () => {
        const newErrors = {};
        
        if (!input.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!input.password) {
            newErrors.password = "Password is required";
        }
        
        if (!input.role) {
            newErrors.role = "Please select your role";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Login error:", error);
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }
    
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    
    return (
        <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50'>
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4'>
                <div className='w-full max-w-md'>
                    <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
                        <div className='text-center mb-8'>
                            <div className='flex items-center justify-center gap-2 mb-4'>
                                <div className='w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center'>
                                    <Building2 className='w-6 h-6 text-white' />
                                </div>
                                <h1 className='text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                                    HireNest
                                </h1>
                            </div>
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Welcome Back</h2>
                            <p className='text-gray-600'>Sign in to your account to continue</p>
                        </div>
                        
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div>
                                <Label className='text-gray-700 font-medium'>Email Address *</Label>
                                <div className='relative mt-2'>
                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className={`pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 ${
                                            errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                                        }`}
                                    />
                                </div>
                                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                            </div>

                            <div>
                                <Label className='text-gray-700 font-medium'>Password *</Label>
                                <div className='relative mt-2'>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className={`pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 ${
                                            errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                                        }`}
                                    />
                                </div>
                                {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
                            </div>
                            
                            <div>
                                <Label className='text-gray-700 font-medium mb-3 block'>I am a *</Label>
                                <div className='grid grid-cols-2 gap-3'>
                                    <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                        input.role === 'student' 
                                            ? 'border-emerald-500 bg-emerald-50' 
                                            : errors.role 
                                                ? 'border-red-500 bg-red-50' 
                                                : 'border-gray-200 hover:border-emerald-300'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className='sr-only'
                                        />
                                        <User className='w-5 h-5 mr-2 text-emerald-600' />
                                        <span className='font-medium'>Job Seeker</span>
                                    </label>
                                    <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                        input.role === 'recruiter' 
                                            ? 'border-emerald-500 bg-emerald-50' 
                                            : errors.role 
                                                ? 'border-red-500 bg-red-50' 
                                                : 'border-gray-200 hover:border-emerald-300'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className='sr-only'
                                        />
                                        <Briefcase className='w-5 h-5 mr-2 text-emerald-600' />
                                        <span className='font-medium'>Recruiter</span>
                                    </label>
                                </div>
                                {errors.role && <p className='text-red-500 text-sm mt-1'>{errors.role}</p>}
                            </div>
                            
                            {
                                loading ? (
                                    <Button disabled className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                        Signing in...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl font-semibold">
                                        Sign In
                                    </Button>
                                )
                            }
                            
                            <div className='text-center'>
                                <span className='text-gray-600'>Don't have an account? </span>
                                <Link to="/signup" className='text-emerald-600 hover:text-emerald-700 font-medium'>
                                    Create Account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
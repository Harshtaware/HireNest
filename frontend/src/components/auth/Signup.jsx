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
import { setLoading } from '@/redux/authSlice'
import { Loader2, Building2, User, Mail, Phone, Lock, Upload, Briefcase } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [errors, setErrors] = useState({});
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    }
    
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
        if (errors.file) {
            setErrors({ ...errors, file: "" });
        }
    }

    const validateForm = () => {
        const newErrors = {};
        
        if (!input.fullname.trim()) {
            newErrors.fullname = "Full name is required";
        }
        
        if (!input.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!input.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        }
        
        if (!input.password) {
            newErrors.password = "Password is required";
        } else if (input.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if (!input.role) {
            newErrors.role = "Please select your role";
        }
        
        if (!input.file) {
            newErrors.file = "Profile photo is required";
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

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        // Defensive: Only append if it's a File object
        if (input.file && input.file instanceof File) {
            formData.append("file", input.file);
        } else {
            toast.error("Profile photo is missing or invalid.");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Signup error:", error);
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        } finally{
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
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8'>
                <div className='w-full max-w-lg'>
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
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Join HireNest</h2>
                            <p className='text-gray-600'>Create your account and start your journey</p>
                        </div>
                        
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div>
                                <Label className='text-gray-700 font-medium'>Full Name *</Label>
                                <div className='relative mt-2'>
                                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your full name"
                                        className={`pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 ${
                                            errors.fullname ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                                        }`}
                                    />
                                </div>
                                {errors.fullname && <p className='text-red-500 text-sm mt-1'>{errors.fullname}</p>}
                            </div>
                            
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
                                <Label className='text-gray-700 font-medium'>Phone Number *</Label>
                                <div className='relative mt-2'>
                                    <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                                    <Input
                                        type="text"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your phone number"
                                        className={`pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 ${
                                            errors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                                        }`}
                                    />
                                </div>
                                {errors.phoneNumber && <p className='text-red-500 text-sm mt-1'>{errors.phoneNumber}</p>}
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
                                        placeholder="Create a strong password"
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
                            
                            <div>
                                <Label className='text-gray-700 font-medium'>Profile Photo *</Label>
                                <div className='relative mt-2'>
                                    <Upload className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className={`pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 cursor-pointer ${
                                            errors.file ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                                        }`}
                                    />
                                </div>
                                <p className='text-sm text-gray-500 mt-1'>Upload a profile photo (required)</p>
                                {errors.file && <p className='text-red-500 text-sm mt-1'>{errors.file}</p>}
                            </div>
                            
                            {
                                loading ? (
                                    <Button disabled className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                        Creating Account...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl font-semibold">
                                        Create Account
                                    </Button>
                                )
                            }
                            
                            <div className='text-center'>
                                <span className='text-gray-600'>Already have an account? </span>
                                <Link to="/login" className='text-emerald-600 hover:text-emerald-700 font-medium'>
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
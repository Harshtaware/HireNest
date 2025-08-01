import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const EditJobDialog = ({ job, onClose }) => {
  const [input, setInput] = useState({
    title: job.title || '',
    description: job.description || '',
    requirements: job.requirements ? job.requirements.join(',') : '',
    salary: job.salary || '',
    location: job.location || '',
    jobType: job.jobType || '',
    experience: job.experienceLevel || '',
    position: job.position || '',
    companyId: job.company?._id || ''
  });
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${job._id}`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        onClose();
        // Optionally, refresh the job list here
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      setLoading(true);
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${job._id}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!job}>
      <DialogContent onInteractOutside={onClose} className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input type="text" name="title" value={input.title} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Salary</Label>
              <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
            </div>
            {companies.length > 0 && (
              <div className="col-span-2">
                <Label>Company</Label>
                <select
                  className="w-full border rounded p-2"
                  value={input.companyId}
                  onChange={e => setInput({ ...input, companyId: e.target.value })}
                >
                  {companies.map(company => (
                    <option key={company._id} value={company._id}>{company.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-row gap-2 justify-end items-center mt-4">
            <Button type="submit" className="" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Update Job
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="button" variant="destructive" onClick={deleteHandler} disabled={loading}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobDialog; 
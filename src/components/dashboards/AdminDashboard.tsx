
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, CheckCircle, Clock, Users, FileText, School } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('10:00');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState<null | {
    id: number;
    name: string;
    parent: string;
    diagnosis: string;
    status: string;
  }>(null);

  // Dummy data for applications
  const jobApplications = [
    { id: 1, name: 'John Doe', position: 'Special Educator', status: 'Under Review', date: '2023-05-14' },
    { id: 2, name: 'Jane Smith', position: 'Occupational Therapist', status: 'Interview Scheduled', date: '2023-05-15' },
    { id: 3, name: 'Michael Brown', position: 'Speech Therapist', status: 'Rejected', date: '2023-05-10' },
    { id: 4, name: 'Sarah Wilson', position: 'Administrative Assistant', status: 'Approved', date: '2023-05-08' },
  ];

  // Dummy data for child registrations
  const childRegistrations = [
    { id: 1, name: 'Alex Johnson', parent: 'Robert Johnson', diagnosis: 'Autism Spectrum Disorder', status: 'Pending' },
    { id: 2, name: 'Emma Davis', parent: 'Mary Davis', diagnosis: 'Down syndrome', status: 'Assessment Scheduled' },
    { id: 3, name: 'Ryan Miller', parent: 'James Miller', diagnosis: 'Learning Disability', status: 'Approved' },
    { id: 4, name: 'Sophie Wilson', parent: 'Linda Wilson', diagnosis: 'ADHD', status: 'Pending' },
  ];

  const filterApplications = () => {
    return jobApplications.filter(app => 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterRegistrations = () => {
    return childRegistrations.filter(child => 
      child.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      child.parent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleScheduleAppointment = () => {
    if (!selectedChild) return;
    
    toast.success(`Appointment scheduled for ${selectedChild.name} on ${format(date!, 'PPP')} at ${time}`);
    
    // In a real app, you would update the child's status in the database
    setSelectedChild(null);
  };

  return (
    <div className="container px-6 py-8 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage applications, child registrations, and appointments</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <h3 className="text-2xl font-bold">{jobApplications.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <School className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Child Registrations</p>
                <h3 className="text-2xl font-bold">{childRegistrations.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Appointments</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="applications">Job Applications</TabsTrigger>
            <TabsTrigger value="children">Child Registrations</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
                <CardDescription>Review and manage job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-muted text-muted-foreground text-sm">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Position</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterApplications().map((application) => (
                        <tr key={application.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">{application.name}</td>
                          <td className="px-4 py-3">{application.position}</td>
                          <td className="px-4 py-3">
                            <Badge variant={
                              application.status === 'Approved' ? 'success' : 
                              application.status === 'Rejected' ? 'destructive' : 
                              application.status === 'Interview Scheduled' ? 'outline' : 'secondary'
                            }>
                              {application.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">{application.date}</td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="children" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Child Registrations</CardTitle>
                <CardDescription>Manage child registrations and schedule appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-muted text-muted-foreground text-sm">
                      <tr>
                        <th className="px-4 py-3">Child Name</th>
                        <th className="px-4 py-3">Parent Name</th>
                        <th className="px-4 py-3">Diagnosis</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterRegistrations().map((child) => (
                        <tr key={child.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">{child.name}</td>
                          <td className="px-4 py-3">{child.parent}</td>
                          <td className="px-4 py-3">{child.diagnosis}</td>
                          <td className="px-4 py-3">
                            <Badge variant={
                              child.status === 'Approved' ? 'success' : 
                              child.status === 'Assessment Scheduled' ? 'outline' : 'secondary'
                            }>
                              {child.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {child.status === 'Pending' && (
                                <Button 
                                  variant="secondary" 
                                  size="sm"
                                  onClick={() => setSelectedChild(child)}
                                >
                                  Schedule
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedChild && (
                  <Card className="mt-6 border-dashed">
                    <CardHeader>
                      <CardTitle className="text-lg">Schedule Appointment for {selectedChild.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-2">
                          <Button variant="outline" onClick={() => setSelectedChild(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleScheduleAppointment}>
                            Schedule Appointment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Manage scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No appointments scheduled</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Scheduled appointments will appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar as CalendarIcon, Clock, FileText, Calendar, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

const ParentDashboard = () => {
  // Sample data for children
  const children = [
    {
      id: 1,
      name: 'Alex Johnson',
      age: 7,
      diagnosis: 'Autism Spectrum Disorder',
      avatar: null,
      progress: 65,
      nextSession: '2023-05-18T10:00:00',
      therapist: 'Dr. Sarah Wilson',
      appointments: [
        { id: 1, date: '2023-05-18T10:00:00', type: 'Occupational Therapy', status: 'confirmed' },
        { id: 2, date: '2023-05-25T10:00:00', type: 'Speech Therapy', status: 'pending' },
      ],
      reports: [
        { id: 1, title: 'Monthly Progress Report - April', date: '2023-05-01', viewed: true },
        { id: 2, title: 'Behavior Assessment', date: '2023-04-15', viewed: false },
      ]
    }
  ];

  // Sample data for notifications
  const notifications = [
    { id: 1, title: 'Appointment confirmed', message: 'Your appointment for Alex on May 18 has been confirmed.', date: '2023-05-10T09:30:00', read: false },
    { id: 2, title: 'New report available', message: 'A new progress report is available for Alex.', date: '2023-05-05T14:20:00', read: true },
    { id: 3, title: 'Payment received', message: 'Your payment for April services has been received.', date: '2023-05-01T11:45:00', read: true },
  ];

  // Sample data for payment history
  const payments = [
    { id: 1, description: 'April Services', amount: 450.00, date: '2023-04-28', status: 'paid' },
    { id: 2, description: 'March Services', amount: 425.00, date: '2023-03-27', status: 'paid' },
    { id: 3, description: 'February Services', amount: 450.00, date: '2023-02-26', status: 'paid' },
  ];

  const [activeChildId, setActiveChildId] = useState(children[0]?.id);

  const activeChild = children.find(child => child.id === activeChildId);

  return (
    <div className="container px-6 py-8 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your child's therapy sessions and progress</p>
      </div>

      {children.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold">{activeChild?.appointments.filter(a => new Date(a.date) > new Date()).length}</h3>
                    <p className="text-sm text-muted-foreground">Sessions scheduled</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Next Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                {activeChild?.nextSession ? (
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium">{format(new Date(activeChild.nextSession), 'MMM d, h:mm a')}</h3>
                      <p className="text-sm text-muted-foreground">with {activeChild.therapist}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Unread Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold">{activeChild?.reports.filter(r => !r.viewed).length}</h3>
                    <p className="text-sm text-muted-foreground">Reports to review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{activeChild?.name}</CardTitle>
                      <CardDescription>
                        Age: {activeChild?.age} • {activeChild?.diagnosis}
                      </CardDescription>
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{activeChild?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-muted-foreground">{activeChild?.progress}%</span>
                      </div>
                      <Progress value={activeChild?.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        View Progress Reports
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Appointment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="appointments">
                <TabsList className="mb-4">
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="appointments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Appointments</CardTitle>
                      <CardDescription>Scheduled therapy sessions for {activeChild?.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {activeChild?.appointments && activeChild.appointments.length > 0 ? (
                        <div className="space-y-4">
                          {activeChild.appointments.map(appointment => (
                            <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors">
                              <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${appointment.status === 'confirmed' ? 'bg-green-100' : 'bg-amber-100'}`}>
                                  <Clock className={`h-5 w-5 ${appointment.status === 'confirmed' ? 'text-green-600' : 'text-amber-600'}`} />
                                </div>
                                <div>
                                  <h4 className="font-medium">{format(new Date(appointment.date), 'EEEE, MMMM d')}</h4>
                                  <div className="flex items-center mt-1">
                                    <span className="text-sm text-muted-foreground">{format(new Date(appointment.date), 'h:mm a')}</span>
                                    <span className="mx-2 text-muted-foreground">•</span>
                                    <span className="text-sm text-muted-foreground">{appointment.type}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge variant={appointment.status === 'confirmed' ? 'success' : 'outline'}>
                                {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                          <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-50" />
                          <h3 className="mt-4 text-lg font-medium">No appointments scheduled</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            There are no upcoming appointments scheduled.
                          </p>
                          <Button className="mt-4">Schedule Appointment</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reports">
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Reports</CardTitle>
                      <CardDescription>View and download progress reports for {activeChild?.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {activeChild?.reports && activeChild.reports.length > 0 ? (
                        <div className="space-y-4">
                          {activeChild.reports.map(report => (
                            <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors">
                              <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${report.viewed ? 'bg-muted' : 'bg-amber-100'}`}>
                                  <FileText className={`h-5 w-5 ${report.viewed ? 'text-muted-foreground' : 'text-amber-600'}`} />
                                </div>
                                <div>
                                  <h4 className="font-medium">{report.title}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {format(new Date(report.date), 'MMMM d, yyyy')}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                View
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                          <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
                          <h3 className="mt-4 text-lg font-medium">No reports available</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Progress reports will appear here when they're available.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History</CardTitle>
                      <CardDescription>View your payment history and invoices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-muted text-muted-foreground text-sm">
                            <tr>
                              <th className="px-4 py-3">Description</th>
                              <th className="px-4 py-3">Date</th>
                              <th className="px-4 py-3">Amount</th>
                              <th className="px-4 py-3">Status</th>
                              <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map(payment => (
                              <tr key={payment.id} className="border-b hover:bg-muted/50">
                                <td className="px-4 py-3">{payment.description}</td>
                                <td className="px-4 py-3">{payment.date}</td>
                                <td className="px-4 py-3">${payment.amount.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                  <Badge variant="success">
                                    {payment.status === 'paid' ? 'Paid' : 'Pending'}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <Button variant="ghost" size="sm">
                                    <FileText className="h-4 w-4" />
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
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-3 border rounded-md text-sm transition-colors ${!notification.read ? 'border-primary bg-primary/5' : 'hover:bg-muted/40'}`}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(notification.date), 'MMM d')}
                            </span>
                          </div>
                          <p className="mt-1 text-muted-foreground">{notification.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-muted-foreground">No notifications</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start text-left">
                      <div>
                        <div className="font-medium">Parent Handbook</div>
                        <div className="text-xs text-muted-foreground mt-1">Information about our programs and policies</div>
                      </div>
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start text-left">
                      <div>
                        <div className="font-medium">Activities & Exercises</div>
                        <div className="text-xs text-muted-foreground mt-1">Recommended activities for home practice</div>
                      </div>
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start text-left">
                      <div>
                        <div className="font-medium">Community Support</div>
                        <div className="text-xs text-muted-foreground mt-1">Connect with other parents and resources</div>
                      </div>
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-muted/50 inline-flex rounded-full p-4 mb-4">
            <CalendarIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No Children Registered</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You haven't registered any children for our services yet. Register a child to get started.
          </p>
          <Button size="lg">Register a Child</Button>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;

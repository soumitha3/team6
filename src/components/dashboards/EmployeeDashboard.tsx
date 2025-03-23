import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { FileText, Calendar as CalendarIcon, Clock, CheckCircle, Users } from 'lucide-react';
import { format } from 'date-fns';

const EmployeeDashboard = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  const upcomingSessions = [
    { id: 1, childName: 'Alex Johnson', time: '10:00 AM', service: 'Occupational Therapy', status: 'confirmed' },
    { id: 2, childName: 'Emma Davis', time: '11:30 AM', service: 'Speech Therapy', status: 'confirmed' },
    { id: 3, childName: 'Ryan Miller', time: '2:15 PM', service: 'Special Education', status: 'pending' },
  ];
  
  const assignedChildren = [
    { id: 1, name: 'Alex Johnson', age: 7, diagnosis: 'Autism Spectrum Disorder', progress: 65 },
    { id: 2, name: 'Emma Davis', age: 9, diagnosis: 'Down syndrome', progress: 48 },
    { id: 3, name: 'Ryan Miller', age: 6, diagnosis: 'Learning Disability', progress: 72 },
    { id: 4, name: 'Sophie Wilson', age: 8, diagnosis: 'ADHD', progress: 55 },
  ];
  
  const tasks = [
    { id: 1, title: 'Complete assessment report for Alex', deadline: '2023-05-20', completed: false },
    { id: 2, title: 'Prepare materials for group session', deadline: '2023-05-18', completed: true },
    { id: 3, title: 'Update IEP for Emma', deadline: '2023-05-25', completed: false },
    { id: 4, title: 'Parent meeting with Millers', deadline: '2023-05-19', completed: false },
  ];

  return (
    <div className="container px-6 py-8 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Employee Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your sessions, assigned children, and tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Today's Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{upcomingSessions.length}</h3>
                <p className="text-sm text-muted-foreground">Sessions scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Assigned Children</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{assignedChildren.length}</h3>
                <p className="text-sm text-muted-foreground">Children assigned to you</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-full">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{tasks.filter(task => !task.completed).length}</h3>
                <p className="text-sm text-muted-foreground">Tasks pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="sessions">
            <TabsList className="mb-4">
              <TabsTrigger value="sessions">Today's Sessions</TabsTrigger>
              <TabsTrigger value="children">Assigned Children</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Sessions for {format(new Date(), 'EEEE, MMMM d')}</CardTitle>
                  <CardDescription>Manage your scheduled sessions for today</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map(session => (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{session.childName}</h4>
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-muted-foreground">{session.time}</span>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{session.service}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={session.status === 'confirmed' ? 'success' : 'outline'}>
                            {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">No sessions scheduled</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        You don't have any sessions scheduled for today.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="children">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Children</CardTitle>
                  <CardDescription>Children assigned to you for therapy and education</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignedChildren.map(child => (
                      <div key={child.id} className="p-4 border rounded-lg hover:bg-muted/40 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{child.name}</h4>
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-muted-foreground">Age: {child.age}</span>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{child.diagnosis}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View Profile</Button>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{child.progress}%</span>
                          </div>
                          <Progress value={child.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>Manage your pending and completed tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map(task => (
                      <div key={task.id} className="flex items-center p-4 border rounded-lg hover:bg-muted/40 transition-colors">
                        <div className={`p-1 rounded-full ${task.completed ? 'bg-green-100' : 'bg-amber-100'}`}>
                          {task.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-amber-600" />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Due: {format(new Date(task.deadline), 'MMM d, yyyy')}
                          </p>
                        </div>
                        {!task.completed && (
                          <Button variant="outline" size="sm">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Your schedule for the month</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
              />
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">
                  {format(date, 'MMMM d, yyyy')}
                </h3>
                {date.toDateString() === new Date().toDateString() ? (
                  <div className="space-y-2">
                    {upcomingSessions.map(session => (
                      <div key={session.id} className="p-3 border rounded-md text-sm">
                        <div className="font-medium">{session.time}</div>
                        <div className="text-muted-foreground">{session.childName} - {session.service}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No sessions scheduled for this date.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

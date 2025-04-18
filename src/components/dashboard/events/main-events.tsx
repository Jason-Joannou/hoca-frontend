import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import EventCalendar from "@/components/calendar/event-calendar";

const MainEventsPage = () => {
  // Updated events data with separate start and end times
  const events = [
    {
      id: 1,
      title: "Data Science Workshop",
      description:
        "Learn about the latest trends in data science and analytics",
      date: new Date("2025-04-11"),
      startTime: "14:00",
      endTime: "16:00",
      location: "Conference Room A",
      totalSpots: 30,
      attendees: 24,
      spotsLeft: 6,
    },
    {
      id: 2,
      title: "AI Ethics Panel",
      description:
        "Discussion on ethical considerations in artificial intelligence",
      date: new Date("2025-04-15"),
      startTime: "10:00",
      endTime: "12:00",
      location: "Auditorium B",
      totalSpots: 50,
      attendees: 35,
      spotsLeft: 15,
    },
    {
      id: 3,
      title: "Networking Mixer",
      description: "Connect with professionals in the tech industry",
      date: new Date("2025-04-22"),
      startTime: "18:00",
      endTime: "20:00",
      location: "Rooftop Lounge",
      totalSpots: 40,
      attendees: 38,
      spotsLeft: 2,
    },
    // Adding more events for demonstration
    {
      id: 4,
      title: "Python Programming Workshop",
      description: "Hands-on Python programming for beginners",
      date: new Date("2025-05-05"),
      startTime: "09:00",
      endTime: "12:00",
      location: "Computer Lab C",
      totalSpots: 25,
      attendees: 20,
      spotsLeft: 5,
    },
    {
      id: 5,
      title: "Data Visualization Techniques",
      description: "Learn effective data visualization methods",
      date: new Date("2025-05-19"),
      startTime: "14:00",
      endTime: "17:00",
      location: "Conference Room B",
      totalSpots: 35,
      attendees: 28,
      spotsLeft: 7,
    },
    {
      id: 6,
      title: "Big Data Analytics",
      description: "Processing and analyzing large datasets",
      date: new Date("2025-05-26"),
      startTime: "10:00",
      endTime: "13:00",
      location: "Auditorium A",
      totalSpots: 45,
      attendees: 40,
      spotsLeft: 5,
    },
    // Adding even more events to ensure scrolling
    {
      id: 7,
      title: "Cloud Computing Essentials",
      description: "Introduction to cloud platforms and services",
      date: new Date("2025-06-02"),
      startTime: "13:00",
      endTime: "16:00",
      location: "Virtual Meeting Room",
      totalSpots: 100,
      attendees: 85,
      spotsLeft: 15,
    },
    {
      id: 8,
      title: "Blockchain Technology",
      description: "Understanding blockchain and its applications",
      date: new Date("2025-06-09"),
      startTime: "11:00",
      endTime: "14:00",
      location: "Conference Room C",
      totalSpots: 40,
      attendees: 36,
      spotsLeft: 4,
    },
  ];

  // Get the next upcoming event (first in the array since they're ordered by date)
  const nextEvent = events[0];

  // Check if there's space available
  const hasSpace = nextEvent.spotsLeft > 0;

  // Get top events by attendance percentage
  const topEventsByAttendance = [...events]
    .map((event) => ({
      ...event,
      attendancePercentage: (event.attendees / event.totalSpots) * 100,
    }))
    .sort((a, b) => b.attendancePercentage - a.attendancePercentage)
    .slice(0, 5); // Reduced to 5 events to fit smaller card

  return (
    <div className="grid grid-cols-2 gap-6 px-4 lg:px-6">
      {/* Next Upcoming Event Card */}
      <Card>
        <CardHeader className="relative pb-2">
          <CardDescription>Next Upcoming Event</CardDescription>
          <CardTitle className="text-2xl font-bold">
            {nextEvent.title}
            <p className="text-sm text-muted-foreground">
              {nextEvent.description}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {format(nextEvent.date, "MMMM d, yyyy")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {nextEvent.startTime} - {nextEvent.endTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {nextEvent.attendees}/{nextEvent.totalSpots}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{nextEvent.location}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            className="w-full"
            disabled={!hasSpace}
            variant={hasSpace ? "default" : "outline"}
          >
            {hasSpace ? "Join Event" : "Event Full"}
          </Button>
        </CardFooter>
      </Card>
      {/* Popular Events Card - Simple List */}
      <Card className="flex flex-col">
        <CardHeader className="pb-2">
          <CardDescription>Most Popular</CardDescription>
          <CardTitle>Top Events by Attendance</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div
            style={{
              height: "170px", // Reduced height to fit smaller card
              overflowY: "auto",
              paddingRight: "8px",
            }}
          >
            {topEventsByAttendance.map((event, index) => (
              <div key={event.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span className="font-medium">{event.title}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round(event.attendancePercentage)}%
                  </span>
                </div>
                <div className="ml-6 mt-1 text-xs text-muted-foreground">
                  {format(event.date, "MMMM d, yyyy")}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button variant="outline" className="w-full">
            View All Events
          </Button>
        </CardFooter>
      </Card>
      {/* Calendar Section */}
      <div className="px-4 lg:px-6">
        <EventCalendar events={events} />
      </div>
    </div>
  );
};

export default MainEventsPage;

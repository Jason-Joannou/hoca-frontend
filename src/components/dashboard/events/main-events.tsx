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
  ];

  // Get the next upcoming event (first in the array since they're ordered by date)
  const nextEvent = events[0];

  // Calculate events happening this month
  const currentMonth = 3; // April (0-indexed)
  const currentYear = 2025;
  const eventsThisMonth = events.filter(
    (event) =>
      event.date.getMonth() === currentMonth &&
      event.date.getFullYear() === currentYear,
  ).length;

  // Check if there's space available
  const hasSpace = nextEvent.spotsLeft > 0;

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

      {/* Events This Month Card */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-start justify-between">
          <div>
            <CardDescription>Events This Month</CardDescription>
            <CardTitle className="text-4xl font-bold">
              {eventsThisMonth}
            </CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <CalendarIcon className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {eventsThisMonth} events scheduled for April 2025.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainEventsPage;

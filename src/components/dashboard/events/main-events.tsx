import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, UsersIcon } from "lucide-react"; // Assuming you're using lucide icons
import { format } from "date-fns"; // For date formatting

const MainEventsPage = () => {
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Data Science Workshop",
      description:
        "Learn about the latest trends in data science and analytics",
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      time: "14:00 - 16:00",
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
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      time: "10:00 - 12:00",
      location: "Auditorium B",
      totalSpots: 50,
      attendees: 35,
      spotsLeft: 15,
    },
    {
      id: 3,
      title: "Networking Mixer",
      description: "Connect with professionals in the tech industry",
      date: new Date(Date.now() + 86400000 * 14), // 14 days from now
      time: "18:00 - 20:00",
      location: "Rooftop Lounge",
      totalSpots: 40,
      attendees: 38,
      spotsLeft: 2,
    },
  ];

  // Get the next upcoming event (first in the array since they're ordered by date)
  const nextEvent = events[0];

  // Calculate events happening this month
  const currentMonth = new Date().getMonth();
  const eventsThisMonth = events.filter(
    (event) => event.date.getMonth() === currentMonth,
  ).length;

  return (
    <div className="grid grid-cols-2 gap-4 px-4 lg:px-6 @5xl/main:grid-cols-4 *:data-[slot=card]:shadow-xs *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
      {/* Next Upcoming Event Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Next Upcoming Event</CardDescription>
          <CardTitle className="text-xl font-semibold">
            {nextEvent.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {format(nextEvent.date, "MMMM d, yyyy")} • {nextEvent.time}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {nextEvent.description}
          </p>
          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {nextEvent.attendees}/{nextEvent.totalSpots} attendees •{" "}
              {nextEvent.spotsLeft} spots left
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Location: {nextEvent.location}
          </div>
        </CardFooter>
      </Card>

      {/* Events This Month Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Events This Month</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {eventsThisMonth}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {eventsThisMonth === 0
              ? "No events scheduled this month."
              : `${eventsThisMonth} event${eventsThisMonth > 1 ? "s" : ""} scheduled for ${format(new Date(), "MMMM yyyy")}.`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainEventsPage;

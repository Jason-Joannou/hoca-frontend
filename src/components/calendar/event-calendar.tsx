import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Required CSS in _app.js or layout.js: import "react-big-calendar/lib/css/react-big-calendar.css";

// Custom CSS to override default styles (add to your global CSS or as a styled component)
// .rbc-calendar { background-color: white; border-radius: 8px; }
// .rbc-header { padding: 12px 0; font-weight: 600; text-transform: none; }
// .rbc-time-view { border: 1px solid #e2e8f0; border-radius: 8px; }
// .rbc-time-header { border-bottom: 1px solid #e2e8f0; }
// .rbc-day-slot .rbc-time-slot { border-top: 1px dotted #e2e8f0; }
// .rbc-day-slot .rbc-event { background-color: #818cf8; border-radius: 4px; }
// .rbc-event-content { font-size: 12px; }
// .rbc-toolbar { margin-bottom: 20px; }
// .rbc-toolbar button { padding: 6px 12px; border-radius: 6px; }
// .rbc-toolbar button.rbc-active { background-color: #4f46e5; color: white; }

const EventCalendar = ({ events: initialEvents = [] }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    location: "",
    totalSpots: 30,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [calendarView, setCalendarView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Setup the localizer
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    // Transform the events data to the format expected by react-big-calendar
    const formattedEvents = initialEvents.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      start: getEventDateTime(event.date, event.startTime),
      end: getEventDateTime(event.date, event.endTime),
      location: event.location,
      totalSpots: event.totalSpots,
      attendees: event.attendees,
      spotsLeft: event.spotsLeft,
    }));

    setEvents(formattedEvents);
  }, [initialEvents]);

  // Helper function to create datetime from date and time string
  const getEventDateTime = (date, timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const datetime = new Date(date);
    datetime.setHours(hours, minutes);
    return datetime;
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({
      title: "",
      description: "",
      start,
      end,
      location: "",
      totalSpots: 30,
    });
    setIsDialogOpen(true);
  };

  const handleSelectEvent = (event) => {
    // When clicking on an existing event, populate the form for editing
    setNewEvent({
      ...event,
      id: event.id,
    });
    setIsDialogOpen(true);
  };

  const handleCreateEvent = () => {
    if (!newEvent.title) return;

    // If we have an id, it's an edit operation
    if (newEvent.id) {
      setEvents(
        events.map((event) =>
          event.id === newEvent.id ? { ...newEvent } : event,
        ),
      );
    } else {
      // Create new event with a new ID
      const newId = Math.max(0, ...events.map((e) => e.id || 0)) + 1;
      setEvents([
        ...events,
        {
          ...newEvent,
          id: newId,
          attendees: 0,
          spotsLeft: newEvent.totalSpots,
        },
      ]);
    }

    setIsDialogOpen(false);
    setNewEvent({
      title: "",
      description: "",
      start: new Date(),
      end: new Date(),
      location: "",
      totalSpots: 30,
    });
  };

  // Custom event component to show events like Teams
  const EventComponent = ({ event }) => {
    const isShort = event.end - event.start < 3600000; // less than 1 hour

    return (
      <div
        className="flex flex-col h-full p-1 overflow-hidden rounded"
        style={{ backgroundColor: "#E8EBFA", borderLeft: "4px solid #6264A7" }}
      >
        <div className="font-semibold text-xs truncate">{event.title}</div>
        {!isShort && (
          <>
            <div className="text-xs truncate">{event.location}</div>
            {event.spotsLeft !== undefined && (
              <div className="text-xs mt-auto">
                {event.spotsLeft} spots left
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Custom toolbar to match Teams UI more closely
  const CustomToolbar = (toolbar) => {
    const goToToday = () => {
      toolbar.onNavigate("TODAY");
      setCurrentDate(new Date());
    };

    const goToPrev = () => {
      toolbar.onNavigate("PREV");
      const newDate = new Date(currentDate);
      if (calendarView === "month") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (calendarView === "week") {
        newDate.setDate(newDate.getDate() - 7);
      } else if (calendarView === "day") {
        newDate.setDate(newDate.getDate() - 1);
      }
      setCurrentDate(newDate);
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
      const newDate = new Date(currentDate);
      if (calendarView === "month") {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (calendarView === "week") {
        newDate.setDate(newDate.getDate() + 7);
      } else if (calendarView === "day") {
        newDate.setDate(newDate.getDate() + 1);
      }
      setCurrentDate(newDate);
    };

    const label = () => {
      const date = toolbar.date;
      if (calendarView === "month") {
        return format(date, "MMMM yyyy");
      }
      if (calendarView === "week") {
        const start = moment(date).startOf("week").format("MMMM D");
        const end = moment(date).endOf("week").format("D, yyyy");
        return `${start}-${end}`;
      }
      return format(date, "MMMM d, yyyy");
    };

    return (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-md font-medium"
            onClick={goToToday}
          >
            Today
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={goToPrev}>
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNext}>
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
          <span className="text-lg font-semibold">{label()}</span>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={calendarView}
            onValueChange={(view) => {
              setCalendarView(view);
              toolbar.onView(view);
            }}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsDialogOpen(true)}>Create Event</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-6 space-y-4">
      <div className="h-96 lg:h-[40rem] bg-white rounded-lg shadow p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100% - 8px)" }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          components={{
            event: EventComponent,
            toolbar: CustomToolbar,
          }}
          view={calendarView}
          onView={setCalendarView}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          step={30}
          timeslots={2}
          defaultView="week"
          views={["month", "week", "day", "agenda"]}
          min={new Date(0, 0, 0, 7, 0)} // 7am
          max={new Date(0, 0, 0, 19, 0)} // 7pm
          dayLayoutAlgorithm="no-overlap"
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {newEvent.id ? "Edit Event" : "Create Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Event title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                placeholder="Event description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start">Start Time</Label>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="start"
                    type="datetime-local"
                    value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        start: new Date(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end">End Time</Label>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="end"
                    type="datetime-local"
                    value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        end: new Date(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  placeholder="Event location"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalSpots">Total Spots</Label>
              <Input
                id="totalSpots"
                type="number"
                value={newEvent.totalSpots}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    totalSpots: parseInt(e.target.value),
                  })
                }
                placeholder="30"
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateEvent}>
              {newEvent.id ? "Save Changes" : "Create Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCalendar;

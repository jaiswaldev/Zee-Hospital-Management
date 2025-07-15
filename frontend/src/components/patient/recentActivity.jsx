import { Clock, FileText, MessageSquare, UserPlus, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const RecentActivity = () => {
  const activities = [
    {
      type: "report",
      title: "Your Lab Results available",
      description: "Blood test results",
      time: "2 hours ago",
      icon: FileText,
      patient: "SJ",
      color: "text-primary",
    },
    {
      type: "message",
      title: "New Message from Dr. Michael Chen",
      description: "Regarding your last appointment",
      time: "4 hours ago",
      icon: MessageSquare,
      patient: "MC",
      color: "text-accent",
    },
    {
      type: "appointment",
      title: "Appointment Confirmed with Dr. Emma Davis",
      description: "Consultation with Emma Davis",
      time: "6 hours ago",
      icon: Calendar,
      patient: "ED",
      color: "text-success",
    },
    // {
    //   type: "patient",
    //   title: "New Patient Added",
    //   description: "Robert Wilson registered",
    //   time: "1 day ago",
    //   icon: UserPlus,
    //   patient: "RW",
    //   color: "text-warning",
    // },
  ];

  return (
    <Card className="bg-gradient-card border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              <Avatar className="w-8 h-8">
                {/* <AvatarImage src="/placeholder.svg" alt="Patient" /> */}
                <AvatarFallback className="text-xs">{activity.patient}</AvatarFallback>
              </Avatar>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

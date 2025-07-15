import { FileText, MessageSquare, Calendar, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
const FeatureCards = () => {
  const stats = [
    {
      title: "Your Reports",
      value: "1 New Report Available",
      change: "View Details",
      icon: FileText,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      link: "/patient/view-reports",
    },
    {
      title: "Messages",
      value: "8 Unread Messages",
      change: "3 from today",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      link: "/patient/chat",
    },
    {
      title: "Book an Appointment",
      value: "Schedule Your Next Visit",
      change: "Click to book",
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-100",
      link: "/patient/book-appointment",
    },
    {
      title: "ZeeCare Pharmacy",
      value: "Order Your Medicines",
      change: "Click to order",
      icon: Pill,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      link: "/store",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {stats.map((stat, index) => (
        <Link to={stat.link} key={index}>
          <Card
            className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm cursor-pointer h-60"
          >

            <CardHeader>
              <div className={`p-3 rounded-xl w-fit ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <CardTitle className="text-muted-foreground ">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default FeatureCards;

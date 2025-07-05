import React from "react";
import {
  Heart,
  Users,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Appointment Booking",
      description:
        "Book appointments with verified doctors in just a few clicks",
    },
    {
      icon: MessageCircle,
      title: "In-App Communication",
      description: "Chat directly with your healthcare providers securely",
    },
    {
      icon: ShieldCheck,
      title: "Verified Healthcare Providers",
      description: "All doctors are verified and certified professionals",
    },
    {
      icon: Heart,
      title: "Digital Health Records",
      description: "Access your medical reports and prescriptions online",
    },
    {
      icon: Users,
      title: "E-Pharmacy Integration",
      description: "Order prescribed medicines directly from the app",
    },
    {
      icon: Clock,
      title: "Real-time Notifications",
      description: "Get instant updates about appointments and prescriptions",
    },
  ];

  return (
    <div className="p-5 bg-gradient-to-br bg-white mb-6">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for modern healthcare management in one
              platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

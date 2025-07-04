import {
  PenTool,
  Search,
  MessageCircle,
  LayoutDashboard,
} from "lucide-react";

export default function RoadmapSection() {
  const features = [
    {
      id: 1,
      title: "Create & Publish Your Voice",
      description:
        "Effortlessly write, edit, and publish your blog posts with our intuitive editor.",
      icon: PenTool,
      iconBg: "bg-pink-200",
      iconColor: "text-pink-600",
      iconPosition: "top-[140px] left-[500px]",
      cardPosition: "top-[60px] right-[440px] text-left",
    },
    {
      id: 2,
      title: "Discover Engaging Content",
      description: "Explore a vast collection of blogs across diverse categories.",
      icon: Search,
      iconBg: "bg-blue-200",
      iconColor: "text-blue-600",
      iconPosition: "top-[280px] right-[100px]",
      cardPosition: "top-[130px] right-[20px] text-right",
    },
    {
      id: 3,
      title: "Connect & Engage with Readers",
      description:
        "Interact with authors and readers through comments and likes.",
      icon: MessageCircle,
      iconBg: "bg-purple-200",
      iconColor: "text-purple-600",
      iconPosition: "top-[380px] left-[90px]",
      cardPosition: "top-[220px] left-[20px] text-left",
    },
    {
      id: 4,
      title: "Manage Your Blogging Journey",
      description:
        "Keep track of your posts, views, and engagement from a personalized dashboard.",
      icon: LayoutDashboard,
      iconBg: "bg-yellow-200",
      iconColor: "text-yellow-600",
      iconPosition: "top-[430px] right-[530px]",
      cardPosition: "top-[390px] right-[610px] text-right",
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#f5f1eb] overflow-hidden mb-12">
      {/* Road Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/road.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Heading */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 mb-12">
        <h2 className="text-5xl md:text-7xl font-dancing font-bold text-black mb-4">
          Your Journey with Postify
        </h2>
        <p className="text-lg text-gray-600">
          Discover the powerful features that make your blogging experience
          seamless and rewarding.
        </p>
      </div>

      {/* Feature Stamps */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[800px]">
        {features.map((feature) => (
          <div key={feature.id}>
            {/* Icon Stamp */}
            <div
              className={`absolute ${feature.iconPosition} flex flex-col items-center z-10`}
            >
              <div
                className={`p-4 rounded-full ${feature.iconBg} shadow-xl border-4 border-white`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <div className="w-1 h-8 bg-gray-300 mt-2 rounded-full" />
            </div>

            {/* Feature Card */}
            <div
              className={`absolute w-[220px] md:w-[260px] bg-white rounded-xl shadow-xl p-4 border border-gray-200 z-10 ${feature.cardPosition}`}
            >
              <h3 className="text-base md:text-lg font-semibold text-black mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

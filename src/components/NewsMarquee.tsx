
import { useState, useEffect } from "react";

const NewsMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  const newsItems = [
    "🕌 Hajj 2026 Registration Now Open - Early Bird Discount Available!",
    "✈️ Direct Lagos-Medinah Flights Confirmed - Limited Seats Available",
    "📋 Complete Your Documentation Early to Avoid Last-Minute Rush",
    "💰 Flexible Payment Plans Available - Pay Small Small",
    "🏨 Premium Accommodation Near Haram Reserved for Early Registrants",
    "📞 24/7 Support Available - Contact Us for Any Assistance",
    "🎯 Join 15,000+ Satisfied Pilgrims - Book Your Spiritual Journey Today!",
  ];

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
            📢 LATEST NEWS
          </span>
        </div>
        <div 
          className={`flex animate-marquee ${isPaused ? 'animation-paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {newsItems.map((news, index) => (
            <div key={index} className="flex-shrink-0 px-8">
              <span className="text-sm font-medium">{news}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {newsItems.map((news, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0 px-8">
              <span className="text-sm font-medium">{news}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        
        .animation-paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default NewsMarquee;

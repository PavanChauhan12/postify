import { Heart, Sparkles, ThumbsUp, MessageCircle } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-visible grid-bg flex items-center justify-center">
      {/* Center Text */}
      <div className="flex flex-col items-center justify-center text-center relative z-30 px-4">
        <h1 className="text-[50px] font-black font-dancing text-black leading-none">
          postify
        </h1>
        <p className="text-sm tracking-[0.4em] uppercase font-medium text-gray-600 mb-4">
          a blogger's favourite choice
        </p>
        <button className="mt-4 px-6 py-2 border border-black text-xs font-semibold uppercase tracking-widest hover:bg-black text-white transition-all">
          get started
        </button>
      </div>

      {/* Top Left Polaroid */}
      <div className="absolute top-[10%] left-[10%] w-40 h-52 bg-white rounded-xl shadow-lg transform -rotate-12 border-4 border-white z-10">
        <div className="w-full h-32 bg-gradient-to-br from-pink-200 to-orange-200 rounded-t-md"></div>
        <div className="p-2 text-center">
          <div className="text-sm text-gray-600 font-medium">create</div>
        </div>
        <div className="absolute -right-4 top-20 bg-white rounded-full p-2 shadow-md">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
          <div className="absolute -bottom-1 left-2 w-2 h-2 bg-white rotate-45" />
        </div>
      </div>

      {/* Top Right Polaroid */}
      <div className="absolute top-[10%] right-[10%] w-40 h-52 bg-white rounded-xl shadow-lg transform rotate-12 border-4 border-white z-10">
        <div className="w-full h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-t-md"></div>
        <div className="p-2 text-center">
          <div className="text-sm text-gray-600 font-medium">share</div>
        </div>
        <div className="absolute -left-4 bottom-10 bg-white rounded-full p-2 shadow-md">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
          <div className="absolute -bottom-1 right-2 w-2 h-2 bg-white rotate-45" />
        </div>
      </div>

      {/* Bottom Left Polaroid */}
      <div className="absolute bottom-[10%] left-[10%] w-40 h-52 bg-white rounded-xl shadow-lg transform rotate-6 border-4 border-white z-10">
        <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-t-md"></div>
        <div className="p-2 text-center">
          <div className="text-sm text-gray-600 font-medium">discover</div>
        </div>
        <div className="absolute -right-4 top-16 bg-white rounded-full p-2 shadow-md">
          <Heart className="w-4 h-4 text-blue-400 fill-blue-400" />
          <div className="absolute -bottom-1 left-2 w-2 h-2 bg-white rotate-45" />
        </div>
      </div>

      {/* Bottom Right Polaroid */}
      <div className="absolute bottom-[10%] right-[10%] w-40 h-52 bg-white rounded-xl shadow-lg transform -rotate-6 border-4 border-white z-10">
        <div className="w-full h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-t-md"></div>
        <div className="p-2 text-center">
          <div className="text-sm text-gray-600 font-medium">educate</div>
        </div>
      </div>

      {/* Sparkles & Dots */}
      <div className="absolute top-[25%] left-[25%] z-20">
        <Sparkles className="text-pink-300 w-8 h-8" />
      </div>
      <div className="absolute top-[25%] right-[25%] z-20">
        <Sparkles className="text-blue-300 w-8 h-8" />
      </div>
      <div className="absolute bottom-[25%] left-[25%] z-20">
        <div className="w-3 h-3 bg-pink-300 rounded-full" />
      </div>
      <div className="absolute bottom-[25%] right-[25%] z-20">
        <div className="w-3 h-3 bg-blue-300 rounded-full" />
      </div>

      {/* Speech Icons */}
      <div className="absolute top-[35%] left-[15%] z-10">
        <MessageCircle className="text-pink-400 w-6 h-6" />
      </div>
      <div className="absolute bottom-[20%] right-[15%] z-10">
        <ThumbsUp className="text-pink-400 w-6 h-6" />
      </div>
    </section>
  )
}

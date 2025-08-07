'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import messages from "@/messages.json"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"

function Home() {
  return (
    <>
      {/* Main content */}
<main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white min-h-[85vh]">


   
        <motion.section
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-lg text-gray-300">
            True Feedback - Where your identity remains a secret.
          </p>
        </motion.section>

        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-pink-400">{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                      <Mail className="flex-shrink-0 text-blue-400" />
                      <div>
                        <p className="text-gray-100">{message.content}</p>
                        <p className="text-xs text-gray-400 mt-1">{message.received}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-950 text-gray-400">
        © 2023 True Feedback. All rights reserved.
      </footer>
    </>
  )
}

export default Home












// 'use client'

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import Autoplay from 'embla-carousel-autoplay'
// import messages from "@/messages.json"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail } from "lucide-react"

// function Home() {
//   return (
//    <>
//       {/* Main content */}
//       <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white h-[79vh]">
//         <section className="text-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold">
//             Dive into the World of Anonymous Feedback
//           </h1>
//           <p className="mt-3 md:mt-4 text-base md:text-lg">
//             True Feedback - Where your identity remains a secret.
//           </p>
//         </section>

//   <Carousel
//           plugins={[Autoplay({ delay: 2000 })]}
//           className="w-full max-w-lg md:max-w-xl"
//         >
//           <CarouselContent>
//             {messages.map((message, index) => (
//               <CarouselItem key={index} className="p-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>{message.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
//                     <Mail className="flex-shrink-0" />
//                     <div>
//                       <p>{message.content}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {message.received}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//         </main>

//         {/* Footer */}
//       <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
//         © 2023 True Feedback. All rights reserved.
//       </footer>
//         </>
//   )
// }

// export default Home
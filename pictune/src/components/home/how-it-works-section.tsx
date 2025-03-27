import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    step: "01",
    title: "Upload Your Image",
    description: "Select and upload any image from your device or choose from our gallery of samples.",
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our advanced AI analyzes your image's colors, composition, and emotional content.",
  },
  {
    step: "03",
    title: "Generate Music",
    description: "Receive a unique musical composition that captures the essence of your image.",
  },
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=+')] bg-repeat opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Pictune Works</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transform your images into music in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600/30 via-blue-600/30 to-red-600/30 transform -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-full flex flex-col items-center text-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-red-600/20 to-blue-600/20 flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-gradient-to-r from-red-600/20 to-blue-600/20 hover:from-red-700 hover:to-blue-700 text-white border-0 h-12 px-8 text-lg">
            Try It Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection


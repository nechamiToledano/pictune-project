import { ImageIcon, Music, Zap, Download, Share2, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <ImageIcon className="h-6 w-6" />,
    title: "Image Analysis",
    description: "Our AI analyzes the colors, composition, and mood of your images to create matching soundscapes.",
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "Custom Soundscapes",
    description: "Generate unique music that captures the essence of your images with adjustable mood and style.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant Generation",
    description: "Create music in seconds with our powerful AI engine, no waiting or complex setup required.",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "High-Quality Export",
    description: "Download your generated music in high-quality formats for use in any project.",
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Easy Sharing",
    description: "Share your image-music creations directly to social media or with friends via link.",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Style Customization",
    description: "Choose from various musical styles and adjust parameters to get the perfect sound.",
  },
]

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how Pictune transforms your visual experiences into audio masterpieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 overflow-hidden group hover:border-gray-700 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600/20 to-blue-600/20 flex items-center justify-center mb-2">
                  <div className="text-red-400">{feature.icon}</div>
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection


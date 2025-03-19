import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";

const Testimonials = () => {


  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-900 to-black">
     <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of creators who have discovered the magic of Pictune
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Photographer",
                image: "/placeholder.svg?height=200&width=200&text=AJ",
                quote:
                  "Pictune has completely transformed how I present my photography. The music it generates perfectly captures the mood of my images.",
              },
              {
                name: "Sarah Chen",
                role: "Digital Artist",
                image: "/placeholder.svg?height=200&width=200&text=SC",
                quote:
                  "As an artist, I've always wanted to add an audio dimension to my work. Pictune makes it possible with just a few clicks. Absolutely love it!",
              },
              {
                name: "Michael Rodriguez",
                role: "Content Creator",
                image: "/placeholder.svg?height=200&width=200&text=MR",
                quote:
                  "My video content has reached a new level since I started using Pictune. The AI-generated music adds exactly the emotional impact I was looking for.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                     
                     <Avatar className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2">
                      <AvatarImage src="/logo.png"></AvatarImage>
                     </Avatar>
                    <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
    </section>
  );
};

export default Testimonials;

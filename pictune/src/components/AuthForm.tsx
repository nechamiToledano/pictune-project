import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {  Eye, EyeOff, Github, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface AuthHeroSectionProps {
  onAuthSubmit: (data: {
    userName: string
    email?: string
    password: string
    rememberMe?: boolean
    acceptTerms?: boolean
  }) => void
}


  export default function AuthForm({defaultTab ="signin", onAuthSubmit }: { defaultTab:"signin" | "signup",onAuthSubmit:AuthHeroSectionProps['onAuthSubmit']}) {
    const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab)
    const [formData, setFormData] = useState({
      userName: "",
      email: "",
      password: "",
      rememberMe: false,
      acceptTerms: false,
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })

      if (errors[name]) {
        setErrors({ ...errors, [name]: "" })
      }
    }

    const handleCheckboxChange = (name: string, checked: boolean) => {
      setFormData({ ...formData, [name]: checked })
    }

    const validateForm = () => {
      const newErrors: Record<string, string> = {}

      if (!formData.userName.trim()) {
        newErrors.userName = "Username is required"
      }

      if (activeTab === "signup" && !formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (activeTab === "signup" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = "Invalid email address"
      }

      if (!formData.password) {
        newErrors.password = "Password is required"
      } else if (activeTab === "signup" && formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }

      if (activeTab === "signup" && !formData.acceptTerms) {
        newErrors.acceptTerms = "You must accept the terms and conditions"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) return

      setIsSubmitting(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        onAuthSubmit({
          userName: formData.userName,
          email: activeTab === "signup" ? formData.email : undefined,
          password: formData.password,
          rememberMe: formData.rememberMe,
          acceptTerms: formData.acceptTerms,
        })
      } catch (error) {
        console.error("Error submitting form:", error)
      } finally {
        setIsSubmitting(false)
      }
    }



  const getPasswordStrength = () => {
    const { password } = formData
    if (!password) return { strength: 0, label: "" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    const labels = ["Weak", "Fair", "Good", "Strong"]
    return {
      strength,
      label: strength > 0 ? labels[strength - 1] : "",
    }
  }
  const passwordStrength = getPasswordStrength()


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black z-10"></div>
      
      </div>

      <div className="container mx-auto px-4 z-10 pt-10 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
       

          <div className="lg:w-1/2 w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-none shadow-lg shadow-black/50 bg-black/40 backdrop-blur-md text-white overflow-hidden">
                <Tabs
                  defaultValue={activeTab}
                  value={activeTab}
                  onValueChange={(value: string) => setActiveTab(value as "signin" | "signup")}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 w-full rounded-none bg-black/30">
                    <TabsTrigger
                      value="signin"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-blue-700 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-gradient-to-r data-[state=active]:from-red-400 data-[state=active]:to-blue-400 transition-all text-white"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600/20 data-[state=active]:to-blue-600/20 rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-gradient-to-r data-[state=active]:from-red-400 data-[state=active]:to-blue-400 transition-all text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="m-0 p-0">
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-4 p-6">
                        <div className="space-y-2">
                          <Label htmlFor="signin-username" className="flex items-center gap-2 text-white">
                            <User className="h-4 w-4" />
                            Username
                          </Label>
                          <div className="relative">
                            <Input
                              id="signin-username"
                              type="text"
                              name="userName"
                              placeholder="Enter your username"
                              value={formData.userName}
                              onChange={handleChange}
                              className={cn(
                                "pl-3 pr-3 py-6 transition-all bg-black/30 border-gray-700 text-white placeholder:text-gray-400",
                                errors.userName
                                  ? "border-red-500 focus-visible:ring-red-500"
                                  : "focus-visible:ring-blue-400",
                              )}
                              aria-invalid={!!errors.userName}
                              aria-describedby={errors.userName ? "username-error" : undefined}
                            />
                          </div>
                          {errors.userName && (
                            <p id="username-error" className="text-sm text-red-400 mt-1 animate-slideDown">
                              {errors.userName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signin-password" className="flex items-center gap-2 text-white">
                            <Lock className="h-4 w-4" />
                            Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="signin-password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={handleChange}
                              className={cn(
                                "pl-3 pr-10 py-6 transition-all bg-black/30 border-gray-700 text-white placeholder:text-gray-400",
                                errors.password
                                  ? "border-red-500 focus-visible:ring-red-500"
                                  : "focus-visible:ring-blue-400",
                              )}
                              aria-invalid={!!errors.password}
                              aria-describedby={errors.password ? "password-error" : undefined}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                          {errors.password && (
                            <p id="password-error" className="text-sm text-red-400 mt-1 animate-slideDown">
                              {errors.password}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="remember-me"
                              checked={formData.rememberMe}
                              onCheckedChange={(checked: boolean) => handleCheckboxChange("rememberMe", checked)}
                              className="border-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-500 data-[state=checked]:to-blue-500"
                            />
                            <Label htmlFor="remember-me" className="text-sm cursor-pointer text-gray-300">
                              Remember me
                            </Label>
                          </div>
                          <Link
                            to="#"
                            className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-all"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-col p-6 pt-0 gap-4">
                        <Button
                          type="submit"
                          className="w-full py-6 transition-all bg-gradient-to-r from-red-700/50 to-blue-700/50 hover:from-red-700 hover:to-blue-700 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Signing in...
                            </>
                          ) : (
                            <>
                              Sign In
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>

                        <div className="relative flex items-center justify-center w-full mt-2">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                          </div>
                          <div className="relative px-4 bg-black/30 text-xs uppercase text-gray-400">
                            Or continue with
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          <Button
                            variant="outline"
                            type="button"
                            className="py-6 border-gray-700 text-white hover:bg-gray-800"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </Button>
                        </div>
                      </CardFooter>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="m-0 p-0">
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-4 p-6">
                        <div className="space-y-2">
                          <Label htmlFor="signup-username" className="flex items-center gap-2 text-white">
                            <User className="h-4 w-4" />
                            Username
                          </Label>
                          <Input
                            id="signup-username"
                            type="text"
                            name="userName"
                            placeholder="Choose a username"
                            value={formData.userName}
                            onChange={handleChange}
                            className={cn(
                              "pl-3 pr-3 py-6 transition-all bg-black/30 border-gray-700 text-white placeholder:text-gray-400",
                              errors.userName
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "focus-visible:ring-blue-400",
                            )}
                            aria-invalid={!!errors.userName}
                            aria-describedby={errors.userName ? "signup-username-error" : undefined}
                          />
                          {errors.userName && (
                            <p id="signup-username-error" className="text-sm text-red-400 mt-1 animate-slideDown">
                              {errors.userName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="flex items-center gap-2 text-white">
                            <Mail className="h-4 w-4" />
                            Email
                          </Label>
                          <Input
                            id="signup-email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className={cn(
                              "pl-3 pr-3 py-6 transition-all bg-black/30 border-gray-700 text-white placeholder:text-gray-400",
                              errors.email
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "focus-visible:ring-blue-400",
                            )}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "signup-email-error" : undefined}
                          />
                          {errors.email && (
                            <p id="signup-email-error" className="text-sm text-red-400 mt-1 animate-slideDown">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="flex items-center gap-2 text-white">
                            <Lock className="h-4 w-4" />
                            Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Create a password"
                              value={formData.password}
                              onChange={handleChange}
                              className={cn(
                                "pl-3 pr-10 py-6 transition-all bg-black/30 border-gray-700 text-white placeholder:text-gray-400",
                                errors.password
                                  ? "border-red-500 focus-visible:ring-red-500"
                                  : "focus-visible:ring-blue-400",
                              )}
                              aria-invalid={!!errors.password}
                              aria-describedby={errors.password ? "signup-password-error" : undefined}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                          {errors.password && (
                            <p id="signup-password-error" className="text-sm text-red-400 mt-1 animate-slideDown">
                              {errors.password}
                            </p>
                          )}

                          {formData.password && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-400">Password strength:</span>
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    passwordStrength.strength === 1
                                      ? "text-red-400"
                                      : passwordStrength.strength === 2
                                        ? "text-amber-400"
                                        : passwordStrength.strength === 3
                                          ? "text-green-400"
                                          : passwordStrength.strength === 4
                                            ? "text-emerald-400"
                                            : "",
                                  )}
                                >
                                  {passwordStrength.label}
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full transition-all duration-300",
                                    passwordStrength.strength === 1
                                      ? "w-1/4 bg-red-500"
                                      : passwordStrength.strength === 2
                                        ? "w-2/4 bg-amber-500"
                                        : passwordStrength.strength === 3
                                          ? "w-3/4 bg-green-500"
                                          : passwordStrength.strength === 4
                                            ? "w-full bg-emerald-500"
                                            : "w-0",
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="terms"
                              className={cn(
                                "border-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-500 data-[state=checked]:to-blue-500",
                                errors.acceptTerms ? "border-red-500" : "",
                              )}
                              checked={formData.acceptTerms}
                              onCheckedChange={(checked: boolean) => handleCheckboxChange("acceptTerms", checked)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="terms"
                                className={cn(
                                  "text-sm cursor-pointer text-gray-300",
                                  errors.acceptTerms ? "text-red-400" : "",
                                )}
                              >
                                I agree to the{" "}
                                <Link to="#terms" className="text-blue-400 hover:text-blue-300 hover:underline">
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="#privacy" className="text-blue-400 hover:text-blue-300 hover:underline">
                                  Privacy Policy
                                </Link>
                              </Label>
                              {errors.acceptTerms && (
                                <p className="text-xs text-red-400 animate-slideDown">{errors.acceptTerms}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-col p-6 pt-0 gap-4">
                        <Button
                          type="submit"
                          className="w-full py-6 transition-all bg-gradient-to-r from-red-600/20 to-blue-600/20 hover:from-red-700 hover:to-blue-700 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating account...
                            </>
                          ) : (
                            <>
                              Create Account
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>

                        <div className="relative flex items-center justify-center w-full mt-2">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                          </div>
                          <div className="relative px-4 bg-black/30 text-xs uppercase text-gray-400">
                            Or continue with
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          <Button
                            variant="outline"
                            type="button"
                            className="py-6 border-gray-700 text-white hover:bg-gray-800"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </Button>
                        </div>
                      </CardFooter>
                    </form>
                  </TabsContent>
                </Tabs>
              </Card>

              <p className="text-center text-sm text-gray-400 mt-6">
                By using our service, you acknowledge that you have read and understand our{" "}
                <Link to="#" className="text-blue-400 hover:text-blue-300 hover:underline transition-all">
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-blue-400 hover:text-blue-300 hover:underline transition-all">
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { 
  Gauge, 
  Thermometer, 
  Activity, 
  ScanLine,
  Shield,
  Smartphone,
  Wifi,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Users,
  Truck,
  Factory,
  GraduationCap,
  Car,
  Zap,
  Play,
  ChevronRight
} from "lucide-react";
import logoImage from "figma:asset/4f4872f090858278e1b0bd3d3560362891ac5b3f.png";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logoImage} alt="iTire" className="h-8" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Get iTire</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-600/20 text-blue-300 border-blue-400/30">Drive smarter. Stay safer.</Badge>
              <h1 className="text-5xl lg:text-6xl mb-6">
                Smart Tire Monitoring That Prevents Accidents Before They Happen
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Real-time insights on pressure, temperature, vibration, and tread wear — all monitored intelligently to keep you safe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get iTire
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                  alt="iTire Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">The Hidden Danger on Every Road</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional TPMS only reacts when it's already too late. By then, you're already at risk.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-4xl text-red-600">11,000+</CardTitle>
                <CardDescription>Yearly tire-related accidents</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-4xl text-orange-600">65%</CardTitle>
                <CardDescription>Of vehicle-defect crashes caused by tire/brake issues</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-amber-200 bg-amber-50/50">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-4xl text-amber-600">75%</CardTitle>
                <CardDescription>Of tire-related fatal crashes linked to poor maintenance</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* iTire Solution */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">The iTire Solution</Badge>
            <h2 className="text-4xl mb-4">Beyond Traditional TPMS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              iTire monitors multiple critical parameters in real-time, providing predictive alerts and automatic safety responses before problems become dangerous.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Gauge className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2">Pressure</h3>
              <p className="text-gray-600">Continuous PSI monitoring with instant deviation alerts</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Thermometer className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="mb-2">Temperature</h3>
              <p className="text-gray-600">Heat detection prevents blowouts before they occur</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-2">Vibration</h3>
              <p className="text-gray-600">Detects imbalance and alignment issues early</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <ScanLine className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2">Tread Wear</h3>
              <p className="text-gray-600">Predictive analysis tracks tire condition over time</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl mb-4">Intelligent Safety Response</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time monitoring with edge-AI analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Predictive alerts sent before critical failures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic safety response including soft braking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Early warning signals beyond standard TPMS</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" 
                  alt="Real-time monitoring dashboard"
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600/20 text-blue-300 border-blue-400/30">Advanced Technology</Badge>
            <h2 className="text-4xl mb-4">Powered by Next-Gen Hardware & AI</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade sensors meet intelligent software for unmatched reliability and accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-400 mb-3" />
                <CardTitle>Smart Multi-Sensor Module</CardTitle>
                <CardDescription className="text-gray-400">
                  Four sensors in one compact, durable housing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <Wifi className="h-10 w-10 text-blue-400 mb-3" />
                <CardTitle>BLE/Wi-Fi Connectivity</CardTitle>
                <CardDescription className="text-gray-400">
                  Seamless data transmission to your devices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <Brain className="h-10 w-10 text-blue-400 mb-3" />
                <CardTitle>Edge-AI Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Raspberry Pi-powered predictive intelligence
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <Smartphone className="h-10 w-10 text-blue-400 mb-3" />
                <CardTitle>Mobile Dashboard</CardTitle>
                <CardDescription className="text-gray-400">
                  Instant alerts and comprehensive tire analytics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-12 p-8 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl mb-2">Future-Ready Cloud Analytics</h3>
                <p className="text-gray-300">
                  Fleet managers get access to advanced cloud analytics, predictive maintenance scheduling, and multi-vehicle monitoring through our premium platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Built for Everyone on the Road</h2>
            <p className="text-xl text-gray-600">
              From individual drivers to large fleets, iTire delivers measurable value
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">For Drivers</CardTitle>
                <CardDescription className="text-base">Individual safety and peace of mind</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Safer trips with real-time monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Fewer roadside emergencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Early warnings before problems escalate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Extended tire lifespan through optimal care</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">For Fleets</CardTitle>
                <CardDescription className="text-base">Operational efficiency at scale</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Lower vehicle downtime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Predictive maintenance scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Reduced operating costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Multi-vehicle monitoring dashboard</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                  <Factory className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">For Manufacturers</CardTitle>
                <CardDescription className="text-base">Innovation and customer trust</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Modernized vehicle safety features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Improved customer satisfaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Competitive differentiation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Data-driven product insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Simple & Intelligent</Badge>
            <h2 className="text-4xl mb-4">How iTire Works</h2>
            <p className="text-xl text-gray-600">
              Three steps to smarter, safer driving
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center mb-6 text-2xl">
                  1
                </div>
                <h3 className="text-2xl mb-4">Track Real-Time Data</h3>
                <p className="text-gray-600 mb-6">
                  Sensors continuously monitor pressure, temperature, vibration, and tread wear on all four tires.
                </p>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Gauge className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <ScanLine className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200"></div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center mb-6 text-2xl">
                  2
                </div>
                <h3 className="text-2xl mb-4">AI Analyzes Patterns</h3>
                <p className="text-gray-600 mb-6">
                  Edge-AI running on Raspberry Pi detects anomalies and predicts potential issues before they become critical.
                </p>
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200"></div>
            </div>

            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center mb-6 text-2xl">
                  3
                </div>
                <h3 className="text-2xl mb-4">Receive Instant Alerts</h3>
                <p className="text-gray-600 mb-6">
                  Drivers or fleet managers get immediate notifications with actionable insights through the mobile app.
                </p>
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" 
                  alt="Mobile app dashboard"
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-2xl mb-4">Your Safety Dashboard</h3>
                <p className="text-gray-600 mb-6">
                  Monitor all tire metrics at a glance, view historical trends, receive maintenance reminders, and access emergency support — all from your smartphone.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Explore the App
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Affordable Safety</Badge>
            <h2 className="text-4xl mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl">Hardware Kit</CardTitle>
                <CardDescription>One-time purchase</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl">$40</span>
                  <span className="text-gray-600">/vehicle</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>4 smart sensors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>BLE/Wi-Fi module</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Easy DIY installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>2-year warranty</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Purchase Kit</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader>
                <Badge className="w-fit mb-2">Most Popular</Badge>
                <CardTitle className="text-2xl">Standard Plan</CardTitle>
                <CardDescription>Annual subscription</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl">$170</span>
                  <span className="text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All hardware kit features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Mobile app access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Real-time alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Automatic calibration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Software updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Basic diagnostics</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl">Premium Plan</CardTitle>
                <CardDescription>Annual subscription</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl">$240</span>
                  <span className="text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All Standard features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cloud analytics platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Multi-vehicle dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Predictive maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Advanced AI insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Upgrade to Premium</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Who Uses iTire?</h2>
            <p className="text-xl text-gray-600">
              Trusted by diverse drivers and organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-16 w-16 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Student Drivers</CardTitle>
                <CardDescription>
                  New drivers building safe habits from day one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  iTire provides peace of mind for young drivers and their families with real-time monitoring and educational insights about proper tire maintenance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-16 w-16 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Fleet Operators</CardTitle>
                <CardDescription>
                  Small to medium businesses managing vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  From delivery services to rideshare fleets, iTire helps optimize operations, reduce downtime, and cut maintenance costs through predictive analytics.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-16 w-16 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Tech-Savvy Owners</CardTitle>
                <CardDescription>
                  Drivers who value innovation and safety
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Early adopters who want the latest automotive technology and data-driven insights to maximize their vehicle's performance and longevity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Choose iTire</Badge>
            <h2 className="text-4xl mb-4">Beyond Standard TPMS</h2>
            <p className="text-xl text-gray-600">
              See how iTire compares to traditional tire monitoring systems
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-center">Traditional TPMS</th>
                    <th className="px-6 py-4 text-center bg-blue-50">
                      <div className="flex items-center justify-center gap-2">
                        <img src={logoImage} alt="iTire" className="h-6" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">Pressure Monitoring</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Temperature Tracking</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Vibration Detection</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Tread Wear Analysis</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Predictive Analytics</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">AI-Powered Insights</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">—</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Mobile App Dashboard</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400">Limited</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Installation</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-600">Professional</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <span className="text-blue-600">Easy DIY</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Price Point</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-600">$300-600+</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/30">
                      <span className="text-blue-600">$210-280</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl mb-2">More Parameters</h3>
              <p className="text-gray-600">4x the data points of standard TPMS</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl mb-2">More Affordable</h3>
              <p className="text-gray-600">Up to 50% less than traditional systems</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl mb-2">More Intelligent</h3>
              <p className="text-gray-600">AI predicts issues before they happen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600/20 text-blue-300 border-blue-400/30">See It In Action</Badge>
            <h2 className="text-4xl mb-4">Real-World Scenario</h2>
            <p className="text-xl text-gray-300">
              Watch how iTire protects you in a critical moment
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">Driver Hits Rough Patch</h3>
                    <p className="text-gray-300">Vehicle encounters pothole, causing impact to front-left tire</p>
                  </div>
                  <Car className="h-8 w-8 text-gray-400" />
                </div>

                <div className="ml-5 border-l-2 border-blue-600/30 h-8"></div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">Sensors Detect Anomaly</h3>
                    <p className="text-gray-300">Unusual vibration pattern + pressure drop detected within 2 seconds</p>
                  </div>
                  <Activity className="h-8 w-8 text-red-400" />
                </div>

                <div className="ml-5 border-l-2 border-blue-600/30 h-8"></div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">AI Analyzes & Predicts</h3>
                    <p className="text-gray-300">Edge-AI identifies potential tire damage, calculates risk level</p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-400" />
                </div>

                <div className="ml-5 border-l-2 border-blue-600/30 h-8"></div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">Instant Alert Sent</h3>
                    <p className="text-gray-300">Driver receives notification: "Front-left tire damage detected. Reduce speed to 45 mph."</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                </div>

                <div className="ml-5 border-l-2 border-blue-600/30 h-8"></div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">Automatic Safety Response</h3>
                    <p className="text-gray-300">System initiates soft braking, guides driver to nearest service station</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-900/30 border border-green-500/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <p className="text-green-100">
                    <strong>Result:</strong> Potential blowout prevented. Driver safely reaches service station for tire inspection.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                <Play className="mr-2 h-5 w-5" />
                See Full Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={logoImage} alt="iTire" className="h-8 mb-4" />
              <p className="text-gray-400">
                Smart tire monitoring that prevents accidents before they happen.
              </p>
            </div>
            
            <div>
              <h3 className="mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tech Specs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Installation Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                © 2025 iTire. Inha University, Korea. All rights reserved.
              </p>
              <div className="flex gap-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

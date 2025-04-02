
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Info, XCircle, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const freePlanFeatures = [
    { name: 'Browse all public content', included: true },
    { name: 'View free project previews', included: true },
    { name: 'Limited downloads', included: true },
    { name: 'Upload up to 3 projects', included: true },
    { name: 'Basic community features', included: true },
    { name: 'Access to premium content', included: false },
    { name: 'Unlimited downloads', included: false },
    { name: 'Creator revenue sharing', included: false },
  ];
  
  const standardPlanFeatures = [
    { name: 'All features in Free plan', included: true },
    { name: 'Access to all premium content', included: true },
    { name: 'Unlimited downloads', included: true },
    { name: 'Upload up to 10 projects', included: true },
    { name: 'Advanced filtering & search', included: true },
    { name: 'No ads', included: true },
    { name: 'Access to ultra premium content', included: false, tooltip: 'Ultra premium content requires additional payment' },
    { name: 'Creator revenue sharing', included: false },
  ];
  
  const proPlanFeatures = [
    { name: 'All features in Standard plan', included: true },
    { name: 'Creator revenue sharing', included: true, tooltip: 'Get paid when your content reaches popularity milestones' },
    { name: 'Unlimited project uploads', included: true },
    { name: 'Priority support', included: true },
    { name: 'Featured project placement', included: true },
    { name: 'Analytics dashboard', included: true },
    { name: 'Personalized feedback on projects', included: true },
    { name: 'Access to ultra premium content', included: false, tooltip: 'Ultra premium content requires additional payment' },
  ];
  
  const creatorPlanFeatures = [
    { name: 'All features in Pro plan', included: true },
    { name: 'Higher revenue share percentage', included: true, tooltip: '70% revenue share vs. 50% for Pro plan' },
    { name: 'Early access to new features', included: true },
    { name: 'Creator community access', included: true },
    { name: 'Premium creator badge', included: true },
    { name: 'Dedicated account manager', included: true },
    { name: 'Premium analytics', included: true },
    { name: 'Custom branding options', included: true },
  ];
  
  const getPrice = (base: number) => {
    if (billingCycle === 'annual') {
      return (base * 10).toFixed(2); // 2 months free
    }
    return base.toFixed(2);
  };
  
  const getDiscount = () => {
    return billingCycle === 'annual' ? '(Save 17%)' : '';
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-deckit-purple/90 to-deckit-purple-light/90 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
              Get access to the best hackathon and case competition projects, or monetize your own work with our creator plans.
            </p>
            
            <Tabs 
              defaultValue="monthly" 
              className="max-w-xs mx-auto"
              onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annual')}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Free Plan */}
              <Card className="border-2 border-gray-200">
                <CardHeader className="text-center">
                  <CardTitle>Free</CardTitle>
                  <div className="text-3xl font-bold mt-2">$0</div>
                  <p className="text-sm text-gray-500">Basic browsing</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {freePlanFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle size={18} className="text-gray-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Standard Plan */}
              <Card className="border-2 border-gray-200">
                <CardHeader className="text-center">
                  <CardTitle>Standard</CardTitle>
                  <div>
                    <span className="text-3xl font-bold">${getPrice(9.99)}</span>
                    <span className="text-sm text-gray-500">
                      /{billingCycle === 'annual' ? 'year' : 'month'} {getDiscount()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">For casual users</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {standardPlanFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle size={18} className="text-gray-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-400'}>
                          {feature.name}
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle size={14} className="inline-block ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Subscribe
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Pro Plan */}
              <Card className="border-2 border-deckit-purple relative">
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-deckit-purple text-white">Most Popular</Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle>Pro</CardTitle>
                  <div>
                    <span className="text-3xl font-bold">${getPrice(19.99)}</span>
                    <span className="text-sm text-gray-500">
                      /{billingCycle === 'annual' ? 'year' : 'month'} {getDiscount()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">For creators & active users</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {proPlanFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle size={18} className="text-gray-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-400'}>
                          {feature.name}
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle size={14} className="inline-block ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-deckit-purple hover:bg-deckit-purple-dark">
                    Subscribe
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Creator Plan */}
              <Card className="border-2 border-gray-200">
                <CardHeader className="text-center">
                  <CardTitle>Creator</CardTitle>
                  <div>
                    <span className="text-3xl font-bold">${getPrice(29.99)}</span>
                    <span className="text-sm text-gray-500">
                      /{billingCycle === 'annual' ? 'year' : 'month'} {getDiscount()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">For professional creators</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {creatorPlanFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle size={18} className="text-gray-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-400'}>
                          {feature.name}
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle size={14} className="inline-block ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Subscribe
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Ultra Premium Information */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">What is Ultra Premium Content?</h2>
                  <p className="text-gray-600 mb-4">
                    Ultra Premium projects are exceptional, high-value content that creators can charge an additional fee for, beyond the standard subscription.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5" />
                      <span>Highest quality content with extensive documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5" />
                      <span>Often includes direct consultations with the creator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5" />
                      <span>Premium support and personalized guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5" />
                      <span>Special licensing options for commercial use</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-lg border-2 border-amber-400 shadow-sm">
                    <div className="flex items-start gap-3 mb-4">
                      <Info size={20} className="text-amber-500 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Ultra Premium Pricing</h3>
                        <p className="text-gray-600 text-sm">
                          Ultra Premium content is not included in any subscription plan and is priced individually by creators.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 border-b">
                        <span>Typical price range:</span>
                        <span className="font-semibold">$15 - $50</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span>Creator revenue share:</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Refund policy:</span>
                        <span className="font-semibold">14 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How does the revenue sharing work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Revenue sharing is available on Pro and Creator plans. Once your content reaches certain view or download thresholds, you start earning a percentage of subscription revenue attributed to your content. Pro plan creators earn 50% while Creator plan members earn 70%.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I cancel my subscription anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time. If you cancel, you'll maintain access until the end of your current billing period.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens to my uploaded projects if I downgrade?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    If you downgrade from a higher tier to a lower tier, you'll need to adjust your projects to meet the upload limits of your new plan. We'll guide you through this process to ensure you don't unexpectedly lose access to your content.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I get featured as a creator?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Featured placement is based on quality ratings, user engagement, and the uniqueness of your content. Pro and Creator plan members get priority consideration for featured spots, especially for new uploads.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I use content commercially?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Commercial usage rights depend on the license chosen by the creator. Always check the specific licensing terms attached to each project for details on commercial usage permissions and restrictions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-deckit-purple/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Join thousands of users and creators sharing knowledge, earning revenue, and discovering innovative solutions.
            </p>
            <Button size="lg" className="bg-deckit-purple hover:bg-deckit-purple-dark">
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;

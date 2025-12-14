import HeroSection from '../components/landing/HeroSection';
import FeatureSection from '../components/landing/FeatureSection';
import SubscriptionSection from '../components/landing/SubscriptionSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import { features } from '../data/FeatureData';
import { subscriptionPlans } from '../data/SubscriptionPlan';
import { testimonials } from '../data/TestimonialData';
import CTASection from '../components/landing/CTASection';
import FooterSection from '../components/landing/FooterSection';


const Landing = () => {
  return (
    <>
      <div className="min-h-screen">
        
        {/* Hero Section */}
        <HeroSection/>
        
        {/* Feature Section */}
        <FeatureSection features={ features }/>
        
        {/* Subscription Section */}
        <SubscriptionSection subscriptionPlans={ subscriptionPlans } />
      
        {/* Testimonal Section */}
        <TestimonialSection testimonials={ testimonials }/>
        
        {/* CTA Section */}
        <CTASection />
        
        {/* Footer */}
        <FooterSection/>
      </div>
    </>
  );
}

export default Landing
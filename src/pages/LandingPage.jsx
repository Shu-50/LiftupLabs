import HeaderHomepage from '../components/homepage/HeaderHomepage'
import HeroHomepage from '../components/homepage/HeroHomepage'
import StatsHomepage from '../components/homepage/StatsHomepage'
import FeaturesHomepage from '../components/homepage/FeaturesHomepage'
import HowItWorksHomepage from '../components/homepage/HowItWorksHomepage'
import TestimonialsHomepage from '../components/homepage/TestimonialsHomepage'
import CTAHomepage from '../components/homepage/CTAHomepage'
import FooterHomepage from '../components/homepage/FooterHomepage'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeaderHomepage />
      <HeroHomepage />
      <StatsHomepage />
      <FeaturesHomepage />
      <HowItWorksHomepage />
      <TestimonialsHomepage />
      <CTAHomepage />
      <FooterHomepage />
    </div>
  )
}

export default LandingPage

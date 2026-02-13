import HeroSection from "../components/landingPage/HeroSection.jsx"
import Navbar from "../components/layout/Navbar.jsx"
import CTASection from "../components/landingPage/CtaSection.jsx"
import FeaturesSection from "../components/landingPage/FeatureSection.jsx"
import Footer from "../components/layout/Footer.jsx"

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-snap-bg-main">
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}

export default LandingPage
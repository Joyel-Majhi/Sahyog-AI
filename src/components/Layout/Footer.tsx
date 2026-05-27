import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SahyogAI</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Your one-stop platform for government schemes, services, and citizen engagement. 
              Empowering citizens through technology and transparency.
            </p>
            <div className="text-sm text-primary-foreground/60">
              © 2024 SahyogAI. All rights reserved.
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/schemes" className="hover:text-primary-foreground transition-colors">Government Schemes</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Online Services</Link></li>
              <li><Link to="/complaints" className="hover:text-primary-foreground transition-colors">File Complaint</Link></li>
              <li><Link to="/tracking" className="hover:text-primary-foreground transition-colors">Track Application</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/help" className="hover:text-primary-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            Designed to serve citizens with transparency, efficiency, and trust.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
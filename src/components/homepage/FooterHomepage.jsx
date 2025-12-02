import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react'

const FooterHomepage = () => {
  const navigation = {
    product: [
      { name: 'Events & Competitions', href: '#' },
      { name: 'Notes & PYQs', href: '#' },
      { name: 'Courses & Lectures', href: '#' },
      { name: 'Career Guidance', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'FAQs', href: '#' }
    ]
  }

  return (
    <footer className="bg-orange-100/30 border-t border-orange-200/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Liftuplabs</span>
            </div>
            <p className="text-gray-600">
              Your complete learning hub for academic success and career growth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-orange-600 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-orange-600 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Github className="w-5 h-5 text-gray-600 hover:text-orange-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-600 hover:text-orange-600 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-600 hover:text-orange-600 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-600 hover:text-orange-600 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-orange-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Liftuplabs. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium">
              BETA
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterHomepage

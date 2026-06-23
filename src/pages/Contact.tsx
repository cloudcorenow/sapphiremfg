import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, User, Send, Building2, Briefcase, ChevronDown } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FormField from '../components/ui/FormField';
import LazyImage from '../components/LazyImage';

function Contact() {
  const [repsExpanded, setRepsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    howDidYouHear: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phone.trim()) return 'Phone number is required';
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) return 'Please enter a valid phone number';
    return null;
  };

  const representatives = [
    {
      name: 'Valeria Bautista',
      title: 'Inside Sales Manager',
      region: 'AZ | UT | CO | NM | MT | WY | ND | SD | NE | KS | OK | MN | IA | MO | AR | LA | WI | MI | IN',
      email: 'vbautista@sapphiremfg.com',
      phone: 'C. 949.966.1062'
    },
    {
      name: 'Alissa Pryor',
      title: 'Inside Sales Executive',
      region: 'OH | KY | TN | MS | AL | GA | SC | NC | VA | WV | PA | VT | NH | ME | MA | CT | RI | NJ | DE | MD',
      email: 'apryor@sapphiremfg.com',
      phone: 'C. 714.879.3660'
    },
    {
      name: 'Kirk Fisher',
      title: 'Executive Director of Sales',
      region: 'CA | NV',
      email: 'kfisher@sapphiremfg.com',
      phone: 'C. 949.939.9694'
    },
    {
      name: 'Brian Stephenson',
      title: 'Sales Representative',
      region: 'TX',
      email: 'sales@sapphiremfg.com',
      phone: 'C. 214.585.1266'
    },
    {
      name: 'Jennifer Haycox',
      title: 'Sales Representative',
      region: 'WA | OR | AK | ID',
      email: 'sales@sapphiremfg.com',
      phone: 'C. 971.727.9697'
    },
    {
      name: 'Nicole Stark Aral',
      title: 'Sales Representative',
      region: 'IL',
      email: 'sales@sapphiremfg.com',
      phone: 'C. 312.288.5611'
    },
    {
      name: 'Josh Altenbach',
      title: 'Sales Representative',
      region: 'FL',
      email: 'sales@sapphiremfg.com',
      phone: 'C. 407.921.2290'
    }
  ];

  return (
    <div className="min-h-screen relative pt-20 sm:pt-28">
      <SEOHead
        title="Contact Us - Get in Touch"
        description="Ready to start your project? Contact our team of experts to discuss your custom lighting and fabrication needs. Multiple representatives available nationwide."
      />
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09203004/img_projects_vertical_beauty2-1.jpg)',
        }}
      />
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-[2000px] mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl font-light mb-3 sm:mb-4 text-white uppercase">GET IN TOUCH</h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Ready to start your project? Our team of experts is here to help bring your vision to life.
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:items-stretch">
          {/* Contact Information */}
          <div className="h-full">
            <div className="bg-white/5 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#C4A14D]/30 transition-colors h-full">
              <h2 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8 text-white">Contact Information</h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#C4A14D]/10 rounded-lg">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4A14D]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm sm:text-base">Address</h3>
                    <p className="text-gray-400 mt-1 text-xs sm:text-sm">505 Porter Way</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Placentia, CA 92870</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#C4A14D]/10 rounded-lg">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4A14D]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm sm:text-base">Phone</h3>
                    <p className="text-gray-400 mt-1 text-xs sm:text-sm">Tel: (714) 879-3660</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#C4A14D]/10 rounded-lg">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4A14D]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm sm:text-base">Email</h3>
                    <p className="text-gray-400 mt-1 text-xs sm:text-sm">info@sapphiremfg.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-[#C4A14D]/10 rounded-lg">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4A14D]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm sm:text-base">Hours</h3>
                    <p className="text-gray-400 mt-1 text-xs sm:text-sm">Monday - Friday</p>
                    <p className="text-gray-400 text-xs sm:text-sm">7:00 AM - 5:00 PM PST</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 hidden lg:block relative rounded-xl overflow-hidden group">
                <LazyImage
                  src="/505PORTER.jpg"
                  alt="Sapphire Manufacturing - 505 Porter, Pomona"
                  className="w-full h-auto rounded-xl saturate-[0.4] brightness-75 sepia-[0.3] transition-all duration-500 group-hover:saturate-[0.6] group-hover:brightness-80"
                  responsive={false}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#1a0f00]/80 via-[#2d1a00]/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#C4A14D]/15 via-transparent to-[#3d2000]/40 pointer-events-none mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4A14D]/40 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="h-full">
            <div className="bg-white/5 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#C4A14D]/30 transition-colors h-full">
              <h2 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8 text-white">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <FormField
                  label="How did you hear about us?"
                  name="howDidYouHear"
                  type="select"
                  value={formData.howDidYouHear}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Select an option' },
                    { value: 'Search Engine', label: 'Search Engine' },
                    { value: 'Social Media', label: 'Social Media' },
                    { value: 'Referral', label: 'Referral' },
                    { value: 'Trade Show', label: 'Trade Show' },
                    { value: 'Other', label: 'Other' }
                  ]}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <FormField
                  label="Company Name"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    validate={validateEmail}
                  />
                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    validate={validatePhone}
                  />
                </div>

                <FormField
                  label="Message"
                  name="message"
                  type="textarea"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your project requirements..."
                  rows={4}
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#C4A14D] text-white text-base rounded-lg hover:bg-[#C4A14D]/90 focus:outline-none focus:ring-2 focus:ring-[#C4A14D] focus:ring-offset-2 focus:ring-offset-black transition-colors flex items-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sales Representatives */}
          <div className="h-full">
            <div className="bg-white/5 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#C4A14D]/30 transition-colors relative h-full">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-light text-white">Our Representatives</h2>
                <button
                  onClick={() => setRepsExpanded(!repsExpanded)}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-[#C4A14D] hover:text-[#C4A14D]/80 transition-colors border border-[#C4A14D]/30 hover:border-[#C4A14D]/60 rounded-lg px-3 py-1.5"
                  aria-expanded={repsExpanded}
                >
                  {repsExpanded ? 'Show Less' : `View All ${representatives.length}`}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${repsExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {(repsExpanded ? representatives : representatives.slice(0, 3)).map((rep, index) => (
                  <div key={index} className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="p-2 sm:p-3 bg-[#C4A14D]/10 rounded-lg flex-shrink-0">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#C4A14D]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-white text-sm sm:text-base">{rep.name}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">{rep.title}</p>
                        <div className="flex items-start space-x-2 mt-2 text-xs sm:text-sm text-gray-400">
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-[#C4A14D] flex-shrink-0 mt-0.5" />
                          <span>{rep.region}</span>
                        </div>
                        <a
                          href={`mailto:${rep.email}`}
                          className="flex items-center space-x-2 text-[#C4A14D] hover:text-[#C4A14D]/80 text-xs sm:text-sm mt-2 break-all"
                        >
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{rep.email}</span>
                        </a>
                        <div className="flex items-center space-x-2 mt-1 text-xs sm:text-sm text-gray-400">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#C4A14D] flex-shrink-0" />
                          <span>{rep.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Contact;
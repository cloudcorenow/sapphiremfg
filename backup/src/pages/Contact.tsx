import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, User, Send, Building2, Briefcase } from 'lucide-react';

function Contact() {
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

  const representatives = [
    {
      name: 'Kirk Fisher',
      title: 'Executive Director of Sales',
      region: 'Ca, Nv',
      email: 'kfisher@sapphiremfg.com',
      phone: 'C. 949.939.9694'
    },
    {
      name: 'Brian Stephenson',
      title: 'Sales Representative',
      region: 'Texas',
      email: 'sales@sapphiremfg.com',
      phone: 'C. 214.585.1266'
    },
    {
      name: 'Jennifer Haycox',
      title: 'Sales Representative',
      region: 'Washington | Oregon | Alaska | Idaho',
      email: 'sales@sapphiremfg.com',
      phone: 'C. 971.727.9697'
    },
    {
      name: 'Nicole Stark Aral',
      title: 'Sales Representative',
      region: 'Chicago',
      email: 'sales@sapphiremfg.com',
      phone: 'C. 312.288.5611'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-[2000px] mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light mb-4 text-white">Get in Touch</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to start your project? Our team of experts is here to help bring your vision to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl h-full border border-white/10 hover:border-amber-500/30 transition-colors">
              <h2 className="text-2xl font-light mb-8 text-white">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Address</h3>
                    <p className="text-gray-400 mt-1">505 Porter Way</p>
                    <p className="text-gray-400">Placentia, CA 92870</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <Phone className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Phone</h3>
                    <p className="text-gray-400 mt-1">Tel: (714) 876-3660</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <Mail className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-gray-400 mt-1">info@sapphiremfg.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Hours</h3>
                    <p className="text-gray-400 mt-1">Monday - Friday</p>
                    <p className="text-gray-400">7:00 AM - 5:00 PM PST</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <img
                  src="https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09232754/img_contact-1.png"
                  alt="Sapphire Manufacturing Contact"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl h-full border border-white/10 hover:border-amber-500/30 transition-colors">
              <h2 className="text-2xl font-light mb-8 text-white">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-300 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    id="howDidYouHear"
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                  >
                    <option value="" className="bg-gray-900">Select an option</option>
                    <option value="Search Engine" className="bg-gray-900">Search Engine</option>
                    <option value="Social Media" className="bg-gray-900">Social Media</option>
                    <option value="Referral" className="bg-gray-900">Referral</option>
                    <option value="Trade Show" className="bg-gray-900">Trade Show</option>
                    <option value="Other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    placeholder="Please describe your project requirements..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black transition-colors flex items-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sales Representatives */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl h-full border border-white/10 hover:border-amber-500/30 transition-colors">
              <h2 className="text-2xl font-light mb-8 text-white">Our Representatives</h2>
              <div className="space-y-6">
                {representatives.map((rep, index) => (
                  <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-amber-500/10 rounded-lg">
                        <User className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{rep.name}</h3>
                        <p className="text-gray-400 text-sm">{rep.title}</p>
                        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-400">
                          <Briefcase className="w-4 h-4" />
                          <span>{rep.region}</span>
                        </div>
                        <a 
                          href={`mailto:${rep.email}`} 
                          className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 text-sm mt-2"
                        >
                          <Mail className="w-4 h-4" />
                          <span>{rep.email}</span>
                        </a>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-400">
                          <Phone className="w-4 h-4" />
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
  );
}

export default Contact;
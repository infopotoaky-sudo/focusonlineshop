import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Send, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { searchProducts, formatPrice } from '../data/store';
import { ProductCard } from '../components/Products';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">About FOCUS</h1>
      <div className="prose prose-lg text-gray-600 space-y-6">
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a70] rounded-3xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-3">Books • School Supplies • More</h2>
          <p className="text-gray-300">Your trusted partner for quality educational products in Ghana.</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Who We Are</h3>
          <p className="text-gray-600 leading-relaxed">
            FOCUS is a Ghanaian educational supply store dedicated to providing quality textbooks, stationery, school supplies, and complete school packages to students, parents, and institutions across Ghana.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            We understand the challenges parents face in finding the right books and supplies for their children's education. That's why we've created a platform that makes it easy to find exactly what you need — whether it's a specific textbook for your child's school, a complete school package, or everyday stationery items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <span className="text-3xl mb-3 block">📚</span>
            <h4 className="font-bold text-[#1e3a5f] mb-2">Quality Products</h4>
            <p className="text-sm text-gray-500">Genuine textbooks and supplies from trusted publishers</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <span className="text-3xl mb-3 block">🏫</span>
            <h4 className="font-bold text-[#1e3a5f] mb-2">School Partnerships</h4>
            <p className="text-sm text-gray-500">Working with schools to provide accurate book lists</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <span className="text-3xl mb-3 block">🚚</span>
            <h4 className="font-bold text-[#1e3a5f] mb-2">Convenient Delivery</h4>
            <p className="text-sm text-gray-500">Fast delivery and easy store pickup options</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mt-8">
          <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To make quality educational resources accessible and affordable for every student in Ghana. We believe every child deserves the right tools for learning, and we're committed to making that a reality.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Send us a Message</h3>
          
          {submitted ? (
            <div className="text-center py-8">
              <span className="text-4xl block mb-3">✅</span>
              <p className="font-semibold text-green-600">Message sent successfully!</p>
              <p className="text-sm text-gray-500 mt-1">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name *</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number *</label>
                <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Message *</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623]" />
              </div>
              <button type="submit" className="w-full bg-[#f5a623] hover:bg-[#e09500] text-[#1e3a5f] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">+233 XX XXX XXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="font-medium text-gray-800">Available for orders & inquiries</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">info@focusstore.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-800">Accra, Ghana</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">Business Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Monday - Friday</span><span className="font-medium">8:00 AM - 6:00 PM</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Saturday</span><span className="font-medium">9:00 AM - 4:00 PM</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Sunday</span><span className="font-medium">Closed</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'How do I find books for my school?', a: 'Go to the Schools page, select your school and class, and we\'ll show you the complete book and supplies list. You can add everything to your cart with one click.' },
    { q: 'What payment methods do you accept?', a: 'We accept Mobile Money (MTN, Vodafone, AirtelTigo), debit/credit cards, bank transfers, and pay on pickup for store collection.' },
    { q: 'How long does delivery take?', a: 'Delivery within Accra takes 1-2 days. Other regions take 2-5 days depending on location. Store pickup is available within 2 hours of order confirmation.' },
    { q: 'Can I return a product?', a: 'Yes, we accept returns within 7 days of delivery for unused items in original packaging. Contact us via WhatsApp or email to initiate a return.' },
    { q: 'Do you offer bulk discounts?', a: 'Yes! We offer special pricing for bulk orders, schools, and institutions. Contact us via WhatsApp or the contact form for a custom quote.' },
    { q: 'What is a Complete School Package?', a: 'A Complete School Package includes all the textbooks, stationery, and supplies your child needs for a specific school and class, bundled at a discounted price.' },
    { q: 'How do I track my order?', a: 'Go to the Track Order page and enter your order number (e.g., FOC1001) and phone number. You\'ll see real-time status updates.' },
    { q: 'Are the books genuine/original?', a: 'Yes, all our books are 100% genuine and sourced directly from authorized publishers and distributors.' },
    { q: 'Can I order via WhatsApp?', a: 'Absolutely! You can send us your order list via WhatsApp and we\'ll process it for you. Click the WhatsApp button on any product page.' },
    { q: 'Do you deliver outside Accra?', a: 'Yes, we deliver to all regions in Ghana. Delivery fees vary by location. See our delivery zones at checkout for specific pricing.' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-3">Frequently Asked Questions</h1>
      <p className="text-gray-500 mb-8">Find answers to common questions about shopping at FOCUS.</p>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800 text-sm pr-4">{faq.q}</span>
              {openIndex === i ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#1e3a5f] rounded-2xl p-6 text-center text-white">
        <h3 className="font-bold text-lg mb-2">Still have questions?</h3>
        <p className="text-gray-300 text-sm mb-4">Contact us and we'll be happy to help.</p>
        <Link to="/contact" className="bg-[#f5a623] text-[#1e3a5f] font-bold px-6 py-2.5 rounded-full inline-block">Contact Us</Link>
      </div>
    </div>
  );
}

export function SearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const query = urlParams.get('q') || hashParams.get('q') || '';
  const results = searchProducts(query);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Search Results</h1>
        <p className="text-gray-500 text-sm mt-1">
          {results.length} result{results.length !== 1 ? 's' : ''} for "<span className="font-medium text-[#1e3a5f]">{query}</span>"
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
          <p className="text-gray-500 mb-4">Try searching with different keywords.</p>
          <div className="text-sm text-gray-500">
            <p className="font-medium mb-2">Suggestions:</p>
            <ul className="space-y-1">
              <li>• Check your spelling</li>
              <li>• Use more general terms</li>
              <li>• Try searching by ISBN or author</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

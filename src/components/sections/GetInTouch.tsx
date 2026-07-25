import { useState, type ChangeEvent, type FormEvent } from 'react';
import { contact } from '../../data/resume';

const GITHUB_ICON =
  'M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.5-5.5 5.8.4.3.8 1 .8 2.1v3.2c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z';
const LINKEDIN_ICON =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
const INSTAGRAM_ICON =
  'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z';

const socialLinks = [
  { label: 'LinkedIn', href: contact.linkedin, icon: LINKEDIN_ICON },
  { label: 'GitHub', href: contact.github, icon: GITHUB_ICON },
  { label: 'Instagram', href: contact.instagram, icon: INSTAGRAM_ICON },
];

export default function GetInTouch() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const isValid =
    form.firstName.trim().length >= 2 &&
    form.lastName.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.subject !== '' &&
    form.message.trim().length >= 10;

  const handleChange = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('name', `${form.firstName} ${form.lastName}`);
    formData.append('email', form.email);
    formData.append('subject', `Portfolio Contact: ${form.subject}`);
    formData.append('message', form.message);
    formData.append('_subject', 'New message from Pratyush Singh Portfolio!');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contact.formEndpoint}`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-28 py-24 px-6 max-md:px-4 max-md:py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-heading text-h2 font-semibold text-text-primary mb-4 flex items-center justify-center gap-3">
            <span className="section-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            Get In Touch
          </h2>
          <p className="text-metallic-silver/70 text-lg">Let's discuss your next project or just say hello!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-metallic-silver">Let's Connect</h3>
              <p className="text-metallic-silver/70 mb-6">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and
                development.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="contact-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-metallic-silver/60">Email</p>
                  <p className="text-metallic-silver">{contact.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="contact-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-metallic-silver/60">Phone</p>
                  <p className="text-metallic-silver">{contact.phone}</p>
                </div>
              </div>

            </div>

            <div>
              <p className="text-sm text-metallic-silver/60 mb-3">Connect</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-icon-wrapper"
                    aria-label={social.label}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-card rounded-2xl p-8">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-zinc-300">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input id="firstName" className="contact-input" placeholder="Your first name" value={form.firstName} onChange={handleChange('firstName')} />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-zinc-300">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input id="lastName" className="contact-input" placeholder="Your last name" value={form.lastName} onChange={handleChange('lastName')} />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input id="email" type="email" className="contact-input" placeholder="your.email@example.com" value={form.email} onChange={handleChange('email')} />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-zinc-300">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select id="subject" className="contact-input contact-select" value={form.subject} onChange={handleChange('subject')}>
                  <option value="">Select a subject</option>
                  <option value="project-inquiry">Project Inquiry</option>
                  <option value="job-opportunity">Job Opportunity</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="general">General Message</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-300">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="contact-input resize-none"
                  placeholder="Tell me about your project or how I can help you..."
                  value={form.message}
                  onChange={handleChange('message')}
                />
                <p className="text-xs text-zinc-400 mt-1">Tip: Write a meaningful message with at least 3 words and 10 characters.</p>
              </div>

              <button type="submit" disabled={isSubmitting || !isValid} className="submit-button w-full py-3 px-6 rounded-lg font-semibold">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {status && (
              <div className={`mt-4 p-4 rounded-lg ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p>
                  {status === 'success'
                    ? 'Thank you for your message! I will get back to you within 24 hours.'
                    : 'Oops! Something went wrong. Please try again or email me directly.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

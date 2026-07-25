import { useState, type ChangeEvent, type FormEvent } from 'react';
import { contact } from '../../data/resume';

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

              <div className="flex items-center space-x-3">
                <div className="contact-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-metallic-silver/60">Response Time</p>
                  <p className="text-metallic-silver">Within 24 hours</p>
                </div>
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

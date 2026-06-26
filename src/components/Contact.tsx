import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Reveal from './ui/Reveal';
import { CONTACT_INFO } from '../data';

// ─── Particle canvas for the dark left panel ─────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.5 + 0.1,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      pts.forEach((p) => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        const px = p.x * W;
        const py = p.y * H;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.a})`;
        ctx.fill();

        pts.forEach((q) => {
          const dx = (q.x - p.x) * W;
          const dy = (q.y - p.y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100 && d > 0) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(q.x * W, q.y * H);
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

// ─── Main Contact section ────────────────────────────────────────────────────
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ firstName: '', lastName: '', email: '', company: '', message: '' });
      }, 4000);
    }, 800);
  };

  const inputBase =
    'w-full bg-slate-50 border-[1.5px] rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all duration-200';
  const inputFocus = (field: string) =>
    focused === field
      ? 'border-indigo-500 bg-white ring-[3px] ring-indigo-100'
      : 'border-slate-200 hover:border-slate-300';

  const contactItems = [
    { icon: MapPin, label: 'Address', value: CONTACT_INFO.address },
    { icon: Phone,  label: 'Phone',   value: CONTACT_INFO.phone },
    { icon: Mail,   label: 'Email',   value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
    { icon: Clock,  label: 'Hours',   value: CONTACT_INFO.hours },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      aria-label="Contact Us"
    >
      <div className="grid lg:grid-cols-2 min-h-[640px]">

        {/* ── LEFT: dark panel with particle canvas ── */}
        <div className="relative bg-[#0f0f1a] flex flex-col justify-between px-10 py-14 lg:px-14 overflow-hidden">
          <ParticleCanvas />

          {/* Content over canvas */}
          <div className="relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="block w-6 h-px bg-indigo-500" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-indigo-500 font-semibold">
                  Get in touch
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display font-extrabold leading-[0.95] tracking-tight mb-5">
                <span className="block text-4xl md:text-5xl text-white">Let's build</span>
                <span
                  className="block text-4xl md:text-5xl"
                  style={{
                    WebkitTextStroke: '1.5px rgba(99,102,241,0.6)',
                    color: 'transparent',
                  }}
                >
                  together.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                Reach out and we'll connect you with the right team across our group of companies.
              </p>
            </Reveal>
          </div>

          {/* Contact info list */}
          <div className="relative z-10 flex flex-col gap-4 mt-10">
            {contactItems.map(({ icon: Icon, label, value, href }, i) => (
              <Reveal key={label} delay={0.25 + i * 0.07}>
                <div className="group flex items-center gap-4">
                  <div className="w-9 h-9 rounded-[10px] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 transition-all duration-200 group-hover:bg-indigo-500/25 group-hover:border-indigo-500/40">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-0.5">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-white/70 hover:text-indigo-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm text-white/70">{value}</div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── RIGHT: white form panel ── */}
        <div className="bg-white flex flex-col justify-center px-10 py-14 lg:px-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="block w-6 h-px bg-indigo-500" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-indigo-500 font-semibold">
                Send an inquiry
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 mb-1">
              We'd love to hear from you
            </h3>
            <p className="text-sm text-slate-400 mb-8">
              Fill in the form and we'll get back within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} noValidate>
              {/* Name row */}
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                {(['firstName', 'lastName'] as const).map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-1.5 font-medium"
                    >
                      {field === 'firstName' ? 'First name' : 'Last name'}
                    </label>
                    <input
                      id={field}
                      type="text"
                      required
                      value={form[field]}
                      // placeholder={field === 'firstName' ? 'Username' : 'Sharma'}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} ${inputFocus(field)}`}
                    />
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-1.5 font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  // placeholder="ravi@company.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className={`${inputBase} ${inputFocus('email')}`}
                />
              </div>

              {/* Company */}
              <div className="mb-3">
                <label
                  htmlFor="company"
                  className="block text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-1.5 font-medium"
                >
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  // placeholder="Acme Ltd."
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  onFocus={() => setFocused('company')}
                  onBlur={() => setFocused(null)}
                  className={`${inputBase} ${inputFocus('company')}`}
                />
              </div>

              {/* Message */}
              <div className="mb-7">
                <label
                  htmlFor="message"
                  className="block text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-1.5 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  // placeholder="Tell us about your project or inquiry…"
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className={`${inputBase} ${inputFocus('message')} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`group inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-wait ${
                    submitted
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:-translate-y-0.5'
                  }`}
                >
                  {submitted ? (
                    <>
                      <CheckCircle size={15} />
                      Sent!
                    </>
                  ) : loading ? (
                    <>
                      <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                      Send message
                    </>
                  )}
                </button>
                <span className="text-xs text-slate-300">We reply within 24 hrs</span>
              </div>

              {/* Success notice */}
              {submitted && (
                <div className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-sm text-emerald-700 font-medium">
                    Message sent — we'll be in touch soon.
                  </span>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
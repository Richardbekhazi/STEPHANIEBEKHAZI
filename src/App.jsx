import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Mail, Phone, MapPin, Download, 
  ExternalLink, Heart, Activity, Thermometer, ShieldCheck, 
  Award, Globe, BookOpen, User, Stethoscope, Syringe, 
  FileText, Users, ArrowUpRight
} from 'lucide-react';

/**
 * UTILITY: Scroll Reveal Component
 * Uses IntersectionObserver to trigger animations when elements enter viewport
 */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const transitionDelay = `${delay}ms`;

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay }}
    >
      {children}
    </div>
  );
};

/**
 * DATA CONSTANTS
 */
const EXPERIENCES = [
  {
    id: 1,
    role: "RN, Medical-Surgical Unit",
    institution: "Hawkesbury General Hospital",
    location: "Hawkesbury, ON",
    period: "Nov 2024 – Present",
    details: [
      "Perform comprehensive assessments, administer IV medications, and initiate complex care plans.",
      "Provide epidural pain management, blood transfusions, and patient education.",
      "Strict adherence to infection control and sterile procedures in a high-paced environment."
    ],
    icon: Activity
  },
  {
    id: 2,
    role: "Clinical Assistant",
    institution: "Restore Medical Clinics",
    location: "Ottawa, ON",
    period: "Jan 2024 – May 2024",
    details: [
      "Supported chronic and urgent care management in high-volume drop-in clinics.",
      "Performed TB testing, immunizations, minor procedures, and wound care.",
      "Promoted wellness care and multidisciplinary collaboration."
    ],
    icon: Heart
  },
  {
    id: 3,
    role: "RN, Oncology-Hematology",
    institution: "Hôtel Dieu de France",
    location: "Academic Affiliation (France/Canada)",
    period: "Jun 2022 – May 2023",
    details: [
      "Delivered specialized oncology nursing care and precise EMR charting.",
      "Participated in quality initiatives and supervised junior nursing staff.",
      "Managed complex symptom control for palliative patients."
    ],
    icon: Thermometer
  },
  {
    id: 4,
    role: "RN, Ambulatory Hematology-Oncology",
    institution: "AUBMC (Johns Hopkins Affiliate)",
    location: "Beirut",
    period: "Dec 2019 – May 2022",
    details: [
      "Administered chemotherapy, blood products, IV antibiotics, and anticoagulants.",
      "Managed CVAD care, patient teaching, and pre-operative assessments.",
      "Orchestrated flow for high-volume chemotherapy infusion units."
    ],
    icon: Stethoscope
  },
  {
    id: 5,
    role: "RN, Bone Marrow Transplant Unit",
    institution: "AUBMC (Johns Hopkins Affiliate)",
    location: "Beirut",
    period: "Aug 2015 – Dec 2019",
    details: [
      "Managed oncology emergencies, strict isolation protocols, and post-transplant care.",
      "Led quality projects and SOP development for the unit.",
      "Supported COVID-19 initiatives and contributed to clinical practice councils."
    ],
    icon: Syringe
  }
];

const SKILLS = {
  clinical: [
    "IV Therapy", "Chemotherapy Admin", "Blood Transfusion", "CVAD Care", 
    "Chronic Disease Mgmt", "Oncology & Hematology", "Bone Marrow Transplant", "Wound Care"
  ],
  systems: [
    "EPIC", "Cerner", "DXcare", "IBM iSeries", "SPSS", "Microsoft Office Suite"
  ],
  professional: [
    "Bilingual (En/Fr)", "Preceptorship", "Research Support", "Quality Improvement", 
    "Crisis Management", "Interprofessional Collab", "Analytical Problem Solving"
  ]
};

/**
 * MAIN COMPONENT
 */
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Spy & Navbar Styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'skills', 'education', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4 mix-blend-multiply" />
      </div>

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer flex items-center gap-2" onClick={() => scrollTo('home')}>
            <div className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center font-serif text-lg">S</div>
            <span>Stephanie Bekhazi</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-500">
            {['About', 'Experience', 'Skills', 'Education', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`hover:text-teal-600 transition-colors ${activeSection === item.toLowerCase() ? 'text-teal-700' : ''}`}
              >
                {item}
              </button>
            ))}
            <button className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-teal-700 transition-all duration-300 shadow-lg shadow-teal-900/10 text-xs tracking-wider uppercase">
              Download CV
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg flex flex-col p-6 space-y-4 md:hidden animate-in slide-in-from-top-2">
            {['About', 'Experience', 'Skills', 'Education', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-left text-lg font-medium text-slate-600 py-2 border-b border-slate-50 last:border-0"
              >
                {item}
              </button>
            ))}
            <button className="w-full py-3 mt-4 bg-teal-600 text-white rounded-lg font-semibold">
              Download CV
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative z-10 pt-40 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-bold tracking-wider uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Available for Opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Evidence-informed care.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Compassionate advocacy.
              </span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-light mb-10">
              Bilingual Registered Nurse with 10+ years specializing in <span className="text-slate-800 font-medium">Oncology, Hematology, BMT</span> & <span className="text-slate-800 font-medium">Acute Care</span> across Canada, USA, and International settings.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('contact')} className="group px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-teal-700 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2">
                Connect with Stephanie
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-medium hover:border-teal-200 hover:text-teal-700 hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                <Download size={18} />
                Download Resume
              </button>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-70">
              {["Registered Nurse", "Bilingual (En/Fr)", "Oncology Specialist", "Quality Champion"].map((tag, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  <div className="h-px w-8 bg-slate-300"></div>
                  {tag}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT / SUMMARY SECTION */}
      <section id="about" className="relative z-10 py-20 px-6 bg-white border-y border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-teal-500"></span>
              <span className="text-teal-600 font-bold uppercase tracking-widest text-sm">Professional Identity</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 leading-snug mb-12">
              Committed to delivering safe, evidence-informed, and patient-centered care. Skilled in comprehensive assessments, therapeutic communication, and interprofessional collaboration.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            <Reveal delay={200}>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  With over a decade of clinical experience, my journey has taken me from the high-intensity units of Bone Marrow Transplant centers to outpatient clinics and medical-surgical wards. I thrive in environments that require critical thinking, emotional intelligence, and technical precision.
                </p>
                <p>
                  I am deeply engaged in mentoring nursing students, supporting reflective practice, and leading quality improvement initiatives aiming to enhance patient outcomes and strengthen health system performance.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="grid grid-cols-1 gap-4">
                {/* Licenses */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-100 hover:shadow-lg hover:shadow-teal-900/5 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <ShieldCheck className="text-teal-600 group-hover:scale-110 transition-transform" size={28} />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Licensure</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                      <span>CNO (Ontario)</span>
                      <span className="text-teal-600">Active</span>
                    </div>
                    <div className="h-px w-full bg-slate-200"></div>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                      <span>OIIQ (Québec)</span>
                      <span className="text-teal-600">Active</span>
                    </div>
                    <div className="h-px w-full bg-slate-200"></div>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                      <span>Texas Board (USA)</span>
                      <span className="text-teal-600">Registered</span>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-100 hover:shadow-lg hover:shadow-teal-900/5 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <Award className="text-blue-600 group-hover:scale-110 transition-transform" size={28} />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Certifications</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      BLS – Heart & Stroke Foundation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      NCLEX-RN (Next-Gen), 2023
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      European Society of Blood & Marrow Transplant
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="relative z-10 py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-16 md:text-center">
              <span className="text-teal-600 font-bold uppercase tracking-widest text-sm block mb-2">Career Journey</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Clinical Experience</h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>

            <div className="space-y-12">
              {EXPERIENCES.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                  <Reveal key={exp.id} delay={index * 100}>
                    <div className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      
                      {/* Spacer for Desktop */}
                      <div className="hidden md:block flex-1"></div>
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white border-4 border-teal-500 rounded-full md:-translate-x-1/2 mt-1.5 md:mt-0 z-10"></div>
                      
                      {/* Content Card */}
                      <div className={`flex-1 w-full pl-8 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 group">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                            <div className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm bg-teal-50 px-3 py-1 rounded-full w-fit">
                              <exp.icon size={14} />
                              {exp.period}
                            </div>
                            <div className="text-slate-400 text-xs font-medium uppercase tracking-wide flex items-center gap-1">
                              <MapPin size={12} /> {exp.location}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.role}</h3>
                          <div className="text-slate-600 font-medium mb-4">{exp.institution}</div>
                          
                          <ul className="space-y-2">
                            {exp.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                                <span className="mt-1.5 min-w-[6px] h-1.5 bg-slate-300 rounded-full group-hover:bg-teal-400 transition-colors"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="relative z-10 py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-6">
              <div>
                <span className="text-teal-600 font-bold uppercase tracking-widest text-sm block mb-2">Competencies</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Technical & Professional Matrix</h2>
              </div>
              <div className="hidden md:block text-slate-400 text-sm">
                Continuously updating skillset with modern practices.
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Clinical Skills */}
            <Reveal delay={100}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                    <Activity size={20} />
                  </div>
                  Clinical Expertise
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.clinical.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm rounded-lg hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Systems */}
            <Reveal delay={200}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Globe size={20} />
                  </div>
                  Systems & Tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.systems.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm rounded-lg hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Soft Skills */}
            <Reveal delay={300}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <Users size={20} />
                  </div>
                  Leadership & Soft Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.professional.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm rounded-lg hover:border-amber-200 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & EDUCATION SPLIT */}
      <section id="education" className="relative z-10 py-20 px-6 bg-slate-900 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Education */}
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-teal-400" size={24} />
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              <div className="space-y-8 border-l border-slate-700 pl-8 relative">
                <div className="relative">
                  <div className="absolute -left-[39px] top-1 w-5 h-5 bg-slate-900 border-4 border-teal-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white">Master of Science in Nursing</h3>
                  <p className="text-teal-400 text-sm font-medium mb-1">Administration & Management</p>
                  <p className="text-slate-400 text-sm mb-2">American University of Beirut | 2022 – Ongoing</p>
                  <span className="inline-block px-2 py-0.5 bg-teal-900/50 border border-teal-700 text-teal-300 text-xs rounded">GPA: 3.86 (Expected 2026)</span>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[39px] top-1 w-5 h-5 bg-slate-900 border-4 border-slate-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white">Bachelor of Science in Nursing</h3>
                  <p className="text-slate-400 text-sm mb-2">American University of Beirut | 2011 – 2015</p>
                </div>
              </div>
            </Reveal>

            {/* Leadership */}
            <Reveal delay={200}>
              <div className="flex items-center gap-3 mb-8">
                <Users className="text-teal-400" size={24} />
                <h2 className="text-2xl font-bold">Leadership Roles</h2>
              </div>
              <div className="grid gap-4">
                {[
                  { role: "Vice-chair, Work-Life Council", year: "2021–2022", desc: "Advocating for nursing wellbeing" },
                  { role: "Chair, Clinical Practice Council", year: "2019–2021", desc: "Medical-Surgical standardization" },
                  { role: "Champion, Quality Council", year: "2017–2019", desc: "Patient safety initiatives" }
                ].map((lead, i) => (
                  <div key={i} className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 group">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-lg text-white group-hover:text-teal-300 transition-colors">{lead.role}</h4>
                      <span className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded">{lead.year}</span>
                    </div>
                    <p className="text-sm text-slate-400">{lead.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-teal-900 to-slate-800 rounded-xl border border-teal-800/50">
                <h4 className="font-semibold text-teal-100 flex items-center gap-2 mb-2">
                  <FileText size={16} /> Research & Quality
                </h4>
                <p className="text-sm text-slate-300">
                  Actively contributing to quality improvement initiatives and patient safety research. Experienced in evidence-informed practice and strengthening health system performance.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Reveal>
            <div className="bg-slate-50 rounded-3xl p-8 md:p-16 text-center border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6 text-teal-600">
                <Mail size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Let's Connect</h2>
              <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">
                Open to opportunities in oncology, hematology, medical-surgical nursing, and nursing leadership roles in Ottawa and beyond.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                <a href="mailto:stephaniebekhazi@gmail.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-teal-700 transition-all text-lg group">
                  <Mail size={20} />
                  stephaniebekhazi@gmail.com
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="tel:343-988-3414" className="flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-medium hover:border-teal-200 hover:text-teal-700 hover:bg-teal-50 transition-all text-lg">
                  <Phone size={20} />
                  343-988-3414
                </a>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-slate-400 border-t border-slate-200 pt-8">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> Embrun, Ontario, Canada (K0A 1W0)
                </span>
                <span className="hidden md:block">•</span>
                <span className="flex items-center gap-1">
                  <Globe size={14} /> Willing to Relocate / Travel if needed
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-white border-t border-slate-100 text-center">
        <div className="container mx-auto px-6">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Stephanie Bekhazi. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default App;
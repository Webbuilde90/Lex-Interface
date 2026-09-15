import Link from "next/link";
import { ArrowRight, Linkedin, Mail } from "lucide-react";

export default function CareersPage() {
  return <>
    <section className="page-intro"><div className="page-wrap"><p className="section-label">Careers</p><h1 className="display">Make room for <em>good work.</em></h1><p className="lede">We are committed to attracting, investing in and retaining the best talent — people who care about the detail, the duty and the difference legal work makes.</p></div></section>
    <section className="dark-section"><div className="page-wrap">
      <div className="career-card"><div><p className="section-label">Join the practice</p><h2>Bring curiosity, judgement and a point of view.</h2><p>We welcome conversations with people who want to build a thoughtful, rigorous and responsive legal practice.</p></div><a className="btn" href="mailto:connect@lexlawoffices.com?subject=Career%20enquiry">Email the office <Mail size={16} /></a></div>
      <div className="career-card" style={{ marginTop: 16 }}><div><p className="section-label">Stay connected</p><h2>Follow the firm as it grows.</h2><p>For the latest firm updates and professional opportunities, visit our LinkedIn presence.</p></div><a className="btn secondary" href="https://www.linkedin.com/company/lex-interface/" target="_blank" rel="noreferrer">LinkedIn <Linkedin size={16} /></a></div>
      <div style={{ marginTop: 50 }}><Link className="person-link" href="/contact">General enquiries <ArrowRight size={14} /></Link></div>
    </div></section>
  </>;
}

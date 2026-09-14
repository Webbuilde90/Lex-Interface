import { Clock3, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

export default function ContactPage() {
  return <>
    <section className="page-intro"><div className="page-wrap"><p className="section-label">Contact Lex Interface</p><h1 className="display">Start with the <em>matter.</em></h1><p className="lede">Share the broad context and the timeline. We will help you find the right next conversation.</p></div></section>
    <section className="dark-section"><div className="page-wrap contact-layout"><div className="contact-details"><p className="section-label">Noida office</p><h2>Let’s make the next move clear.</h2><p>For client enquiries, careers and internships, reach the office directly or send a considered note using the form.</p><div className="contact-lines"><div className="contact-line"><MapPin size={19} /><div><span>Office</span>2715 &amp; 2716 Gold Tower, Wave One,<br />Sector 18, Noida,<br />Uttar Pradesh — 201301</div></div><div className="contact-line"><Phone size={19} /><div><span>Telephone</span><a href="tel:+919598364831">+91 95 9836 4831</a></div></div><div className="contact-line"><Clock3 size={19} /><div><span>Email</span><a href="mailto:connect@lexlawoffices.com">connect@lexlawoffices.com</a></div></div></div><a className="person-link" style={{ marginTop: 35 }} href="https://maps.google.com/?q=2715+2716+Gold+Tower+Wave+One+Sector+18+Noida+Uttar+Pradesh+201301" target="_blank" rel="noreferrer">Open in Google Maps <MapPin size={14} /></a></div><InquiryForm /></div></section>
  </>;
}

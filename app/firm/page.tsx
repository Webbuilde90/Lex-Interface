import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FirmPage() {
  return (
    <>
      <section className="page-intro"><div className="page-wrap"><p className="section-label">About Lex Interface</p><h1 className="display">Legal advice with <em>perspective.</em></h1><p className="lede">A boutique law firm delivering legal advice and services across a broad range of practices for corporates and business associations.</p></div></section>
      <section className="paper-section"><div className="page-wrap">
        <div className="intro-split"><div><p className="section-label">The firm</p><h2>One connected view of the matter.</h2></div><div><p>Lex Interface brings together a knowledgeable team of lawyers, attorneys, counsels, consultants and company secretaries. We coordinate resources around the real commercial and legal context of each instruction.</p><p>Our advice is designed to be tailor-made, practical and clear — so clients can understand the issue, decide with confidence and move forward with purpose.</p><Link className="person-link" href="/practice">Explore our practice areas <ArrowRight size={14} /></Link></div></div>
        <div className="facts" style={{ marginTop: 80 }}>{[['01', 'Broad practice coverage'], ['02', 'Commercially focused advice'], ['03', 'Coordinated legal resources'], ['04', 'Practical, tailor-made solutions']].map(([number, label]) => <div className="fact" key={number}><strong>{number}</strong><span>{label}</span></div>)}</div>
        <div className="principles">{[['01', 'Intellect', 'Deep legal thinking applied to the question in front of you.'], ['02', 'Coordination', 'The right people and resources brought together around the brief.'], ['03', 'Practicality', 'Advice that respects the business, timeline and desired outcome.'], ['04', 'Trust', 'A relationship built on discretion, clarity and consistent communication.']].map(([number, title, copy]) => <article className="principle" key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div></section>
      <section className="image-strip" aria-label="Lex Interface legal imagery"><div className="image-tile lady-image" title="Lady Justice"></div><div className="image-tile gavel-image" title="Gavel"></div><div className="image-tile scales-image" title="Scales of justice"></div></section>
    </>
  );
}

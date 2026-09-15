import Link from "next/link";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { people } from "@/lib/content";

export default function PeoplePage() {
  return <>
    <section className="page-intro"><div className="page-wrap"><p className="section-label">Our team / 6 advocates</p><h1 className="display">The people behind <em>the practice.</em></h1><p className="lede">A connected team of advocates bringing experience, responsiveness and practical judgement to every matter.</p></div></section>
    <section className="paper-section"><div className="page-wrap"><div className="section-head"><div><p className="section-label">Lex Interface on LinkedIn</p><h2>Meet the advocates.</h2></div><p className="lede">The team names and designations below are taken from the supplied firm information. Visit LinkedIn for the latest professional information.</p></div><div className="people-grid">{people.map((person, i) => <article className="person-card" key={person.name}><div><span className="section-label">{String(i + 1).padStart(2, "0")}</span><h3>{person.name}</h3><p>{person.role}</p></div><a className="person-link" href="https://www.linkedin.com/company/lex-interface/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a></article>)}</div><a className="btn" style={{ marginTop: 42 }} href="https://www.linkedin.com/company/lex-interface/" target="_blank" rel="noreferrer">View Lex Interface on LinkedIn <Linkedin size={16} /></a></div></section>
  </>;
}

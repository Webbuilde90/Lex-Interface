"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { practiceGroups } from "@/lib/content";

export default function PracticePage() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="page-intro"><div className="page-wrap"><p className="section-label">Practice areas / 6 groups / 23 services</p><h1 className="display">Experienced counsel for <em>important matters.</em></h1><p className="lede">From disputes and transactions to technology, regulatory, property and employment matters, our advice is built around the facts, the risk and the result that matters.</p></div></section>
      <section className="dark-section"><div className="page-wrap"><div className="practice-list">{practiceGroups.map((group, i) => <article className={`practice-item ${open === i ? "open" : ""}`} key={group.title}><span className="number">{String(i + 1).padStart(2, "0")}</span><h3>{group.title}</h3><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-label={`Toggle ${group.title}`}><ChevronDown size={22} style={{ transform: open === i ? "rotate(180deg)" : undefined }} /></button>{open === i && <p>{group.summary}<br /><br /><strong>{group.services.join(" · ")}</strong></p>}</article>)}</div><div className="section-head" style={{ marginTop: 90 }}><div><p className="section-label">Across the brief</p><h2>Legal work that stays close to the decision.</h2></div><p className="lede">Tell us what you are navigating. We can help identify the right starting point.</p></div></div></section>
    </>
  );
}

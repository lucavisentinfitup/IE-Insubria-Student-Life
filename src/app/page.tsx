"use client";

import { useState } from "react";
import { CalendarDays, GraduationCap, Home, Search, Sparkles, Users } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "people", label: "People", icon: Users },
  { id: "studies", label: "My Studies", icon: GraduationCap },
];

export default function Page() {
  const [active, setActive] = useState("home");
  return (
    <main className="app-shell">
      <header className="topbar"><div className="brand">IE!</div><button className="icon-button" aria-label="Cerca"><Search size={20}/></button></header>
      <section className="hero">
        <span className="eyebrow"><Sparkles size={14}/> INSUBRIA STUDENT LIFE</span>
        <h1>Università,<br/>ma fatta meglio.</h1>
        <p>Eventi, persone, studio e vita universitaria in un solo posto.</p>
      </section>
      <section className="content-card">
        <span className="eyebrow">{active.toUpperCase()}</span>
        <h2>{tabs.find(t => t.id === active)?.label}</h2>
        <p>La sezione è pronta per essere collegata ai dati reali della community IE!.</p>
      </section>
      <nav className="bottom-nav">
        {tabs.map(({id,label,icon:Icon}) => <button key={id} className={active===id?"active":""} onClick={()=>setActive(id)}><Icon size={20}/><span>{label}</span></button>)}
      </nav>
    </main>
  );
}

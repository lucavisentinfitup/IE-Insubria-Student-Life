'use client';

import { useEffect, useMemo, useState } from 'react';
import { Apple, Download, ExternalLink, MonitorSmartphone, ShieldCheck, Smartphone } from 'lucide-react';

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };

export default function InstallPage() {
  const [platform, setPlatform] = useState<'ios'|'android'|'desktop'>('desktop');
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const ipadDesktop = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    setPlatform(/iphone|ipad|ipod/.test(ua) || ipadDesktop ? 'ios' : /android/.test(ua) ? 'android' : 'desktop');
    setStandalone(window.matchMedia('(display-mode: standalone)').matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const handler = (e: Event) => { e.preventDefault(); setDeferred(e as InstallPromptEvent); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const apkUrl = process.env.NEXT_PUBLIC_ANDROID_APK_URL || '';

  const title = useMemo(() => standalone ? 'IE! è già installata.' : platform === 'ios' ? 'Installa IE! su iPhone o iPad.' : platform === 'android' ? 'Installa IE! su Android.' : 'Porta IE! sul tuo dispositivo.', [platform, standalone]);

  async function installPwa() {
    if (deferred) await deferred.prompt();
  }

  return <main className="install-shell">
    <header className="install-brand">IE!</header>
    <section className="install-hero">
      <span>INSTALL</span>
      <h1>{title}</h1>
      <p>Un’unica app per eventi, community, studi, deals e vita universitaria.</p>
    </section>

    {standalone ? <div className="install-card success"><ShieldCheck/><div><strong>READY!</strong><span>Apri IE! dalla schermata Home.</span></div></div> : null}

    {platform === 'android' && !standalone ? <>
      <button className="install-primary" onClick={installPwa} disabled={!deferred}><Download/> INSTALLA PWA</button>
      {apkUrl ? <a className="install-secondary" href={apkUrl}><Smartphone/> SCARICA APK <ExternalLink size={16}/></a> : <div className="install-secondary disabled"><Smartphone/> APK DISPONIBILE ALLA PRIMA RELEASE</div>}
      <p className="install-note">L’APK sarà disponibile qui nelle release pubblicate da GitHub Actions. Android può richiedere l’autorizzazione “Installa app sconosciute” per il browser usato.</p>
    </> : null}

    {platform === 'ios' && !standalone ? <>
      <div className="install-card"><Apple/><div><strong>INSTALLAZIONE IMMEDIATA</strong><span>Safari → Condividi → Aggiungi alla schermata Home → Apri come app web.</span></div></div>
      <div className="install-card muted"><ShieldCheck/><div><strong>WEB DISTRIBUTION</strong><span>Predisposta per una futura build nativa firmata/notarizzata Apple quando l’account sviluppatore sarà abilitato.</span></div></div>
    </> : null}

    {platform === 'desktop' && !standalone ? <>
      <button className="install-primary" onClick={installPwa} disabled={!deferred}><MonitorSmartphone/> INSTALLA IE!</button>
      <div className="install-card"><Smartphone/><div><strong>SMARTPHONE & TABLET</strong><span>Apri questa stessa pagina dal dispositivo che vuoi configurare.</span></div></div>
    </> : null}

    <a href="/" className="install-back">OPEN IE! →</a>
  </main>
}

import React from 'react';
import { SUPPORT_TRANSLATIONS } from '../utils/supportTranslations';
import { TERMS_TRANSLATIONS } from '../utils/termsTranslations';
import { PRIVACY_TRANSLATIONS } from '../utils/privacyTranslations';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'support';
  lang?: string;
}

export default function LegalPage({ type, lang = 'en' }: LegalPageProps) {
  const supportT = SUPPORT_TRANSLATIONS[lang] || SUPPORT_TRANSLATIONS['en'];
  const termsT = TERMS_TRANSLATIONS[lang] || TERMS_TRANSLATIONS['en'];
  const privacyT = PRIVACY_TRANSLATIONS[lang] || PRIVACY_TRANSLATIONS['en'];

  if (type === 'support') {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 md:px-12 bg-mystic-surface/40 border border-celestial-gold/35 dark:border-celestial-gold/15 rounded-3xl backdrop-blur-md font-sans text-left text-mystic-text-muted leading-relaxed">
        <h1 className="font-serif text-3xl md:text-5xl text-celestial-gold mb-2 font-normal">{supportT.title}</h1>
        <p className="text-lg text-mystic-text mb-8 font-light">{supportT.subtitle}</p>
        
        <hr className="border-celestial-gold/35 dark:border-celestial-gold/15 my-6" />

        <section className="space-y-6 text-sm font-light">
          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-6 mb-3 font-normal">{supportT.emailTitle}</h2>
            <p className="mb-4">
              {supportT.emailDesc}
            </p>
            <p className="font-mono bg-black/10 dark:bg-black/30 p-4 rounded-xl inline-block border border-celestial-gold/15">
              <strong>support@modonare.com</strong>
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-8" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mb-6 font-normal">{supportT.faqTitle}</h2>
            <div className="space-y-6">
              <div className="border border-celestial-gold/15 bg-mystic-surface/30 p-5 rounded-2xl">
                <h4 className="font-serif text-base text-celestial-gold mb-2 font-medium">Q: {supportT.q1}</h4>
                <p className="text-xs leading-relaxed text-mystic-text-muted">
                  {supportT.a1}
                </p>
              </div>

              <div className="border border-celestial-gold/15 bg-mystic-surface/30 p-5 rounded-2xl">
                <h4 className="font-serif text-base text-celestial-gold mb-2 font-medium">Q: {supportT.q2}</h4>
                <p className="text-xs leading-relaxed text-mystic-text-muted">
                  {supportT.a2}
                </p>
              </div>

              <div className="border border-celestial-gold/15 bg-mystic-surface/30 p-5 rounded-2xl">
                <h4 className="font-serif text-base text-celestial-gold mb-2 font-medium">Q: {supportT.q3}</h4>
                <p className="text-xs leading-relaxed text-mystic-text-muted">
                  {supportT.a3}
                </p>
              </div>

              <div className="border border-celestial-gold/15 bg-mystic-surface/30 p-5 rounded-2xl">
                <h4 className="font-serif text-base text-celestial-gold mb-2 font-medium">Q: {supportT.q4}</h4>
                <p className="text-xs leading-relaxed text-mystic-text-muted">
                  {supportT.a4}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <hr className="border-celestial-gold/35 dark:border-celestial-gold/15 my-8" />
        <div className="text-center text-xs text-mystic-text-muted/50 font-mono">
          &copy; 2026 MODONARE. {supportT.rights}
        </div>
      </div>
    );
  }

  if (type === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 md:px-12 bg-mystic-surface/40 border border-celestial-gold/35 dark:border-celestial-gold/15 rounded-3xl backdrop-blur-md font-sans text-left text-mystic-text-muted leading-relaxed">
        <h1 className="font-serif text-3xl md:text-5xl text-celestial-gold mb-2 font-normal">{privacyT.title}</h1>
        <div className="text-xs text-mystic-text-muted/65 font-mono mb-8">
          <strong>{privacyT.lastUpdated}</strong>
        </div>
        
        <hr className="border-celestial-gold/35 dark:border-celestial-gold/15 my-6" />

        <section className="space-y-6 text-sm font-light">
          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.introTitle}</h2>
            <p className="mb-4">
              {privacyT.introText1}
            </p>
            <p>
              {privacyT.introText2}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec1Title}</h2>
            <h3 className="font-serif text-lg text-celestial-gold/90 mt-4 mb-2 font-normal">{privacyT.sec1Sub1}</h3>
            <p className="mb-4">
              {privacyT.sec1Text1}
            </p>

            <h3 className="font-serif text-lg text-celestial-gold/90 mt-4 mb-2 font-normal">{privacyT.sec1Sub2}</h3>
            <p className="mb-4">
              {privacyT.sec1Text2}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec2Title}</h2>
            <p>
              {privacyT.sec2Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec3Title}</h2>
            <p>
              {privacyT.sec3Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec4Title}</h2>
            <p>
              {privacyT.sec4Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec5Title}</h2>
            <p>
              {privacyT.sec5Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec6Title}</h2>
            <p>
              {privacyT.sec6Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec7Title}</h2>
            <p>
              {privacyT.sec7Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec8Title}</h2>
            <p>
              {privacyT.sec8Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec9Title}</h2>
            <p>
              {privacyT.sec9Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec10Title}</h2>
            <p>
              {privacyT.sec10Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec11Title}</h2>
            <p>
              {privacyT.sec11Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec12Title}</h2>
            <p>
              {privacyT.sec12Text1}
            </p>
          </div>

          <hr className="border-celestial-gold/20 my-6" />

          <div>
            <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{privacyT.sec13Title}</h2>
            <p className="font-mono bg-black/10 dark:bg-black/30 p-4 rounded-xl space-y-1">
              <strong>MODONARE</strong><br />
              {privacyT.sec13Text1}<br />
              Email: privacy@modonare.com<br />
              Website: https://www.modonare.com<br />
              Support: support@modonare.com
            </p>
          </div>
        </section>
        
        <hr className="border-celestial-gold/35 dark:border-celestial-gold/15 my-8" />
        <div className="text-center text-xs text-mystic-text-muted/50 font-mono">
          &copy; 2026 MODONARE. {privacyT.rights}
        </div>
      </div>
    );
  }

  // Terms of Service View
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 md:px-12 bg-mystic-surface/40 border border-celestial-gold/35 dark:border-celestial-gold/15 rounded-3xl backdrop-blur-md font-sans text-left text-mystic-text-muted leading-relaxed">
      <h1 className="font-serif text-3xl md:text-5xl text-celestial-gold mb-2 font-normal">{termsT.title}</h1>
      <div className="text-xs text-mystic-text-muted/65 font-mono mb-8">
        <strong>{termsT.lastUpdated}</strong>
      </div>
      
      <hr className="border-celestial-gold/35 dark:border-celestial-gold/15 my-6" />

      <section className="space-y-6 text-sm font-light">
        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.introTitle}</h2>
          <p className="mb-4">
            {termsT.introText1}
          </p>
          <p>
            {termsT.introText2}
          </p>
        </div>

        <hr className="border-celestial-gold/20 my-6" />

        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.eligibilityTitle}</h2>
          <p>
            {termsT.eligibilityText}
          </p>
        </div>

        <hr className="border-celestial-gold/20 my-6" />

        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.accountTitle}</h2>
          <p>
            {termsT.accountText}
          </p>
        </div>

        <hr className="border-celestial-gold/20 my-6" />

        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.licenseTitle}</h2>
          <p>
            {termsT.licenseText}
          </p>
        </div>

        <hr className="border-celestial-gold/20 my-6" />

        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.ipTitle}</h2>
          <p>
            {termsT.ipText}
          </p>
        </div>

        <hr className="border-celestial-gold/20 my-6" />

        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.subTitle}</h2>
          <p className="mb-4">
            {termsT.subText}
          </p>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-celestial-gold/20 text-xs text-left font-mono">
              <thead>
                <tr className="bg-celestial-gold/10 border-b border-celestial-gold/20">
                  <th className="px-4 py-2 font-bold">{termsT.planCol}</th>
                  <th className="px-4 py-2 font-bold">{termsT.priceCol}</th>
                  <th className="px-4 py-2 font-bold">{termsT.periodCol}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-celestial-gold/10">
                  <td className="px-4 py-2">{termsT.weeklyPlan}</td>
                  <td className="px-4 py-2">$1.99</td>
                  <td className="px-4 py-2">{termsT.weeklyDesc}</td>
                </tr>
                <tr className="border-b border-celestial-gold/10">
                  <td className="px-4 py-2">{termsT.monthlyPlan}</td>
                  <td className="px-4 py-2">$7.99</td>
                  <td className="px-4 py-2">{termsT.monthlyDesc}</td>
                </tr>
                <tr className="border-b border-celestial-gold/10">
                  <td className="px-4 py-2">{termsT.annualPlan}</td>
                  <td className="px-4 py-2">$89.99</td>
                  <td className="px-4 py-2">{termsT.annualDesc}</td>
                </tr>
                <tr className="text-[#ffd175]/80 font-sans">
                  <td className="px-4 py-3" colSpan={3}>
                    {termsT.priceDisclaimer}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-celestial-gold/20 my-6" />

        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.disclaimerTitle}</h2>
          <p>
            {termsT.disclaimerText}
          </p>
        </div>

        <hr className="border-celestial-gold/20 my-6" />

        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.liabilityTitle}</h2>
          <p>
            {termsT.liabilityText}
          </p>
        </div>

        <hr className="border-celestial-gold/20 my-6" />

        <div>
          <h2 className="font-serif text-2xl text-celestial-gold mt-8 mb-4 font-normal">{termsT.contactTitle}</h2>
          <p className="font-mono bg-black/10 dark:bg-black/30 p-4 rounded-xl space-y-1">
            <strong>MODONARE</strong><br />
            Email: legal@modonare.com<br />
            Support: support@modonare.com<br />
            Website: https://www.modonare.com
          </p>
        </div>
      </section>
      
      <hr className="border-celestial-gold/35 dark:border-celestial-gold/15 my-8" />
      <div className="text-center text-xs text-mystic-text-muted/50 font-mono">
        &copy; 2026 MODONARE. {termsT.rights}
      </div>
    </div>
  );
}

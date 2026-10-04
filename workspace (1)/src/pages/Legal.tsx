import React from 'react';
import { FadeIn } from '../components/Animations';

function LegalLayout({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: React.ReactNode }) {
  return (
    <div>
      <section className="py-16 md:py-20 bg-[#F5F0E8]/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl text-[#2D2926] mb-2">{title}</h1>
            <p className="text-sm text-[#2D2926]/40">Last updated: {lastUpdated}</p>
          </FadeIn>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-[#2D2926]/70 leading-relaxed space-y-6">{children}</div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-xl text-[#2D2926] mb-3">{title}</h2>
      <div className="text-sm text-[#2D2926]/60 leading-relaxed">{children}</div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 2025">
      <Section title="Introduction"><p>Treasured Tips is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p></Section>
      <Section title="Information We Collect"><p>When you book an appointment, we collect your full name, email address, phone number, and appointment preferences.</p></Section>
      <Section title="How We Use Your Information"><p>Your information is used to process bookings, communicate about appointments, provide services, and respond to enquiries.</p></Section>
      <Section title="Data Storage"><p>Your booking information is stored securely. We do not sell, share, or distribute your personal data to third parties.</p></Section>
      <Section title="Your Rights"><p>You have the right to request a copy of data we hold, request corrections, request deletion, and withdraw consent. Contact us to exercise these rights.</p></Section>
    </LegalLayout>
  );
}

export function TermsConditions() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="January 2025">
      <Section title="Booking"><p>By booking an appointment with Treasured Tips, you agree to these terms. All appointments are subject to availability and confirmation.</p></Section>
      <Section title="Appointments"><p>Please arrive on time. If you are more than 15 minutes late, we may need to shorten or reschedule your service.</p></Section>
      <Section title="Cancellations & Rescheduling"><p>We ask for at least 24 hours' notice for cancellations or rescheduling. Repeated no-shows may affect future booking availability.</p></Section>
      <Section title="Deposits"><p>Some services may require a deposit. Details will be confirmed at the time of booking.</p></Section>
      <Section title="Services"><p>All services are carried out with care and attention. If you're not satisfied, please let Amber know before leaving.</p></Section>
      <Section title="Health & Safety"><p>Please inform Amber of any allergies, skin conditions, or nail concerns before your appointment.</p></Section>
    </LegalLayout>
  );
}

export function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="January 2025">
      <Section title="What Are Cookies"><p>Cookies are small text files stored on your device when you visit a website. They help the website function properly.</p></Section>
      <Section title="How We Use Cookies"><p>Treasured Tips uses essential cookies to keep the website functioning, remember your booking progress, and store preferences. We do not use tracking cookies.</p></Section>
      <Section title="Managing Cookies"><p>You can control and delete cookies through your browser settings. Disabling cookies may affect booking system functionality.</p></Section>
    </LegalLayout>
  );
}

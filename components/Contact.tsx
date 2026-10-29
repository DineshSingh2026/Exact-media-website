import type { ReactNode } from "react";
import { contact, type IconName } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";

const headingId = `${contact.id}-heading`;

function ContactItem({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-paper-line bg-paper text-accent-ink">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0 pt-0.5">
        <h3 className="text-sm font-semibold text-paper-fg">{label}</h3>
        <div className="mt-1 text-[15px] leading-relaxed text-paper-muted">{children}</div>
      </div>
    </div>
  );
}

export function Contact() {
  const { location, email } = contact;
  const hasEmail = email.address.includes("@");

  return (
    <section id={contact.id} aria-labelledby={headingId} className="bg-paper py-16 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id={headingId} eyebrow={contact.eyebrow} title={contact.heading} />

            <RevealGroup className="mt-10 lg:mt-12">
              <div className="space-y-8">
                <RevealItem>
                  <ContactItem icon={location.icon} label={location.label}>
                    <span className="block font-medium text-paper-fg">{location.company}</span>
                    <address className="not-italic">{location.address}</address>
                  </ContactItem>
                </RevealItem>
                <RevealItem>
                  <ContactItem icon={email.icon} label={email.label}>
                    <span className="block">{email.text}</span>
                    {hasEmail ? (
                      <a
                        href={`mailto:${email.address}`}
                        className="break-words font-medium text-accent-ink underline-offset-4 hover:underline focus-visible:underline"
                      >
                        {email.address}
                      </a>
                    ) : (
                      <span className="block break-words font-medium text-paper-fg">{email.address}</span>
                    )}
                  </ContactItem>
                </RevealItem>
              </div>
            </RevealGroup>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl bg-paper-subtle p-2 sm:p-3">
              <Card className="p-6 shadow-soft sm:p-8">
                <ContactForm />
              </Card>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

import { contacts, site } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="pt-20 lg:pt-28">
      <SectionHeading zone="F" title="Contact" meta="J1 · 7-pin" />
      <a
        href={`mailto:${site.email}`}
        className="link text-2xl font-semibold tracking-tight break-all sm:text-4xl"
      >
        {site.email}
      </a>
      {/* Laid out as a connector pinout */}
      <ol className="mt-8 grid border-b border-rule sm:grid-cols-2 sm:gap-x-12">
        {contacts.map((contact, index) => (
          <li key={contact.signal} className="grid grid-cols-[2rem_6rem_1fr] items-baseline border-t border-rule py-2.5">
            <span className="label">{index + 1}</span>
            <span className="label !text-ink-2">{contact.signal}</span>
            <a
              href={contact.href}
              {...(contact.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="link truncate font-mono text-[13px]"
            >
              {contact.value}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

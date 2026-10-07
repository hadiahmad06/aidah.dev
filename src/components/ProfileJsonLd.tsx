import { contacts, education, seo, site } from "@/data/profile";

// Structured data so search engines can tie this page, the name and the other profiles together
export default function ProfileJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: site.revised,
    mainEntity: {
      "@type": "Person",
      name: site.name,
      url: site.url,
      description: seo.description,
      affiliation: { "@type": "CollegeOrUniversity", name: education.school },
      knowsAbout: seo.topics,
      sameAs: contacts.filter((contact) => contact.profile).map((contact) => contact.href),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

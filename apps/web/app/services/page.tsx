import Link from "next/link";

import { Section } from "@company/ui";

import { services } from "../../lib/content";

export default function ServicesPage() {
  return (
    <Section
      eyebrow="Future Scope"
      title="Hosted services and APIs are reserved for a later launch phase."
      description="This platform is intentionally focused on software products today. Service capabilities remain possible later without shaping the current customer experience."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={service.slug}>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              <span>{service.category}</span>
              <span>{service.serviceExposureType.replaceAll("_", " ")}</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950">{service.name}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{service.shortDescription}</p>
            <Link className="mt-6 inline-flex text-sm font-semibold text-brand-700" href={`/services/${service.slug}`}>
              View roadmap note
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

import Link from "next/link";

import { FeatureCard, Section } from "@company/ui";

export default function DocsHomePage() {
  return (
    <Section
      eyebrow="Developer Docs"
      title="Integrate hosted services without mixing them into platform auth."
      description="These docs focus on services sold by the company platform, starting with the Authentication Service and the public API gateway layer."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <FeatureCard title="Authentication Service" description="Hosted auth product at auth.company.com with tenant references, API keys, and environment-aware onboarding." />
        <FeatureCard title="API Gateway" description="Central entry at api.company.com for versioned service routing, rate limits, request logging, and future service expansion." />
      </div>
      <div className="mt-8 flex gap-4">
        <Link className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white" href="/auth-service">
          Read auth docs
        </Link>
        <Link className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white" href="/api-gateway">
          Read gateway docs
        </Link>
      </div>
    </Section>
  );
}


import { FeatureCard, Section } from "@company/ui";

const example = `curl --request GET \\
  --url https://api.company.com/v1/auth/tenants/me \\
  --header "X-API-Key: live_sk_..."`;

export default function AuthServiceDocsPage() {
  return (
    <Section
      eyebrow="Authentication Service"
      title="Hosted auth APIs sold as a product, not reused as platform login."
      description="Every subscribing organization can be mapped to an external tenant through a customer tenant reference while keeping platform auth completely separate."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Base URL" description="auth.company.com for service-native endpoints and api.company.com for routed public traffic." />
        <FeatureCard title="API key environments" description="Issue separate test and live credentials from the customer portal." />
        <FeatureCard title="Tenant mapping" description="Use customer tenant references to match platform organizations to service-side tenants." />
      </div>
      <pre className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200">
        <code>{example}</code>
      </pre>
    </Section>
  );
}


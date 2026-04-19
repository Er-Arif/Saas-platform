import { FeatureCard, Section } from "@company/ui";

const example = `GET /v1/auth/sessions
Host: api.company.com
X-API-Key: live_sk_...
X-Request-Id: generated-by-gateway`;

export default function ApiGatewayDocsPage() {
  return (
    <Section
      eyebrow="API Gateway"
      title="One routing layer for public services."
      description="The gateway is responsible for service routing, version selection, key-aware authentication, rate limiting, and request logging."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Routing" description="Resolve traffic to the correct service backend by service slug and version prefix." />
        <FeatureCard title="Rate limits" description="Apply plan- and service-specific policies before upstream forwarding." />
        <FeatureCard title="Logs and traceability" description="Attach request IDs and emit request logs that can later be linked to usage summaries." />
      </div>
      <pre className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200">
        <code>{example}</code>
      </pre>
    </Section>
  );
}


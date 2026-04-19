import { FeatureCard, Section } from "@company/ui";

const example = `POST /api/v1/product-client/products/restaurant-pos/updates/check
{
  "license_key": "POS-ACME-2026-DEMO-KEY",
  "machine_fingerprint": "device-fingerprint-demo",
  "platform": "Windows",
  "current_version": "3.1.0"
}`;

export default function AuthServiceDocsPage() {
  return (
    <Section
      eyebrow="Legacy Route"
      title="This route now documents desktop-product updates instead of a live auth service."
      description="The active platform scope is product-first. Use the product-client APIs to check entitlement and receive a signed installer URL when an update is available."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="License aware" description="Update checks run only after the platform confirms the product license and machine binding." />
        <FeatureCard title="Release aware" description="The response includes latest version, checksum, release notes, and an entitled download URL." />
        <FeatureCard title="Future-safe" description="You can still add hosted services later without redesigning the product update contract." />
      </div>
      <pre className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200">
        <code>{example}</code>
      </pre>
    </Section>
  );
}

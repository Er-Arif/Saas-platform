import { Section } from "@company/ui";

const example = `POST /api/v1/product-client/products/restaurant-pos/license/activate
{
  "license_key": "POS-ACME-2026-DEMO-KEY",
  "machine_fingerprint": "device-fingerprint-demo",
  "machine_name": "SUNRISE-POS-01",
  "platform": "Windows",
  "current_version": "3.1.0"
}`;

export default function DesktopProductsDocsPage() {
  return (
    <Section
      eyebrow="Desktop Product Integration"
      title="Wire your desktop app to the platform for licensing and updates."
      description="Use the product-client endpoints to activate a machine, verify entitlement, check for updates, and download the next signed installer release."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">1. Activate</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Bind a license to a machine fingerprint and register a device under the owning organization.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">2. Verify</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Validate that the machine is still entitled to run and learn whether an update is available.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">3. Download</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Use a short-lived signed URL generated only after entitlement and machine-binding checks pass.</p>
        </div>
      </div>
      <pre className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200">
        <code>{example}</code>
      </pre>
    </Section>
  );
}

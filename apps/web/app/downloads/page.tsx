import Link from "next/link";

import { Section } from "@company/ui";

export default function DownloadsPage() {
  return (
    <Section
      eyebrow="Downloads"
      title="Private downloads now live inside the main product workspace."
      description="Customers can sign in once and access installers, release notes, checksums, and entitled software versions from the connected dashboard."
    >
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm leading-7 text-slate-600">
          Use the unified dashboard to access product downloads, version history, and signed delivery links tied to
          your organization licenses.
        </p>
        <Link className="mt-6 inline-flex text-sm font-semibold text-brand-700" href="/dashboard/downloads">
          Open downloads center
        </Link>
      </div>
    </Section>
  );
}

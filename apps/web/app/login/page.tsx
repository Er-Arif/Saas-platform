import { Section } from "@company/ui";

import { InquiryForm } from "../../components/forms";

export default function LoginPage() {
  return (
    <Section
      eyebrow="Platform Auth"
      title="Log in to the company platform."
      description="This login is only for company.com, app.company.com, and admin.company.com. It is separate from any customer-facing Auth Service you sell as a product."
    >
      <InquiryForm description="Connect this form to `/api/v1/auth/login`." fields={["Email", "Password"]} title="Platform login" />
    </Section>
  );
}


import { Section } from "@company/ui";

import { InquiryForm } from "../../components/forms";

export default function SignupPage() {
  return (
    <Section
      eyebrow="Platform Auth"
      title="Create your organization account."
      description="Signing up creates a company-platform account and a default organization for billing, purchases, downloads, API access, and support."
    >
      <InquiryForm
        description="Connect this form to `/api/v1/auth/signup`."
        fields={["Full name", "Work email", "Organization name", "Password"]}
        title="Create account"
      />
    </Section>
  );
}


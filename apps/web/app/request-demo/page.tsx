import { Section } from "@company/ui";

import { InquiryForm } from "../../components/forms";

export default function RequestDemoPage() {
  return (
    <Section
      eyebrow="Request demo"
      title="Book a guided walkthrough for your team."
      description="Demo requests feed directly into the lead pipeline so your team can qualify product fit, rollout size, and licensing requirements."
    >
      <InquiryForm
        description="Choose the product you want to evaluate and share your deployment goals."
        fields={["Name", "Work email", "Company", "Preferred date"]}
        title="Request a demo"
      />
    </Section>
  );
}

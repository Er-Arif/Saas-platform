import { Section } from "@company/ui";

import { InquiryForm } from "../../components/forms";

export default function RequestDemoPage() {
  return (
    <Section
      eyebrow="Request demo"
      title="Book a guided walkthrough for your team."
      description="Demo requests feed directly into the lead pipeline so admin users can schedule and track enterprise conversations."
    >
      <InquiryForm
        description="Choose the product or service you want to evaluate and share your goals."
        fields={["Name", "Work email", "Company", "Preferred date"]}
        title="Request a demo"
      />
    </Section>
  );
}

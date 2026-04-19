import { Section } from "@company/ui";

import { InquiryForm } from "../../components/forms";

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Talk to our team about products, rollouts, licensing, or support."
      description="This form maps to the platform contact request workflow so leads can be triaged from the admin panel."
    >
      <InquiryForm
        description="Share your use case and our team will respond with the right next step."
        fields={["Name", "Work email", "Company", "Phone"]}
        title="Contact us"
      />
    </Section>
  );
}

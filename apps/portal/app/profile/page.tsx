import { FeatureCard, Section } from "@company/ui";

export default function ProfilePage() {
  return (
    <Section
      eyebrow="Profile & Security"
      title="Manage profile, company, and security settings."
      description="The architecture is ready for password changes, session management, email verification, and future 2FA rollout without conflating it with the external Authentication Service."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Organization profile" description="Legal name, GSTIN, billing email, and operating details belong to the organization." />
        <FeatureCard title="User profile" description="Each member can manage their contact details and role-specific access." />
        <FeatureCard title="Security roadmap" description="Session lists, rotated refresh tokens, email verification, and 2FA-ready architecture are already part of the backend model." />
      </div>
    </Section>
  );
}


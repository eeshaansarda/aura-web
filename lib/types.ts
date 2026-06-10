// Mirrors types/cloud.ts in the Aura mobile repo — the get-profile Edge
// Function contract. Schema changes must be coordinated across both repos.

export interface LabelledValue {
  id: string;
  value: string;
  label: string;
}

export interface SocialEntry {
  platform: string;
  value: string;
  label: string;
}

export interface DbProfile {
  id: string;
  is_master: boolean;
  label: string | null;
  name: string;
  company: string | null;
  title: string | null;
  phones: LabelledValue[];
  emails: LabelledValue[];
  websites: LabelledValue[];
  addresses: LabelledValue[];
  social_links: SocialEntry[];
  avatar_url: string | null;
}

export interface ProfileResponse {
  profile: DbProfile;
  userSlug: string;
}

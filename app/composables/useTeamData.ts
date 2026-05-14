export interface TeamMember {
  slug: string
  name: string
  role: { en: string; de: string; ar: string }
  bio: { en: string; de: string; ar: string }
  photo: string
}

const teamMembers: TeamMember[] = [
  {
    slug: "zeinab-marhij",
    name: "Zeinab Marhij",
    role: { en: "Marketing", de: "Marketing", ar: "Marketing" },
    bio: {
      en: "Zeinab helps clients navigate German immigration.",
      de: "Zeinab hilft Kunden bei deutschen Einwanderungsverfahren.",
      ar: "زينب مرهح تساعد العملاء في إجراءات الهجرة الألمانية.",
    },
    photo: "/team/zeinab-marhij.webp",
  },
  {
    slug: "sandy-nbeaa",
    name: "Sandy Nbeaa",
    role: { en: "Marketing", de: "Marketing", ar: "Marketing" },
    bio: {
      en: "Sandy helps clients navigate German immigration.",
      de: "Sandy hilft Kunden bei deutschen Einwanderungsverfahren.",
      ar: "ساندي نبيعة تساعد العملاء في إجراءات الهجرة الألمانية.",
    },
    photo: "/team/sandy-nbeaa.webp",
  },
]

export function useTeamData() {
  const findBySlug = (slug: string) =>
    teamMembers.find((m) => m.slug === slug) ?? null

  return { teamMembers, findBySlug }
}

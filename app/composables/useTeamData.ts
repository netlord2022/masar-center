export interface TeamMember {
  slug: string
  name: string
  role: string
  bio: { en: string; de: string; ar: string }
  photo: string
}

const setBio = (name: string, locale: string, feminine: boolean) => {
  switch (locale) {
    case "en":
      return `${name} is a key member of the Masar team in Germany. ${name} is dedicated to guiding you through your academic and professional journey, ensuring your application meets all German official requirements.`
    case "de":
      return `${name} ist Teil des Masar-Teams in Deutschland. Mit Fachwissen und Engagement unterstützt ${name} Sie bei der Vorbereitung Ihrer Unterlagen für Studium und Beruf, um Ihren Erfolg in Deutschland zu sichern.`
    case "ar":
      if (feminine) {
        return `${name} هي جزء من فريق مسار في ألمانيا، تعمل بشغف لتوجيهكم في رحلتكم الأكاديمية والمهنية، وتقدم خبرتها لضمان تجهيز ملفاتكم للدراسة والعمل وفق المعايير الألمانية الرسمية.`
      } else {
        return `${name} هو جزء من فريق مسار في ألمانيا، يعمل بشغف لتوجيهكم في رحلتكم الأكاديمية والمهنية، ويقدم خبرته لضمان تجهيز ملفاتكم للدراسة والعمل وفق المعايير الألمانية الرسمية.`
      }
    default:
      return ""
  }
}

const localedBio = (
  name: string,
  arabicName: string,
  feminine: boolean
): { en: string; de: string; ar: string } => {
  return {
    en: setBio(name, "en", feminine),
    de: setBio(name, "de", feminine),
    ar: setBio(arabicName, "ar", feminine),
  }
}

const teamMembers: TeamMember[] = [
  {
    slug: "zeinab-marhij",
    name: "Zeinab Marhij",
    role: "Marketing",
    bio: localedBio("Zeinab", "زينب ", true),
    photo: "/team/zeinab-marhij.webp",
  },
  {
    slug: "sandy-nbeaa",
    name: "Sandy Nbeaa",
    role: "Marketing",
    bio: localedBio("Sandy", "ساندي", true),
    photo: "/team/sandy-nbeaa.webp",
  },
  {
    slug: "batoul-mohammad",
    name: "Batoul Mohammad",
    role: "Marketing",
    bio: localedBio("Batoul", "بتول", true),
    photo: "/team/batoul-mohammad.webp",
  },
  {
    slug: "rama-ismaeel",
    name: "Rama Ismaeel",
    role: "Branch Manager",
    bio: localedBio("Rama", "راما", true),
    photo: "/team/rama-ismaeel.webp",
  },
  {
    slug: "afraa-ebraheem",
    name: "Afraa Ebraheem",
    role: "Community Manager",
    bio: localedBio("Afraa", "عفراء", true),
    photo: "/team/afraa-ebraheem.webp",
  },
]

export function useTeamData() {
  const findBySlug = (slug: string) =>
    teamMembers.find((m) => m.slug === slug) ?? null

  return { teamMembers, findBySlug }
}

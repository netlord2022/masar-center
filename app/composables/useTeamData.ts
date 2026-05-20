export interface TeamMember {
  slug: string
  name: string
  role: string
  bio: { en: string; de: string; ar: string }
  photo: string
  facebook?: string
  instagram?: string
  linkedin?: string
  mail?: string
}

const setBio = (name: string, locale: string, feminine: boolean) => {
  switch (locale) {
    case "en":
      return `${name} is a key member of the Masar team. ${name} is dedicated to guiding you through your academic and professional journey, ensuring your application meets all German official requirements.`
    case "de":
      return `${name} ist Teil des Masar-Teams. Mit Fachwissen und Engagement unterstützt ${name} Sie bei der Vorbereitung Ihrer Unterlagen für Studium und Beruf, um Ihren Erfolg in Deutschland zu sichern.`
    case "ar":
      if (feminine) {
        return `${name} هي جزء من فريق مسار ، تعمل بشغف لتوجيهكم في رحلتكم الأكاديمية والمهنية، وتقدم خبرتها لضمان تجهيز ملفاتكم للدراسة والعمل وفق المعايير الألمانية الرسمية.`
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
    slug: "morhaf-esmail",
    name: "Morhaf Esmail",
    role: "Co-founder & CEO",
    bio: localedBio("Morhaf", "مرهف", false),
    photo: "/team/morhaf-esmail.webp",
  },
  {
    slug: "rami-ismaeel",
    name: "Rami Ismaeel",
    role: "Co-founder & MD",
    bio: localedBio("Rami", "رامي", false),
    photo: "/team/rami-ismaeel.webp",
  },
  {
    slug: "zeinab-marhij",
    name: "Zeinab Marhij",
    role: "Marketing",
    bio: localedBio("Zeinab", "زينب ", true),
    photo: "/team/zeinab-marhij.webp",
    facebook: "https://www.facebook.com/share/1D24QWoUAA",
    instagram: "https://www.instagram.com/zeinabmasar.co?igsh=ZnVlNzJmN3Bud3Rm",
  },
  {
    slug: "sandy-nbeaa",
    name: "Sandy Nbeaa",
    role: "Marketing",
    bio: localedBio("Sandy", "ساندي", true),
    photo: "/team/sandy-nbeaa.webp",
    facebook: "https://www.facebook.com/share/1BV3ivYMrJ/",
    instagram:
      "https://www.instagram.com/sandy.masar990?igsh=MXF5eHdjY2d5MzNjaw==",
  },
  {
    slug: "batoul-mohammad",
    name: "Batoul Mohammad",
    role: "Marketing",
    bio: localedBio("Batoul", "بتول", true),
    photo: "/team/batoul-mohammad.webp",
    facebook: "https://www.facebook.com/share/18pzVCHujJ/",
    instagram: "https://www.instagram.com/batoulmasarco?igsh=dWN0OWc3NWhuMDhv",
  },
  {
    slug: "rama-ismaeel",
    name: "Rama Ismaeel",
    role: "Branch Manager",
    bio: localedBio("Rama", "راما", true),
    photo: "/team/rama-ismaeel.webp",
    instagram: "https://www.instagram.com/ramresla?igsh=Y3Nib213MHZyYTRl",
    mail: "ramasar.ug@gmail.com",
  },
  {
    slug: "afraa-ebraheem",
    name: "Afraa Ebraheem",
    role: "Community Manager",
    bio: localedBio("Afraa", "عفراء", true),
    photo: "/team/afraa-ebraheem.webp",
    instagram:
      "https://www.instagram.com/masar.ug.de?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    facebook: "https://www.facebook.com/profile.php?id=61585719966946",
  },
  {
    slug: "suriana-barshin",
    name: "Suriana Barshin",
    role: "Marketing",
    bio: localedBio("Suriana", "سوريانا", true),
    photo: "/team/suriana-barshin.webp",
    instagram: "https://www.instagram.com/sirina.masar?igsh=OXlsMjlzZHRhM2Nq",
    facebook:
      "https://www.facebook.com/profile.php?id=61588880985324&mibextid=rS40aB7S9Ucbxw6v",
  },
  {
    slug: "tala-alsairafi",
    name: "Tala Alsairafi",
    role: "Marketing",
    bio: localedBio("Tala", "تالا", true),
    photo: "/team/tala-alsairafi.webp",
    facebook: "https://www.facebook.com/share/19wSt7ZAk7/",
  },
  {
    slug: "ronaq-ismail",
    name: "Ronaq Ismail",
    role: "Marketing",
    bio: localedBio("Ronaq", "رونق", true),
    photo: "/team/ronaq-ismail.webp",
    instagram:
      "https://www.instagram.com/ronaq.masar?igsh=MTZ3Yjlvbzg1N3JmYg==",
    facebook: "https://www.facebook.com/share/17k1k5zZHy/",
  },
  {
    slug: "lama-kassem",
    name: "Lama Kassem",
    role: "Marketing",
    bio: localedBio("Lama", "لما", true),
    photo: "/team/lama-kassem.webp",
    instagram: "",
    facebook: "",
  },
]

export function useTeamData() {
  const findBySlug = (slug: string) =>
    teamMembers.find((m) => m.slug === slug) ?? null

  return { teamMembers, findBySlug }
}

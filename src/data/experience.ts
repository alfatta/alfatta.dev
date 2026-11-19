export interface WorkExperience {
  title: string;
  company: string;
  date: string;
  employmentType: string;
  location: string;
  workMode?: string;
  category: "engineering" | "teaching";
  current?: boolean;
  highlights: string[];
  technologies: string[];
  links?: { label: string; href: string }[];
}

// Experience dates and responsibilities from the LinkedIn profile.
// https://www.linkedin.com/in/alfattarezqa/details/experience/
export const workExperiences: WorkExperience[] = [
  {
    title: "Senior Frontend Developer — Investment",
    company: "Ajaib",
    date: "Feb 2026 – Present",
    employmentType: "Full-time",
    location: "Greater Jakarta, Indonesia",
    workMode: "Hybrid",
    category: "engineering",
    current: true,
    highlights: [
      "Develop Ajaib Terminal, a cross-platform desktop trading application.",
    ],
    technologies: ["React", "Tauri", "Rust", "WebSocket"],
    links: [{ label: "Ajaib Terminal", href: "https://ajaib.co.id/terminal" }],
  },
  {
    title: "Senior Frontend Developer — Money & Payment",
    company: "Ajaib",
    date: "Oct 2025 – Feb 2026",
    employmentType: "Full-time",
    location: "Jakarta, Indonesia",
    workMode: "Hybrid",
    category: "engineering",
    highlights: [
      "Developed the Ajaib savings feature and USD and Forex Wallet pages for deposits and withdrawals.",
      "Collaborated across business units to bring USD and Forex Wallet into a single page.",
      "Worked with the native team to integrate webview pages into the Ajaib mobile app.",
    ],
    technologies: ["Next.js", "WebView"],
    links: [{ label: "Tabungan Ajaib", href: "https://ajaib.co.id/tabungan" }],
  },
  {
    title: "Senior Frontend Developer",
    company: "TixFly",
    date: "Dec 2023 – Oct 2025",
    employmentType: "Full-time",
    location: "Jakarta, Indonesia",
    workMode: "On-site",
    category: "engineering",
    highlights: [
      "Built the TixFly microsite for event ticket purchases and venue bookings.",
      "Maintained the dashboard for managing event and venue data.",
      "Developed the seating plan feature for the TixFly microsite.",
    ],
    technologies: ["Vue.js", "Nuxt"],
  },
  {
    title: "Senior Frontend Developer",
    company: "Digiresto",
    date: "Dec 2020 – Nov 2023",
    employmentType: "Full-time",
    location: "Jakarta, Indonesia",
    workMode: "Hybrid",
    category: "engineering",
    highlights: [
      "Maintained the Digiresto microsite, kiosk application, and Flutter iOS app.",
      "Built the Digifood driver microsite for managing order deliveries with Vue.js and Express.js.",
      "Joined the Pawoon POS team to maintain the Pawoon Order microsite and Flutter iOS app.",
      "Built the Pawoon POS website for the desktop platform with React.",
    ],
    technologies: ["Vue.js", "Express", "Flutter", "React"],
  },
  {
    title: "Part-time Trainer",
    company: "HiColleagues",
    date: "Oct 2022 – Aug 2023",
    employmentType: "Part-time",
    location: "Jakarta, Indonesia",
    workMode: "Hybrid",
    category: "teaching",
    highlights: [
      "Delivered a software development webinar for college students and training for two companies.",
      "Taught JavaScript fundamentals, Vue.js, and Flutter.",
    ],
    technologies: ["JavaScript", "Vue.js", "Flutter"],
  },
  {
    title: "Part-time Trainer",
    company: "Purwadhika Digital Technology School",
    date: "May 2019 – Nov 2021",
    employmentType: "Part-time",
    location: "Jakarta, Indonesia",
    category: "teaching",
    highlights: [
      "Taught five classes in web and mobile development.",
      "Covered JavaScript fundamentals, frontend development with jQuery, Bootstrap, and React, and mobile development with React Native.",
      "Taught Express.js, MongoDB, MySQL, PostgreSQL, Firebase, Jenkins, and agile development with Scrum.",
    ],
    technologies: [
      "JavaScript",
      "React",
      "React Native",
      "Express",
      "Firebase",
      "Jenkins",
    ],
  },
  {
    title: "Frontend Developer",
    company: "DAM Corporation",
    date: "Aug 2018 – Jan 2021",
    employmentType: "Full-time",
    location: "Jakarta, Indonesia",
    workMode: "Hybrid",
    category: "engineering",
    highlights: [
      "Initiated the DAMCorp WhatsApp Business dashboard for messages, contacts, and scheduling with Vue.js and Express.js.",
      "Researched and prototyped IoT systems for RanchMarket’s unmanned store and Centre Park’s automatic gate.",
      "Initiated and maintained the Digiresto microsite and kiosk application with Vue.js and Express.js.",
      "Helped maintain Digiresto order chatbots connected to the WhatsApp Business API.",
    ],
    technologies: ["Vue.js", "Express", "WhatsApp Business API", "IoT"],
    links: [{ label: "DAMCorp dashboard", href: "https://panel.damcorp.id" }],
  },
  {
    title: "Web Developer",
    company: "PT Digital Artha Media",
    date: "Feb 2018 – Aug 2018",
    employmentType: "Full-time",
    location: "Jakarta, Indonesia",
    workMode: "On-site",
    category: "engineering",
    highlights: [
      "Researched Vue.js and developed a frontend codebase.",
      "Built an admin dashboard for ticket generation, ticketing reports, and online ticket printing at TWC Prambanan.",
      "Built a promotions and push notification dashboard for the eCash app.",
      "Researched the WhatsApp Business API.",
    ],
    technologies: ["PHP", "Vue.js", "WhatsApp Business API"],
  },
  {
    title: "Intern",
    company: "Kementerian Lingkungan Hidup dan Kehutanan",
    date: "Sep 2016 – Nov 2016",
    employmentType: "Internship",
    location: "Jakarta, Indonesia",
    category: "engineering",
    highlights: [
      "Helped manage environmental and forestry data from provinces across Indonesia.",
      "Developed an educational website about Indonesia’s endemic plants and animals.",
    ],
    technologies: ["PHP", "CodeIgniter"],
  },
];

// Experience entries are curated newest-first; selectors preserve that order.
export const engineeringExperiences = workExperiences.filter(
  (experience) => experience.category === "engineering",
);
export const teachingExperiences = workExperiences.filter(
  (experience) => experience.category === "teaching",
);
export const currentExperience = engineeringExperiences.find(
  (experience) => experience.current,
);

export function getRecentCompanies(
  experiences: readonly WorkExperience[],
  limit = 3,
): WorkExperience[] {
  const companies = new Set<string>();
  const recent: WorkExperience[] = [];
  if (limit <= 0) return recent;

  for (const experience of experiences) {
    if (experience.category !== "engineering" || companies.has(experience.company)) {
      continue;
    }
    companies.add(experience.company);
    recent.push(experience);
    if (recent.length >= limit) break;
  }
  return recent;
}

export function groupExperiencesByCompany(experiences: readonly WorkExperience[]) {
  const groups = new Map<string, { company: string; roles: WorkExperience[] }>();
  for (const experience of experiences) {
    const group = groups.get(experience.company);
    if (group) {
      group.roles.push(experience);
    } else {
      groups.set(experience.company, {
        company: experience.company,
        roles: [experience],
      });
    }
  }
  return Array.from(groups.values());
}

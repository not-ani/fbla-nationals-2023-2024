import { db } from "@/server/db";
import { type Partner, partners } from "@/server/db/schema";
import { createId } from "@paralleldrive/cuid2";

function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

const startDate = new Date(2024, 0, 1); // January 1, 2024
const endDate = new Date(2024, 4, 31); // May 31, 2024

const partnersSeed: Partner[] = [
  {
    id: createId(),
    name: "TechInnovate Solutions",
    email: "contact@techinnovate.com",
    status: "Verified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Summer internship program for 2-3 students; Monthly tech talks by industry experts; Annual donation of 5 refurbished computers"
  },
  {
    id: createId(),
    name: "Green Earth Sustainability",
    email: "info@greenearthsus.org",
    status: "Verified",
    orgType: "NPO",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Quarterly field trips to local eco-friendly businesses; Bi-annual workshops on sustainable practices; Mentorship program for students interested in environmental careers"
  },
  {
    id: createId(),
    name: "HealthFirst Medical Center",
    email: "outreach@healthfirst.com",
    status: "Verified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Annual 'Day in the Life of a Healthcare Professional' shadowing program; Donation of basic medical training equipment; Guest lectures on various medical careers twice per semester"
  },
  {
    id: createId(),
    name: "Future Builders Construction",
    email: "education@futurebuilders.com",
    status: "Pending",
    orgType: "Limited Liability Company (LLC)",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Twice-yearly construction site tours for small groups; One-time donation of safety equipment for woodworking class; Potential summer apprenticeship for 1-2 students (to be confirmed)"
  },
  {
    id: createId(),
    name: "Digital Dreams Gaming",
    email: "community@digitaldreams.com",
    status: "Verified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Annual game development hackathon sponsorship; 10 licenses for industry-standard game design software; Virtual reality equipment loan for special projects"
  },
  {
    id: createId(),
    name: "Farm Fresh Cooperative",
    email: "education@farmfreshcoop.org",
    status: "Verified",
    orgType: "Cooperative",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Weekly supply of fresh produce for culinary classes; Monthly workshops on sustainable farming practices; Opportunity for students to sell products at local farmers market"
  },
  {
    id: createId(),
    name: "AutoTech Innovations",
    email: "schools@autotech.com",
    status: "Verified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Donation of a used car for auto shop class; Annual scholarship for one student pursuing automotive career; Quarterly hands-on workshops on electric vehicle technology"
  },
  {
    id: createId(),
    name: "Creative Minds Design Studio",
    email: "outreach@creativeminds.com",
    status: "Pending",
    orgType: "Partnership",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Portfolio review sessions for art students twice a year; Guest critique for end-of-year projects; Potential internship for 1 graphic design student (to be confirmed)"
  },
  {
    id: createId(),
    name: "Financial Futures Institute",
    email: "education@financialfutures.org",
    status: "Verified",
    orgType: "NPO",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Monthly financial literacy workshops; Stock market simulation game licenses for economics classes; Annual 'Budget Challenge' competition with cash prizes"
  },
  {
    id: createId(),
    name: "Culinary Creations Academy",
    email: "partnerships@culinarycreations.com",
    status: "Verified",
    orgType: "Limited Liability Company (LLC)",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Bi-monthly guest chef demonstrations; Donation of professional-grade kitchen tools; One full scholarship to summer culinary boot camp"
  },
  {
    id: createId(),
    name: "Robotics Revolution Inc.",
    email: "education@roboticsrev.com",
    status: "Verified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Sponsorship of school's robotics team; Loan of advanced robotics kit for special projects; Annual 'Robot Wars' competition hosting"
  },
  {
    id: createId(),
    name: "EcoEnergy Solutions",
    email: "community@ecoenergy.com",
    status: "Unverified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Installation of a small solar panel for educational purposes; Quarterly lectures on renewable energy careers; Energy audit workshop for students"
  },
  {
    id: createId(),
    name: "Local Government Youth Council",
    email: "youthengagement@localgovt.gov",
    status: "Verified",
    orgType: "Government",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Annual local government simulation day; Two summer internships at City Hall; Monthly speakers from different government departments"
  },
  {
    id: createId(),
    name: "Fashion Forward Designs",
    email: "education@fashionforward.com",
    status: "Pending",
    orgType: "Sole Proprietorship",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Bi-annual fashion design challenge; Fabric and material donations; Potential mentorship program for aspiring designers (to be confirmed)"
  },
  {
    id: createId(),
    name: "BioTech Frontiers",
    email: "outreach@biotechfrontiers.com",
    status: "Verified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Annual 'Day in the Lab' experience for advanced biology students; Donation of microscopes and lab safety equipment; Quarterly biotech career panels"
  },
  {
    id: createId(),
    name: "Global Languages Institute",
    email: "partnerships@globallanguages.org",
    status: "Verified",
    orgType: "NPO",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Weekly online language exchange with international students; Annual multicultural fair sponsorship; Scholarship for summer language immersion program"
  },
  {
    id: createId(),
    name: "Sports Performance Academy",
    email: "education@sportsperformance.com",
    status: "Verified",
    orgType: "Limited Liability Company (LLC)",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Monthly sports nutrition workshops; Donation of fitness tracking devices for P.E. classes; Annual sports medicine seminar with professional athletes"
  },
  {
    id: createId(),
    name: "Green Thumb Landscaping",
    email: "community@greenthumb.com",
    status: "Unverified",
    orgType: "S Corporation",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Spring planting workshop for campus beautification; Donation of gardening tools and seeds; Potential job shadowing program (to be confirmed)"
  },
  {
    id: createId(),
    name: "Cybersecurity Guardians",
    email: "education@cybersecguardians.com",
    status: "Verified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Annual cybersecurity capture-the-flag competition; Guest lectures on ethical hacking; Donation of network security software for IT classes"
  },
  {
    id: createId(),
    name: "Community Arts Collective",
    email: "outreach@communityarts.org",
    status: "Verified",
    orgType: "NPO",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Quarterly art supply donations; Student art showcase at local gallery; Artist-in-residence program (2 weeks per semester)"
  },
  {
    id: createId(),
    name: "Aerospace Innovations Labs",
    email: "stem@aerospaceinnovations.com",
    status: "Pending",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Annual rocket building workshop; Virtual tours of aerospace facilities; Potential internship program for engineering students (to be confirmed)"
  },
  {
    id: createId(),
    name: "Eco-Tourism Adventures",
    email: "education@ecotourism.com",
    status: "Verified",
    orgType: "Limited Liability Company (LLC)",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Semesterly lectures on sustainable tourism; Sponsorship for student-led community clean-up events; Annual eco-friendly travel planning competition"
  },
  {
    id: createId(),
    name: "Future Educators Association",
    email: "partnerships@futureeducators.org",
    status: "Verified",
    orgType: "NPO",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Monthly 'Teach for a Day' program in local elementary schools; Education policy seminars; Scholarship for students pursuing teaching careers"
  },
  {
    id: createId(),
    name: "Smart City Solutions",
    email: "education@smartcity.com",
    status: "Verified",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "Annual 'Design Your City' competition; Loan of urban planning simulation software; Quarterly workshops on smart technology in urban environments"
  },
  {
    id: createId(),
    name: "Virtual Reality Ventures",
    email: "outreach@vrventures.com",
    status: "Pending",
    orgType: "Corporate",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastInteraction: getRandomDate(startDate, endDate),
    availableResources: "VR equipment demonstrations twice per semester; Potential VR app development workshop series (to be confirmed); Annual VR career exploration day"
  }
];

export async function seedDb() {
  await db.insert(partners).values(partnersSeed);
}

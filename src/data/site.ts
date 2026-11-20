// Identity and contact details live apart from the case-study records so the
// always-loaded header and footer do not pull the full project data into the
// entry chunk.
export const site = {
  name: 'AIM',
  fullName: 'Mubaraq Ibrahim',
  role: 'Full-stack developer',
  location: 'Nigeria',
  timezone: 'WAT',
  email: 'adeshinaibrahim571@gmail.com',
  github: 'https://github.com/Mubarak-Ade',
  linkedin: 'https://www.linkedin.com/in/mubarak-ade',
  cv: '/docs/aim-cv.pdf',
  availability: 'Open to full-time roles and contract work',
  lastUpdated: 'October 2026',
} as const

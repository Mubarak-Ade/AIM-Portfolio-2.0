export type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

export type Decision = {
  title: string
  body: string
}

export type ArchitectureRow = {
  layer: string
  choice: string
  why: string
}

export type CaseStudy = {
  slug: string
  sheet: string
  name: string
  category: string
  year: string
  tagline: string
  deck: string
  problem: string
  image: string
  thumb: string
  imageAlt: string
  imageCaption: string
  secondImage?: string
  secondImageAlt?: string
  secondImageCaption?: string
  role: string
  scope: string
  stack: string
  status: string
  links: ProjectLink[]
  decisions: Decision[]
  architecture: ArchitectureRow[]
  hardPart: {
    title: string
    body: string
  }
  note?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'thesistrack',
    sheet: '01',
    name: 'ThesisTrack',
    category: 'Product · Full-stack',
    year: '2026',
    tagline: 'One supervised lifecycle for a whole department.',
    deck: 'A thesis supervision platform that replaces spreadsheets, email threads and shared drives with one role-aware record — from proposal to defence.',
    problem:
      'In a university department, a thesis is rarely one workflow. Students submit proposals, supervisors review drafts, coordinators assign faculty and monitor progress, and administrators need an audit trail. When those steps live in spreadsheets and inboxes, nobody shares the same source of truth. ThesisTrack models the whole lifecycle as one project record with role-specific views, so every stage has an owner, a deadline and a history.',
    image: '/images/thesistrack-admin.webp',
    thumb: '/images/thesistrack-admin-thumb.webp',
    imageAlt:
      'ThesisTrack coordinator dashboard showing department progress, an active project table and a review queue.',
    imageCaption:
      'Coordinator dashboard: department-level progress, active projects and a review queue. Demo dataset.',
    secondImage: '/images/thesistrack-review.webp',
    secondImageAlt:
      'ThesisTrack supervisor review screen with version history and decision history for a submission.',
    secondImageCaption:
      'Supervisor review: immutable submission versions, decision history and a discussion thread.',
    role: 'Product design, front-end and API',
    scope: 'Student, supervisor and administrator surfaces',
    stack: 'React · TypeScript · Express · PostgreSQL',
    status: 'Portfolio build · source available · no public demo',
    links: [
      {
        label: 'View the source on GitHub',
        href: 'https://github.com/Mubarak-Ade/ThesisTrack-',
        external: true,
      },
    ],
    decisions: [
      {
        title: 'Model the lifecycle, not the screens',
        body:
          'Proposals, milestones, submissions and reviews are states on a project record, not separate tools. Each transition has an owner, a due date and an audit event. That makes the interface easier to reason about — and makes “where are we?” a query instead of a meeting.',
      },
      {
        title: 'Make permissions part of the domain',
        body:
          'A student, a supervisor and an administrator can look at the same project and see different available actions. Role checks run in API middleware rather than relying on hidden buttons, so the boundary holds even when a request does not come from the UI.',
      },
      {
        title: 'Keep submission history immutable',
        body:
          'Each submission carries versioned files and a decision history. Reviewers can approve or request revision without overwriting what was submitted before. The record explains what changed and who changed it.',
      },
      {
        title: 'Test the workflow, not the mock',
        body:
          'Vitest covers API and UI behaviour, while shell-level system suites exercise the supervision flows against a running server. The tests follow the states a real department moves through, including the permission edges.',
      },
    ],
    architecture: [
      {
        layer: 'Client',
        choice: 'React 19 · Vite · TanStack Query · Zustand',
        why:
          'Role-aware routes and server-state caching keep dashboards responsive; Zustand holds the small amount of session UI state.',
      },
      {
        layer: 'API',
        choice: 'Express · TypeScript · Zod',
        why:
          'Domain routes for proposals, milestones, submissions and reviews, with request validation at the edge and role checks in middleware.',
      },
      {
        layer: 'Data',
        choice: 'PostgreSQL · Drizzle ORM',
        why:
          'A relational model for users, projects, workflow stages, submission versions, feedback and audit events — the parts that need to stay consistent.',
      },
      {
        layer: 'Delivery',
        choice: 'pnpm workspace · Vitest · system suites',
        why:
          'One command runs the client and API together; database migrations and workflow seeds make a fresh environment repeatable.',
      },
    ],
    hardPart: {
      title: 'The hard part was agreeing what “submitted” meant.',
      body:
        'For a student, submitting is a new version. For a supervisor, it opens a review. For an administrator, it may be an audited override. Modelling those transitions as explicit domain states — instead of scattering role checks through the UI — was the central design problem. It also shaped the database: history is append-only, and the current state is derived from events rather than overwritten in place.',
    },
    note:
      'Source available; no public demo is deployed. Screenshots use a seeded demonstration dataset from the local build.',
  },
  {
    slug: 'memodev',
    sheet: '02',
    name: 'MemoDev',
    category: 'Tool · Full-stack',
    year: '2026',
    tagline: 'A memory layer for code you do not want to solve twice.',
    deck: 'A full-stack developer knowledge vault for snippets, implementation notes and the reasoning behind them.',
    problem:
      'The answer to a problem is often buried in an old repository, a chat thread or a half-finished note. MemoDev gives developers one focused place to capture a snippet, explain the decision, tag it by project and language, and find it again when the next project needs it. The product is built around retrieval: drafts, published snippets, projects and tags are all ways back to the same piece of thinking.',
    image: '/images/memodev-home.webp',
    thumb: '/images/memodev-home-thumb.webp',
    imageAlt:
      'MemoDev dashboard with a project sidebar, searchable snippet cards and a welcome message for AIM.',
    imageCaption:
      'Dashboard: projects, snippet cards, draft states and a search-first layout. Demo account.',
    secondImage: '/images/memodev-editor.webp',
    secondImageAlt:
      'MemoDev snippet editor with a Markdown explanation beside syntax-highlighted code.',
    secondImageCaption:
      'The editor keeps the explanation and the code side by side, with preview, tags and visibility controls.',
    role: 'Product design, front-end and API',
    scope: 'Authentication, snippet editor, projects, search and drafts',
    stack: 'React · TypeScript · Express · PostgreSQL',
    status: 'Live app · sign-in required · source available',
    links: [
      {
        label: 'Open the live app',
        href: 'https://memodev.vercel.app/snippets/',
        external: true,
      },
      {
        label: 'View the source on GitHub',
        href: 'https://github.com/Mubarak-Ade/MemoDev',
        external: true,
      },
    ],
    decisions: [
      {
        title: 'Organise around retrieval',
        body:
          'Projects, tags, languages and draft/published states are not decoration. They mirror the ways developers remember a solution: “that MongoDB aggregate”, “the auth thing”, “the project from last month”. Search sits at the top of the dashboard because that is the primary job.',
      },
      {
        title: 'Treat authentication as one flow',
        body:
          'Access and refresh tokens, email verification, password reset and HTTP-only cookies are designed as one path. Protected routes resolve to a clean sign-in state when a session ends, rather than leaving a half-rendered dashboard behind.',
      },
      {
        title: 'Make the editor a workspace',
        body:
          'A Markdown explanation sits beside syntax-highlighted code, with autosave, preview, project assignment and visibility controls. The snippet is useful because the reasoning travels with it — not just the code block.',
      },
      {
        title: 'Load in place',
        body:
          'Skeleton loaders and explicit loading states cover the dashboard, drafts, preview and editor screens. They keep the layout from jumping and make slow requests feel like a state, not a failure.',
      },
    ],
    architecture: [
      {
        layer: 'Client',
        choice: 'React 19 · Vite · React Router · TanStack Query',
        why:
          'Server state stays in Query, forms use React Hook Form with Zod, and a small Zustand store handles session state.',
      },
      {
        layer: 'API',
        choice: 'Express · TypeScript · JWT + HTTP-only cookies',
        why:
          'Access and refresh flows, email verification and protected resources are handled in one API with a deliberate session lifecycle.',
      },
      {
        layer: 'Data',
        choice: 'PostgreSQL · Drizzle ORM',
        why:
          'Users, projects, snippets, tags, drafts and activity are relational by nature; Drizzle keeps the schema and queries typed.',
      },
      {
        layer: 'Interface kit',
        choice: 'Tailwind CSS · Radix primitives',
        why:
          'Accessible primitives for menus, dialogs and controls, with a custom visual layer rather than a stock component theme.',
      },
    ],
    hardPart: {
      title: 'Token refresh should be invisible when it works.',
      body:
        'The client and API share a deliberate refresh path: access tokens stay short-lived, the refresh token lives in an HTTP-only cookie, and sessions are stored as hashes rather than raw tokens. The interesting part is the failure state — an expired session has to return the user to a clear sign-in screen without a redirect loop or a flash of empty dashboard.',
    },
    note:
      'The live app opens at a sign-in screen. The dashboard and editor screenshots use an administrator-provisioned demo account; there is no public sign-up for the demo.',
  },
  {
    slug: 'shina-store',
    sheet: '03',
    name: 'Shina Store',
    category: 'Commerce · Full-stack',
    year: '2026',
    tagline: 'A storefront and a back office that agree on the order.',
    deck: 'A full-stack laptop store with a customer storefront, cart and checkout, plus the admin tools to run products and orders.',
    problem:
      'Selling a laptop is both a content problem and an operations problem. Customers need searchable products, specifications, stock and a checkout they can trust. The store owner needs to upload media, update inventory and see orders without touching the database. Shina Store joins those two jobs behind one typed API and two clearly separated interfaces.',
    image: '/images/shina-store.webp',
    thumb: '/images/shina-store-thumb.webp',
    imageAlt:
      'Shina Store storefront with a laptop hero image, navigation, search and a product catalogue.',
    imageCaption:
      'Storefront: catalogue, search and product cards. Seeded demo inventory.',
    role: 'Product design, front-end and API',
    scope: 'Storefront, cart, checkout and admin dashboard',
    stack: 'React · TypeScript · Express · MongoDB',
    status: 'Live demo · source available',
    links: [
      {
        label: 'Open the live store',
        href: 'https://shina-store.vercel.app/',
        external: true,
      },
      {
        label: 'View the source on GitHub',
        href: 'https://github.com/Mubarak-Ade/Fullstack-Laptop-E-commerce-website',
        external: true,
      },
    ],
    decisions: [
      {
        title: 'One API, two audiences',
        body:
          'The storefront and the admin dashboard share the same Express API, with role-based access keeping customer actions and operator actions separate. Product and order data have one source of truth instead of two drifting admin layers.',
      },
      {
        title: 'Validate at the boundary',
        body:
          'Zod schemas validate request bodies before they reach MongoDB. On the client, typed React Query hooks keep the cache and the UI in step, so a failed mutation has somewhere honest to land.',
      },
      {
        title: 'Media is part of the product',
        body:
          'Cloudinary handles laptop images and uploads. Product records stay small, and deleting a product also cleans up its media rather than leaving orphaned assets behind.',
      },
      {
        title: 'The server owns the total',
        body:
          'Cart totals are recalculated on the server whenever line items change. The checkout snapshot comes from the API, so stale client state cannot quietly change what the customer is charged.',
      },
    ],
    architecture: [
      {
        layer: 'Client',
        choice: 'React 19 · Vite · React Router · TanStack Query',
        why:
          'Separate storefront and admin routes share typed API hooks; Zustand keeps cart and session UI state predictable.',
      },
      {
        layer: 'API',
        choice: 'Express 5 · TypeScript · Zod',
        why:
          'Auth, products, carts, orders and admin routes live in one service, with request validation and role middleware at the edges.',
      },
      {
        layer: 'Data',
        choice: 'MongoDB · Mongoose',
        why:
          'Product specifications and order documents vary enough that a document model fits; indexes keep catalogue queries and filters fast.',
      },
      {
        layer: 'Media',
        choice: 'Cloudinary',
        why:
          'Upload and delete flows are tied to product lifecycle, so the catalogue does not accumulate stale images.',
      },
    ],
    hardPart: {
      title: 'A cart total is a server decision.',
      body:
        'The client can change a quantity in milliseconds; the API still has to decide what that means for tax, shipping and the final total. Recalculating on the server and returning a checkout snapshot keeps the cart honest across tabs, refreshes and stale local state. It also makes the admin order view consistent with what the customer saw.',
    },
    note:
      'The live store uses seeded demo products and orders. Checkout is a working flow, but no real payment is taken.',
  },
  {
    slug: 'treevia',
    sheet: '04',
    name: 'Treevia',
    category: 'Education · Full-stack',
    year: '2026',
    tagline: 'Assessments that hold up under a timer.',
    deck: 'A full-stack assessment platform where educators build and publish timed assessments, and students join with a code, answer under autosave, and submit once.',
    problem:
      'An assessment is two products at once. Educators need to create questions, publish an assessment behind a join code and see who joined. Students need to get in without an account, answer under a countdown and not lose work when the network stutters. The difficult part is the attempt lifecycle: autosave, expiry, a single submission and access that is scoped to one attempt.',
    image: '/images/treevia-overview.webp',
    thumb: '/images/treevia-overview-thumb.webp',
    imageAlt:
      'Treevia assessment overview showing four questions, a 30-minute limit and a published join code.',
    imageCaption:
      'Assessment overview: four questions, a 30-minute limit and a six-character join code. Demo data.',
    secondImage: '/images/treevia-attempt.webp',
    secondImageAlt:
      'Treevia student attempt screen with a countdown timer, one multiple-choice question and next and previous controls.',
    secondImageCaption:
      'Student attempt: a timed question view with autosave status and a single submission at the end.',
    role: 'Product design, front-end and API',
    scope: 'Educator workspace, assessment builder and student attempt flow',
    stack: 'React · TypeScript · Express · PostgreSQL',
    status: 'Portfolio build · source available · no public demo',
    links: [
      {
        label: 'View the source on GitHub',
        href: 'https://github.com/Mubarak-Ade/Treevia---online-assessment-platform',
        external: true,
      },
    ],
    decisions: [
      {
        title: 'Model the attempt as a server-owned lifecycle',
        body:
          'An attempt is not a page with a timer. It has a status, a start time, an expiry and a submission record. The server decides whether an attempt is still open, auto-submits it when time runs out, and rejects a second submission. The client renders that state instead of inventing its own.',
      },
      {
        title: 'Scope student access to one attempt',
        body:
          'Students do not need accounts. Starting an attempt returns a raw bearer token once; the database stores only its hash. Every student request is scoped to that attempt, and question payloads omit the correctness flags, so the answer key never reaches the browser.',
      },
      {
        title: 'Share contracts across the workspace',
        body:
          'The pnpm workspace keeps Zod schemas and DTOs in shared packages used by both the React app and the Express API. Request shapes, validation messages and TypeScript types have one source of truth, which keeps the two sides from drifting.',
      },
      {
        title: 'Make autosave a visible state',
        body:
          'Answers save per question and in bulk, with a debounced write and explicit saved, saving, error and offline states. A student can see whether the last answer is safe, and a failed write does not silently disappear.',
      },
      {
        title: 'Test the workflow against a real database',
        body:
          'Vitest and Supertest run against the real Express app and a dedicated PostgreSQL test database. A setup guard refuses to run if the database name does not contain “test”, and the migration runner reports the file, statement and PostgreSQL error when a migration fails.',
      },
    ],
    architecture: [
      {
        layer: 'Client',
        choice: 'React 19 · Vite · TanStack Query · react-hook-form',
        why:
          'The educator workspace and the student attempt flow share typed API hooks; forms and validation reuse the same schemas as the API.',
      },
      {
        layer: 'API',
        choice: 'Express 5 · TypeScript ESM · Zod · jose · argon2',
        why:
          'Modular routes for auth, assessments, questions and attempts, with request validation, rate limiting, security headers and role-aware middleware.',
      },
      {
        layer: 'Data',
        choice: 'PostgreSQL · Drizzle ORM',
        why:
          'Users, sessions, assessments, questions, options, attempts and answers are relational; migrations and typed queries keep the schema honest.',
      },
      {
        layer: 'Workspace',
        choice: 'pnpm workspaces · shared contracts · Vitest + Supertest',
        why:
          'One install and one typecheck across the web app, API and shared packages; integration tests exercise the API against a real test database.',
      },
    ],
    hardPart: {
      title: 'An attempt has to survive the timer.',
      body:
        'The happy path is a student answering four questions. The real work is everything around it: saving answers without hammering the API, restoring them after a refresh, auto-submitting when the countdown reaches zero, and rejecting a second submission without losing the first. Handling those transitions on the server — and showing them honestly in the interface — is what makes the attempt feel trustworthy.',
    },
    note:
      'Source available; no public demo is deployed. The grading and analytics modules are scaffolds and are not wired to real data; the screenshots show the implemented assessment and attempt flows. Preview analytics are not presented as real results.',
  },
]

export type AdditionalProject = {
  name: string
  description: string
  category: string
  links: ProjectLink[]
}

export const additionalProjects: AdditionalProject[] = [
  // {
  //   name: 'CHOPMATE',
  //   description:
  //     'A multi-restaurant ordering platform with a marketplace, menu management, checkout and restaurant-side order handling.',
  //   category: 'Marketplace · Full-stack',
  //   links: [
  //     {
  //       label: 'Source',
  //       href: 'https://github.com/Mubarak-Ade/CHOPMATE',
  //       external: true,
  //     },
  //   ],
  // },
  {
    name: 'AIM Blog',
    description:
      'A full-stack publishing platform with authentication, a rich post editor, comments and an admin dashboard.',
    category: 'Publishing · Full-stack',
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Mubarak-Ade/Blog-Website',
        external: true,
      },
    ],
  },
  {
    name: 'Anike',
    description:
      'A responsive landing page for a tailoring brand, built around product photography, motion and a simple enquiry path.',
    category: 'Front-end',
    links: [
      {
        label: 'Live site',
        href: 'https://anike-fashion.vercel.app/',
        external: true,
      },
      {
        label: 'Source',
        href: 'https://github.com/Mubarak-Ade/Tailoring-Landing-page',
        external: true,
      },
    ],
  },
]

export function getCaseStudy(slug: string | undefined) {
  return caseStudies.find((project) => project.slug === slug)
}

export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((project) => project.slug === slug)
  return caseStudies[(index + 1) % caseStudies.length]
}

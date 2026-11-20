export type NoteSection = {
  heading: string
  body: string
}

export type Note = {
  slug: string
  number: string
  title: string
  summary: string
  project: string
  projectHref: string
  sections: NoteSection[]
  takeaway: string
}

export const notes: Note[] = [
  {
    slug: 'submitted-means-three-things',
    number: '01',
    title: 'Three roles, one word: “submitted”',
    summary:
      'The hardest state transition in ThesisTrack was not a database migration. It was agreeing what the same word means to a student, a supervisor and an administrator.',
    project: 'ThesisTrack',
    projectHref: '/work/thesistrack',
    sections: [
      {
        heading: 'The problem',
        body:
          'In a spreadsheet-and-email workflow, “submitted” is a timestamp and a file attachment. That is enough until someone needs to know who should act next. A student who uploads a revision has submitted. A supervisor who receives it has a review to open. An administrator may need to record an override without erasing either version of the story. One word was covering three different events.',
      },
      {
        heading: 'The decision',
        body:
          'I modelled the lifecycle as states on a project record rather than as separate tools. Each transition has an owner, a due date and an audit event, and submissions keep versioned files with a decision history. Role checks live in API middleware, not only in hidden buttons, so the boundary holds when a request arrives from somewhere other than the interface.',
      },
      {
        heading: 'The trade-off',
        body:
          'This is more modelling work before the first screen exists. It also means more records to read and more edge cases to name. The payoff is that “where are we?” becomes a query instead of a meeting, and the next person can see why a state changed rather than only that it did.',
      },
    ],
    takeaway:
      'When a word means different things to different roles, treat it as domain data — not a label in the UI.',
  },
  {
    slug: 'cart-total-server-decision',
    number: '02',
    title: 'A cart total is a server decision',
    summary:
      'Shina Store can update a quantity in milliseconds. The API still has to decide what that means for the order the customer is about to place.',
    project: 'Shina Store',
    projectHref: '/work/shina-store',
    sections: [
      {
        heading: 'The problem',
        body:
          'A cart is one of those interfaces where optimistic UI feels wonderful and can quietly become a lie. Two tabs, a stale refresh or a changed shipping rule can leave the client showing a total that the server will not honour. The checkout screen is the worst possible place to discover that the two sides disagree.',
      },
      {
        heading: 'The decision',
        body:
          'Cart totals are recalculated on the server whenever line items change, and checkout reads a snapshot returned by the API. The client can still feel immediate, but it is not the source of truth. The same rule keeps the admin order view aligned with what the customer actually saw.',
      },
      {
        heading: 'The trade-off',
        body:
          'Every change needs a round trip before the final number is trustworthy, so the interface has to communicate pending state honestly. The live store uses seeded products and a working checkout flow, but no real payment is taken. That is a demo boundary, not a claim about production payments.',
      },
    ],
    takeaway:
      'If two systems can disagree about money, the server should be the one that decides — and the interface should say when it is still waiting.',
  },
  {
    slug: 'refresh-should-fail-visibly',
    number: '03',
    title: 'Refresh should fail visibly',
    summary:
      'MemoDev keeps access tokens short-lived and the refresh token in an HTTP-only cookie. The interesting part is not the happy path; it is what happens when the session is gone.',
    project: 'MemoDev',
    projectHref: '/work/memodev',
    sections: [
      {
        heading: 'The problem',
        body:
          'Token refresh is easy to make invisible when it works and confusing when it does not. A protected page can render a shell, fire three requests, receive three failures and leave the person looking at an empty dashboard with no explanation. That is not a security feature; it is an unclear state.',
      },
      {
        heading: 'The decision',
        body:
          'The client and API share one refresh path: short-lived access tokens, a refresh token in an HTTP-only cookie, and sessions stored as hashes rather than raw tokens. When refresh fails, protected routes resolve to a clear sign-in state instead of a half-rendered page.',
      },
      {
        heading: 'The trade-off',
        body:
          'There are more moving parts than a single long-lived token, and the failure path needs its own attention. The live app opens at a sign-in screen; the dashboard and editor screenshots use an administrator-provisioned demo account, not a public sign-up.',
      },
    ],
    takeaway:
      'A session expiry is a state, not an error to hide. Show the person where they are and what to do next.',
  },
  {
    slug: 'design-the-quiet-state',
    number: '04',
    title: 'Design the quiet state first',
    summary:
      'Empty discussions, loading drafts and a first-run dashboard tell you more about a product than the populated demo does.',
    project: 'ThesisTrack',
    projectHref: '/work/thesistrack',
    sections: [
      {
        heading: 'The problem',
        body:
          'It is tempting to design the demo state and treat everything else as error handling. But a new account, a failed request and an expired session are not edge cases to the person experiencing them. They are the product at that moment.',
      },
      {
        heading: 'The decision',
        body:
          'I try to name the quiet states before I polish the populated ones: what does an empty discussion say, what does a draft show while it is still being written, what does a reviewer see when there is nothing to review? The ThesisTrack review screen keeps an explicit “No messages yet” state with a prompt to start the conversation, rather than an empty box that could be broken.',
      },
      {
        heading: 'The trade-off',
        body:
          'Quiet states add screens and copy that never appear in a launch screenshot. They are also where trust is won or lost. I would rather ship a smaller feature with a clear first-run state than a larger one that looks unfinished the first time it is empty.',
      },
    ],
    takeaway:
      'The empty state is not the absence of the product. It is the first version many people will meet.',
  },
]

export function getNote(slug: string | undefined) {
  return notes.find((note) => note.slug === slug)
}

**WeddingReady** is wedding platform, inspired by Pinterest, that enables couples to make their aspirations a reality. Every idea on WeddingReady links directly to local suppliers who can bring it to life.

I designed and developed this full-stack application after 13 years in the wedding industry, drawing on close relationships with top vendors and deep insight into what engaged couples actually need. The platform features a modern, image-rich interface where users can browse, save, and plan their dream wedding—without the frustration of unattainable ideas.

Built with a scalable, serverless architecture using **Next.js**, **Supabase**, and **UploadThing**, WeddingReady includes:

- Fast, seamless authentication
- Drag-and-drop image uploads
- Optimized data fetching with React Query and cache manipulation via setQueryData

The project reflects my technical skills and product thinking. It’s grounded in market research, user interviews, and a clear monetization strategy designed to support both couples and suppliers.

### **Smart Caching and Optimistic UI for a Faster Experience**

To eliminate redundant requests and create a fast, responsive UI, I implemented **proactive cache seeding**. When tiles are fetched in bulk, the app immediately caches the save state of each individual tile. This means when a user interacts with a tile later, the save status is already available—no extra fetch required.

This reduces potential **N+1 network requests** to zero and significantly improves perceived performance. Combined with **optimistic updates**, it creates a fluid, real-time experience. The pattern also supports scalability by enabling efficient infinite scroll.

Technically, it leverages advanced client-side caching patterns with `useQuery`, `setQueryData`, and `onMutate`.

### **Secure and Seamless Image Uploads**

I built a secure upload pipeline using **UploadThing**, integrated with authentication and validation layers.

Before a file is uploaded, the following checks are performed both client- and server-side:

- Is the user authenticated and authorized?
- Are the files of the correct type and size?
- Does the metadata conform to the schema?

Once validated, the file is uploaded and a corresponding tile is created in the database. This ensures that only legitimate, well-formed uploads are accepted, improving data integrity and minimizing the risk of abuse.

Planned improvements include client-side image resizing, allowing users to drop in high-resolution files while optimizing server storage costs.

### **Type-Safe Models from Frontend to Database**

**Image:** Diagram showing types flowing from DB → Server → Client with validation gates.

The app uses clearly defined TypeScript models built around **Drizzle ORM** and **Zod**. I've structured types to ensure strong separation between:

- `Raw` database rows
- `Safe` client-facing versions
- `Insert` and `Update` schemas

This architecture ensures full type safety across the stack—from the database to the UI—while protecting sensitive data. It reduces bugs, simplifies debugging, and ensures consistency across queries, mutations, and front-end components.

### **Validated Server Actions for Secure Form Handling**

**Image:** Screenshot of a form and its structured server-side response (e.g. success + validation error feedback).

Instead of relying on traditional REST endpoints, I use **Next.js Server Actions** for handling form submissions. These server functions:

- Perform schema validation with **Zod** and **React Hook Form**
- Handle errors using structured utilities like `tryCatch`
- Include on-blur handle availability checks to ensure unique usernames before submission

This modern, secure pattern simplifies backend logic and improves user experience by delivering fast, validated responses with minimal boilerplate.

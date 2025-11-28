my-next-app/
├── app/                          # App Router (Next.js 13+)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Loading UI
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # 404 page
│   ├── api/                     # API routes
│   │   └── [route]/
│   │       └── route.ts
│   ├── (auth)/                  # Route groups
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx           # Nested layout
│   │   ├── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── components/                  # Reusable components
│   ├── ui/                     # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── modal.tsx
│   ├── forms/                  # Form components
│   │   ├── login-form.tsx
│   │   └── contact-form.tsx
│   └── layout/                 # Layout components
│       ├── header.tsx
│       ├── footer.tsx
│       └── sidebar.tsx
├── lib/                        # Utility libraries
│   ├── utils.ts
│   ├── auth.ts
│   ├── api.ts
│   └── database.ts
├── hooks/                      # Custom React hooks
│   ├── use-auth.ts
│   ├── use-local-storage.ts
│   └── use-api.ts
├── store/                      # State management
│   ├── slices/
│   │   ├── auth-slice.ts
│   │   └── ui-slice.ts
│   └── index.ts
├── types/                      # TypeScript definitions
│   ├── user.ts
│   ├── api.ts
│   └── common.ts
├── public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── styles/                     # Additional styles
│   ├── components/
│   └── utils/
├── middleware.ts               # Next.js middleware
├── next.config.js             # Next.js configuration
├── package.json
└── tsconfig.json
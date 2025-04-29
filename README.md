# Busybee
## Summary
Busybee is a web application for job seekers who wish to manage their job applications.

## Repository Structure
- Root Directory
    - Documentation: directory containing all documentation related to the design and implementation of BusyBee.
        - design: directory holding all documents related to the project design phase of Busybee.
        - diagrams: directory containing any diagrams created at any stage of Busybee's life-cycle.
            - block: holds the block diagram files.
            - component: holds the component diagram files.
            - database: holds the entity relationship diagrams of Busybee.
            - data-flow-diagrams: holds all data flow diagrams.
            - system: holds all diagrams depicting system architecture.
            - workflow: holds diagrams depicting the CI/CD pipeline of Busybee.
        - poster: directory containing all documents used to create the poster used in the APSU Innovation Experience.
        - proposal: directory containing documents for the initial Busybee project proposal.
        - requirements: directory containing all requirements documents.
    - Project: the project directory for the Busybee build. Serves as the root directory for project builds.
        - src: directory containing all TypeScript code and assets used by Busybee.
            - assets: any non-code resources used by Busybee such as images.
            - components: contains any react component that renders as a child of a navigable page component.
            - context: contains all context used by the dashboard page.
            - pages: any react component with a navigable end-point.
            - service: contains all service-layer code.
            - styles: directory holding all .css files.
            - utils: directory containing any utility files that need to be accessed globally.

## Repository Structure

Busybee/
├── Documentation/                  # Documentation repository
|   ├── design/                     # Design documents
|   ├── diagrams/                   # Diagrams used
|   |   ├── block/                  # Block Diagrams
|   |   ├── component/              # Component Diagrams
|   |   ├── database/               # ERD
|   |   ├── data-flow-diagrams/     # Data Flow Diagrams 0-4
|   |   ├── system/                 # System Architecture
|   |   └── workflow/               # CI/CD workflow
|   └── poster/                     # APSU Innovation Experience Poster
|   ├── proposal/                   # Project Proposal
|   └── requirements/               # Requirements Documents
└── Project/                        # Busybee's Project Directory
    ├── src/                        # Project Source Code
    ├── assets/                     # resources like images/logo
    ├── components/                 # React renderable components
    ├── context/                    # React context files
    ├── pages/                      # navigable pages
    ├── service/                    # service layer code
    ├── styles/                     # CSS files
    └── utils/                      # Data types and Database
# AOFI Krediti UI - Cypress Test Suite

Automated E2E test suite for the AOFI loan approval process. Covers the complete flow from request submission to loan realization through 7 user roles and 18 process steps.

## Tech Stack

- **Cypress 15.12.0** - test runner
- **Mochawesome** - HTML reporting with screenshots
- **smtp4dev** - local SMTP server for email notification testing
- **dayjs** - date/time manipulation
- **mammoth** - text extraction from .docx files for content verification
- **cypress-real-events** - native browser events (hover, real click)

## Prerequisites

- **Node.js** v24.14.0+
- **npm** v11.12.0+
- **Browser:** Chrome, Edge or Firefox
- **smtp4dev** (optional, for email tests): `dotnet tool install -g Rnwood.Smtp4dev`

## Installation

```bash
npm install
cp .env.example .env   # fill in credentials
```

## Running Tests

```bash
# All tests (headless, Electron)
npm run cy:run

# Specific browser
npm run cy:run:chrome
npm run cy:run:edge
npm run cy:run:firefox

# Parallel execution (4 threads)
npm run cy:parallel
npm run cy:parallel:chrome

# Specific test file
npm run cy:test:cherrypick

# Cypress GUI
npx cypress open
```

## Project Structure

```
cypress/
├── e2e/                              # Test files
│   ├── LoanRequestTubeIQ_test.js     # E2E loan process - TubeIQ side (18 steps, 779 LOC)
│   ├── loanRequestAOFI_test.js       # E2E loan process - AOFI Portal side (1 test)
│   ├── LoginAOFI_test.js             # AOFI portal login scenarios (11 tests)
│   ├── LoginTubeIQ_test.js           # TubeIQ login scenarios (8 tests)
│   └── registrationTubeIQ_test.js    # Registration + email verification (2 tests)
│
├── support/
│   ├── e2e.js                        # Global setup (imports, reporter)
│   ├── dateUtils.js                  # Timestamp comparison
│   ├── helpers.js                    # Text normalization, file verification
│   ├── selectors.js                  # Centralized CSS selectors
│   │
│   ├── commands/                     # Cypress custom commands
│   │   ├── index.js                  # Aggregator - imports all modules
│   │   ├── auth.js                   # Login, token, API authentication
│   │   ├── navigation.js             # URL navigation
│   │   ├── form.js                   # Form filling, Finish & Go To Next
│   │   ├── tubeiqInstance.js         # TubeIQ-specific form elements
│   │   ├── fileHandling.js           # Upload/download, .docx verification
│   │   ├── email.js                  # smtp4dev integration, registration
│   │   ├── elementUtils.js           # DOM traversal, text filtering
│   │   └── popups.js                 # Modal dialogs, toast notifications
│   │
│   └── pageObjects/                  # Page Object Model layer
│       ├── API.js                    # API intercept/wait pairs
│       │
│       ├── InstanceViewTubeIQ.js     # FACADE - merges 5 instance modules
│       ├── instanceParts/            # Instance View modules
│       │   ├── InstanceActionsTubeIQ.js
│       │   ├── InstanceCollateralTubeIQ.js
│       │   ├── InstanceAdvisorSelectionTubeIQ.js
│       │   ├── InstanceDocumentsTubeIQ.js
│       │   └── InstanceRiskOpinionTubeIQ.js
│       │
│       ├── TasksPageTubeIQ.js        # FACADE - merges 3 task modules
│       ├── taskParts/                # Tasks Page modules
│       │   ├── TaskSearchTubeIQ.js
│       │   ├── TaskSelectionTubeIQ.js
│       │   └── TaskActionsTubeIQ.js
│       │
│       ├── assertions/               # Assertion modules (8 files)
│       │   ├── index.js              # Aggregator - exports Assert object
│       │   ├── loginAssertions.js
│       │   ├── aofiPageAssertions.js
│       │   ├── aofiDataAssertions.js
│       │   ├── aofiPopupAssertions.js
│       │   ├── tubeiqTaskAssertions.js
│       │   ├── tubeiqInstanceAssertions.js
│       │   └── tubeiqDocumentAssertions.js
│       │
│       ├── TestData/                 # Test data modules
│       │   ├── index.js              # Aggregator - exports getTestData()
│       │   ├── documentData.js
│       │   ├── attachmentData.js
│       │   ├── collateralData.js
│       │   ├── aofiFormData.js
│       │   ├── proposalData.js
│       │   └── riskData.js
│       │
│       ├── LoginPageTubeIQ.js        # TubeIQ pages
│       ├── LoginPageAOFI.js
│       ├── HomePageTubeIQ.js
│       ├── AttachmentsViewTubeIQ.js
│       ├── CommentsViewTubeIQ.js
│       ├── RegistrationPageTubeIQ.js
│       │
│       ├── LoanRequestFormAOFI.js    # AOFI portal - questionnaire pages (22 files)
│       ├── RequestPageAOFI.js
│       ├── DocumentationPageAOFI.js
│       ├── GeneralCommentPageAOFI.js
│       ├── AccountBlocksPageAOFI.js
│       ├── BuyerDataPageAOFI.js
│       ├── CompanyActivitiesPageAOFI.js
│       ├── CompetitorsPageAOFI.js
│       ├── CourtDisputesPageAOFI.js
│       ├── ExportActivityPageAOFI.js
│       ├── JobsFinancedPageAOFI.js
│       ├── LegalEntitiesPageAOFI.js
│       ├── ManagementStructurePageAOFI.js
│       ├── ObligationsPageAOFI.js
│       ├── PaymentTransactionsPageAOFI.js
│       ├── RealEstateAndEquipmentPageAOFI.js
│       ├── ReferenceListPageAOFI.js
│       ├── SalesPageAOFI.js
│       ├── StakeholdersPageAOFI.js
│       ├── StatusChangesPageAOFI.js
│       └── SupplierDataPageAOFI.js
│
├── downloads/                        # Cypress downloads folder
├── fixtures/                         # Test documents for upload (53 files)
│   ├── *.pdf                         # 24 PDFs - mandatory documentation (request, balance sheet, registry extract, OP form...)
│   └── *.docx                        # 29 DOCX - process documents (decisions, contracts, risk opinion, proposals...)
└── screenshots/                      # Auto-captured screenshots on failure
```

## Architecture

### Facade + Module Pattern

Large Page Objects (1000+ LOC) are split into modules grouped by responsibility, then merged through a facade using `assignWithPrototype()`:

```
InstanceViewTubeIQ.js (facade, 28 LOC)
├── InstanceActionsTubeIQ.js      # Interest conflict, loan splitting, submit
├── InstanceCollateralTubeIQ.js   # Collateral entry
├── InstanceAdvisorSelectionTubeIQ.js  # Advisor selection
├── InstanceDocumentsTubeIQ.js    # Upload/review documents
└── InstanceRiskOpinionTubeIQ.js  # Risk opinion, verification
```

The facade exports a single object with all methods from all modules:

```javascript
import { onTubeIQInstanceView } from '../support/pageObjects/InstanceViewTubeIQ';

// Method from InstanceActionsTubeIQ
onTubeIQInstanceView.setInterestConflictToNo();

// Method from InstanceCollateralTubeIQ
onTubeIQInstanceView.fillInTheCollateralEntries();
```

**Why `assignWithPrototype()` instead of `Object.assign()`:**
`Object.assign()` only copies own properties, not class prototype methods. `assignWithPrototype()` explicitly walks the prototype chain and binds each method to the target object.

### Same pattern applies to:
- **TasksPageTubeIQ** → TaskSearch + TaskSelection + TaskActions
- **assertions/index.js** → 8 assertion modules → `Assert` object
- **TestData/index.js** → 6 data modules → `getTestData()` function

### Why .fill-row with indices

The application uses Syncfusion components that lack stable `data-testid` attributes. The only reliable selector for form fields is positional indexing (`.fill-row.eq(N)`). Methods using indices always validate field content with `.and('contain', 'Field name')`, ensuring a clear error message if the layout changes.

## Test Suite: Loan Process (LoanRequestTubeIQ_test.js)

This file covers the **complete E2E loan approval flow** through 18 sequential steps. Tests are in a single file because each step depends on the previous one - a task only appears in the inbox after the previous step completes its submit.

### Process Flow and Roles

| # | Role | Task | Description |
|---|------|------|-------------|
| 1 | Credit Department Head | Request processing | Review, assign to advisor |
| 2 | Credit Advisor | Initial processing | Documentation review, interest conflict |
| 3 | Credit Advisor | Collateral entry | Collateral, credit proposal, print |
| 4 | Credit Advisor | Decision proposal preparation | Loan splitting |
| 5 | Credit Advisor | Decision proposal | Basic terms, exposure, print |
| 6 | Credit Department Head | Proposal verification | Review, rework Yes/No |
| 7 | Credit Advisor | Print decision proposal | Print, upload signed copy |
| 8 | Risk Director | Forwarding | Assign to risk advisor |
| 9 | Risk Advisor | Risk opinion | Data entry, exposure, upload |
| 10 | Risk Director | Risk opinion verification | Review, verification Yes/No |
| 11 | Risk Director | Risk opinion finalization | Assign advisor |
| 12 | Risk Advisor | Risk opinion finalization | Upload signed copy, forward |
| 13 | Legal Advisor | IO decision | Session date, decision number, print |
| 14 | Legal Advisor | Create decision | Competent body decision |
| 15 | Legal Advisor | Create contract | Fill in, notification |
| 16 | Credit Advisor | Realization preparation | Consent, account number |
| 17 | Credit Advisor | Contract signing | Print, upload signed copy |
| 18 | Finance Associate | Realization | Final review, close |

### Preconditions

- Active loan request submitted via AOFI portal (LoanRequestAOFI_test.js)
- Request with "QATesting" prefix in the process name
- All users with valid TubeIQ platform access

## Conventions

### Naming

- **Page Objects:** `<Page>Page<Platform>.js` (e.g. `LoginPageTubeIQ.js`)
- **Exports:** `on<Name>` for PO instances (e.g. `onTubeIQTasksPage`)
- **Assertions:** `Assert.<method>()` - always starts with `verify`, `confirm`, `check`
- **Test Data:** `getTestData().<category>` (e.g. `getTestData().collateral`)
- **Commands:** `cy.<action>()` - camelCase, descriptive

### Import Pattern

```javascript
// Tests import facades, never modules directly
import { onTubeIQInstanceView } from '../support/pageObjects/InstanceViewTubeIQ';
import { onTubeIQTasksPage } from '../support/pageObjects/TasksPageTubeIQ';
import { Assert } from '../support/pageObjects/assertions';
import { onAPI } from '../support/pageObjects/API';
```

### Bilingual Selectors

The application supports Serbian and English. Selectors use variant arrays:

```javascript
cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']);
cy.get('li a').shouldContainAnyText(['Show filter', 'Prikaži filter']);
```

### API Intercept/Wait

Every navigation that triggers an API call must have an intercept before the action and a wait after:

```javascript
onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
```

`API.js` contains pre-defined pairs for all endpoints used in the process.

### Environment Variables

All sensitive values (URLs, credentials) are stored in the `.env` file. Access in tests:

```javascript
// Single variable - destructuring
cy.env(['tubeIQ_url']).then(({ tubeIQ_url }) => { ... });

// In cypress.config.js tasks
process.env.CYPRESS_TUBEIQ_URL
```

See `.env.example` for all required variables. Key groups:
- AOFI Portal URL + credentials (pravno lice, preduzetnik)
- TubeIQ URL + credentials
- Invalid/SQL injection payloads for negative tests
- SMTP configuration for email tests

## Email Testing (smtp4dev)

The test suite uses smtp4dev for email notification verification:

```javascript
before(() => { cy.startSmtp(); });    // Start smtp4dev
after(() => { cy.stopSmtp(); });      // Stop smtp4dev
beforeEach(() => { cy.clearEmailInbox(); }); // Clear inbox
```

`cy.registerAndCheckEmailInbox()` - registers a user, waits for confirmation, verifies timestamp in smtp4dev inbox.

## Reporting

Tests generate a Mochawesome HTML report with:
- Pass/fail/skip status per test
- Screenshots on failure
- Execution duration

Report is located in `cypress/reports/` after execution.

## Cleanup (clean.js)

Every `npm run cy:*` command runs `npm run clean` before tests, which deletes:
- `cypress/screenshots/`
- `cypress/videos/`
- `runner-results/`
- `cypress/reports/html/screenshots/`

## Other Root Files

- **`testNodeMailer.js`** - utility script for manual SMTP connection testing (not part of the Cypress suite)
- **`Jenkinsfile`** - Jenkins CI/CD pipeline definition (commented out, WIP)

## Author

[**Nikola Nikolić** - QA Automation Engineer](https://github.com/Gzingo)

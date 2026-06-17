import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def build_pdf():
    pdf_filename = "Ngane_Emmanuel_AssessmentForFullStackDeveloper_2026-06-17.pdf"
    
    # Page setup - 0.75 inch margins (54 points)
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom style definitions
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#112233'),
        spaceAfter=10
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#556677'),
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#112233'),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#333333'),
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        leftIndent=15,
        firstLineIndent=-10,
        textColor=colors.HexColor('#333333'),
        spaceAfter=3
    )
    
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Code'],
        fontName='Courier',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#222222'),
        backColor=colors.HexColor('#F4F4F5'),
        borderPadding=5,
        spaceAfter=6
    )
    
    meta_style = ParagraphStyle(
        'MetadataStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#112233')
    )

    story = []
    
    # Title & Subtitle Headers
    story.append(Paragraph("TECHNICAL ASSESSMENT REPORT", title_style))
    story.append(Paragraph("Full Stack Developer Assessment &mdash; ZappySales Project", subtitle_style))
    
    # Candidate Metadata Info Block
    meta_data = [
        [Paragraph("Candidate Name:", meta_style), Paragraph("Ngane Emmanuel", body_style)],
        [Paragraph("Role:", meta_style), Paragraph("Full Stack Developer Assessment", body_style)],
        [Paragraph("Project Name:", meta_style), Paragraph("ZappySales User & Address Management", body_style)],
        [Paragraph("Date of Submission:", meta_style), Paragraph("June 17, 2026", body_style)]
    ]
    t = Table(meta_data, colWidths=[130, 370])
    t.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))
    
    # Divider Rule Line
    story.append(Table([[""]], colWidths=[500], rowHeights=[1.5], style=TableStyle([
        ('LINEABOVE', (0,0), (-1,-1), 1, colors.HexColor('#CCCCCC'))
    ])))
    story.append(Spacer(1, 6))
    
    # 1. Overview
    story.append(Paragraph("1. Overview", h1_style))
    story.append(Paragraph(
        "ZappySales is a full-stack, production-quality User and Address Management application built with Spring Boot and React. "
        "It acts as a lightweight administrative directory that allows system administrators to view, search, "
        "paginate, and modify user profiles and their associated shipping/billing addresses.", body_style))
    story.append(Paragraph(
        "The application follows the <b>Aggregate Root</b> pattern: the <code>User</code> is the parent record, "
        "and multiple <code>Address</code> items are managed directly within the User's context (a 1-to-many relationship).", body_style))
    story.append(Paragraph(
        "This assessment implementation goes beyond a minimal proof-of-concept by introducing:", body_style))
    story.append(Paragraph("&bull; <b>Server-side Pagination and Case-insensitive Substring Search</b> (supporting enterprise-scale data sets).", bullet_style))
    story.append(Paragraph("&bull; <b>Environment-driven properties</b> with standard defaults for cloud-native deployment.", bullet_style))
    story.append(Paragraph("&bull; <b>IP-based in-memory Rate Limiting / Request Throttling</b> on the backend.", bullet_style))
    story.append(Paragraph("&bull; <b>35 Vitest + React Testing Library (RTL) tests</b> on the frontend.", bullet_style))
    story.append(Paragraph("&bull; <b>47 JUnit 5 + Mockito + MockMvc unit/integration tests</b> on the backend.", bullet_style))
    story.append(Paragraph("&bull; <b>OpenAPI/Swagger Interactive Console</b> for easy endpoint verification.", bullet_style))
    
    # 2. Technologies
    story.append(Paragraph("2. Technologies", h1_style))
    story.append(Paragraph("<b>Backend (Java 21 / Spring Boot)</b>", body_style))
    story.append(Paragraph("&bull; <b>Language/Framework:</b> Java 21, Spring Boot v4.1.0.", bullet_style))
    story.append(Paragraph("&bull; <b>Thread-safe Runtime Store:</b> Managed in-memory via <code>ConcurrentHashMap</code> with defensive cloning during reads and writes to isolate repository state.", bullet_style))
    story.append(Paragraph("&bull; <b>Data Transfer Objects (DTOs):</b> Strong contracts separate the external API model from internal domain models.", bullet_style))
    story.append(Paragraph("&bull; <b>API Validation:</b> Jakarta Bean constraints integrated with custom HTML input sanitizers (<code>@SanitizedString</code>).", bullet_style))
    story.append(Paragraph("&bull; <b>Security & Throttling:</b> Custom servlet filter applying security headers and IP-based rate limiting filter.", bullet_style))
    
    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>Frontend (React 19 / TypeScript)</b>", body_style))
    story.append(Paragraph("&bull; <b>Framework & Tooling:</b> React 19, Vite 8, TypeScript 6.", bullet_style))
    story.append(Paragraph("&bull; <b>Styling System:</b> TailwindCSS v4.0 for utility layout grids and layout properties combined with Material-UI (MUI) v9 for UI component blocks.", bullet_style))
    story.append(Paragraph("&bull; <b>State Management:</b> Zustand state store (<code>userStore.ts</code>) providing reactive global flow with minimal boilerplate.", bullet_style))
    story.append(Paragraph("&bull; <b>Data Fetching:</b> Standardized Axios client wrapper with custom request/response interceptors.", bullet_style))
    
    # Page Break for layout cleanliness
    story.append(PageBreak())
    
    # 3. Directory Layout
    story.append(Paragraph("3. Directory Layout", h1_style))
    dir_text = (
        "ZappySales/\n"
        "├── backend/                       # Spring Boot Project\n"
        "│   ├── src/main/java/             # Core Source Code\n"
        "│   ├── src/main/resources/        # application.properties\n"
        "│   └── src/test/java/             # JUnit Test Suites\n"
        "├── frontend/                      # React + TypeScript Client\n"
        "│   ├── src/\n"
        "│   │   ├── api/                   # Centralized Axios Client\n"
        "│   │   ├── app/routes/            # URL Routing Layouts\n"
        "│   │   ├── features/users/        # Feature Pages, Components, Stores, and Hooks\n"
        "│   │   └── shared/                # Common Page Skeletons, Layouts, and Spinners\n"
        "│   ├── test/                      # Vitest Setup Configs\n"
        "│   └── vitest.config.ts           # Vitest Config File\n"
        "└── README.md                      # Setup and Running Guide"
    )
    story.append(Paragraph(dir_text.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style))
    
    # 4. Features
    story.append(Paragraph("4. Features", h1_style))
    story.append(Paragraph("&bull; <b>User CRUD</b> - Full capability to view, register, edit, and delete user profiles.", bullet_style))
    story.append(Paragraph("&bull; <b>Address CRUD</b> - Management of multiple addresses associated with each user (1-to-many relationship).", bullet_style))
    story.append(Paragraph("&bull; <b>Server-side Pagination</b> - Seamless pagination on data grids to support enterprise-scale databases.", bullet_style))
    story.append(Paragraph("&bull; <b>Search</b> - Case-insensitive substring search matching email, first name, or last name.", bullet_style))
    story.append(Paragraph("&bull; <b>Input Sanitization</b> - Custom <code>@SanitizedString</code> annotation to prevent XSS.", bullet_style))
    story.append(Paragraph("&bull; <b>Rate Limiting</b> - In-memory sliding-window IP-based API throttling filter.", bullet_style))
    story.append(Paragraph("&bull; <b>Security Headers</b> - Custom response headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy).", bullet_style))
    story.append(Paragraph("&bull; <b>Swagger API Docs</b> - Automated interactive developer UI console.", bullet_style))
    story.append(Paragraph("&bull; <b>Unit and Integration Tests</b> - Comprehensive test coverage (47 backend, 35 frontend).", bullet_style))
    
    # 5. Architecture
    story.append(Paragraph("5. Architecture", h1_style))
    story.append(Paragraph("<b>Backend:</b> <code>Controller &rarr; Service &rarr; Repository &rarr; In-memory Storage</code>", code_style))
    story.append(Paragraph("<b>Frontend:</b> <code>Pages &rarr; Hooks &rarr; Store &rarr; Services &rarr; Axios Client &rarr; REST API</code>", code_style))
    
    # 6. Environment & Prerequisites
    story.append(Paragraph("6. Environment & Prerequisites", h1_style))
    story.append(Paragraph("<b>Prerequisites:</b> JDK 21, Node.js (v18+), Maven.", body_style))
    
    # Table of Environment variables
    table_data = [
        [Paragraph("<b>Environment Variable</b>", meta_style), Paragraph("<b>Description</b>", meta_style), Paragraph("<b>Default Value</b>", meta_style)],
        [Paragraph("`PORT`", body_style), Paragraph("The HTTP port the backend server listens on", body_style), Paragraph("`8080`", body_style)],
        [Paragraph("`ALLOWED_ORIGINS`", body_style), Paragraph("Comma-separated list of permitted CORS origins", body_style), Paragraph("`http://localhost:3000,http://localhost:5173`", body_style)],
        [Paragraph("`RATE_LIMIT_CAPACITY`", body_style), Paragraph("Max API requests allowed per client IP within the window", body_style), Paragraph("`100`", body_style)],
        [Paragraph("`RATE_LIMIT_TIME_WINDOW_SECONDS`", body_style), Paragraph("Throttling time window in seconds", body_style), Paragraph("`60`", body_style)]
    ]
    vt = Table(table_data, colWidths=[150, 230, 120])
    vt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#EAEAEA')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#DDDDDD')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(vt)
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Frontend Configuration:</b> Create <code>frontend/.env</code> with: <code>VITE_API_BASE_URL=http://localhost:8080/api/v1</code>", body_style))
    
    # Page Break for layout cleanliness
    story.append(PageBreak())
    
    # 7. Setup Instructions
    story.append(Paragraph("7. Setup Instructions", h1_style))
    story.append(Paragraph("<b>Backend (in backend/ folder):</b>", body_style))
    story.append(Paragraph("mvn clean install<br/>./mvnw spring-boot:run", code_style))
    story.append(Paragraph("<b>Frontend (in frontend/ folder):</b>", body_style))
    story.append(Paragraph("npm install<br/>npm run dev<br/>npm run build", code_style))
    
    # 8. Testing Instructions
    story.append(Paragraph("8. Testing Instructions", h1_style))
    story.append(Paragraph("<b>Backend:</b> <code>mvn test</code> (in <code>backend/</code> folder)", code_style))
    story.append(Paragraph("<b>Frontend:</b> <code>npm run test</code> (in <code>frontend/</code> folder)", code_style))
    
    # 9. Swagger Documentation
    story.append(Paragraph("9. Swagger Documentation", h1_style))
    story.append(Paragraph("Swagger UI console is available locally at: <code>http://localhost:8080/swagger-ui/index.html</code>", code_style))
    
    # 10. Design Choices: \"User -> Address\" Flow
    story.append(Paragraph("10. Design Choices: \"User &rarr; Address\" Flow", h1_style))
    story.append(Paragraph("&bull; <b>Aggregate Root UI:</b> Administrators open the main user directory list page and navigate to a dedicated detail page, keeping the detail management focused.", bullet_style))
    story.append(Paragraph("&bull; <b>In-Context Modals:</b> CRUD tasks (edit profile, CRUD addresses) trigger popup dialogs in-context on the detail view rather than redirecting away, yielding a smooth single-dashboard flow.", bullet_style))
    story.append(Paragraph("&bull; <b>Zustand Sync:</b> Successful changes trigger local store mutations rather than forcing database refetches, reducing network utilization.", bullet_style))
    
    # 11. Test Suite Validation Results
    story.append(Paragraph("11. Test Suite Validation Results", h1_style))
    story.append(Paragraph("&bull; <b>Backend (47 tests passed):</b> Checked repository deep cloning, controller endpoints, validation, and full user integration workflows.", bullet_style))
    story.append(Paragraph("&bull; <b>Frontend (35 tests passed):</b> Checked table renders, dialog state triggers, Zustand stores, and routing page displays.", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Candidate Signature:</b> Ngane Emmanuel &bull; Full Stack Developer", meta_style))
    
    doc.build(story)
    print(f"Successfully generated PDF: {pdf_filename}")

if __name__ == '__main__':
    build_pdf()

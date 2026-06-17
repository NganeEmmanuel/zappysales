import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch

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
        fontSize=22,
        leading=26,
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
        spaceAfter=20
    )
    
    h1_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=17,
        textColor=colors.HexColor('#112233'),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#333333'),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        leftIndent=20,
        firstLineIndent=-10,
        textColor=colors.HexColor('#333333'),
        spaceAfter=4
    )
    
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Code'],
        fontName='Courier',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#222222'),
        backColor=colors.HexColor('#F4F4F5'),
        borderPadding=6,
        spaceAfter=8
    )
    
    meta_style = ParagraphStyle(
        'MetadataStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
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
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('TOPPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t)
    story.append(Spacer(1, 15))
    
    # Divider Rule Line
    story.append(Table([[""]], colWidths=[500], rowHeights=[2], style=TableStyle([
        ('LINEABOVE', (0,0), (-1,-1), 1, colors.HexColor('#CCCCCC'))
    ])))
    story.append(Spacer(1, 10))
    
    # 1. Executive Summary
    story.append(Paragraph("1. Executive Summary", h1_style))
    story.append(Paragraph(
        "ZappySales is a production-quality, lightweight full-stack administrative application designed to allow "
        "system administrators to view, search, paginate, and modify user registration profiles and their associated "
        "shipping/billing addresses.", body_style))
    story.append(Paragraph(
        "The application follows the <b>Aggregate Root</b> pattern: the <code>User</code> is the parent record, "
        "and multiple <code>Address</code> items are managed directly within the User's context (a 1-to-many relationship).", body_style))
    story.append(Paragraph(
        "This assessment implementation goes beyond a minimal proof-of-concept by introducing:", body_style))
    story.append(Paragraph("&bull; <b>Server-side Pagination and Case-insensitive Substring Search</b> (supporting enterprise-scale data sets).", bullet_style))
    story.append(Paragraph("&bull; <b>Environment-driven properties</b> with standard fallback defaults for cloud-native deployment.", bullet_style))
    story.append(Paragraph("&bull; <b>IP-based in-memory Rate Limiting / Request Throttling</b> on the backend.", bullet_style))
    story.append(Paragraph("&bull; <b>35 Vitest + React Testing Library (RTL) tests</b> on the frontend.", bullet_style))
    story.append(Paragraph("&bull; <b>47 JUnit 5 + Mockito + MockMvc unit/integration tests</b> on the backend.", bullet_style))
    
    # 2. Technical Stack & Architecture
    story.append(Paragraph("2. Technical Stack & Architecture", h1_style))
    story.append(Paragraph("<b>Backend (Java / Spring Boot)</b>", body_style))
    story.append(Paragraph("The backend is structured around a clean, layered architectural design (<b>Separation of Concerns</b>):", body_style))
    story.append(Paragraph("<code>UserController &rarr; UserService / UserServiceImpl &rarr; UserRepository / InMemoryUserRepository</code>", code_style))
    story.append(Paragraph("&bull; <b>Language/Framework:</b> Java 21, Spring Boot v4.1.0.", bullet_style))
    story.append(Paragraph("&bull; <b>Thread-safe Runtime Store:</b> Managed in-memory via <code>ConcurrentHashMap</code> with defensive cloning during reads/writes to isolate repository state.", bullet_style))
    story.append(Paragraph("&bull; <b>Data Transfer Objects (DTOs):</b> Strong contracts (<code>CreateUserRequest</code>, <code>UserResponse</code>, <code>AddressResponse</code>, etc.) separate the external API model from internal domain models.", bullet_style))
    story.append(Paragraph("&bull; <b>API Validation:</b> Jakarta Bean constraints (<code>@Email</code>, <code>@Size</code>, <code>@NotBlank</code>) integrated with custom HTML input sanitizers (<code>@SanitizedString</code>).", bullet_style))
    story.append(Paragraph("&bull; <b>Security & Throttling:</b> Custom servlet filter applying security headers (<code>X-Content-Type-Options</code>, <code>X-Frame-Options</code>, <code>Referrer-Policy</code>) and IP-based sliding-window request rate limiting.", bullet_style))
    
    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>Frontend (React / TypeScript)</b>", body_style))
    story.append(Paragraph("&bull; <b>Framework & Tooling:</b> React 19, Vite 8, TypeScript 6.", bullet_style))
    story.append(Paragraph("&bull; <b>Styling System:</b> TailwindCSS v4.0 for utility layout grids and layout properties combined with Material-UI (MUI) v9 for UI component blocks.", bullet_style))
    story.append(Paragraph("&bull; <b>State Management:</b> Zustand state store (<code>userStore.ts</code>) providing reactive global flow with minimal boilerplate.", bullet_style))
    story.append(Paragraph("&bull; <b>Data Fetching:</b> Standardized Axios client wrapper (<code>client.ts</code>) with custom interceptors to map error codes and normalize response structures.", bullet_style))
    
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
        "│   │   ├── features/users/        # Pages, Components, Stores, and Hooks\n"
        "│   │   └── shared/                # Common Page Skeletons, Layouts, and Spinners\n"
        "│   ├── test/                      # Vitest Setup Configs\n"
        "│   └── vitest.config.ts           # Vitest Config File\n"
        "└── README.md                      # Setup and Running Guide"
    )
    story.append(Paragraph(dir_text.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style))
    
    # 4. Environment & Prerequisites
    story.append(Paragraph("4. Environment & Prerequisites", h1_style))
    story.append(Paragraph("&bull; **Java Development Kit (JDK) 21**", bullet_style))
    story.append(Paragraph("&bull; **Node.js (v18 or higher)** and **npm**", bullet_style))
    story.append(Paragraph("&bull; **Apache Maven** (or use the packaged <code>./mvnw</code> wrapper)", bullet_style))
    story.append(Spacer(1, 5))
    
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
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(vt)
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Frontend .env Config:</b> Create <code>frontend/.env</code> with: <code>VITE_API_BASE_URL=http://localhost:8080/api/v1</code>", body_style))
    
    # 5. Build, Test, and Execution Instructions
    story.append(Paragraph("5. Build, Test, and Execution Instructions", h1_style))
    story.append(Paragraph("<b>Backend Commands (in backend/ folder):</b>", body_style))
    story.append(Paragraph("Run Tests: <code>mvn test</code><br/>Start Application: <code>./mvnw spring-boot:run</code>", code_style))
    story.append(Paragraph("<b>Frontend Commands (in frontend/ folder):</b>", body_style))
    story.append(Paragraph("Install Dependencies: <code>npm install</code><br/>Run Tests: <code>npm run test</code><br/>Production Build: <code>npm run build</code><br/>Start Dev Server: <code>npm run dev</code>", code_style))
    
    # 6. Design Choices: \"User -> Address\" Flow
    story.append(Paragraph("6. Design Choices: \"User &rarr; Address\" Flow", h1_style))
    story.append(Paragraph("&bull; <b>Aggregate Root UI:</b> Administrators load user list page with server pagination. Clicking details loads the User profile detail page.", bullet_style))
    story.append(Paragraph("&bull; <b>In-Context Modals:</b> CRUD tasks (edit profile, CRUD addresses) trigger popup dialogs in-context on the detail view rather than redirecting away, yielding a smooth single-dashboard flow.", bullet_style))
    story.append(Paragraph("&bull; <b>Zustand Sync:</b> Successful changes trigger local store mutations rather than forcing database refetches, reducing network utilization.", bullet_style))
    
    # 7. Test Suite Validation Results
    story.append(Paragraph("7. Test Suite Validation Results", h1_style))
    story.append(Paragraph("&bull; <b>Backend (47 tests passed):</b> Checked repository deep cloning, controller endpoints, validation, and full user integration workflows.", bullet_style))
    story.append(Paragraph("&bull; <b>Frontend (35 tests passed):</b> Checked table renders, dialog state triggers, Zustand stores, and routing page displays.", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Candidate Signature:</b> Ngane Emmanuel &bull; Full Stack Developer", meta_style))
    
    doc.build(story)
    print(f"Successfully generated PDF: {pdf_filename}")

if __name__ == '__main__':
    build_pdf()

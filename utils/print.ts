export default function printG(
  componentRef?: React.RefObject<HTMLElement> | HTMLElement | null
) {
  console.log("Printing component content...");

  if (!componentRef) {
    console.warn("No component reference provided, printing entire page");
    window.print();
    return;
  }

  // Get the element to print
  const element =
    "current" in componentRef ? componentRef.current : componentRef;

  if (!element) {
    console.warn("Component reference is null, printing entire page");
    window.print();
    return;
  }

  // Create a new window for printing
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    console.error("Failed to open print window");
    return;
  }

  // Get all stylesheets from the current document
  const stylesheets = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch (e) {
        // Handle cross-origin stylesheets
        return "";
      }
    })
    .join("\n");

  // Get external stylesheets
  const externalStyles = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  )
    .map(
      (link) =>
        `<link rel="stylesheet" href="${(link as HTMLLinkElement).href}">`
    )
    .join("\n");

  // Create the print document
  const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${externalStyles}
            <style>
                ${stylesheets}
                
                /* Print-specific styles for single page layout */
                @media print {
                    @page {
                        margin: 0.3in;
                        size: A4;
                    }
                    
                    * {
                        -webkit-print-color-adjust: exact !important;
                        color-adjust: exact !important;
                        page-break-inside: avoid;
                    }
                    
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        height: auto !important;
                        font-size: 12px !important;
                        line-height: 1.3 !important;
                    }
                    
                    .print-container {
                        width: 100% !important;
                        max-width: none !important;
                        margin: 0 !important;
                        padding: 8px !important;
                        box-shadow: none !important;
                        border: none !important;
                        transform: scale(0.85);
                        transform-origin: top left;
                        height: auto !important;
                    }
                    
                    /* Compact spacing for all elements */
                    h1, h2, h3, h4, h5, h6 {
                        margin: 4px 0 !important;
                        padding: 0 !important;
                        font-size: 14px !important;
                        line-height: 1.2 !important;
                    }
                    
                    p {
                        margin: 2px 0 !important;
                        padding: 0 !important;
                        font-size: 11px !important;
                        line-height: 1.2 !important;
                    }
                    
                    div {
                        margin: 2px 0 !important;
                        padding: 4px !important;
                    }
                    
                    .space-y-4 > * {
                        margin-top: 6px !important;
                        margin-bottom: 0 !important;
                    }
                    
                    .mb-4, .my-4 {
                        margin-bottom: 6px !important;
                        margin-top: 6px !important;
                    }
                    
                    .p-4, .p-3 {
                        padding: 4px !important;
                    }
                    
                    .rounded-lg {
                        border-radius: 4px !important;
                    }
                    
                    /* Hide elements that shouldn't be printed */
                    button, .no-print, [role="button"] {
                        display: none !important;
                    }
                    
                    /* Dropdown and interactive elements */
                    .dropdown-menu, [data-radix-menu] {
                        display: none !important;
                    }
                    
                    /* Card and container adjustments */
                    .bg-white, .bg-amber-50 {
                        background: white !important;
                        border: 1px solid #ccc !important;
                        margin: 2px 0 !important;
                        padding: 6px !important;
                    }
                    
                    /* Flex layouts - make more compact */
                    .flex {
                        gap: 4px !important;
                    }
                    
                    .justify-between {
                        gap: 8px !important;
                    }
                    
                    /* Status indicators */
                    .text-green-600, .text-red-600, .text-blue-600, .text-amber-600 {
                        font-size: 10px !important;
                        padding: 2px 4px !important;
                        border: 1px solid currentColor !important;
                        border-radius: 2px !important;
                    }
                    
                    /* Icons - make smaller */
                    svg {
                        width: 12px !important;
                        height: 12px !important;
                    }
                    
                    /* Ensure no page breaks */
                    .print-container > * {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    
                    /* Font size adjustments for different text sizes */
                    .text-lg {
                        font-size: 13px !important;
                    }
                    
                    .text-sm {
                        font-size: 10px !important;
                    }
                    
                    .font-semibold, .font-medium {
                        font-weight: 600 !important;
                    }
                }
                
                /* Screen styles for preview */
                @media screen {
                    body {
                        margin: 0;
                        padding: 10px;
                        font-family: Arial, sans-serif;
                        background: #f5f5f5;
                    }
                    
                    .print-container {
                        max-width: 210mm;
                        min-height: 297mm;
                        margin: 0 auto;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        padding: 20px;
                        background: white;
                        transform: scale(0.85);
                        transform-origin: top center;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-container">
                ${element.outerHTML}
            </div>
            <script>
                // Auto-print when the page loads
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                        // Close the window after printing (optional)
                        window.onafterprint = function() {
                            window.close();
                        };
                    }, 500);
                };
            </script>
        </body>
        </html>
    `;

  // Write the content to the print window
  printWindow.document.write(printContent);
  printWindow.document.close();
}

// Grade point mapping for calculations
const GRADE_POINTS: Record<string, number> = {
  A: 4.0,
  "A-": 3.75,
  "B+": 3.5,
  B: 3.0,
  "B-": 2.75,
  "C+": 2.5,
  C: 2.0,
  "C-": 1.75,
  D: 1.5,
  "D-": 1.0,
  F: 0.0,
};

export function printGradeReport(resultsData: any[], studentInfo?: any) {
  console.log("Printing grade report...");

  if (!resultsData || resultsData.length === 0) {
    console.warn("No results data provided");
    return;
  }

  // Create a new window for printing
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    console.error("Failed to open print window");
    return;
  }

  // Process all courses from all semesters
  let allCourses: any[] = [];
  let totalGradePoints = 0;
  let totalNominalHours = 0;
  let overallCGPA = 0;

  resultsData.forEach((semester) => {
    semester.courses.forEach((course: any, index: number) => {
      const gradePoint = GRADE_POINTS[course.gradeInLetter] || 0;
      const points = gradePoint * course.totalNhrs;

      allCourses.push({
        no: allCourses.length + 1,
        unitOfCompetencies: course.title,
        competenceCode: course.courseCode,
        nominalHour: course.totalNhrs,
        assessmentResult: course.totalMark.toFixed(2),
        gradeInLetter: course.gradeInLetter,
        gradePoint: points.toFixed(2),
      });

      totalGradePoints += points;
      totalNominalHours += course.totalNhrs;
    });
    overallCGPA = semester.cgpa || 0; // Use the latest CGPA
  });

  const averageGPA =
    totalNominalHours > 0 ? totalGradePoints / totalNominalHours : 0;

  // Get current academic year from data or use dummy
  const currentAcademicYear = resultsData[0]?.academicYear?.name || "2023/2024";
  const currentLevel = resultsData[0]?.level || "Level IV";
  const currentSection = resultsData[0]?.section?.sectionName || "Section A";

  // Generate table rows - all courses in first table, second table empty
  const tableRows = allCourses
    .map(
      (course) => `
      <tr>
          <td style="text-align: center; padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">${course.no}</td>
          <td style="padding: 2px 3px; border: 1px solid #ddd; font-size: 7px; line-height: 1.0;">${course.unitOfCompetencies}</td>
          <td style="text-align: center; padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">${course.competenceCode}</td>
          <td style="text-align: center; padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">${course.nominalHour}</td>
          <td style="text-align: center; padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">${course.assessmentResult}</td>
          <td style="text-align: center; padding: 3px 4px; border: 1px solid #ddd; font-weight: bold; font-size: 8px;">${course.gradeInLetter}</td>
          <td style="text-align: center; padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">${course.gradePoint}</td>
      </tr>
  `
    )
    .join("");

  // Empty rows for the second table (placeholder)
  const emptyRows = Array(Math.max(1, allCourses.length))
    .fill(null)
    .map(
      () => `
        <tr>
            <td style="padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">&nbsp;</td>
            <td style="padding: 2px 3px; border: 1px solid #ddd; font-size: 7px;">&nbsp;</td>
            <td style="padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">&nbsp;</td>
            <td style="padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">&nbsp;</td>
            <td style="padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">&nbsp;</td>
            <td style="padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">&nbsp;</td>
            <td style="padding: 3px 4px; border: 1px solid #ddd; font-size: 8px;">&nbsp;</td>
        </tr>
    `
    )
    .join("");

  // Create the print document
  const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Grade Report</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
              @page {
                  margin: 0.3in;
                  size: A4;
              }
              
              * {
                  -webkit-print-color-adjust: exact !important;
                  color-adjust: exact !important;
              }
              
              body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  font-size: 10px;
                  line-height: 1.2;
                  color: #333;
                  transform: scale(0.95);
                  transform-origin: top left;
              }
              
              .header-container {
                  border: 1px solid #333;
                  margin-bottom: 8px;
                  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              }
              
              .college-header {
                  text-align: center;
                  padding: 8px;
                  background: #2c3e50;
                  color: white;
                  margin-bottom: 0;
              }
              
              .college-header h1 {
                  margin: 0;
                  font-size: 14px;
                  font-weight: bold;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
              }
              
              .student-info-section {
                  padding: 8px 12px;
                  background: white;
              }
              
              .report-title {
                  text-align: center;
                  margin: 5px 0 8px 0;
                  padding: 4px;
                  background: #34495e;
                  color: white;
                  font-size: 12px;
                  font-weight: bold;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
              }
              
              .info-grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  gap: 8px;
                  margin-bottom: 8px;
              }
              
              .info-item {
                  display: flex;
                  flex-direction: column;
                  padding: 4px 6px;
                  background: #f8f9fa;
                  border-left: 3px solid #3498db;
                  border-radius: 2px;
              }
              
              .info-label {
                  font-size: 8px;
                  color: #666;
                  text-transform: uppercase;
                  font-weight: bold;
                  margin-bottom: 2px;
                  letter-spacing: 0.3px;
              }
              
              .info-value {
                  font-size: 9px;
                  color: #2c3e50;
                  font-weight: 600;
              }
              
              .academic-info {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 8px;
                  margin-top: 6px;
                  padding-top: 6px;
                  border-top: 1px solid #ddd;
              }
              
              .academic-item {
                  display: flex;
                  flex-direction: column;
                  padding: 4px 6px;
                  background: #e8f4fd;
                  border-left: 3px solid #2980b9;
                  border-radius: 2px;
              }
              
              .tables-container {
                  display: flex;
                  gap: 10px;
                  margin-bottom: 8px;
              }
              
              .table-section {
                  flex: 1;
              }
              
              .grade-table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 8px;
              }
              
              .grade-table th {
                  background-color: #f5f5f5;
                  font-weight: bold;
                  text-align: center;
                  padding: 4px 3px;
                  border: 1px solid #ddd;
                  white-space: nowrap;
                  font-size: 8px;
                  line-height: 1.1;
              }
              
              .grade-table td {
                  padding: 3px 4px;
                  border: 1px solid #ddd;
                  vertical-align: top;
                  font-size: 8px;
                  line-height: 1.1;
              }
              
              .totals-section {
                  margin-top: 8px;
                  display: flex;
                  justify-content: flex-end;
              }
              
              .totals-table {
                  border-collapse: collapse;
                  font-size: 8px;
                  min-width: 240px;
              }
              
              .totals-table td {
                  padding: 4px 8px;
                  border: 1px solid #ddd;
                  font-weight: bold;
                  font-size: 8px;
              }
              
              .totals-table .label {
                  background-color: #f5f5f5;
                  text-align: right;
                  width: 160px;
              }
              
              .totals-table .value {
                  text-align: center;
                  background-color: white;
                  width: 80px;
              }
              
              @media print {
                  body {
                      -webkit-print-color-adjust: exact;
                      color-adjust: exact;
                  }
                  
                  .grade-table th {
                      background-color: #f5f5f5 !important;
                  }
                  
                  .totals-table .label {
                      background-color: #f5f5f5 !important;
                  }
                  
                  .college-header {
                      background: #2c3e50 !important;
                      color: white !important;
                  }
                  
                  .report-title {
                      background: #34495e !important;
                      color: white !important;
                  }
                  
                  * {
                      page-break-inside: avoid;
                  }
                  
                  .header-container {
                      page-break-after: avoid;
                  }
                  
                  .tables-container {
                      page-break-inside: avoid;
                  }
              }
          </style>
      </head>
      <body>
          <div class="header-container">
              <div class="college-header">
                  <h1>Wolaita Sodo Agricultural College</h1>
              </div>
              
              <div class="student-info-section">
                  <div class="report-title">Academic Grade Report</div>
                  
                  <div class="info-grid">
                      <div class="info-item">
                          <span class="info-label">Student Name</span>
                          <span class="info-value">${
                            studentInfo?.name || "John Doe Alemayehu"
                          }</span>
                      </div>
                      <div class="info-item">
                          <span class="info-label">Student ID</span>
                          <span class="info-value">${
                            studentInfo?.id || "AMU/COA/002345/15"
                          }</span>
                      </div>
                      <div class="info-item">
                          <span class="info-label">Age</span>
                          <span class="info-value">23 Years</span>
                      </div>
                      <div class="info-item">
                          <span class="info-label">Sex</span>
                          <span class="info-value">Male</span>
                      </div>
                  </div>
                  
                  <div class="academic-info">
                      <div class="academic-item">
                          <span class="info-label">Sector</span>
                          <span class="info-value">Agricultural Sciences</span>
                      </div>
                      <div class="academic-item">
                          <span class="info-label">Department</span>
                          <span class="info-value">Animal and Range Sciences</span>
                      </div>
                      <div class="academic-item">
                          <span class="info-label">Level</span>
                          <span class="info-value">${currentLevel}</span>
                      </div>
                      <div class="academic-item">
                          <span class="info-label">Section</span>
                          <span class="info-value">${currentSection}</span>
                      </div>
                      <div class="academic-item">
                          <span class="info-label">Academic Year</span>
                          <span class="info-value">${currentAcademicYear}</span>
                      </div>
                      <div class="academic-item">
                          <span class="info-label">Medium of Instruction</span>
                          <span class="info-value">English</span>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Two tables side by side - first table with data, second table empty -->
          <div class="tables-container">
              <div class="table-section">
                  <table class="grade-table">
                      <thead>
                          <tr>
                              <th style="width: 4%;">No</th>
                              <th style="width: 42%;">Unit of Competencies</th>
                              <th style="width: 12%;">Competence<br/>Code</th>
                              <th style="width: 8%;">Nominal<br/>Hour</th>
                              <th style="width: 10%;">Assessment<br/>Result 100%</th>
                              <th style="width: 8%;">Grade in<br/>Letter</th>
                              <th style="width: 8%;">Grade<br/>Point</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${tableRows}
                      </tbody>
                  </table>
                  
                  <!-- Totals for first table -->
                  <div class="totals-section">
                      <table class="totals-table">
                          <tr>
                              <td class="label">Total Grade Point</td>
                              <td class="value">${totalGradePoints.toFixed(
                                2
                              )}</td>
                          </tr>
                          <tr>
                              <td class="label">Total Nominal Hour</td>
                              <td class="value">${totalNominalHours}</td>
                          </tr>
                          <tr>
                              <td class="label">Average Grade Point (GPA)</td>
                              <td class="value">${averageGPA.toFixed(2)}</td>
                          </tr>
                          <tr>
                              <td class="label">Cumulative Average Grade Point (CGPA)</td>
                              <td class="value">${overallCGPA.toFixed(2)}</td>
                          </tr>
                      </table>
                  </div>
              </div>
              
              <div class="table-section">
                  <table class="grade-table">
                      <thead>
                          <tr>
                              <th style="width: 4%;">No</th>
                              <th style="width: 42%;">Unit of Competencies</th>
                              <th style="width: 12%;">Competence<br/>Code</th>
                              <th style="width: 8%;">Nominal<br/>Hour</th>
                              <th style="width: 10%;">Assessment<br/>Result 100%</th>
                              <th style="width: 8%;">Grade in<br/>Letter</th>
                              <th style="width: 8%;">Grade<br/>Point</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${emptyRows}
                      </tbody>
                  </table>
                  
                  <!-- Totals for second table (empty) -->
                  <div class="totals-section">
                      <table class="totals-table">
                          <tr>
                              <td class="label">Total Grade Point</td>
                              <td class="value">0.00</td>
                          </tr>
                          <tr>
                              <td class="label">Total Nominal Hour</td>
                              <td class="value">0</td>
                          </tr>
                          <tr>
                              <td class="label">Average Grade Point (GPA)</td>
                              <td class="value">0.00</td>
                          </tr>
                          <tr>
                              <td class="label">Cumulative Average Grade Point (CGPA)</td>
                              <td class="value">0.00</td>
                          </tr>
                      </table>
                  </div>
              </div>
          </div>
          
          <script>
              window.onload = function() {
                  setTimeout(function() {
                      window.print();
                      window.onafterprint = function() {
                          window.close();
                      };
                  }, 1000);
              };
          </script>
      </body>
      </html>
  `;

  // Write the content to the print window
  printWindow.document.write(printContent);
  printWindow.document.close();
}

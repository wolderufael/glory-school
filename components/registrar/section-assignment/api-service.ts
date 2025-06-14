import { AssignmentCriteria } from "./assignment-form";
import { Student } from "./student-list";
import { Section } from "./section-assignment-logic";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StudentFetchResponse {
  students: Student[];
  total: number;
}

export interface SectionUpdateRequest {
  studentId: string;
  section: string;
  department: string;
  level: string;
  year: string;
  semester: string;
}

export interface BulkSectionUpdateRequest {
  updates: SectionUpdateRequest[];
  criteria: AssignmentCriteria;
}

export class SectionAssignmentApiService {
  private readonly baseUrl = "/api/registrar";

  /**
   * Fetch students based on criteria
   */
  async fetchStudents(
    criteria: AssignmentCriteria
  ): Promise<ApiResponse<StudentFetchResponse>> {
    try {
      const params = new URLSearchParams({
        department: criteria.department,
        level: criteria.level,
        year: criteria.year,
        semester: criteria.semester,
      });

      const response = await fetch(`${this.baseUrl}/students?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Error fetching students:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch students",
      };
    }
  }

  /**
   * Update section assignments for multiple students
   */
  async updateSectionAssignments(
    sections: Section[],
    criteria: AssignmentCriteria
  ): Promise<ApiResponse<{ updatedCount: number }>> {
    try {
      // Prepare bulk update request
      const updates: SectionUpdateRequest[] = [];

      sections.forEach((section) => {
        section.students.forEach((student) => {
          updates.push({
            studentId: student.id,
            section: section.id, // 'a', 'b', 'c', etc.
            department: criteria.department,
            level: criteria.level,
            year: criteria.year,
            semester: criteria.semester,
          });
        });
      });

      const requestBody: BulkSectionUpdateRequest = {
        updates,
        criteria,
      };

      const response = await fetch(
        `${this.baseUrl}/students/sections/bulk-update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        message: `Successfully updated sections for ${data.updatedCount} students`,
      };
    } catch (error) {
      console.error("Error updating section assignments:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update section assignments",
      };
    }
  }
}

// Mock implementation for development/testing
export class MockSectionAssignmentApiService extends SectionAssignmentApiService {
  private generateMockStudents(
    criteria: AssignmentCriteria,
    count: number = 127
  ): Student[] {
    const firstNames = [
      "Abebe",
      "Almaz",
      "Belete",
      "Chaltu",
      "Dawit",
      "Elias",
      "Feven",
      "Girma",
      "Hanna",
      "Ibrahim",
      "Kalkidan",
      "Lemma",
      "Meron",
      "Natnael",
      "Rahel",
      "Samuel",
      "Tigist",
      "Yohannes",
      "Zara",
      "Abel",
      "Bethlehem",
      "Daniel",
      "Eden",
      "Fasil",
      "Genet",
      "Helen",
      "Isaac",
      "Julia",
      "Kidus",
      "Liya",
    ];

    const lastNames = [
      "Alemu",
      "Bekele",
      "Chala",
      "Desta",
      "Endris",
      "Fekadu",
      "Getahun",
      "Haile",
      "Ishetu",
      "Jember",
      "Kebede",
      "Legesse",
      "Mekuria",
      "Negash",
      "Omer",
      "Petros",
      "Roba",
      "Sisay",
      "Tadesse",
      "Umar",
      "Woldemariam",
      "Yirga",
      "Zewdu",
      "Assefa",
      "Biru",
      "Chekol",
      "Dereje",
      "Eshetu",
    ];

    const students: Student[] = [];

    for (let i = 0; i < count; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const studentId = `${criteria.department.toUpperCase()}/${
        criteria.year
      }/${String(i + 1).padStart(4, "0")}`;

      students.push({
        id: `student_${i + 1}`,
        firstName,
        lastName,
        studentId,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.amu.edu.et`,
        department: criteria.department,
        level: criteria.level,
        year: criteria.year,
        semester: criteria.semester,
        currentSection:
          Math.random() > 0.7
            ? ["a", "b", "c"][Math.floor(Math.random() * 3)]
            : undefined,
      });
    }

    return students;
  }

  async fetchStudents(
    criteria: AssignmentCriteria
  ): Promise<ApiResponse<StudentFetchResponse>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const students = this.generateMockStudents(criteria);

    return {
      success: true,
      data: {
        students,
        total: students.length,
      },
    };
  }

  async updateSectionAssignments(
    sections: Section[],
    criteria: AssignmentCriteria
  ): Promise<ApiResponse<{ updatedCount: number }>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const totalUpdates = sections.reduce(
      (sum, section) => sum + section.count,
      0
    );

    // Simulate random failure
    if (Math.random() < 0.1) {
      return {
        success: false,
        error: "Database connection failed. Please try again.",
      };
    }

    return {
      success: true,
      data: {
        updatedCount: totalUpdates,
      },
      message: `Successfully updated sections for ${totalUpdates} students`,
    };
  }
}

// Export the service instance
export const sectionAssignmentApiService =
  new MockSectionAssignmentApiService();

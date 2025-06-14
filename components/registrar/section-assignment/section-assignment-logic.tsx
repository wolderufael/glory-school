"use client";

import { Student } from "./student-list";

export interface Section {
  id: string;
  name: string;
  students: Student[];
  count: number;
}

export interface SectionAssignmentResult {
  sections: Section[];
  totalStudents: number;
  averagePerSection: number;
  isBalanced: boolean;
}

export class SectionAssignmentLogic {
  private readonly MIN_STUDENTS_PER_SECTION = 40;
  private readonly MAX_STUDENTS_PER_SECTION = 60;

  /**
   * Divide students into sections with optimal distribution
   */
  assignStudentsToSections(students: Student[]): SectionAssignmentResult {
    // Sort students alphabetically
    const sortedStudents = [...students].sort((a, b) => {
      const lastNameComparison = a.lastName.localeCompare(b.lastName);
      if (lastNameComparison !== 0) return lastNameComparison;
      return a.firstName.localeCompare(b.firstName);
    });

    const totalStudents = sortedStudents.length;

    if (totalStudents === 0) {
      return {
        sections: [],
        totalStudents: 0,
        averagePerSection: 0,
        isBalanced: true,
      };
    }

    // Calculate optimal number of sections
    const optimalSections = this.calculateOptimalSections(totalStudents);

    // Divide students into sections
    const sections = this.divideIntoSections(sortedStudents, optimalSections);

    // Calculate metrics
    const averagePerSection = totalStudents / sections.length;
    const isBalanced = this.checkIfBalanced(sections);

    return {
      sections,
      totalStudents,
      averagePerSection,
      isBalanced,
    };
  }

  /**
   * Calculate the optimal number of sections based on total students
   */
  private calculateOptimalSections(totalStudents: number): number {
    // If less than minimum for one section, still create one section
    if (totalStudents <= this.MIN_STUDENTS_PER_SECTION) {
      return 1;
    }

    // Try different numbers of sections to find the best fit
    const maxPossibleSections = Math.ceil(
      totalStudents / this.MIN_STUDENTS_PER_SECTION
    );
    const minPossibleSections = Math.ceil(
      totalStudents / this.MAX_STUDENTS_PER_SECTION
    );

    for (
      let sections = minPossibleSections;
      sections <= maxPossibleSections;
      sections++
    ) {
      const studentsPerSection = Math.ceil(totalStudents / sections);
      if (studentsPerSection <= this.MAX_STUDENTS_PER_SECTION) {
        return sections;
      }
    }

    // Fallback: use minimum possible sections
    return minPossibleSections;
  }

  /**
   * Divide students into the specified number of sections
   */
  private divideIntoSections(
    students: Student[],
    numberOfSections: number
  ): Section[] {
    const sections: Section[] = [];
    const studentsPerSection = Math.floor(students.length / numberOfSections);
    const remainder = students.length % numberOfSections;

    let currentIndex = 0;

    for (let i = 0; i < numberOfSections; i++) {
      const sectionLetter = String.fromCharCode(65 + i); // A, B, C, etc.

      // Calculate how many students this section should get
      const sectionSize = studentsPerSection + (i < remainder ? 1 : 0);

      // Extract students for this section
      const sectionStudents = students.slice(
        currentIndex,
        currentIndex + sectionSize
      );

      sections.push({
        id: sectionLetter.toLowerCase(),
        name: `Section ${sectionLetter}`,
        students: sectionStudents,
        count: sectionStudents.length,
      });

      currentIndex += sectionSize;
    }

    return sections;
  }

  /**
   * Check if sections are balanced (within acceptable range)
   */
  private checkIfBalanced(sections: Section[]): boolean {
    if (sections.length === 0) return true;

    const counts = sections.map((s) => s.count);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);

    // Sections are balanced if the difference is at most 1
    return maxCount - minCount <= 1;
  }

  /**
   * Get section assignment summary
   */
  getSectionSummary(result: SectionAssignmentResult): string {
    if (result.totalStudents === 0) {
      return "No students to assign";
    }

    const { sections, totalStudents, isBalanced } = result;
    const sectionCounts = sections.map((s) => s.count).join(", ");

    return `${totalStudents} students divided into ${
      sections.length
    } sections (${sectionCounts}). ${
      isBalanced ? "Balanced distribution" : "Unbalanced distribution"
    }`;
  }

  /**
   * Validate section assignments before saving
   */
  validateAssignment(result: SectionAssignmentResult): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (result.totalStudents === 0) {
      errors.push("No students to assign");
      return { isValid: false, errors };
    }

    // Check each section
    for (const section of result.sections) {
      if (
        section.count < this.MIN_STUDENTS_PER_SECTION &&
        result.totalStudents >= this.MIN_STUDENTS_PER_SECTION
      ) {
        errors.push(
          `${section.name} has only ${section.count} students (minimum: ${this.MIN_STUDENTS_PER_SECTION})`
        );
      }

      if (section.count > this.MAX_STUDENTS_PER_SECTION) {
        errors.push(
          `${section.name} has ${section.count} students (maximum: ${this.MAX_STUDENTS_PER_SECTION})`
        );
      }
    }

    // Check for duplicate students
    const allStudentIds = result.sections.flatMap((s) =>
      s.students.map((st) => st.id)
    );
    const uniqueStudentIds = new Set(allStudentIds);

    if (allStudentIds.length !== uniqueStudentIds.size) {
      errors.push("Duplicate students found in assignments");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const sectionAssignmentLogic = new SectionAssignmentLogic();

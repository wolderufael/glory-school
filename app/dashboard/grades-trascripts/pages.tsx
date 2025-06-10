"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Card } from "@/components/ui/card";
import { BasicInfo } from "../../../components/dashboard/grades-transcripts/basic-info";
import { Exemptions } from "../../../components/dashboard/grades-transcripts/exemptions";
import { Registrations } from "../../../components/dashboard/grades-transcripts/registrations";
import { CourseAdds } from "../../../components/dashboard/grades-transcripts/course-adds";
import { CourseDrops } from "../../../components/dashboard/grades-transcripts/course-drops";
import { Results } from "../../../components/dashboard/grades-transcripts/results";
import { Curriculum } from "../../../components/dashboard/grades-transcripts/curriculum";
import { Billing } from "../../../components/dashboard/grades-transcripts/billing";

export default function GradesTranscriptsPage() {
  return (
    <div className="container mx-auto py-6">
      <Card className="p-6">
        <Tabs.Root defaultValue="basic" className="w-full">
          <Tabs.List
            className="flex gap-2 mb-8 border-b"
            aria-label="Grades and Transcripts sections"
          >
            <Tabs.Trigger
              value="basic"
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 -mb-[2px]"
            >
              Basic
            </Tabs.Trigger>
            <Tabs.Trigger
              value="exemptions"
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 -mb-[2px]"
            >
              Exemptions
            </Tabs.Trigger>
            <Tabs.Trigger
              value="registrations"
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 -mb-[2px]"
            >
              Registrations
            </Tabs.Trigger>
            <Tabs.Trigger
              value="course-adds"
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 -mb-[2px]"
            >
              Course Adds
            </Tabs.Trigger>
            <Tabs.Trigger
              value="course-drops"
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 -mb-[2px]"
            >
              Course Drops
            </Tabs.Trigger>
            <Tabs.Trigger
              value="results"
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 -mb-[2px]"
            >
              Results
            </Tabs.Trigger>
            <Tabs.Trigger
              value="curriculum"
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 -mb-[2px]"
            >
              Curriculum
            </Tabs.Trigger>
            <Tabs.Trigger
              value="billing"
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 -mb-[2px]"
            >
              Billing
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="basic" className="focus:outline-none">
            <BasicInfo />
          </Tabs.Content>
          <Tabs.Content value="exemptions" className="focus:outline-none">
            <Exemptions />
          </Tabs.Content>
          <Tabs.Content value="registrations" className="focus:outline-none">
            <Registrations />
          </Tabs.Content>
          <Tabs.Content value="course-adds" className="focus:outline-none">
            <CourseAdds />
          </Tabs.Content>
          <Tabs.Content value="course-drops" className="focus:outline-none">
            <CourseDrops />
          </Tabs.Content>
          <Tabs.Content value="results" className="focus:outline-none">
            <Results />
          </Tabs.Content>
          <Tabs.Content value="curriculum" className="focus:outline-none">
            <Curriculum />
          </Tabs.Content>
          <Tabs.Content value="billing" className="focus:outline-none">
            <Billing />
          </Tabs.Content>
        </Tabs.Root>
      </Card>
    </div>
  );
}

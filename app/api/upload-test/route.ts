import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const uploadedFiles: { [key: string]: string } = {};

    // Process each file in the form data
    for (const [key, file] of formData.entries()) {
      if (file instanceof File) {
        // Create a unique filename
        const bytes = new Uint8Array(8);
        crypto.getRandomValues(bytes);
        const uniqueId = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        const fileName = `${uniqueId}-${file.name}`;

        // Save file to uploads directory
        const uploadDir = join(process.cwd(), "public", "uploads");
        const filePath = join(uploadDir, fileName);

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);

        // Store the public URL
        uploadedFiles[key] = `/uploads/${fileName}`;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload files" },
      { status: 500 }
    );
  }
}

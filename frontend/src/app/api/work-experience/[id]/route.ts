import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";
import { Database } from "@/types/database";

type WorkExperienceUpdate = Database["public"]["Tables"]["work_experience"]["Update"];

// GET /api/work-experience/[id] - Fetch a single work experience by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("work_experience")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Work experience not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching work experience:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/work-experience/[id] - Update a work experience by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body: WorkExperienceUpdate = await request.json();
    
    console.log("Updating work experience:", id, body);

    // Remove id from body if present to prevent conflicts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...updateData } = body;

    // Validate year range if both dates are provided
    if (updateData.start_year && updateData.end_year) {
      const startYear = typeof updateData.start_year === 'number' ? updateData.start_year : parseInt(updateData.start_year);
      const endYear = typeof updateData.end_year === 'number' ? updateData.end_year : parseInt(updateData.end_year);

      if (isNaN(startYear) || isNaN(endYear)) {
        return NextResponse.json(
          { error: "Invalid year format. Years must be numbers." },
          { status: 400 }
        );
      }

      if (startYear > endYear) {
        return NextResponse.json(
          { error: "Start year cannot be after end year" },
          { status: 400 }
        );
      }
    }

    // Process tech_stack if provided
    if (updateData.tech_stack && typeof updateData.tech_stack === 'string') {
      updateData.tech_stack = (updateData.tech_stack as string).split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech.length > 0);
    }

    // Ensure updated_at is set
    const processedData = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    console.log("Processed update data:", processedData);

    const { data, error } = await supabase
      .from("work_experience")
      .update(processedData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Work experience not found" },
          { status: 404 }
        );
      }
      console.error("Error updating work experience:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log("Work experience updated successfully:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/work-experience/[id] - Delete a work experience by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("work_experience")
      .delete()
      .eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Work experience not found" },
          { status: 404 }
        );
      }
      console.error("Error deleting work experience:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log("Work experience deleted successfully");
    return NextResponse.json(
      { message: "Work experience deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabase-server";
import { Database } from "@/types/database";

type WorkExperienceInsert = Database["public"]["Tables"]["work_experience"]["Insert"];

// GET /api/work-experience - Fetch all work experiences
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("work_experience")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching work experiences:", error);
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

// POST /api/work-experience - Create new work experience
export async function POST(request: NextRequest) {
  try {
    // Get the current user from the request headers
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    
    // Verify the token and get user info
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    // Check if user is admin
    if (profile.user_role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json();
    
    console.log("Received data:", body);

    // Validate required fields
    const requiredFields = [
      "position",
      "company_name", 
      "start_year",
      "end_year",
      "work_arrangement",
      "tech_stack",
      "description",
    ];

    for (const field of requiredFields) {
      const value = body[field];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate year range
    const startYear = parseInt(body.start_year);
    const endYear = parseInt(body.end_year);

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

    // Validate work arrangement
    const validWorkArrangements = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
    if (!validWorkArrangements.includes(body.work_arrangement)) {
      return NextResponse.json(
        { error: `Invalid work arrangement. Must be one of: ${validWorkArrangements.join(", ")}` },
        { status: 400 }
      );
    }

    // Process tech_stack - convert string to array if needed
    let techStack: string[];
    if (typeof body.tech_stack === 'string') {
      // Split by comma and clean up
      techStack = body.tech_stack.split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech.length > 0);
    } else if (Array.isArray(body.tech_stack)) {
      techStack = body.tech_stack;
    } else {
      return NextResponse.json(
        { error: "Tech stack must be a string or array" },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const workExperienceData: WorkExperienceInsert = {
      position: body.position.trim(),
      company_name: body.company_name.trim(),
      start_year: startYear,
      end_year: endYear,
      work_arrangement: body.work_arrangement,
      tech_stack: techStack,
      description: body.description.trim(),
    };

    console.log("Processed data:", workExperienceData);

    const { data, error } = await supabase
      .from("work_experience")
      .insert(workExperienceData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log("Work experience created successfully:", data);
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
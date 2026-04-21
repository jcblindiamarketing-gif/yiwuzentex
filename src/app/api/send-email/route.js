import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Form Data:", body);

    return NextResponse.json({
      success: true,
      message: "Email API working ✅"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error"
    });
  }
}
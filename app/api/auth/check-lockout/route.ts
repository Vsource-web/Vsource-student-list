import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { apiHandler } from "@/utils/apiHandler";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextResponse } from "next/server";

export const POST = apiHandler(async (req: Request) => {
  const { email } = await req.json();

  if (!email) throw new ApiError(400, "Email is required");

  const user = await prisma.user.findUnique({
    where: { email },
    select: { isLocked: true, failedAttempts: true },
  });

  if (!user) throw new ApiError(404, "User not found");

  return NextResponse.json(
    new ApiResponse(200, { locked: user.isLocked }, "Lock status fetched")
  );
});

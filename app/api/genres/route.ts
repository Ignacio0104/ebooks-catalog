import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const genres = await prisma.book.findMany({
    distinct: ["genre"],
    select: { genre: true },
    orderBy: { genre: "asc" },
  });

  return NextResponse.json(genres.map((g) => g.genre));
}

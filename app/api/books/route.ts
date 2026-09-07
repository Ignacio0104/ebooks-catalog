import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  const books = q
    ? await prisma.$queryRaw`
        SELECT * FROM "Book"
        WHERE unaccent(title) ILIKE unaccent(${"%" + q + "%"})
           OR unaccent(author) ILIKE unaccent(${"%" + q + "%"})
        ORDER BY "createdAt" DESC
      `
    : await prisma.book.findMany({ orderBy: { createdAt: "desc" } });

  return NextResponse.json(books);
}

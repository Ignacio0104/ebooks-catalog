import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const genre = req.nextUrl.searchParams.get("genre")?.trim() ?? "";

  const conditions: Prisma.Sql[] = [];

  if (q) {
    conditions.push(
      Prisma.sql`(unaccent(title) ILIKE unaccent(${"%" + q + "%"}) OR unaccent(author) ILIKE unaccent(${"%" + q + "%"}))`,
    );
  }

  if (genre) {
    conditions.push(Prisma.sql`genre = ${genre}`);
  }

  const whereClause = conditions.length
    ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
    : Prisma.empty;

  const books = await prisma.$queryRaw`
    SELECT * FROM "Book"
    ${whereClause}
    ORDER BY "createdAt" DESC
  `;

  return NextResponse.json(books);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // TODO: acá va a ir el chequeo de sesión/usuario admin

  const body = await req.json();
  const { title, author, genre, price, coverUrl, description, available } =
    body;

  if (!title || !author || !genre || price === undefined) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios (título, autor, género, precio)" },
      { status: 400 },
    );
  }

  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        price: Number(price),
        coverUrl: coverUrl || null,
        description: description || null,
        available: available ?? true,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al crear el libro" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(books);
}

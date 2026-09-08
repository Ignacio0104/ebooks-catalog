import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) {
    return NextResponse.json({ error: "Libro no encontrado" }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // TODO: acá va a ir el chequeo de sesión/usuario admin

  const { id } = await params;
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
    const book = await prisma.book.update({
      where: { id },
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

    return NextResponse.json(book);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al actualizar el libro" },
      { status: 500 },
    );
  }
}

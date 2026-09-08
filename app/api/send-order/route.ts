import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Book = {
  title: string;
  author: string;
  price: number;
};

export async function POST(req: NextRequest) {
  const { email, instagram, books, total } = await req.json();

  if (!email || !books?.length) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const booksListHtml = (books as Book[])
    .map((b) => `<li>${b.title} (${b.author}) - $${b.price}</li>`)
    .join("");

  try {
    await resend.emails.send({
      from: "bookxs1000 <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `Nuevo pedido - ${email}`,
      html: `
        <h2>Nuevo pedido</h2>
        <p><strong>Email del cliente:</strong> ${email}</p>
        <p><strong>Instagram:</strong> ${instagram || "No proporcionado"}</p>
        <p><strong>Libros pedidos:</strong></p>
        <ul>${booksListHtml}</ul>
        <p><strong>Total:</strong> $${total}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al enviar el mail" },
      { status: 500 },
    );
  }
}

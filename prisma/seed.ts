import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const books = [
  {
    title: "El último secreto",
    author: "Dan Brown",
    genre: "Thriller",
    price: 3500,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740706/el-ultimo-secreto.jpg",
    description:
      "Robert Langdon viaja a Praga tras la desaparición de Katherine Solomon y un descubrimiento sobre la conciencia humana.",
  },
  {
    title: "La muerte ajena",
    author: "Claudia Piñeiro",
    genre: "Novela negra",
    price: 3200,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740718/4e642284-7c58-4977-ba2d-30f03ef1a873.png",
    description:
      "Un thriller que cruza el periodismo, el poder y los secretos familiares en Buenos Aires.",
  },
  {
    title: "El verano en que mi madre tuvo los ojos verdes",
    author: "Tatiana Țîbuleac",
    genre: "Novela",
    price: 3000,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740773/7834571a-95fa-4f36-9414-b422a941a69a.png",
    description:
      "Un hijo pasa un verano junto a su madre enferma, revisando una relación marcada por el resentimiento y el amor.",
  },
  {
    title: "La biblioteca de la medianoche",
    author: "Matt Haig",
    genre: "Novela",
    price: 3000,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740795/e4d6540b-cb62-4771-ac00-ad7a5750c331.png",
    description:
      "Entre la vida y la muerte, una biblioteca infinita permite explorar las vidas que pudimos haber vivido.",
  },
  {
    title: "El niño resentido",
    author: "César González",
    genre: "Autobiografía",
    price: 2800,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740814/b893fb5f-e6b5-4f6f-8683-5aff6f490649.png",
    description:
      "La infancia y juventud del autor entre la violencia, la cárcel y la búsqueda de un lugar propio.",
  },
  {
    title: "Podría quedarme acá",
    author: "Oriana Sabatini",
    genre: "Fantasía",
    price: 3300,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740830/aa860bd5-8d3e-437c-9876-ce97d6012a80.png",
    description:
      "Una joven escapa de su vida pública y, trabajando en una funeraria, se reencuentra con un amor que creía perdido para siempre.",
  },
  {
    title: "El año en que hablamos con el mar",
    author: "Andrés Montero",
    genre: "Novela",
    price: 3000,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740849/26d6021a-2f4b-4cb5-8033-7d810a804357.png",
    description:
      "Una historia sobre la pesca, la comunidad y el vínculo con el mar en un pueblo costero.",
  },
  {
    title: "El adversario",
    author: "Emmanuel Carrère",
    genre: "No ficción",
    price: 2900,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740862/0c1d3cad-13d3-48c2-844d-8a8068402dc5.png",
    description:
      "La reconstrucción del caso real de un hombre que vivió una doble vida durante 18 años, hasta cometer un crimen atroz.",
  },
  {
    title: "Un gato para los días difíciles",
    author: "Kiyoshi Shigematsu",
    genre: "Novela",
    price: 2700,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740885/8a0edb06-ead7-438a-a109-ded57e362f92.png",
    description:
      "Relatos sobre personas que atraviesan momentos difíciles y encuentran consuelo en la compañía de un gato.",
  },
  {
    title: "Una casa sola",
    author: "Selva Almada",
    genre: "Novela",
    price: 2900,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740899/ca07f074-e733-4cae-a86d-d7efae42f30f.png",
    description:
      "Una historia íntima ambientada en el interior argentino, con la prosa distintiva de Selva Almada.",
  },
  {
    title: "Ellas",
    author: "Viviana Rivero",
    genre: "Relatos",
    price: 3100,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740919/41e87a73-a7bd-47f5-8b7c-edda762eec6f.png",
    description:
      "Relatos de mujeres en distintos momentos y lugares, atravesadas por miedos, mandatos y la fuerza de volver a empezar.",
  },
  {
    title: "Gordon el aniquilador",
    author: "Marcelo Larraquy",
    genre: "Novela histórica",
    price: 3200,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740944/8348d382-4f64-4e89-a213-ec32db4bf4c5.png",
    description:
      "La reconstrucción novelada de la Argentina violenta de los años 70 a través de la figura de Aníbal Gordon.",
  },
  {
    title: "No tengas miedo",
    author: "Stephen King",
    genre: "Terror",
    price: 3400,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740957/7f19e4aa-2723-4111-8ff9-1e403796dd98.png",
    description: "Una nueva historia de terror del maestro del género.",
  },
  {
    title: "Dorayaki",
    author: "Durian Sukegawa",
    genre: "Novela",
    price: 2600,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788740994/30ec64bf-0f02-4816-a2e4-db5bea7953b2.png",
    description:
      "Una historia sobre la amistad entre un vendedor de dorayakis y una anciana con un pasado difícil.",
  },
  {
    title: "Antes de que se enfríe el café",
    author: "Toshikazu Kawaguchi",
    genre: "Novela",
    price: 2900,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788741006/17a6c90e-853a-43c4-80ea-9e24b6231f7c.png",
    description:
      "En un café de Tokio es posible viajar en el tiempo, pero solo mientras el café siga caliente.",
  },
  {
    title: "Cadáver exquisito",
    author: "Agustina Bazterrica",
    genre: "Distopía",
    price: 3300,
    coverUrl:
      "https://res.cloudinary.com/yyluywny/image/upload/v1788741025/74abf8d8-087b-48b8-9bb8-23b83e5349db.png",
    description:
      "En un mundo donde comer carne humana es legal, la novela explora los límites de la deshumanización.",
  },
];

async function main() {
  await prisma.book.createMany({
    data: books.map((b) => ({ ...b, available: true })),
  });
  console.log(`${books.length} libros creados.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

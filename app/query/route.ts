import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

// const dropTables = async () => {
//   await sql`DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;`
//   await sql`DROP TABLE IF EXISTS users CASCADE`
//   await sql`DROP TABLE IF EXISTS invoices CASCADE`
//   await sql`DROP TABLE IF EXISTS customers CASCADE`
//   await sql`DROP TABLE IF EXISTS revenue CASCADE`
// }

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    // return Response.json(await listInvoices());
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

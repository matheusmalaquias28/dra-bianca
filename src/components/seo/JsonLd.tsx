/** Injeta um bloco JSON-LD (Schema.org) na página. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Conteúdo controlado pelo próprio site (não é entrada de usuário).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

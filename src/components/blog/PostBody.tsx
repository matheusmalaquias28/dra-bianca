/** Renderiza o HTML do post. O conteúdo é produzido apenas pela autora
 *  autenticada no painel (ou pelos arquivos .mdx do repositório), então é confiável. */
export function PostBody({ html }: { html: string }) {
  return <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

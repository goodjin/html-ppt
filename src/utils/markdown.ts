import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str: string, lang: string) {
    return `<pre class="code-block"><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`
  }
})

export function renderMarkdown(content: string): string {
  return md.render(content)
}

export function renderMarkdownInline(content: string): string {
  return md.renderInline(content)
}

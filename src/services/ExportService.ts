export interface ExportOptions {
  format: 'pdf' | 'html' | 'png'
  range: 'all' | 'current'
  quality?: number
}

export class ExportService {
  async exportPdf(content: string, _options: ExportOptions): Promise<void> {
    // Create a new window with the content and print
    const printWindow = window.open('', '_blank')
    if (!printWindow) throw new Error('无法打开打印窗口')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>导出PDF</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.0/dist/reveal.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.0/dist/theme/white.css">
        <style>
          @media print {
            .reveal { font-size: 20px; }
            .reveal .slides section { page-break-after: always; }
          }
        </style>
      </head>
      <body>
        <div class="reveal">
          <div class="slides">
            <section>${content}</section>
          </div>
        </div>
      </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  async exportHtml(content: string, _options: ExportOptions): Promise<void> {
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>演示文稿</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.0/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.0/dist/theme/black.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section>${content}</section>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.6.0/dist/reveal.js"><\/script>
  <script>
    Reveal.initialize({
      hash: true,
      slideNumber: 'c/t',
      transition: 'slide'
    });
  <\/script>
</body>
</html>`

    // Download the HTML file
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'presentation.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  async exportPng(content: string, _options: ExportOptions): Promise<void> {
    // Simple PNG export using canvas
    // In production, you'd use html2canvas for better results
    const container = document.createElement('div')
    container.innerHTML = content
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    document.body.appendChild(container)

    // For now, just show an alert
    // Real implementation would use html2canvas library
    alert('PNG导出功能需要html2canvas库支持')

    document.body.removeChild(container)
  }
}

export const exportService = new ExportService()

# Web PPT 工程

基于 Reveal.js 的网页版PPT开发工程。

## 目录结构

```
web-ppt/
├── presentations/   # 成品PPT（.html文件）
├── templates/       # PPT模板
├── assets/         # 静态资源
│   ├── css/        # 样式文件
│   ├── js/         # 脚本文件
│   └── images/     # 图片资源
└── docs/           # 文档
```

## 快速开始

1. 安装依赖（可选，本地化部署时使用）
```bash
npm install
```

2. 开发模式下预览
```bash
npx serve .
```

3. 直接打开HTML
在浏览器中打开 `presentations/*.html` 即可查看

## 使用模板

复制模板创建新PPT：
```bash
cp templates/basic.html presentations/my-presentation.html
```

## Reveal.js 特性

- 多种转场效果（slide/fade/zoom/convex/concave）
- 代码高亮
- 演讲者备注（按S键）
- 片段显示（fragment）
- 背景图片/颜色/渐变
- 进度指示
- PDF导出
- 响应式设计

## 在线资源

- [Reveal.js 官网](https://revealjs.com)
- [Reveal.js GitHub](https://github.com/hakimel/reveal.js)

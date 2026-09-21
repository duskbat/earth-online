import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

// 各板块：目录位于 docs/manual/<name>/，顶导入口与侧边栏统一由此生成
const sections = ["种植", "标本", "poe2"];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "Earth Online",
  description: "Life EXP & Walkthroughs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      ...sections.map((name) => ({ text: name, link: `/manual/${name}/` })),
    ],

    sidebar: {
      // 各板块：进入 /manual/<板块>/ 后侧边栏展示其下每个文档（标题取一级标题，按拼音排序）
      ...generateSidebar(
        sections.map((name) => ({
          documentRootPath: "docs",
          scanStartPath: `manual/${name}`,
          resolvePath: `/manual/${name}/`,
          useTitleFromFileHeading: true,
          sortMenusByCustomFunction: (a, b) => a.fileName.localeCompare(b.fileName, "zh"),
        }))
      ),
      // 其余页面
      "/": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/duskbat" },
    ],
  },
});

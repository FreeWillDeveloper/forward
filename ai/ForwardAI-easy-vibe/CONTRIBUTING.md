# Contributing to Easy-Vibe

Share a project, improve a tutorial, fix a link, or help with a translation. Small contributions are welcome.

<a id="share-your-case"></a>

## Share your case / 分享你的案例

Built a classroom tool, a student project, a personal website, or your first working demo? Tell us what you made. A small project that solves a real problem is a great case.

做出了课堂工具、课程作品、个人网站，或者第一个能运行的 demo？欢迎分享。解决了一个真实问题的小作品，就值得被看见。

### Prepare / 准备材料

- **Your story / 你的故事**: Who is it for? What problem did you solve? How did you build it with AI, and what did you learn?
- **A screenshot or GIF / 一张截图或 GIF**: Show the actual product. A working prototype is welcome; describe what works and what is still unfinished.
- **A project link, if available / 项目链接（如有）**: Add a demo, repository, or short video. A public source repository is optional.

### Submit a Pull Request / 提交 PR

1. [Fork this repository / Fork 本仓库](https://github.com/datawhalechina/easy-vibe/fork), then create a branch for your case.
2. Copy [the case template / 案例模板](user-cases/TEMPLATE.md) to `user-cases/your-project/README.md`. Replace `your-project` with a short folder name such as `classroom-helper`. Write in the language you are comfortable with; you do not need to translate the whole site.

   把模板复制到你自己的案例目录，使用你熟悉的语言填写即可，无需翻译整个站点。

   ```text
   user-cases/
     your-project/
       README.md
       images/
         screenshot.png
   ```

   Put your screenshots in that `images/` folder and reference them with `![Project screenshot](./images/screenshot.png)`. Add a link to your case in the community table in [the case directory / 案例目录](user-cases/README.md).

   将截图放进案例的 `images/` 目录，用相对路径插入文章；再把案例链接加到案例目录的社区投稿表格中。

3. Commit the files to your fork, then [open a Pull Request / 发起 Pull Request](https://github.com/datawhalechina/easy-vibe/compare?expand=1&template=user_case.md). Set the base to `datawhalechina/easy-vibe:main` and compare against your fork's case branch. Use a title such as `docs(case): add classroom helper` and select the `user_case.md` PR template.

   提交文件后，在 PR 页面选择本仓库的 `main` 为目标分支、你 Fork 中的案例分支为来源分支，按案例 PR 模板填写。

After review and merge, your case becomes part of the community directory. Maintainers may also invite you to adapt it for the website's Vibe Stories section. Your original language is enough to start.

审核合并后，案例会收录到社区目录。维护者也可能邀请你一起将它整理成官网的 Vibe Stories。先用自己的语言把故事讲出来就好。

### Explore existing stories / 看看已有案例

- [Touchscreen lock for a rural classroom / 乡村课堂触屏锁](docs/zh-cn/vibe-stories/story-1.md)
- [A campus second-hand marketplace / 校园二手市场](docs/zh-cn/vibe-stories/story-2.md)
- [An AI coding companion for students / 编程学伴](docs/zh-cn/vibe-stories/story-3.md)
- [An overseas AI tools website / 出海 AI 工具站](docs/zh-cn/vibe-stories/story-4.md)

## Tutorial and code contributions

Keep changes focused and follow [the repository guidelines](AGENTS.md). Explain the problem and your change in the PR. Include screenshots for visual changes. For documentation-site or component changes, run `npm run build`; a story-only submission can be checked by previewing the Markdown, images, and links.

export default function BuildingWithReact() {
return (
<>
<h1 className="font-header text-4xl md:text-5xl text-black dark:text-white mb-4">
Eyeglass in one week
</h1>

<h2 className="font-header text-3xl md:text-4xl text-black dark:text-white mt-12 mb-4">
The Spark
</h2>

<p className="text-black dark:text-white/90">
I was exploring the incredible tool—and rapidly evolving Agentic semantic understanding standard—{' '}
<a href="https://agentation.dev" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-header">
Agentation
</a>{' '}
recently. It's a simple idea, but the execution is incredible and once I started using it I started dreading chatting to an agent about frontend changes <em>NOT</em> using Agentation.
</p>

<div className="my-8 p-6 bg-gradient-to-r from-blue-500/10 to-transparent dark:from-blue-500/20 dark:to-transparent border-l-4 border-blue-500 rounded-r-xl">
<p className="text-black dark:text-white/90">
<strong className="font-header text-lg">The friction point:</strong> I didn't want to switch to my terminal for every change.
</p>
</div>

<p className="text-black dark:text-white/90">
It sounds spoiled, but I imagined there were real benefits from not leaving the browser. Or so I told myself. Thus the idea for <strong className="font-header">Eyeglass</strong> was born.
</p>

<p className="text-black dark:text-white/90">
Over one week I fervently recreated Agentation in my own way with <em>one goal</em>: two-way communication from the browser.
</p>

<div className="my-8 p-6 border border-black/10 dark:border-white/10 rounded-xl bg-black/5 dark:bg-white/5">
<p className="text-black dark:text-white/90 mb-3">
<strong className="font-header">Why recreate Agentation?</strong>
</p>
<ul className="space-y-2 text-black/80 dark:text-white/80">
<li>→ Prove to myself I could make a "magic" tool</li>
<li>→ Prove Geoffrey Huntley's point: with Agentic AI, there are no software moats</li>
<li>→ The only limit in development is now imagination</li>
</ul>
<p className="text-sm text-black/60 dark:text-white/60 mt-4 italic">
Though, you get better (and safer) results if you know what you're doing technically.
</p>
</div>

<p className="text-black dark:text-white/90">
AI coding agents are incredible, but there is a fundamental disconnect. When I'm staring at a button in my browser thinking "this padding is wrong," I can't just tell the AI *that*. I have to context-switch to my terminal, mentally translate the visual element into a file path or component name, and hope the AI understands which "Submit" button I'm talking about.
</p>

<div className="my-10 p-6 border-l-4 border-blue-500 bg-blue-500/5 dark:bg-blue-500/10 rounded-r-lg">
<p className="text-black dark:text-white/90 text-xl font-header">
I wanted to close that loop. I didn't want to leave the browser. I wanted to point, describe, and be done.
</p>
</div>

<p className="text-black dark:text-white/90">
So, I gave myself a challenge: build the missing link between the browser DOM and the AI agent. 96 hours later, <strong className="font-header">Eyeglass</strong> was born.
</p>

<h2 className="font-header text-3xl md:text-4xl text-black dark:text-white mt-12 mb-4">
The "Aha" Moment
</h2>

<p className="text-black dark:text-white/90">
The goal was simple: A visual inspector that feeds context directly to Claude (or any agent). The core insight wasn't just about highlighting an element; it was about capturing everything an AI needs to actually modify code.
</p>

<p className="text-black dark:text-white/90">
A screenshot isn't enough. The agent needs the <em>internals</em>:
</p>

<ul className="list-disc list-inside space-y-2 text-black dark:text-white/90 ml-4">
<li>Component names and file paths (reacting to React/Vue/Svelte internals)</li>
<li>The accessibility tree (role, name, state)</li>
<li>Computed styles and layout context</li>
</ul>

<h2 className="font-header text-3xl md:text-4xl text-black dark:text-white mt-12 mb-4">
Building the Bridge (and the Hacks)
</h2>

<p className="text-black dark:text-white/90">
Getting this to work required getting messy. Frameworks don't like giving up their secrets. To make Eyeglass work, I had to walk the React Fiber tree, dig through Vue's <code className="px-2 py-1 bg-black/10 dark:bg-white/10 rounded text-sm">$options</code>, and pattern-match Svelte components.
</p>

<p className="text-black dark:text-white/90">
It felt hacky at first, but once I connected it to the <strong className="font-header">Model Context Protocol (MCP)</strong>, it felt like magic. Instead of polling endpoints, the AI could now request a "snapshot" of exactly what I was looking at.
</p>

<h2 className="font-header text-3xl md:text-4xl text-black dark:text-white mt-12 mb-4">
The Developer Experience
</h2>

<p className="text-black dark:text-white/90">
I spent the first day dog-fooding the tool. I'd spot a bug in the Eyeglass UI, point at it <em>using Eyeglass</em>, and tell the AI to fix it. I realized quickly that if this was going to be useful, it had to be seamless.
</p>

<div className="grid gap-4 my-8">
<div className="p-5 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-slate-900/50">
<h3 className="font-header text-xl text-black dark:text-white mb-2">Auto-commits</h3>
<p className="text-sm text-black/80 dark:text-white/70">Every change the AI makes gets a unique ID. If it breaks something, I just hit the undo button in the browser.</p>
</div>

<div className="p-5 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-slate-900/50">
<h3 className="font-header text-xl text-black dark:text-white mb-2">Zero Config</h3>
<p className="text-sm text-black/80 dark:text-white/70">I hated the idea of manual setup. I built a CLI that detects your framework (Next.js, Vite, Remix) and sets up the bridge automatically.</p>
</div>

<div className="p-5 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-slate-900/50">
<h3 className="font-header text-xl text-black dark:text-white mb-2">Zero Bloat</h3>
<p className="text-sm text-black/80 dark:text-white/70">It uses dynamic imports to ensure the inspector is tree-shaken out of production. It costs you 0 bytes when you deploy.</p>
</div>
</div>

<h2 className="font-header text-3xl md:text-4xl text-black dark:text-white mt-12 mb-4">
The Result
</h2>

<p className="text-black dark:text-white/90">
In 4 days, Eyeglass went from a "what if" to a production-ready tool on npm. The first time I clicked a button, typed "make this blue," and watched the code change in real-time without ever touching my terminal—that was the moment the gap closed.
</p>

<p className="text-black dark:text-white/90">
The moat might be gone, but the bridge is just being built.
</p>

<h2 className="font-header text-3xl md:text-4xl text-black dark:text-white mt-12 mb-4">
Try It
</h2>

<p className="text-black dark:text-white/90">
<strong>GitHub:</strong>{' '}
<a href="https://github.com/donutboyband/eyeglass" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
github.com/donutboyband/eyeglass
</a>
</p>

<div className="my-6 p-4 bg-black dark:bg-white/10 rounded-lg">
<code className="text-sm text-[#baff29] font-mono">
npx @eyeglass/cli init
</code>
</div>

<p className="text-black dark:text-white/90 italic text-center">
Point at things. Describe them. Let AI do the rest.
</p>
</>
);
}

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';

const md = new MarkdownIt({
    html: true,
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
        }
        return `<pre class="hljs"><code>${this.utils.escapeHtml(str)}</code></pre>`;
    }
});

export default md;

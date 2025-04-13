// 内联CSS样式
const css = `
<style>
.obsidian-card-system {
  --column-count: 3;
  --filter-bar-bg: var(--background-secondary);
  --filter-border: var(--background-modifier-border);
}

.toolbar {
  background: var(--filter-bar-bg);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.multiselect {
  max-height: 120px;
  overflow-y: auto;
  border: 1px solid var(--filter-border);
  border-radius: 4px;
  padding: 0.5rem;
}

.layout-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(var(--column-count), 1fr);
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.category-columns {
  grid-template-columns: none;
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.category-column {
  min-width: 300px;
  flex: 1;
}

.category-title {
  font-size: 1.2em;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: var(--color-base-30);
  border-radius: 6px;
}

.obs-card {
  background: var(--background-primary);
  border: 1px solid var(--background-modifier-border);
  border-radius: 12px;
  padding: 1.2rem;
  transition: all 0.2s ease;
  cursor: pointer;
  break-inside: avoid;
}

.obs-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
}

.card-title {
  font-size: 1.3em;
  margin-bottom: 0.8rem;
  color: var(--text-accent);
  border-bottom: 2px solid currentColor;
  padding-bottom: 0.3rem;
}

.meta-line {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
  font-size: 0.9em;
}

.category-badge {
  background: var(--color-green-rgb);
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
}

.tag-item {
  background: var(--background-secondary);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85em;
}

.card-content {
  line-height: 1.7;
  color: var(--text-normal);
}

.card-content p {
  margin: 0.6em 0;
}

.internal-link {
  color: var(--text-accent);
  border-bottom: 1px dashed currentColor;
  text-decoration: none !important;
}

.obs-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  background: var(--background-secondary);
  padding: 4px;
}

.image-error {
  border: 2px dashed var(--text-error);
  padding: 1rem;
  text-align: center;
  color: var(--text-error);
}
</style>
`;

class CardSystem {
  constructor() {
    this.state = {
      categoryFilter: null,
      tagFilters: new Set(),
      columns: 3,
      groupByCategory: false
    };
  }

  async init() {
    this.dbFile = app.vault.getAbstractFileByPath("AllItems.md");
    if (!this.dbFile) {
      dv.paragraph("❌ 数据库文件未找到");
      return;
    }
    
    try {
      this.rawContent = await app.vault.cachedRead(this.dbFile);
      this.cards = this.parseCards();
      this.update();
    } catch (error) {
      dv.paragraph(`❌ 读取文件失败: ${error.message}`);
    }
  }

  parseCards() {
    return this.rawContent.split(/^## /gm).slice(1).map(section => {
      const lines = section.split('\n');
      const header = lines[0].trim();
      const metadata = { tags: [], category: null };
      let contentLines = [];

      lines.slice(1).forEach(line => {
        if (line.startsWith('tags::')) {
          metadata.tags = line.replace('tags::', '').trim().split(/,\s*/);
        } else if (line.startsWith('category::')) {
          metadata.category = line.replace('category::', '').trim();
        } else if (line.trim()) {
          contentLines.push(line);
        }
      });

      return {
        title: header,
        ...metadata,
        content: this.renderMarkdown(contentLines.join('\n')),
        visible: true
      };
    });
  }

  renderMarkdown(content) {
    return content
      .replace(/^#(#+) (.*)$/gm, (_, level, text) => `<h${level.length + 1}>${text}</h${level.length + 1}>`)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/!\[\[(.*?)\]\]/g, (_, img) => this.resolveImage(img))
      .replace(/\[\[(.*?)\]\]/g, '<a href="#$1" class="internal-link">$1</a>')
      .replace(/([^\n]+)\n/g, '<p>$1</p>');
  }

  resolveImage(filename) {
    const path = this.getImagePath(filename);
    return path 
      ? `<img src="${path}" alt="${filename}" class="obs-image" onerror="this.classList.add('image-error')">`
      : `<div class="image-error">图片未找到: ${filename}</div>`;
  }

  getImagePath(filename) {
    const folders = [
      app.vault.config.attachmentFolderPath || '',
      'Attachments/',
      'Assets/',
      ''
    ];
    
    for (const folder of folders) {
      const fullPath = folder ? `${folder}/${filename}` : filename;
      const file = app.vault.getAbstractFileByPath(fullPath);
      if (file) return app.vault.getResourcePath(file);
    }
    return null;
  }

  applyFilters() {
    this.cards.forEach(card => {
      const tagMatch = this.state.tagFilters.size === 0 || 
        card.tags.some(t => this.state.tagFilters.has(t));
      
      const categoryMatch = !this.state.categoryFilter || 
        card.category === this.state.categoryFilter;
      
      card.visible = tagMatch && categoryMatch;
    });
  }

  renderToolbar() {
    const categories = [...new Set(this.cards.map(c => c.category))].filter(Boolean);
    const allTags = [...new Set(this.cards.flatMap(c => c.tags))].filter(Boolean);
    
    return `
      <div class="toolbar">
        <div class="filter-group">
          <label>分类筛选：</label>
          <select class="category-select" 
            onchange="cardSystem.state.categoryFilter = this.value === '' ? null : this.value; cardSystem.update()">
            <option value="">全部</option>
            ${categories.map(c => `
              <option value="${c}" ${this.state.categoryFilter === c ? 'selected' : ''}>${c}</option>
            `).join('')}
          </select>
        </div>

        <div class="filter-group">
          <label>标签筛选：</label>
          <div class="multiselect">
            ${allTags.map(tag => `
              <label style="display: block;">
                <input type="checkbox" value="${tag}" 
                  ${this.state.tagFilters.has(tag) ? 'checked' : ''}
                  onchange="cardSystem.toggleTag('${tag.replace(/'/g, "\\'")}')">
                ${tag}
              </label>
            `).join('')}
          </div>
        </div>

        <div class="layout-controls">
          <div>
            <label>栏数：</label>
            <input type="number" min="1" max="6" value="${this.state.columns}"
              onchange="cardSystem.state.columns = Math.max(1, Math.min(6, parseInt(this.value))); cardSystem.update()">
          </div>
          <label style="white-space: nowrap;">
            <input type="checkbox" ${this.state.groupByCategory ? 'checked' : ''}
              onchange="cardSystem.state.groupByCategory = !cardSystem.state.groupByCategory; cardSystem.update()">
            按分类分栏
          </label>
          <button onclick="cardSystem.resetFilters()">重置筛选</button>
        </div>
      </div>
    `;
  }

  renderCards() {
    this.applyFilters();
    const visibleCards = this.cards.filter(c => c.visible);

    if (this.state.groupByCategory) {
      const grouped = visibleCards.reduce((acc, card) => {
        const key = card.category || '未分类';
        acc[key] = acc[key] || [];
        acc[key].push(card);
        return acc;
      }, {});

      return `
        <div class="category-columns">
          ${Object.entries(grouped).map(([category, cards]) => `
            <div class="category-column">
              <div class="category-title">${category}</div>
              ${cards.map(c => this.renderCard(c)).join('')}
            </div>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="card-container" style="--column-count: ${this.state.columns}">
        ${visibleCards.map(c => this.renderCard(c)).join('')}
      </div>
    `;
  }

  renderCard(card) {
    return `
      <div class="obs-card" style="${card.visible ? '' : 'display: none;'}">
        <div class="card-title">${card.title}</div>
        <div class="meta-line">
          ${card.category ? `<span class="category-badge">${card.category}</span>` : ''}
          ${card.tags.map(t => `<span class="tag-item">${t}</span>`).join('')}
        </div>
        <div class="card-content">${card.content}</div>
      </div>
    `;
  }

  toggleTag(tag) {
    this.state.tagFilters.has(tag) 
      ? this.state.tagFilters.delete(tag)
      : this.state.tagFilters.add(tag);
    this.update();
  }

  resetFilters() {
    this.state = {
      categoryFilter: null,
      tagFilters: new Set(),
      columns: 3,
      groupByCategory: false
    };
    this.update();
  }

  update() {
    dv.container.innerHTML = css + this.renderToolbar() + this.renderCards();
    this.bindEvents();
  }

  bindEvents() {
    dv.container.querySelectorAll('.internal-link').forEach(link => {
      link.onclick = e => {
        e.preventDefault();
        location.hash = e.target.textContent;
        window.dispatchEvent(new Event('hashchange'));
      };
    });
  }
}

// 初始化卡片系统
const cardSystem = new CardSystem();
cardSystem.init();
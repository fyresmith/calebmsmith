# Caleb Smith - Linktree Landing Page

A beautiful, performant, and modern linktree-style landing page built with pure HTML, CSS, and JavaScript. Optimized for GitHub Pages deployment.

## ✨ Features

- **🎨 Modern Design**: Clean, minimalist design with beautiful gradients and smooth animations
- **📱 Fully Responsive**: Optimized for all device sizes (mobile, tablet, desktop)
- **⚡ High Performance**: Lightweight, fast-loading with optimized CSS and minimal JavaScript
- **♿ Accessible**: WCAG compliant with keyboard navigation, screen reader support, and focus management
- **🌙 Dark Mode Support**: Automatically adapts to user's system preferences
- **📊 Analytics Ready**: Built-in support for Google Analytics and custom tracking
- **🎯 SEO Optimized**: Proper meta tags, Open Graph, and semantic HTML
- **🔧 Easy to Customize**: Simple to modify links, colors, and content

## 🚀 Quick Start

### Deploy to GitHub Pages

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/calebmsmith/linktree.git
   cd linktree
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)"
   - Click "Save"

3. **Your site will be available at:**
   ```
   https://yourusername.github.io/linktree/
   ```

### Local Development

```bash
# Clone the repository
git clone https://github.com/calebmsmith/linktree.git
cd linktree

# Open with a local server (recommended)
python -m http.server 8000
# OR
npx serve .
# OR simply open index.html in your browser
```

## 🛠️ Customization

### Update Personal Information

Edit `index.html` to customize:

```html
<!-- Profile Information -->
<h1 class="profile-name">Your Name</h1>
<p class="profile-bio">Your Bio/Tagline</p>

<!-- Avatar (change initials) -->
<div class="avatar">YN</div>
```

### Add/Update Links

Replace the example links in `index.html`:

```html
<a href="your-url" class="link-item" target="_blank" rel="noopener noreferrer">
    <span class="link-icon">
        <!-- Your SVG icon -->
    </span>
    <span class="link-text">Your Link Text</span>
    <span class="link-arrow">→</span>
</a>
```

### Customize Colors

Edit the CSS variables in `style.css`:

```css
/* Change the main gradient background */
body {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}

/* Change the avatar gradient */
.avatar {
    background: linear-gradient(135deg, #your-color1, #your-color2);
}
```

### Update Meta Tags

Customize the SEO and social media tags in `index.html`:

```html
<title>Your Name | Links</title>
<meta name="description" content="Your description">
<meta property="og:title" content="Your Name | Links">
<meta property="og:url" content="https://yourusername.github.io/linktree/">
```

## 📊 Analytics Setup

### Google Analytics

1. Add your Google Analytics 4 tracking code to `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. Replace `GA_MEASUREMENT_ID` with your actual measurement ID

The JavaScript will automatically track:
- Link clicks
- Page load times
- User engagement

## 🎯 Performance Features

- **CSS Optimizations**: Minified styles with efficient selectors
- **JavaScript**: Lightweight, modular code with performance monitoring
- **Images**: SVG icons for crisp display at any size
- **Caching**: Proper meta tags for browser caching
- **Preloading**: Link prefetching on hover for faster navigation

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support with custom shortcuts
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and skip links
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Supports high contrast mode

### Keyboard Shortcuts

- `1-6`: Jump to specific links
- `H`: Scroll to top
- `Tab/Shift+Tab`: Navigate through links

## 🌐 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📁 File Structure

```
linktree/
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # Interactive enhancements
└── README.md           # This file
```

## 🔧 Advanced Customization

### Custom Fonts

Add Google Fonts or custom fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" as="style">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
```

### Custom Icons

Replace SVG icons with your preferred icons from:
- [Heroicons](https://heroicons.com/)
- [Feather Icons](https://feathericons.com/)
- [Lucide](https://lucide.dev/)

### Animation Customization

Modify animations in `style.css`:

```css
@keyframes yourCustomAnimation {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## 📱 Mobile Optimization

- Touch-friendly link sizes (44px minimum)
- Responsive typography scaling
- Optimized for thumb navigation
- Fast tap response

## 🛡️ Security Features

- `rel="noopener noreferrer"` on external links
- No inline JavaScript (CSP friendly)
- Secure meta tags

## 📈 Performance Metrics

Target performance metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Bundle Size**: < 50KB

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Credits

Built with ❤️ by [Caleb Smith](https://github.com/calebmsmith)

---

⭐ Star this repo if you found it helpful!

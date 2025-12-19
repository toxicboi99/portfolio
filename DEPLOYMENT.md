# Deployment Guide - Ritesh Narayan Shah Portfolio

## 🚀 Deploy to GitHub & Netlify

### Step 1: Push to GitHub

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website with SEO optimization"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `portfolio` or `ritesh-shah-portfolio`)
   - Don't initialize with README

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Netlify

1. **Sign up/Login to Netlify**:
   - Go to https://www.netlify.com/
   - Sign up or login with GitHub

2. **Deploy from GitHub**:
   - Click "Add new site" → "Import an existing project"
   - Select "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select your repository
   - Netlify will auto-detect settings (no build command needed)
   - Click "Deploy site"

3. **Update Site URL**:
   - After deployment, go to Site settings → General
   - Update "Site name" to something like `ritesh-shah-portfolio`
   - Your site will be available at `https://ritesh-shah-portfolio.netlify.app`
   - Or set up custom domain if you have one

4. **Update Canonical URLs**:
   - After getting your Netlify URL, update all `canonical` URLs in HTML files
   - Replace `https://riteshshah.netlify.app` with your actual Netlify URL
   - Update `sitemap.xml` with your actual URL
   - Update all Open Graph and Twitter Card URLs

### Step 3: SEO Optimization Checklist

#### ✅ Google Search Console
1. Go to https://search.google.com/search-console
2. Add your property (Netlify URL)
3. Verify ownership (HTML tag method recommended)
4. Submit sitemap: `https://your-site.netlify.app/sitemap.xml`

#### ✅ Google Analytics (Optional but Recommended)
1. Create Google Analytics account
2. Get tracking ID
3. Add to `index.html` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

#### ✅ Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap

#### ✅ Social Media Verification
- Update all social media profiles with your portfolio URL
- Add portfolio link to:
  - LinkedIn profile
  - GitHub profile
  - Twitter/X profile
  - Any other social platforms

### Step 4: Update SEO Meta Tags

After deployment, update these files with your actual Netlify URL:

1. **All HTML files** - Update canonical URLs
2. **sitemap.xml** - Update all URLs
3. **robots.txt** - Update sitemap URL

### Step 5: Performance Optimization

1. **Image Optimization**:
   - Ensure `ritesh.jpg` is optimized (use tools like TinyPNG)
   - Recommended size: under 200KB
   - Use WebP format if possible

2. **Enable Netlify Features**:
   - Go to Site settings → Build & deploy
   - Enable "Asset optimization"
   - Enable "Minify HTML/CSS/JS"

### Step 6: Monitor & Improve

1. **Check SEO Score**:
   - Use Google PageSpeed Insights
   - Use Lighthouse (built into Chrome DevTools)
   - Target: 90+ score

2. **Monitor Rankings**:
   - Check Google Search Console regularly
   - Monitor for "Ritesh Narayan Shah" and "Ritesh Prasad Sah"
   - Track keyword rankings

3. **Update Content Regularly**:
   - Add new projects
   - Update blog posts
   - Keep information current

## 📝 Important Notes

- **Name Variations**: The site is optimized for both "Ritesh Narayan Shah" and "Ritesh Prasad Sah" for maximum SEO coverage
- **Contact Information**: Phone (9234670937) and email (shaharyan932@gmail.com) are included in meta tags for local SEO
- **Location**: Kharar, Punjab is included for local search optimization
- **Structured Data**: JSON-LD schema is included for rich snippets in search results

## 🔗 Quick Links After Deployment

- Portfolio: `https://your-site.netlify.app`
- Sitemap: `https://your-site.netlify.app/sitemap.xml`
- Robots: `https://your-site.netlify.app/robots.txt`

## 📞 Support

If you need help with deployment, contact:
- Email: shaharyan932@gmail.com
- Phone: 9234670937


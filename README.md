# IRCC Long-Term Paddy Purchase & Farmer Forecast Dashboard

Static web dashboard application for **Ibis Rice Conservation Company (IRCC)**.

## Project Structure

```text
├── .gitignore              # Excludes source spreadsheets, reports, raw JSON data, and local files
├── CNAME                   # Custom domain mapping for GitHub Pages (forecast.icsserver.com)
├── README.md               # Deployment and repository structure guide
├── index.html              # Protected dashboard entry point (GitHub Pages)
├── assets/
│   └── ircc-logo.png       # IRCC logo used on the dark-mode login screen
├── css/
│   └── custom.css          # Custom dashboard styles, tabs, and print layout
└── js/
    ├── app.js              # Authentication gate, Chart.js visualizations, tables, and export tools
    └── data.js             # Dashboard runtime dataset
```

## Deployment (GitHub Pages)

This is a static HTML/CSS/JavaScript application with no build step or backend required:

1. Push the tracked web files to your GitHub repository.
2. Open repository **Settings** → **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch** → `main` / `/ (root)` and click **Save**.

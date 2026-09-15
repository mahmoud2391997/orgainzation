# Image replacement (no people)

This project currently uses images under `public/images/*` referenced from `lib/content.ts`, `lib/examples.ts`, and `components/hero-visual.tsx`.

## Goal

- Replace the existing AI-generated images with **higher-quality** visuals.
- **Avoid people entirely** (no faces, no human silhouettes, no hands).

## Required files (keep exact filenames)

Place your newly generated images in `./_new_images/` with these exact names:

### PNG (1:1, 1024×1024 recommended)

- `service-software.png`
- `service-ai.png`
- `service-cloud.png`
- `service-consulting.png`
- `service-quality.png`
- `service-transformation.png`
- `technology-generative-ai.png`
- `technology-cloud-native.png`
- `technology-data-platforms.png`
- `technology-web-applications.png`
- `technology-automation.png`
- `technology-cyber-resilience.png`
- `solution-healthcare.png`
- `solution-finance.png`
- `solution-retail.png`
- `solution-energy.png`

### JPG (1:1, 1024×1024 recommended)

- `project-arcway.jpg`
- `project-clinical.jpg`
- `project-lumen.jpg`

After you provide the PNGs, the script below will automatically create matching `.jpg` versions for the files that exist in `public/images` (for example `technology-generative-ai.jpg` used by the hero visual).

## Recommended prompt template (copy/paste)

Use this template and tweak the **Subject** line per file:

> **Style**: premium abstract editorial 3D illustration, deep navy base, cyan signal accents, subtle grid texture, cinematic lighting, soft depth of field, clean minimal composition, no logos, no readable text.  
> **Constraints**: absolutely no people, no faces, no human silhouettes, no hands, no body parts.  
> **Output**: square 1:1 image.

### Suggested subjects per file

- **`service-software.png`**: layered UI panels + code-like patterns (not readable) + app window silhouettes, “software delivery”
- **`service-ai.png`**: neural lattice / vector field / glowing nodes, “responsible AI systems”
- **`service-cloud.png`**: cloud + infrastructure topology (abstract), “platform and deployment”
- **`service-consulting.png`**: abstract radar/map/compass + decision pathways, “technical advisory”
- **`service-quality.png`**: shield/check + test matrix grids, “quality engineering”
- **`service-transformation.png`**: layered systems diagram + arrows + step changes, “digital transformation”
- **`technology-generative-ai.png`**: token stream + semantic graph, “LLM + retrieval”
- **`technology-cloud-native.png`**: container grid + cloud edge glow, “cloud native”
- **`technology-data-platforms.png`**: pipeline arcs into a database core, “data platforms”
- **`technology-web-applications.png`**: browser UI layers + interaction highlights, “web applications”
- **`technology-automation.png`**: connected workflow nodes, “automation”
- **`technology-cyber-resilience.png`**: lock + network perimeter rings, “security”
- **`solution-healthcare.png`**: connected devices / monitoring signals (no people), “healthcare”
- **`solution-finance.png`**: secure ledger/graph + market signal lines, “financial services”
- **`solution-retail.png`**: commerce flow + inventory graph, “retail”
- **`solution-energy.png`**: grid topology + industrial sensors, “energy”

## Apply images to the repo

Run:

```bash
bash scripts/replace-images.sh
```


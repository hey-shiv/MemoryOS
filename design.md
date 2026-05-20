# MemoryOS Design System

## Art Direction
Inspired by Shopify Editions Winter 2026: premium editorial product-launch feel.
Apple Photos + Notion + Raycast + Shopify Editions Winter 2026.

## Color Palette
```
Background:         #0A0A09   (near-black / deep charcoal)
Surface Primary:    #141413   (card backgrounds)
Surface Secondary:  #1C1C1A   (elevated panels)
Surface Ivory:      #F5F0E8   (high-contrast content surfaces)
Surface Muted:      #1A1F1A   (dark green-tinted panels)

Text Primary:       #F2EDE4   (soft ivory / warm white)
Text Secondary:     #8A857C   (muted gray)
Text Tertiary:      #5A5550   (very muted)
Text Dark:          #0A0A09   (on ivory surfaces)

Accent Lime:        #C8F135   (electric lime — primary accent)
Accent Amber:       #F5A623   (warm amber)
Accent Cyan:        #3ECFCF   (cyan)
Accent Red:         #E85D4A   (soft red — warnings/sensitive)

Border:             #242420   (thin borders)
Border Muted:       #1E1E1B   (subtle borders)
```

## Typography
- Display headings: Bold, 28-32px
- Section headers: SemiBold, 18-20px, letter-spacing: 0.5px
- Body: Regular, 14-15px
- Labels/chips: Medium, 11-12px, uppercase, letter-spacing: 1px
- Hierarchy: Strong — no ambiguity between levels

## Spacing & Layout
- Base unit: 4px
- Card padding: 16px
- Screen horizontal padding: 20px
- Card border radius: 8px
- Thin borders: 1px solid border color
- Small-radius cards (8px) — no blob shapes

## Components
- Bottom tab navigation (5 tabs)
- Collection cards with editorial styling
- Image/memory cards with AI metadata
- Insight stat cards
- Category filter chips (horizontal scroll)
- Confidence badges
- Sensitive warning badges
- Search interface with suggestions

## Motion
- Page transitions: slide + fade, 200ms
- Card reveals: stagger fade-up on mount
- Button press: scale 0.97
- Search results: fade in staggered
- Tab switch: fade transition

# Article Page - Complete Layout Guide

## Page Structure Overview

The article page is organized into distinct sections from top to bottom:

```
┌────────────────────────────────────────────────────────────────┐
│                     ARTICLE HEADER                              │
│  ← Back to CaloCapital              📋 Reading Preferences      │
│                                                                  │
│  LIFE INSURANCE · FAMILY PROTECTION                            │
│                                                                  │
│  What happens to my family when I pass away?                   │
│  Discover how life insurance protects your loved ones          │
│  when you're no longer here to provide for them.               │
│                                                                  │
│  5-minute read • Reviewed Nov 16, 2024 • By Marc J. Calo       │
└────────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌──────────────────────────────────────────┐
│                 │  │                                          │
│  NAVIGATION     │  │        ARTICLE CONTENT                   │
│                 │  │                                          │
│  In this article│  │  Table of Contents (Mobile Only)         │
│                 │  │  ▼ Show sections                         │
│  • Understanding│  │                                          │
│    Life Insurance│  │  Understanding Life Insurance            │
│  • Protection   │  │  Life insurance is a financial           │
│    For Your     │  │  safety net that helps protect your      │
│    Family ←     │  │  loved ones if something happens to you. │
│  • How Much     │  │                                          │
│    Coverage Do  │  │  • Financial security                    │
│    You Need?    │  │  • Income replacement                    │
│  • Getting      │  │  • Debt coverage                         │
│    Started      │  │  • Education funding                     │
│                 │  │                                          │
│                 │  │  Protection For Your Family              │
│                 │  │  Your family's financial security        │
│                 │  │  starts with the right life insurance    │
│                 │  │  coverage. Here's what you need to know: │
│                 │  │                                          │
│                 │  │  • Mortgage and loans                    │
│                 │  │  • Living expenses                       │
│                 │  │  • College tuition                       │
│                 │  │                                          │
│                 │  │  💡 Important consideration: The cost    │
│                 │  │  of life insurance varies based on age,  │
│                 │  │  health, and coverage amount.            │
│                 │  │                                          │
│                 │  │  How Much Coverage Do You Need?          │
│                 │  │  Determining your coverage needs is a    │
│                 │  │  crucial step in securing your family's  │
│                 │  │  financial future...                     │
│                 │  │                                          │
│                 │  ├──────────────────────────────────────────┤
│                 │  │   SOURCES AND FURTHER READING            │
│                 │  │   • Insurance Information Institute      │
│                 │  │   • LIMRA Life Insurance Studies         │
│                 │  │   • Consumer Reports Insurance Guide     │
│                 │  ├──────────────────────────────────────────┤
│                 │  │                                          │
│                 │  │  ┌──────────────────────────────────┐   │
│                 │  │  │ 👤 Ready for a consultation?    │   │
│                 │  │  │    Discuss your financial goals │   │
│                 │  │  │    and insurance needs with our │[→] │
│                 │  │  │    team. We're here to help you │Get │
│                 │  │  │    make informed decisions.     │ in │
│                 │  │  │                            Touch    │
│                 │  │  │                                 [→] │
│                 │  │  └──────────────────────────────────┘   │
│                 │  │                                          │
│                 │  ├──────────────────────────────────────────┤
│                 │  │  TALK WITH OUR TEAM                     │
│                 │  │  Call 917-400-9543                      │
│                 │  │  or email questions@calocapital.io      │
│                 │  ├──────────────────────────────────────────┤
│                 │  │  RELATED ARTICLES                       │
│                 │  │  ┌──────────────┐ ┌──────────────┐     │
│                 │  │  │ Life Insurance│ │ Fixed        │     │
│                 │  │  │ Protection    │ │ Annuities    │     │
│                 │  │  │ for Your Kids │ │ For          │     │
│                 │  │  │               │ │ Retirement   │     │
│                 │  │  └──────────────┘ └──────────────┘     │
│                 │  │                                          │
│                 │  └──────────────────────────────────────────┘
│                 │
└─────────────────┘
```

## Section-by-Section Details

### 1. Article Header
**Purpose:** Introduce the article topic and provide metadata

**Components:**
- **Back Button:** Navigates to articles listing
- **Reading Preferences Toggle:** Opens preferences panel (top right)
- **Category Label (Eyebrow):** "LIFE INSURANCE · FAMILY PROTECTION"
- **Headline:** "What happens to my family when I pass away?" (Serif, 2-3.2rem)
- **Description:** "Discover how life insurance protects your loved ones..." (Italic)
- **Metadata:** Read time, review date, author name

**Styling:**
- Gradient background (purple accent)
- Full-width with max-width container
- Generous padding (3rem desktop, 1.5rem mobile)
- Border-bottom separator

---

### 2. Navigation Sidebar
**Purpose:** Allow readers to jump between article sections

**Desktop Layout (>1024px):**
- Fixed-width sidebar (240px)
- Sticky positioning (stays visible while scrolling)
- Title: "In this article"
- List of all H2 section headings
- Active section highlighted (purple accent, bold text)
- Smooth scroll to section on click

**Mobile Layout (<1024px):**
- Hidden on tablet
- Replaced with expandable toggle on mobile
- Collapses after navigation

**Styling:**
- Uppercase "IN THIS ARTICLE" label
- Hover effects on links (purple background)
- Active state with left border accent
- Proper focus indicators for accessibility

---

### 3. Article Content
**Purpose:** Present the main article text in an accessible, readable format

**Components:**
- **Section Headings (H2):** Serif font, 1.6-2rem, bold
- **Paragraphs:** 18px default, 1.7 line height
- **Lists:** Bullet points with proper indentation
- **Callout Boxes:** Purple left border with background tint
- **Text Styling:** Bold for emphasis, links in lavender

**Reading Preferences Applied:**
- Text size changes (14-28px)
- Line spacing adjustments (normal, wide, extra-wide)
- High contrast mode (maintained readability)
- Font inheritance from preferences

**Mobile Optimization:**
- Expandable table of contents at top
- Full-width content (no sidebar)
- Touch-friendly list items
- Responsive heading sizes (clamp function)

---

### 4. Sources and Further Reading
**Purpose:** Provide citations and additional resources

**Styling:**
- Bordered section with gradient background
- Section heading (1.1rem, bold)
- Bulleted list of links
- Links styled in lavender with underline
- Hover effects maintain accessibility

**Functionality:**
- Links open in new tabs
- Screen reader announces "opens in a new tab"
- External link styling preserved

---

### 5. Consultation CTA (NEW)
**Purpose:** Encourage reader to take next action and schedule consultation

**Desktop Layout:**
```
┌─────────────────────────────────────────────────┐
│  [Icon]  Ready for a consultation?         [→] │
│          Discuss your financial goals     Get in│
│          and insurance needs with our    Touch │
│          team. We're here to help...       [→] │
└─────────────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌──────────────────────────┐
│         [Icon]           │
│                          │
│  Ready for a             │
│  consultation?           │
│                          │
│  Discuss your financial  │
│  goals and insurance     │
│  needs with our team...  │
│                          │
│  [Get in Touch →]        │
└──────────────────────────┘
```

**Features:**
- Gradient background (purple accent)
- Icon badge (user icon in circular background)
- Clear headline and description
- Prominent call-to-action button
- Hover effects (lift button, deepen shadow)
- Arrow icon animates on hover
- Optional per article
- Hidden in distraction-free mode

**Interactivity:**
- Button scrolls to form or navigates to consultation page
- Keyboard accessible (Tab, Enter, Escape)
- Proper ARIA labels
- Focus indicators
- Touch targets 44×44px

---

### 6. Contact Section
**Purpose:** Provide direct contact information

**Styling:**
- Similar treatment to sources section
- Heading: "Talk with our team"
- Contact methods: Phone and email
- Links are styled and functional

---

### 7. Related Articles
**Purpose:** Guide readers to similar content

**Desktop Layout:**
- 3-column grid for related articles
- Article cards with hover effects
- Links open articles in-app

**Tablet/Mobile Layout:**
- 2-column grid on tablet
- 1-column on mobile
- Full-width article cards
- Touch-friendly sizing

---

## Color Application

| Element | Light Mode | High Contrast |
|---------|-----------|----------------|
| Background | #050816 (dark purple-black) | #000000 (pure black) |
| Text | #E6E9F2 (light blue-gray) | #FFFFFF (white) |
| Headings | #F4F7FB (white-ish) | #FFFFFF (white) |
| Links | #D9CFFF (lavender) | #FFE45C (yellow) |
| Accents | #6D5EF5 (purple) | #FFFF00 (bright yellow) |
| Borders | rgba(198, 184, 255, 0.22) | Solid color |

---

## Responsive Behavior

### Desktop (>1024px)
```
┌─────────────────────────────────────────────┐
│          ARTICLE HEADER (full width)         │
├─────────────┬───────────────────────────────┤
│  SIDEBAR    │       CONTENT (800px max)     │
│  (240px)    │                               │
│  Sticky     │  • Full-width with generous   │
│  TOC        │    margins on each side       │
│             │  • No mobile TOC toggle       │
│             │  • Large, readable text       │
│             │  • Maximum comfort reading    │
│             │    experience                 │
└─────────────┴───────────────────────────────┘
```

### Tablet (640-1024px)
```
┌─────────────────────────────────────────┐
│      ARTICLE HEADER (full width)         │
├─────────────────────────────────────────┤
│    CONTENT (single column, full width)  │
│                                         │
│  • TOC toggle at top of content         │
│  • No sidebar                           │
│  • Comfortable spacing on sides         │
│  • Responsive font sizing              │
│                                         │
│  ▼ Table of Contents (expandable)       │
│                                         │
│  [Article content flows below]          │
└─────────────────────────────────────────┘
```

### Mobile (<640px)
```
┌───────────────────────────────┐
│   ARTICLE HEADER (compact)    │
├───────────────────────────────┤
│ CONTENT (single column,      │
│ tight margins)               │
│                               │
│ • Small padding (1rem)       │
│ • Readable font sizes        │
│ • Full-width buttons         │
│ • Touch-friendly spacing     │
│ • No horizontal scroll       │
│                               │
│ [Content continues...]       │
└───────────────────────────────┘
```

---

## Typography Hierarchy

```
Article Title (2.0-3.2rem, serif, bold)
↓
Intro Text (1.1-1.3rem, italic)
↓
Metadata (0.9rem, muted)
↓
Section Heading (1.6-2rem, serif, bold)
↓
Body Text (18px default, sans-serif)
↓
List Items (inherit body size)
↓
Callout Text (0.95rem, italic)
↓
Link Text (lavender, underlined)
↓
Caption / Label (0.75-0.85rem)
```

---

## Accessibility Features by Section

| Section | Features |
|---------|----------|
| Header | Skip link, breadcrumb, ARIA labels |
| Navigation | Keyboard navigation, active state indicator, focus outline |
| Content | Semantic headings (H2, H3), proper list structure, focus outline |
| Callouts | Proper role="note", sufficient contrast |
| Consultation CTA | Semantic section, button with ARIA label, keyboard accessible |
| Links | Color + underline for visibility, opens in new tab announced |
| All sections | High contrast mode, touch targets, proper focus indicators |

---

## Reading Preferences Application

**Text Size:** 14px to 28px
- Affects entire article proportionally
- Uses CSS custom property: `--article-font-size`

**Line Spacing:** Normal, Wide, Extra-Wide
- Changes line-height on content
- Affects paragraphs and lists
- Maintains readability at all sizes

**Contrast Mode:** Standard or High Contrast
- Swaps to yellow-on-black (#FFE45C on #000000)
- Maintains proper contrast ratio
- Changes all UI elements accordingly

**Reading Mode:** Default or Distraction-Free
- Hides sidebar, CTA, and related articles
- Full-width content column
- Minimal visual distractions
- Same reading preferences available

---

## Performance Notes

- **CSS Architecture:** Variable-based theming (fast updates)
- **Layout:** CSS Grid and Flexbox (GPU-accelerated)
- **Animations:** CSS transitions (smooth, performant)
- **Images:** Lazy-loaded where applicable
- **Typography:** System fonts (fast loading)
- **Accessibility:** No JavaScript overlays (accessible)

---

## Browser DevTools Tips

### Testing Responsive Design
```
1. Open DevTools (F12)
2. Click device toolbar icon
3. Test: Desktop, Tablet, Mobile
4. Check: No horizontal scroll at any size
5. Verify: Touch targets are 44×44px
```

### Testing Accessibility
```
1. Open Lighthouse (Ctrl+Shift+P → Lighthouse)
2. Run accessibility audit
3. Check: Contrast ratio (4.5:1 for normal text)
4. Verify: Focus indicators visible
5. Test: Keyboard navigation (Tab, Arrow, Enter)
6. Use: Screen reader (NVDA, JAWS, VoiceOver)
```

### Testing Preferences
```
1. Open DevTools → Preferences panel
2. Change text size (14px, 18px, 28px)
3. Toggle contrast modes
4. Adjust line spacing
5. Test reading modes
6. Verify localStorage persists preferences
```

---

## Summary

The article page provides a **complete, accessible, professional reading experience** with:
- Clean, modern design following the Calo Capital brand
- Responsive layout that works on all devices
- Comprehensive reading preferences for accessibility
- Prominent call-to-action to drive engagement
- Full WCAG 2.2 Level AA compliance
- Smooth interactions and animations

This implementation represents a **premium financial publication experience** that respects readers' needs and maintains accessibility standards.

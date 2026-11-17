# Consultation CTA Section - Article Page Design

## Overview

The Consultation CTA (Call-To-Action) section is a prominent, visually engaging component that appears after the article content and sources, providing readers with a clear next step to engage with Calo Capital.

## Component Features

### Visual Design

**Location:** After article sources, before contact information and related articles

**Appearance:**
- Premium gradient background with purple accent
- Rounded corners and subtle shadow
- Icon badge on the left (user/person icon)
- Responsive flex layout that adapts to screen size
- Hover effects with smooth transitions

**Styling System:**
- Uses the brand's dark-purple (#6D5EF5) and lavender (#9B7CFF, #D9CFFF) palette
- Gradient background: `rgba(109, 94, 245, 0.12) to rgba(155, 124, 255, 0.05)`
- Elevated shadow: `0 4px 16px rgba(109, 94, 245, 0.1)`
- Enhanced on hover: `0 8px 24px rgba(109, 94, 245, 0.15)`

### Content Structure

```
┌─────────────────────────────────────────────┐
│  [Icon]  Ready for a consultation?          │
│          Discuss your financial goals and   │
│          insurance needs with our team.     [Get in Touch →]
│          We're here to help you make        │
│          informed decisions.                │
└─────────────────────────────────────────────┘
```

**Components:**
1. **Icon Badge** (56×56px on desktop, 40×40px on mobile)
   - Purple circular background
   - User/person icon in lavender color
   - Responsive sizing

2. **Text Content**
   - **Heading:** "Ready for a consultation?"
   - **Description:** "Discuss your financial goals and insurance needs with our team. We're here to help you make informed decisions."
   - Serif font for heading (Georgia), serif family for consistency
   - Responsive font sizing

3. **Call-To-Action Button**
   - Gradient background (purple primary to purple light)
   - Text: "Get in Touch" with arrow icon
   - Hover effect: lift up (-2px) with enhanced shadow
   - Arrow animates on hover (translateX +4px)

### Responsive Behavior

**Desktop (>768px):**
- Horizontal flex layout
- Icon on left, text in middle, button on right
- Full width with proper spacing
- Button remains visible without wrapping

**Tablet (640px-768px):**
- Transitions to flex-column
- Icon centered above text
- Full-width button below text
- Maintains padding and spacing

**Mobile (<640px):**
- Full column layout
- Smaller icon (40×40px)
- Reduced padding (1.5rem)
- Full-width button
- Optimized typography sizes

### Accessibility

**WCAG 2.2 Level AA Compliance:**
- Semantic HTML with `<section>` element
- Proper heading hierarchy (`<h2>`)
- ARIA labels on button: `aria-label="Schedule a consultation"`
- Section labeled: `aria-labelledby="consultation-heading"`
- Keyboard accessible: Tab navigation, Enter/Space to activate button
- Focus indicators: 2px outlines with 2px offset
- Color contrast: 4.5:1 for text, maintained in high-contrast mode
- Touch targets: 44×44px minimum
- Proper icon use with `aria-hidden="true"`

**High Contrast Mode:**
- Background adjusts to `rgba(255, 228, 92, 0.15)`
- Border color: `#FFE45C` (high-contrast yellow)
- Icon background: `rgba(255, 228, 92, 0.3)`
- Button background: `#FFE45C` on black (#000000)
- Button text: Black on yellow for maximum contrast

**Distraction-Free Mode:**
- Hidden when `data-reading-mode="distraction-free"`
- Allows focused reading without CTAs

### Hover & Interaction States

**Button Hover:**
- Transform: translateY(-2px) - lifts button
- Shadow: 0 8px 20px rgba(109, 94, 245, 0.3)
- Arrow icon animates: translateX(4px)

**Button Active:**
- Transform reset: translateY(0)
- Maintains shadow effect

**CTA Container Hover:**
- Border brightens: `var(--article-border-light)`
- Background gradient intensifies
- Shadow deepens

### Interactive Functionality

**onClick Handler:**
1. Checks for `consultationForm` element in page (future form implementation)
2. If form exists: smooth scroll to form and focus
3. If `page.consultationLink` provided: navigate to consultation page
4. Can be extended for form modal or booking interface

### Configuration

**Article Data Structure:**
```javascript
{
  // ... other article fields
  hideConsultation: false, // Set true to hide CTA on specific articles
  consultationLink: '/schedule-consultation', // Optional link to consultation page
}
```

## CSS Classes

| Class | Purpose |
|-------|---------|
| `.article-consultation-cta` | Root container section |
| `.consultation-icon` | Icon badge wrapper |
| `.consultation-content` | Flex wrapper for layout |
| `.consultation-text` | Text content container |
| `.consultation-text h2` | Heading styling |
| `.consultation-text p` | Description text styling |
| `.consultation-button` | CTA button with gradient |

## CSS Variables Used

```css
--article-purple-primary: #6D5EF5;
--article-purple-light: #9B7CFF;
--article-lavender: #D9CFFF;
--article-text-light: #F4F7FB;
--article-text-dimmed: #E6E9F2;
--article-border-light: rgba(198, 184, 255, 0.55);
--article-border-muted: rgba(198, 184, 255, 0.22);
--article-font-serif: Georgia, 'Times New Roman', Times, serif;
```

## Responsive Breakpoints

| Breakpoint | Layout | Changes |
|-----------|--------|---------|
| `>768px` | Horizontal | Icon left, text center, button right |
| `640px-768px` | Vertical | Icon top, text middle, button bottom |
| `<640px` | Mobile | Optimized spacing, smaller icon (40px), full-width button |
| `max-width: 320px` | Extreme Mobile | Minimum font size (14px), minimal padding |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)
- Requires CSS Grid and Flexbox support
- Graceful degradation for older browsers

## Performance Considerations

- CSS-only animations (no JavaScript for hover effects)
- Smooth scroll behavior uses native `behavior: 'smooth'`
- No external dependencies
- Minimal DOM elements (7 total)
- Efficient hover state detection

## Integration

### Location in ArticleDetail.jsx
```jsx
{/* Sources */}
<SourcesList sources={page.sources} />

{/* Consultation CTA */}
<ConsultationCTA page={page} navigate={navigate} />

{/* Contact section */}
<aside className="article-contact" ... >

{/* Related articles */}
{page.related && page.related.length > 0 && (
  <RelatedArticles related={page.related} navigate={navigate} />
)}
```

### CSS Integration
Styles are included in `ArticleDetail.css` with:
- Base styles (layouts, typography)
- Hover states and transitions
- High-contrast mode adaptations
- Distraction-free mode hiding
- All responsive breakpoints

## Future Enhancements

1. **Dynamic Content:** Load custom CTA text from article data
2. **Consultation Booking:** Integrate with scheduling system (Calendly, etc.)
3. **Form Modal:** Inline consultation request form
4. **Analytics:** Track CTA engagement and conversions
5. **A/B Testing:** Test different CTA copy and designs
6. **Personalization:** Different CTAs based on article topic/audience
7. **Multi-language:** Translations for different regions

## Testing Checklist

- [ ] Desktop layout (>768px): Horizontal layout with 3 columns
- [ ] Tablet layout (640-768px): Vertical layout with centered content
- [ ] Mobile layout (<640px): Optimized with full-width button
- [ ] Button click: Triggers consultation action
- [ ] Hover effects: Border brightens, shadow deepens, button lifts
- [ ] High contrast mode: Text is readable (yellow on black)
- [ ] Keyboard navigation: Tab through, Enter activates
- [ ] Focus indicators: Visible 2px outline
- [ ] Screen reader: Section and button are properly labeled
- [ ] Touch targets: Button is 44×44px minimum
- [ ] Responsive text: No horizontal scroll at any breakpoint
- [ ] Distraction-free mode: CTA is hidden
- [ ] No horizontal scroll: All responsive sizes work without scroll
- [ ] Print styles: Hidden when printing

## Notes

- The CTA section is **optional** per article via `hideConsultation` flag
- Maintains consistency with article design language
- Provides clear visual hierarchy and call-to-action
- Fully accessible without third-party widgets
- Works with all reading preferences (text size, contrast, etc.)
- Smooth animations respect `prefers-reduced-motion` setting

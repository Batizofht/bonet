# BONET ELITE SERVICES — CONTENT DISTRIBUTION REVAMPING PLAN
**Date:** May 1, 2026  
**Focus:** Content distribution, messaging, and conversion optimization (NOT design/structure/layout)

---

## CRITICAL FINDINGS vs CURRENT STATE

### ✅ ALREADY FIXED
- **About Page Mission/Vision** — Updated with investor-focused positioning

### ❌ CRITICAL CONTENT GAPS (Fix First)

| Issue | Current State | Audit Requirement | Action |
|-------|---------------|---------------------|--------|
| **Book Now 404** | `/bookNow` exists but audit says it returns 404 | Working booking/consultation page | Verify route works or rebuild |
| **Blog Rendering** | 53 posts in sitemap, API fetches from `/full` endpoint | Posts must display on `/blogs` | Debug API response vs sitemap mismatch |
| **Investment Page** | "Professional business setup services" repeated 6x | Unique descriptions per service | Rewrite all 6 service descriptions |
| **Phone Consistency** | `+250 726 300 260` in schema & contact | Standardize everywhere | Audit all instances |
| **Address Inconsistency** | Schema: "Dubai Port Road, Masaka" | One verified address | Verify actual office location |

---

## HOMEPAGE CONTENT CHANGES

### Hero Section — KEEP (Already Aligned)
Current headline "Invest in Rwanda With Confidence" matches audit's investor focus. 
✅ Trust bar with stats (5+ Years, 100+ Clients, 15+ Countries) — ALREADY IMPLEMENTED

### Service Cards — REORDER NEEDED
Current order: Hotels → Apartments → Transport → Tourism  
**Required order per audit:**
1. **Investment & Business Setup** (lead with investor services)
2. **HR & Recruitment** 
3. **Relocation & Executive Concierge**
4. **Travel & VIP Services**

### Why Choose Section — ALREADY ALIGNED
The `whychoose.tsx` component has the correct 3-card layout (6hrs registration, 0% tax, 400M+ market access). Matches audit's "Why Rwanda" requirements.

---

## ABOUT PAGE CONTENT CHANGES

### Mission/Vision — ✅ COMPLETED
Already updated with investor-focused text:
- Mission: "To make Rwanda accessible to the world — by giving every foreign investor..."
- Vision: "To be the first call every foreign company and professional makes when entering Rwanda..."

### Missing Content to Add:
1. **CTA at bottom** — "Book Your Free Consultation" gold button
2. **Team LinkedIn links** — Add LinkedIn URLs for each team member
3. **Foreign client testimonials** — Add 3-4 testimonials from US/UK/UAE/China/India clients with company names
4. **Remove redundancy** — "Why Choose" section duplicates homepage (audit says merge into "Why Rwanda — And Why With Us")

---

## SERVICES PAGE CONTENT CHANGES

### Header Rewrite
**Current:** "Customizable and professional services"  
**Required:** "End-to-End Support for Foreign Investors and Businesses in Rwanda"

### Service Categories — STANDARDIZE CTAs
Current inconsistent CTAs:
- "Start Registration Today"
- "Free Consultation" 
- "Get Consulting"
- "HR Solutions"

**Standardize to:**
- Primary: "Book Free Consultation" (gold button #C9A84C)
- Secondary: "Chat on WhatsApp"

### Missing Content:
- Process steps (6-step registration flow)
- "Key Facts for Foreign Investors" table
- Estimated timelines
- "Starting from" pricing where applicable

---

## INVESTMENT PAGE CONTENT CHANGES

### CRITICAL: Fix Repeated Placeholder Text
Line 130 in `setup.jsx`: "Professional business setup services" repeated for all 6 services.

**Each service needs unique description:**
1. **Business Registration** — "Complete company setup in 6 hours. Certificate, TIN, RSSB registration — all handled."
2. **Investment Certificate** — "Secure Rwanda Development Board certification for tax incentives and investor protections."
3. **TIN Registration** — "Tax Identification Number setup with Rwanda Revenue Authority for compliance."
4. **Trade License** — "Commercial permits and sector-specific licensing for legal operations."
5. **Sector-Specific Licenses** — "Specialized permits for finance, telecom, healthcare, and regulated industries."
6. **Work & Residency Permits** — "Employee visas, investor permits, and dependent residency processing."

### Missing Tables to Add:
1. **Rwanda Investment Incentives Table** — 0% Corporate Tax, 3% rate, 15% rate, 7-Year Holiday, Capital Gains Exemption, VAT Refund
2. **Market Access Table** — EAC (152M), COMESA (389M), EU (450M), US/AGOA (330M), AfCFTA (1.3B)
3. **Key Facts Table** — 100% ownership, 6-hour registration, no minimum capital, RWF 7,000 fee

### Add FAQ Schema
Embed 3-4 investment-focused FAQs with structured data for Google rich snippets.

---

## TRAVEL PAGE CONTENT CHANGES

### Service Descriptions — Expand from One-Liners
**Current:** "Book luxury hotels with personalized services"  
**Required per audit:**
- Name specific hotels: Marriott, Radisson Blu, The Retreat
- Describe gorilla trekking specifics
- Lake Kivu retreat options
- Chauffeured transport fleet details

### Missing Content:
1. **Gallery** — High-quality images: Volcanoes NP, Lake Kivu, Kigali skyline, hotel interiors
2. **Sample Itineraries:**
   - "3-Day Business + Gorilla Trek"
   - "5-Day Rwanda Explorer" 
   - "Weekend Conference + Safari"
3. **Travel testimonials** — 1-2 from international travelers

---

## CONTACT PAGE CONTENT CHANGES

### Fix Inconsistencies:
1. **Hours** — Schema says Mon-Fri 8AM-6PM, but Contact shows "Open 24/7"
   - **Fix:** "Available 24/7 via WhatsApp, office hours Mon-Fri 8AM-6PM"
   
2. **Address** — Schema: "Dubai Port Road, Masaka" vs Contact translation file location
   - **Action:** Verify actual office address

3. **Map** — Shows "Loading map..." 
   - **Fix:** Add static Google Maps embed fallback

### Form Improvements:
1. Add inquiry type options per audit:
   - Business Registration
   - Investment Advisory
   - HR & Recruitment
   - Relocation
   - Travel & VIP
   - General Inquiry

2. Add validation feedback with asterisks (*) for required fields

---

## BLOG PAGE — CRITICAL FIX NEEDED

### Issue: 53 posts in sitemap, 0 displaying
**Root cause analysis needed:**
- API endpoint: `https://api.bonet.rw:8443/bonetBackend/backend/public/full`
- Sitemap shows posts exist
- BlogsClient returns empty array

**Possible issues:**
1. API response structure mismatch
2. Posts marked as draft in CMS
3. CORS or API authentication issue
4. publication_status filtering

**Action:** Debug API response vs expected Blog interface

### Missing Features:
1. Category filtering (Business, Investment, Travel, HR, Compliance)
2. Pagination (10 posts per page for 53 posts)
3. Author attribution for E-E-A-T

---

## MISSING DEDICATED PAGES (Per Audit)

These URLs return 404 but are needed for SEO and paid ads:

| Page | Status | Content Source |
|------|--------|----------------|
| `/business-registration` | 404 | Rebuild Guide Section 02 |
| `/hr-recruitment` | 404 | Rebuild Guide Section 04 |
| `/relocation-services` | 404 | Rebuild Guide Section 05 |
| `/executive-travel` | 404 | Rebuild Guide Section 06 |
| `/faq` | 404 | Rebuild Guide Section 07 (10 questions) |
| `/book-now` or `/booking` | 404 | Purpose-built consultation form |

---

## CTA STANDARDIZATION (Site-Wide)

### Current Inconsistent CTAs:
- "Get Started"
- "Start Registration Today"
- "Get Consulting"
- "HR Solutions"
- "Book a Guide"

### Standardize to:
- **Primary:** "Book Free Consultation" — Gold button (#C9A84C), links to `/contact` with pre-selected inquiry type
- **Secondary:** "Chat on WhatsApp" — Links to `+250 726 300 260`
- **Tertiary:** "Explore Services" — White/outline button, links to `/services`

---

## SCHEMA MARKUP UPDATES

### Current Issues:
1. Blog schema shows `"blogPost": []` — empty array violates Google's expectations
2. No FAQPage schema on any page
3. No Service schema on service pages

### Required Fixes:
1. Remove Blog schema until posts render, OR fix blog rendering
2. Add FAQPage schema to homepage FAQ section
3. Add Service schema to `/investment`, `/travel`, `/services`

---

## PRIORITY ACTION SEQUENCE

### Week 1: Emergency Content Fixes
1. ✅ Mission/Vision on About page — DONE
2. Fix investment page placeholder text (6 services)
3. Debug blog page rendering issue
4. Verify book-now page works or redirect CTAs
5. Standardize phone number across all files
6. Fix hours inconsistency (24/7 vs Mon-Fri)

### Week 2: High-Priority Content
1. Add Rwanda Investment Incentives Table
2. Add Market Access table (EAC, COMESA, EU, AGOA, AfCFTA)
3. Add Key Facts table to Investment page
4. Expand travel service descriptions with named hotels
5. Add CTA to About page

### Week 3: Missing Pages
1. Build `/business-registration` dedicated page
2. Build `/hr-recruitment` dedicated page
3. Build `/relocation-services` dedicated page
4. Build `/executive-travel` dedicated page
5. Build `/faq` dedicated page

### Week 4: Schema & Technical
1. Fix Blog schema or remove until fixed
2. Add FAQPage schema to homepage
3. Add Service schema to all service pages
4. Add canonical URLs if missing

---

## FILES REQUIRING CHANGES

### Critical (Week 1):
- `src/services/setup.jsx` — Fix 6 placeholder descriptions
- `src/app/blogs/BlogsClient.tsx` — Debug API response
- `src/contact/contact.jsx` — Fix hours consistency
- `src/app/pageClient.tsx` — Verify phone in schema

### High Priority (Week 2):
- `src/services/setup.jsx` — Add incentives table, market access table, key facts
- `src/services/hotel.jsx` — Expand travel descriptions
- `src/aboutUs/about.jsx` — Add CTA, testimonials section

### New Pages Needed (Week 3):
- `src/app/business-registration/page.tsx`
- `src/app/hr-recruitment/page.tsx`
- `src/app/relocation-services/page.tsx`
- `src/app/executive-travel/page.tsx`
- `src/app/faq/page.tsx`

---

## VERIFICATION CHECKLIST

Before marking complete:
- [ ] Phone is `+250 726 300 260` everywhere
- [ ] Hours are consistent: "Available 24/7 via WhatsApp, office hours Mon-Fri 8AM-6PM"
- [ ] All 6 investment services have unique descriptions
- [ ] Blog posts display (53 posts visible)
- [ ] Book Now page loads without 404
- [ ] All CTAs use "Book Free Consultation" or "Chat on WhatsApp"
- [ ] Investment page has 3 data tables (Incentives, Market Access, Key Facts)
- [ ] About page has foreign client testimonials
- [ ] FAQ schema added to homepage


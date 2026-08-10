# SBS Toy Shop

You are a senior web designer, ecommerce UX architect, frontend engineer, and brand designer.

Build a COMPLETE, CLIENT-READY UI PROTOTYPE for:

SECRET BUILDERS SOCIETY

Short brand name:
SBS

This must be completed as one cohesive build.

Do not ask follow-up questions.
Do not stop after a homepage.
Do not produce a wireframe.
Do not create an unfinished prototype.
Do not use placeholder text.
Do not use lorem ipsum.
Do not invent products.
Do not invent business information.

The result must feel like a commercially launchable premium collector ecommerce website, with the understanding that Shopify product data, checkout, policies, and verified business details will be connected later.

==================================================
PRIORITY HIERARCHY

When instructions conflict, follow this priority:

TIER 1 — ENGINEERING AND DEPLOYMENT LAWS
TIER 2 — ATTACHED PRODUCT / BRAND DATA
TIER 3 — SECRET BUILDERS SOCIETY BRAND DIRECTION
TIER 4 — SUPPLIER TAXONOMY
TIER 5 — REFERENCE WEBSITE INSPIRATION
TIER 6 — GENERAL QUALITY PRINCIPLES

Never let visual inspiration override product truth or engineering requirements.

==================================================

ATTACHED ASSET PACKAGE — CRITICAL
==================================================

An attached ZIP file named:

sbs-lovable-starter-assets.zip

contains all supplied project assets.

USE IT.

Extract or copy the supplied assets into the actual project structure.

Do not treat the ZIP itself as a runtime asset.

The package contains:

28 real supplier demo product images

all product images in WebP format

four official SBS SVG logos

demo product JSON

demo category JSON

demo product CSV

Cloudflare staging noindex configuration

supporting asset documentation

The supplied asset package is the source of truth for the current UI prototype.

Do not replace supplied assets with generated alternatives.

Do not rename product titles.

Do not invent products.

Do not invent missing product information.

==================================================
2. IMAGE PIPELINE LAW

This project will eventually deploy to Cloudflare through GitHub.

All project imagery must exist as physical repository files.

NEVER use:

lovable-uploads

/__l5e/

Lovable temporary media URLs

internal builder asset URLs

runtime hotlinks to AniToy

runtime hotlinks to Ages Three and Up

All supplied imagery must live physically under:

/public/images/

Product images:

/public/images/products/

Brand images:

/public/images/brand/

Runtime paths must use:

/images/products/...

and:

/images/brand/...

Before finishing the build, search the entire codebase.

There must be ZERO occurrences of:

lovable-uploads

or:

__l5e

or any temporary builder-hosted image URL.

==================================================
3. BRAND ASSETS

Use the official attached SBS SVG logo files.

They have been renamed according to the BACKGROUND they belong on.

LIGHT BACKGROUND:

/images/brand/sbs-horizontal-light-bg.svg

/images/brand/sbs-square-light-bg.svg

DARK BACKGROUND:

/images/brand/sbs-horizontal-dark-bg.svg

/images/brand/sbs-square-dark-bg.svg

IMPORTANT:

The words light-bg and dark-bg describe the intended background.

They do NOT describe the visible logo color.

Do not misunderstand this.

Never:

recreate the logo

redraw the logo

re-typeset SBS

recolor the logo

stretch the logo

distort proportions

crop the logo incorrectly

replace the logo with plain text

add effects inside the logo

add glow

add drop shadows

add outlines

Preserve the supplied SVG exactly.

==================================================
4. BRAND COLOR SYSTEM

Use the official logo colors as the foundation.

SBS RED:

#A5142D

CHARCOAL:

#353535

WHITE:

#FFFFFF

WARM OFF-WHITE:

#F4F1EA

SECONDARY LIGHT SURFACE:

#EBE7DE

SUBTLE DARK SURFACE:

#2D2D2D

Use red as an intentional accent, not as the dominant page background everywhere.

Recommended balance:

60–70% warm off-white / white
20–30% charcoal
5–10% SBS red

Do not introduce unrelated brand colors.

Do not use rainbow category colors.

Do not color-code product categories.

Do not use neon.

Do not use blue gradients.

Do not use purple ecommerce gradients.

Do not use generic Shopify pastel palettes.

==================================================
5. BRAND POSITIONING

The desired design identity is:

PREMIUM JAPANESE COLLECTOR STORE

MODEL BUILDER WORKSHOP

MODERN MEMBERS SOCIETY

The website should feel designed for adult collectors and hobbyists.

It must NOT feel like:

a children's toy store

a preschool toy website

a kawaii ecommerce template

an anime streaming site

a gaming website

a cyberpunk site

a generic Shopify theme

a distributor catalogue

a warehouse liquidation site

a default shadcn website

AniToy with different colors

Ages Three and Up copied into another brand

The experience should feel:

curated

editorial

confident

structured

collector-focused

premium

functional

slightly industrial

Japanese-inspired without becoming stereotypical

modern without becoming sterile

==================================================
6. SOURCE WEBSITE ROLES

SUPPLIER / PRODUCT AUTHORITY:

https://anitoy.ca/

AniToy determines:

what categories SBS may sell

what products are represented

category terminology

supplier product taxonomy

Do NOT scrape AniToy at runtime.

Do NOT fetch AniToy dynamically.

Do NOT hotlink AniToy images.

Do NOT add products that only exist on other websites.

VISUAL / MERCHANDISING INSPIRATION:

https://www.agesthreeandup.ca/

Ages Three and Up may influence:

collector-oriented merchandising

product-forward presentation

promotional rhythm

visual richness

sense of an established specialty store

It must NOT provide:

product categories

product titles

business information

brand copy

products

taxonomy

exact layout

exact components

Do not clone either website.

==================================================
7. DEMO PRODUCT DATABASE

Use:

/data/demo-products.json

as the primary demo product source.

Also available:

/data/demo-categories.json

and:

/data/demo-products.csv

There are exactly:

28 DEMO PRODUCTS

These are real products selected from the supplier catalogue.

There are:

4 Figures

4 Model Kits

4 Plush

4 Blind Boxes

4 Hobby Supplies

4 Character Goods

4 Apparel

Do not create a 29th product.

Do not generate fake products to fill space.

Do not add demo products from Ages Three and Up.

Do not invent:

SKU

UPC

product title

vendor

series

character

category

subcategory

stock status

estimated release

price

If a value is unavailable in the supplied data, omit that field.

Do not replace missing information with made-up text.

==================================================
8. COMMERCE DATA ARCHITECTURE

Although this is currently a demo UI, build it correctly for future Shopify integration.

Create a clean normalized commerce layer.

Recommended structure:

src/data/

src/commerce/

src/types/

src/components/commerce/

Create reusable TypeScript interfaces such as:

CommerceProduct

CommerceCategory

CommerceVendor

CommerceSeries

CommerceCartItem

ProductStatus

Create a data adapter such as:

DemoCommerceAdapter

or equivalent.

The visual UI components should consume normalized commerce objects.

Do not have every component import raw JSON independently.

Centralize:

status formatting

price formatting

product lookup

category lookup

series extraction

vendor extraction

filter values

search logic

The architecture must make this future transition possible:

CURRENT:

Demo JSON
→ Commerce Adapter
→ UI

FUTURE:

Shopify Storefront API
→ Shopify Commerce Adapter
→ SAME UI

Do NOT connect Shopify yet.

Do NOT add Shopify credentials.

Do NOT create fake Shopify API tokens.

Do NOT add Supabase.

Do NOT create an unnecessary temporary backend.

==================================================
9. FUTURE SHOPIFY INTENT

The future Shopify integration will control:

products

prices

inventory

variants

collections

images

cart

checkout

customer accounts

orders

Therefore the current demo data must be treated as replaceable presentation data.

Do not build the website in a way that requires redesigning every page when Shopify is connected.

Keep Shopify-specific logic outside visual components.

Do not expose AniToy source URLs in the public UI.

==================================================
10. LOCKED PRIMARY SHOP CATEGORIES

Use exactly these seven primary categories:

Figures

Model Kits

Plush

Blind Boxes

Hobby Supplies

Character Goods

Apparel

Do not create additional primary product categories.

Do not add:

Toys

Collectibles

Anime

Games

Gifts

Accessories

Trading Cards

Electronics

or other invented primary categories.

==================================================
11. SHOP MEGA MENU TAXONOMY

SHOP should open a premium structured mega menu.

Use:

FIGURES

Scale Figures

Non-Scale Figures

Chibi Figures

Action Figures

Prize Figures

Statues

Figure Accessories

MODEL KITS

Gunpla

Character Kits

Mech Kits

Scale Kits

Original Series

Sci-Fi

Kit Accessories

HOBBY SUPPLIES

Paints

Airbrushes

Compressors

Tools

Finishing

Brushes & Markers

Display Cases & Storage

DIRECT CATEGORY LINKS:

Plush

Blind Boxes

Character Goods

Apparel

Subcategory links should filter the shop where matching demo products exist.

The demo catalogue does not need products for every supplier subcategory.

If a selected subcategory currently has no demo items, display:

“No demo products in this section yet.”

Do not invent products to fill empty states.

==================================================
12. MAIN NAVIGATION

Desktop navigation:

SHOP

PREORDERS

COLLECTIONS

BRANDS

ABOUT

Right utility area:

Search

Cart

Do not show customer account/login yet.

Shopify customer accounts are not connected.

Do not show wishlist unless specifically supported by the current build.

Keep navigation short and premium.

Do not display all seven product categories across the header.

==================================================
13. ROUTES

Create these public routes:

/

Home

/shop

All Products

/shop/figures

Figures

/shop/model-kits

Model Kits

/shop/plush

Plush

/shop/blind-boxes

Blind Boxes

/shop/hobby-supplies

Hobby Supplies

/shop/character-goods

Character Goods

/shop/apparel

Apparel

/preorders

Preorders

/collections

Collections

/brands

Brands

/search

Search

/cart

Cart

/product/:handle

Dynamic Product Detail

/about

About

Do NOT create unsupported pages such as:

Contact

FAQ

Shipping

Returns

Rewards

Blog

Events

Store Location

Team

Wholesale

Customer Support

unless verified business content later becomes available.

==================================================
14. CLOUDFARE ROUTING

Target deployment:

Cloudflare Pages

NOT Netlify.

Use React + TypeScript + Vite + React Router.

Create:

/public/_redirects

with:

/* /index.html 200

Every valid route must work on:

direct URL access

browser refresh

internal navigation

Internal navigation must scroll to top on route change.

==================================================
15. DESIGN SYSTEM — TYPOGRAPHY

Use:

DISPLAY / HEADLINES:

Space Grotesk

BODY / UI / NAVIGATION:

Inter

TECHNICAL MICRO LABELS:

system monospace stack

Example:

ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace

Do not use anime-style display fonts.

Do not imitate the typography inside the SBS logo.

The logo itself remains SVG artwork.

Typography hierarchy should feel editorial.

Desktop headline sizes may be generous.

Do not make body text oversized.

Use tight headline line-height.

Avoid single orphan words on the final line of major headlines.

==================================================
16. SHAPE LANGUAGE

Use disciplined geometry.

Cards:

0–4px border radius.

Buttons:

2–4px border radius.

Images:

mostly square / lightly rounded.

Avoid:

rounded-2xl everywhere

floating bubble UI

huge pill buttons

soft SaaS dashboard cards

glassmorphism

neumorphism

excessive shadows

Use thin borders.

Use generous spacing.

Use whitespace as a design tool.

==================================================
17. SBS SIGNATURE GRAPHIC DEVICE

Create a proprietary repeating design element called:

SBS BUILD RAIL

The SBS Build Rail is:

a horizontal SBS red line

paired with:

a small section index

and:

a compact uppercase monospace micro-label

Examples:

01 / CATEGORY INDEX

02 / FEATURED PICKS

03 / BUILD BENCH

04 / PREORDERS

05 / SERIES INDEX

06 / MAKER INDEX

Use the SBS Build Rail in important section headings and major page introductions.

It should feel influenced by:

technical drafting

model kit instruction diagrams

collector catalogue numbering

industrial graphic systems

Keep it restrained.

It must NOT become:

decorative noise

diagonal typography

marquee text

animated line art

random shapes

==================================================
18. HEADER DESIGN

DESKTOP HEIGHT:

approximately 78px.

HOME PAGE INITIAL STATE:

Hero background is dark charcoal.

Header may initially overlay or visually integrate with hero.

Use:

/images/brand/sbs-horizontal-dark-bg.svg

When the visitor scrolls and the header becomes solid/light:

switch to:

/images/brand/sbs-horizontal-light-bg.svg

OTHER PAGES:

Use light sticky header.

Use:

/images/brand/sbs-horizontal-light-bg.svg

Use subtle bottom border.

Avoid large drop shadows.

Desktop mega menu should feel editorial and organized.

MOBILE:

Use a full-height or near-full-height drawer.

Show:

SHOP

PREORDERS

COLLECTIONS

BRANDS

ABOUT

Within SHOP clearly expose the seven primary categories.

Search must be easy to access.

Cart must remain visible.

==================================================
19. HOMEPAGE STRUCTURE

Build the homepage in this sequence.

Do not rearrange it into a generic Shopify template.

SECTION 1 — HERO

Background:

Charcoal #353535

Large editorial composition.

Use:

Eyebrow:

SECRET BUILDERS SOCIETY / COLLECTOR STORE

Headline:

Build the collection
you actually want.

Body:

Figures, model kits, plush, blind boxes, hobby supplies, character goods, and apparel — organized for collectors, not clutter.

Primary CTA:

SHOP THE COLLECTION

Destination:

/shop

Secondary CTA:

BROWSE PREORDERS

Destination:

/preorders

Create the hero product composition using ONLY these existing local product assets:

/images/products/figures-01-pop-up-parade-kirby.webp

/images/products/model-kits-02-one-piece-oro-jackson.webp

/images/products/plush-03-oshi-no-ko-ai-plushie.webp

/images/products/blind-boxes-01-hazbin-hotel.webp

Do not generate a hero photo.

Do not permanently merge these into one image.

Compose them using HTML/CSS.

Use warm-white product display surfaces.

Allow controlled overlap.

Do not make the products look like random floating ecommerce cards.

Think editorial product window display.

The hero should feel premium, not busy.

SECTION 2 — SHOP BY CATEGORY

Build Rail:

01 / CATEGORY INDEX

Heading:

Shop by Category

Display all seven categories.

Use one real product image from each category as its visual representative.

Do NOT use seven identical generic cards.

Desktop layout should have controlled asymmetry.

For example:

Figures and Model Kits may receive more visual prominence.

Secondary categories can occupy smaller structured cards.

Still keep the overall grid aligned.

Category names:

Figures

Model Kits

Plush

Blind Boxes

Hobby Supplies

Character Goods

Apparel

Each card links to the appropriate category route.

SECTION 3 — FEATURED PICKS

Build Rail:

02 / FEATURED PICKS

Heading:

Selected from the Catalogue

Use exactly these demo product IDs:

figures-01

figures-02

model-kits-02

plush-03

blind-boxes-01

hobby-supplies-01

character-goods-01

apparel-04

Desktop:

4 columns

Tablet:

2–3 columns depending on width

Mobile:

2 columns where practical

Use the reusable ProductCard component.

Do not create hand-written duplicate product cards.

SECTION 4 — BUILD BENCH

Build Rail:

03 / BUILD BENCH

Heading:

Tools for the Build

Use all four products whose category is:

Hobby Supplies

Create a stronger editorial section than a normal product grid.

Possible structure:

left editorial title / intro

right product grid

or:

full-width dark section with structured product row

Do not invent product claims.

CTA:

SHOP HOBBY SUPPLIES

Destination:

/shop/hobby-supplies

SECTION 5 — PREORDERS

Build Rail:

04 / PREORDERS

Heading:

On the Horizon

Automatically show every demo product whose status equals:

preorder

Do not manually create additional preorder products.

Do not fill empty areas with fake merchandise.

If there are only a few preorder products, use generous whitespace.

CTA:

VIEW ALL PREORDERS

Destination:

/preorders

SECTION 6 — SERIES

Build Rail:

05 / SERIES INDEX

Heading:

Explore by Series

Generate the section from actual non-null series values contained in the product data.

Do not invent series names.

Do not invent collection descriptions.

Use representative product imagery from that series.

Clicking a series leads to filtered products.

SECTION 7 — BRANDS

Build Rail:

06 / MAKER INDEX

Heading:

Brands in the Demo Catalogue

Generate brands only from actual vendor values.

Use a premium typographic directory.

Do NOT invent brand logos.

Do NOT download logos.

Do NOT use fake brand marks.

Display brand names as typography.

CTA:

VIEW ALL BRANDS

Destination:

/brands

SECTION 8 — FOOTER

Background:

Charcoal.

Use:

/images/brand/sbs-horizontal-dark-bg.svg

Footer navigation:

SHOP

PREORDERS

COLLECTIONS

BRANDS

ABOUT

Also include the seven primary shop categories.

Do NOT add:

social icons

fake contact details

fake phone number

fake email

fake store address

newsletter signup

unless verified information becomes available later.

Include this small prototype disclosure exactly once:

Prototype catalogue. Product availability and pricing shown for design demonstration only.

COPYRIGHT BAR:

Render exactly:

© 2026 Secret Builders Society. All rights reserved. | Web Design by Bluluma

Only:

Bluluma

is linked to:

https://bluluma.com

Open it in a new tab.

Do not alter capitalization.

Do not rewrite punctuation.

Do not add:

Powered by Lovable

Powered by Vite

Built with AI

or any other credit.

==================================================
20. PRODUCT CARD COMPONENT

Create one reusable:

ProductCard

Every product card uses real local demo data.

Display:

product image

vendor

product title

price

status

optional series

Do not show undefined values.

IMAGE AREA:

consistent aspect ratio

prefer:

1:1

Use:

object-fit: contain

Do not aggressively crop supplier imagery.

Use generous internal white/off-white space.

HOVER:

maximum subtle image scale around:

1.03

Optional border emphasis.

No large vertical card movement.

No 3D effect.

No tilt.

TITLE:

Allow approximately two lines.

Clamp long titles gracefully.

Do not break card heights.

==================================================
21. PRODUCT STATUS SYSTEM

Use the supplied status values.

available

UI label:

IN STOCK

CTA:

ADD TO CART

last-one

UI label:

LAST ONE

CTA:

ADD TO CART

preorder

UI label:

PREORDER

CTA:

PREORDER

sold-out

UI label:

SOLD OUT

CTA:

SOLD OUT

Sold-out CTA must be disabled.

STATUS VISUALS:

IN STOCK:

subtle charcoal / neutral treatment

LAST ONE:

SBS red emphasis

PREORDER:

SBS red emphasis

SOLD OUT:

muted grey treatment

Do not use color alone.

Always include readable text.

Do not invent stock quantities such as:

Only 2 left

5 remaining

unless supplied data actually contains quantities.

==================================================
22. SHOP PAGE

Route:

/shop

Display all 28 products.

Desktop structure:

Breadcrumb

SBS Build Rail

Page title

Functional intro

result count

sort control

filter sidebar

product grid

Suggested title:

All Products

Suggested short intro:

Browse the complete Secret Builders Society demo catalogue across figures, model kits, plush, blind boxes, hobby supplies, character goods, and apparel.

This sentence describes the actual demo categories and is acceptable.

Do not add marketing claims.

==================================================
23. CATEGORY PAGES

Routes:

/shop/figures

/shop/model-kits

/shop/plush

/shop/blind-boxes

/shop/hobby-supplies

/shop/character-goods

/shop/apparel

Use the same reusable listing layout.

Page title must reflect category.

Use real category-filtered products.

Do not manually duplicate the database.

==================================================
24. FILTER SYSTEM

Filters must function.

Generate filter values only from current real demo data.

Allowed filters:

Category

Subcategory

Status

Vendor

Series

Price Range

Do not show an empty filter group.

Do not create filter choices for data that does not exist.

Use URL search parameters where practical.

Example:

?vendor=Bandai

or equivalent encoded values.

Users should be able to share / refresh a filtered URL without losing state when reasonable.

MOBILE:

Use a Filter button opening a drawer or sheet.

Do not permanently occupy half the mobile screen with filters.

==================================================
25. SORT SYSTEM

Sorting options:

Featured

Price: Low to High

Price: High to Low

Name: A–Z

Name: Z–A

Do not add:

Newest

Best Selling

Top Rated

Most Popular

because the demo database does not contain reliable data for those claims.

==================================================
26. SEARCH EXPERIENCE

Route:

/search

Also allow header search to open a refined search interface.

Search only the local product database.

Search fields:

title

vendor

category

subcategory

series

character

SKU

UPC

Case-insensitive.

Support partial matching.

Do not search AniToy live.

Do not call an external search API.

Search result card uses the normal ProductCard.

Empty state:

No products found.

Do not invent alternative product suggestions.

==================================================
27. COLLECTIONS PAGE

Route:

/collections

Collections in this prototype are based ONLY on real series values in the product database.

Generate collections dynamically.

For each series display:

series name

number of matching demo products

representative local product image

Clicking it should display or filter the matching products.

Do not invent:

collection descriptions

collection history

franchise descriptions

licensing information

==================================================
28. BRANDS PAGE

Route:

/brands

Generate brands only from actual vendor values.

Use a visually strong typographic index.

For every vendor display:

Vendor Name

Number of Products

Clicking a vendor shows matching products.

Do not invent brand logos.

Do not download brand marks.

==================================================
29. PREORDERS PAGE

Route:

/preorders

Only show products whose status is:

preorder

Do not mix:

available

last-one

sold-out

into the primary preorder listing.

If there are very few products:

embrace the whitespace.

Do not fake catalogue depth.

==================================================
30. PRODUCT DETAIL PAGE

Route:

/product/:handle

Use one reusable ProductDetail architecture.

DESKTOP:

two-column layout.

LEFT:

large product image

contained on white/off-white surface

use object-fit: contain

RIGHT:

status

vendor

product title

optional series

price

CTA

technical product metadata

Allowed metadata when present:

Category

Subcategory

Series

Character

Product Line

SKU

UPC

Estimated Release

Do not display blank rows.

Do not invent:

materials

dimensions

height

weight

scale

recommended age

shipping time

return terms

features

manufacturer copy

description

unless contained in current product data.

CTA BEHAVIOR:

available:

ADD TO CART

last-one:

ADD TO CART

preorder:

PREORDER

sold-out:

SOLD OUT disabled

==================================================
31. RELATED PRODUCTS

Below product details show:

Related Products

Maximum:

4 products.

Generate from real demo data.

Prioritize:

same series

then:

same category

then:

same vendor

Never display the current product as a related product.

Do not invent recommendation scores.

==================================================
32. DEMO CART

Implement a real local UI cart.

Use:

localStorage

Functions:

add item

remove item

increase quantity

decrease quantity

clear cart

persist through refresh

Header cart icon displays total quantity.

Cart item displays:

image

title

vendor

status

unit price

quantity

line total

Cart summary displays:

SUBTOTAL

Do not display:

tax

shipping

duties

discount

estimated total

unless they are explicitly supplied later.

Do not invent shipping calculations.

PRIMARY BUTTON:

CHECKOUT AVAILABLE AT SHOPIFY LAUNCH

Button must be disabled.

Below button display:

This prototype uses a local demo cart. Shopify checkout will be connected before launch.

Do not create:

fake checkout

credit card fields

Stripe integration

Square integration

PayPal integration

fake order confirmation

==================================================
33. ABOUT PAGE

Route:

/about

Use ONLY the following approved content.

Eyebrow:

SECRET BUILDERS SOCIETY

Headline:

Built for collectors.

Intro:

Secret Builders Society is being designed as a collector-first storefront for figures, model kits, plush, blind boxes, hobby supplies, character goods, and apparel.

Section heading:

A clearer way to explore the hobby.

Body:

The store experience is organized around the way collectors actually browse: by product category, series, maker, availability, and the items they are actively looking for.

THREE PRINCIPLES:

DISCOVER CLEARLY

Move between categories, series, makers, and search without digging through unnecessary clutter.

BUILD CONFIDENTLY

Keep model kits and hobby supplies easy to find alongside the figures and character goods collectors already follow.

COLLECT YOUR WAY

Browse across different product types without forcing every collector into the same path.

FINAL CTA:

EXPLORE THE CATALOGUE

Destination:

/shop

Do not add:

founder story

Yu-Wei biography

team

history

timeline

mission statistics

store photos

location

fake testimonials

==================================================
34. HOMEPAGE CATEGORY IMAGE MAPPING

Use real local product imagery.

Do not generate category graphics.

Use one representative product image from its actual category.

Where possible, choose visually distinct products so the category area has variety.

The exact category representative image may be selected from the existing four products in each category.

Do not use the same image to represent two different categories.

==================================================
35. NOINDEX — ABSOLUTELY CRITICAL

THIS WEBSITE IS CURRENTLY A PRIVATE/STAGING UI PROTOTYPE.

IT MUST NOT BE INDEXED BY SEARCH ENGINES.

Keep or create:

/public/_headers

containing:

/*
X-Robots-Tag: noindex, nofollow, noarchive, nosnippet

Also add global HTML:

<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">

and:

<meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet">

Add this code comment near the configuration:

STAGING ONLY — REMOVE NOINDEX BEFORE PRODUCTION LAUNCH.

Do NOT use:

robots.txt
Disallow: /

as a replacement for noindex.

Do not remove noindex until a future explicit production-launch instruction.

==================================================
36. PAGE METADATA

Even during staging, implement correct metadata.

Homepage title:

Secret Builders Society | Figures, Model Kits & Collector Goods

Homepage meta description:

Explore figures, model kits, plush, blind boxes, hobby supplies, character goods and apparel in a modern collector-first storefront from Secret Builders Society.

Other page titles:

Shop | Secret Builders Society

Figures | Secret Builders Society

Model Kits | Secret Builders Society

Plush | Secret Builders Society

Blind Boxes | Secret Builders Society

Hobby Supplies | Secret Builders Society

Character Goods | Secret Builders Society

Apparel | Secret Builders Society

Preorders | Secret Builders Society

Collections | Secret Builders Society

Brands | Secret Builders Society

Search | Secret Builders Society

Cart | Secret Builders Society

About | Secret Builders Society

Product pages:

[Product Title] | Secret Builders Society

Do not reuse the same page title everywhere.

==================================================
37. OPEN GRAPH IMAGE

Create a physical Open Graph asset:

/public/images/og-image.png

Dimensions:

1200 × 630

Use ONLY:

SBS supplied logo

SBS brand colors

existing local product imagery

Do not use AI-generated artwork.

Do not use an external image URL.

Do not use Lovable CDN.

Do not use builder asset storage.

Design should feel like the website:

charcoal

warm off-white

SBS red

product-focused

premium

simple

==================================================
38. RESPONSIVE DESIGN

Validate at approximately:

375px

768px

1024px

1440px

MOBILE MINIMUM SIDE PADDING:

20px

At 375px there must be:

no horizontal overflow

no cropped labels

no clipped product cards

no overlapping buttons

no huge logo

no nav wrapping

no sticky elements covering content

no microscopic typography

no unusable filters

PRODUCT GRID:

Desktop:

4 columns where appropriate

Tablet:

2–3 columns

Mobile:

2 columns when readable

For unusually narrow conditions, allow 1 column only if necessary.

==================================================
39. MOBILE HERO

Do not simply shrink the desktop hero composition.

Recompose it.

Use only the approved hero product imagery.

On narrow screens:

use 2–3 visible hero products if four creates clutter.

Preserve:

headline dominance

CTA clarity

product readability

Do not remove the collector-store visual identity.

==================================================
40. INTERACTIONS

Use restrained premium interactions.

Allowed:

subtle image scale

border transition

opacity transition

mega menu transition

mobile drawer transition

search overlay transition

cart drawer transition

button hover

Target:

150–220ms

Respect:

prefers-reduced-motion

Do NOT use:

parallax

scroll hijacking

continuous floating

marquee

auto-scrolling products

3D card tilt

cursor followers

animated particles

video backgrounds

random floating shapes

==================================================
41. ACCESSIBILITY

Use semantic HTML.

Logo alt:

Secret Builders Society

Product image alt:

actual product title

Use:

proper buttons

proper links

visible focus states

keyboard-accessible mega menu

keyboard-accessible mobile navigation

accessible dialogs

accessible cart drawer

accessible search overlay

correct heading hierarchy

Do not rely exclusively on red/grey color for product status.

Status text must always be visible.

Maintain adequate text contrast.

==================================================
42. PERFORMANCE

Use existing WebP images.

Lazy-load below-the-fold product grid images.

Do not lazy-load primary hero assets.

Use aspect-ratio containers.

Avoid layout shift.

Avoid huge frontend libraries for simple interactions.

Do not install unnecessary animation frameworks.

Do not load video.

Keep the storefront fast.

==================================================
43. COMPONENT ARCHITECTURE

Create reusable components including:

SiteHeader

DesktopNavigation

MegaMenu

MobileNavigation

SearchOverlay

CartDrawer

SBSBuildRail

Breadcrumbs

ProductCard

ProductGrid

ProductStatus

ProductFilters

SortControl

CategoryCard

SeriesCard

VendorIndex

ProductDetail

RelatedProducts

EmptyState

SiteFooter

Use one:

button system

input system

spacing system

border system

card system

Do not produce one-off inconsistent components on every page.

==================================================
44. GLOBAL VISUAL RHYTHM

Use generous editorial section spacing.

Desktop section spacing:

approximately 88–120px depending on context.

Mobile:

approximately 60–80px.

Do not make every section the same height.

Do not over-box content.

Let sections breathe.

Use borders and background shifts rather than endless floating cards.

==================================================
45. PRODUCT IMAGE PRESENTATION

Supplier images have varying dimensions.

Therefore:

use stable aspect-ratio frames.

Prefer white or warm-off-white image wells.

Use:

object-fit: contain

Preserve the entire product.

Do not:

zoom excessively

crop heads

crop product packaging

crop accessories

stretch images

apply fake perspective

apply fake shadows directly onto original product artwork

==================================================
46. BUSINESS CONTENT TRUTH

Do not invent:

address

phone

email

owners

team

shipping speeds

shipping rates

returns

refunds

warranties

guarantees

store opening hours

store location

physical showroom

Canadian-owned claims

Vancouver claims

customer count

review count

star rating

sales numbers

years in business

official retailer status

authorized dealer status

exclusive distributor status

awards

certifications

community size

social followers

free shipping

same-day shipping

price-match guarantees

low-price guarantees

newsletter benefits

membership benefits

Do not add testimonials.

Do not add review stars.

Do not add fake trust badges.

Do not add payment logos.

Do not add fake customer avatars.

Do not add social icons without real URLs.

==================================================
47. DEMO PRICING

Prices contained in the demo database exist only to make the UI commercially realistic.

Do not describe them as MSRP.

Do not describe them as discounted pricing.

Do not add sale percentages unless explicitly contained in source data.

Do not create crossed-out regular prices.

Do not generate promotional pricing.

Footer disclosure already explains that this is a prototype catalogue.

==================================================
48. DESKTOP MEGA MENU DESIGN

The SHOP mega menu should be visually premium.

Suggested structure:

Left:

SHOP ALL

NEW / STATUS links:
All Products
Preorders

Middle columns:

Figures

Model Kits

Hobby Supplies

Right:

Plush
Blind Boxes
Character Goods
Apparel

Use category micro labels.

Use subtle borders.

Optional:

one real product image may appear as a visual accent.

Do not turn mega menu into an image-heavy advertisement.

No fake promo copy.

==================================================
49. SEARCH HEADER BEHAVIOR

Search is a primary collector tool.

Desktop:

click Search icon to open large search overlay or refined panel.

Immediately focus the input.

Show matching products as user types.

Limit instant preview to a sensible number.

Provide:

VIEW ALL RESULTS

linking to /search.

Mobile:

search should open a full-width accessible interface.

Do not bury search inside multiple menu levels.

==================================================
50. CART UX

Adding to cart may open a Cart Drawer.

The cart drawer should feel polished.

Display:

thumbnail

title

price

quantity

subtotal

Allow:

remove

quantity adjustment

VIEW CART

On product card:

do not necessarily clutter every card with a large Add to Cart button.

A clean product-card design can prioritize title and price.

Add to Cart may appear on hover for desktop and remain accessible on touch devices.

Do not make hover the only way to buy.

==================================================
51. EMPTY STATES

Use clean restrained empty states.

No illustration generation.

Examples:

Search:

No products found.

Empty category/subcategory:

No demo products in this section yet.

Empty cart:

Your cart is empty.

Use relevant navigation CTA where appropriate.

Do not invent recommended products for an empty state unless generated directly from current local catalogue data.

==================================================
52. ERROR HANDLING

If /product/:handle does not match a real demo product:

show a proper product-not-found state.

CTA:

BACK TO SHOP

Destination:

/shop

Do not crash.

Do not display raw JSON.

==================================================
53. VISUAL REFERENCE DISCIPLINE

AniToy:

learn from catalogue depth and taxonomy.

Do not copy visual design.

Ages Three and Up:

learn from retail merchandising and collector-store atmosphere.

Do not copy layout.

Secret Builders Society must clearly look like a new brand.

The site should be recognizable from screenshots even with the logo hidden.

The distinctive identity should come from:

SBS red

charcoal

warm off-white

editorial grid

strong typography

technical micro-labels

SBS Build Rail

disciplined product framing

==================================================
54. HOMEPAGE DESIGN TEST

At first glance the homepage should communicate:

“premium specialty collector store”

before:

“generic online toy shop”

The hero should have enough product presence that users immediately understand what SBS sells.

The homepage should not require scrolling past multiple abstract brand sections before seeing products.

Products are the visual heroes.

==================================================
55. SHOP PAGE DESIGN TEST

The shop should feel powerful enough to eventually support hundreds or thousands of Shopify products.

Even with only 28 demo items, design:

filters

sort

search

result count

responsive grid

URL structure

in a scalable way.

Do not visually fake hundreds of products.

==================================================
56. FOOTER CREDIT LAW

Render exactly one design credit.

Exactly:

© 2026 Secret Builders Society. All rights reserved. | Web Design by Bluluma

Only the text:

Bluluma

is clickable.

URL:

https://bluluma.com

Open in new tab.

No other builder credit.

==================================================
57. NO GENERIC AI DESIGN

Avoid typical AI-generated website patterns.

Specifically avoid:

giant gradient hero blobs

floating glass cards

random numeric statistics

“trusted by thousands”

generic testimonial carousel

oversized pill buttons

every card rounded 24px

identical three-column icon blocks

meaningless abstract shapes

excessive entrance animations

fake client logos

fake trust badges

purple-blue gradients

generic SaaS layouts

The design should feel intentionally art-directed.

==================================================
58. DEVELOPMENT QUALITY

Use clean TypeScript.

Avoid any unless truly unavoidable.

Use reusable utilities.

Keep routes organized.

Keep product data separate.

Use deterministic filtering.

Use deterministic sorting.

Avoid duplicated state.

Keep component files reasonably sized.

Do not leave commented-out experiments.

Do not leave mock unused pages.

Do not leave console errors.

Do not leave broken imports.

==================================================
59. FINAL BUILD QA

Before declaring the website complete, verify ALL of the following.

PRODUCT DATA

[ ] Exactly 28 demo products exist.

[ ] No invented 29th product.

[ ] All seven primary categories exist.

[ ] Product titles come from supplied data.

[ ] Product images come from supplied WebP assets.

[ ] No runtime AniToy images.

[ ] No Ages Three and Up products.

BRAND

[ ] Correct SBS logo is used on light backgrounds.

[ ] Correct SBS logo is used on dark backgrounds.

[ ] Logo is never recreated or distorted.

[ ] Brand red is #A5142D.

[ ] Charcoal is #353535.

[ ] Warm off-white system is present.

[ ] SBS Build Rail is clearly present.

DESIGN

[ ] Website feels like an adult collector store.

[ ] Website does not look like a children's toy store.

[ ] Website does not look like generic Shopify.

[ ] Product imagery remains central.

[ ] No random decorative clutter.

[ ] No gradients.

[ ] No neon.

[ ] No excessive rounded cards.

ROUTES

[ ] /

[ ] /shop

[ ] all seven category routes

[ ] /preorders

[ ] /collections

[ ] /brands

[ ] /search

[ ] /cart

[ ] /product/:handle

[ ] /about

[ ] direct route refresh works.

FUNCTIONALITY

[ ] Search works.

[ ] Filters work.

[ ] Sort works.

[ ] Product pages work.

[ ] Related products work.

[ ] Add to Cart works.

[ ] Cart quantity works.

[ ] Cart persists via localStorage.

[ ] Sold Out button is disabled.

[ ] Checkout is disabled and clearly marked for future Shopify launch.

MOBILE

[ ] 375px layout is clean.

[ ] No horizontal overflow.

[ ] No clipped text.

[ ] No navigation overflow.

[ ] Product cards are readable.

[ ] Filters are mobile-friendly.

[ ] Hero composition is intentionally restructured.

SEO / STAGING

[ ] Global noindex exists.

[ ] Googlebot noindex exists.

[ ] Cloudflare _headers noindex exists.

[ ] No robots.txt Disallow: / replacement.

[ ] Unique page titles exist.

[ ] Homepage meta description exists.

[ ] OG image physically exists.

CLOUDFLARE

[ ] _redirects exists.

[ ] Contains /* /index.html 200.

ASSETS

[ ] All required images physically exist under /public/images/.

[ ] Zero lovable-uploads.

[ ] Zero /__l5e/.

[ ] Zero temporary builder media URLs.

CONTENT

[ ] No fake business facts.

[ ] No fake testimonials.

[ ] No fake reviews.

[ ] No fake ratings.

[ ] No fake shipping promises.

[ ] No fake policies.

[ ] No fake store details.

FOOTER

[ ] Footer credit appears exactly once.

[ ] Bluluma link opens in new tab.

==================================================
60. COMPLETION STANDARD

Do not declare the task finished because individual components exist.

The task is complete only when the entire storefront feels cohesive and usable.

The final result should look like a premium commercial design presentation that can be shown directly to the client.

It should already demonstrate:

brand identity

homepage design

product catalogue

category structure

search

filters

sorting

product pages

preorders

series collections

brand directory

cart

mobile experience

responsive behavior

Shopify-ready architecture

Cloudflare-ready routing

staging noindex protection

The next future development phase will replace the demo commerce adapter with Shopify.

Do not connect Shopify during this build.

Do not ask for Shopify credentials.

Do not create a fake Shopify integration.

BUILD THE COMPLETE SECRET BUILDERS SOCIETY UI NOW.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sbs-collect-build.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cae89c43-f572-4e69-a662-5d761feda79b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

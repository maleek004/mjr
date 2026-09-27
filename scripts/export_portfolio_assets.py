import os
from PIL import Image

# Ensure output directory exists
OUT_DIR = "assets/images/portfolio"
os.makedirs(OUT_DIR, exist_ok=True)

# Helper to save and optimize
def save_optimized(img, filename, max_dim=1400, quality=88):
    path = os.path.join(OUT_DIR, filename)
    # Resize if larger than max_dim
    w, h = img.size
    if max(w, h) > max_dim:
        scale = max_dim / float(max(w, h))
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    
    # Convert RGBA to RGB if saving as JPEG
    if img.mode in ("RGBA", "P"):
        rgb_img = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "RGBA":
            rgb_img.paste(img, mask=img.split()[3])
        else:
            rgb_img.paste(img)
        img = rgb_img
    
    img.save(path, "JPEG", quality=quality, optimize=True)
    size_kb = os.path.getsize(path) / 1024
    print(f"Saved: {path} ({img.size[0]}x{img.size[1]}, {size_kb:.1f} KB)")

# Load source rendered pages (1754 x 1241)
def load_page(page_num):
    return Image.open(f"temp_pdf_pages/page_{page_num:02d}.jpg")

print("--- Extracting and optimizing case study assets ---")

# 1. CYMA Homes
# Image 1: Hardhat & Logo Presentation (Page 4)
p4 = load_page(4)
save_optimized(p4, "cyma-1-hardhat.jpg")

# Image 2: Corporate Stationery & Folders (Page 5)
p5 = load_page(5)
save_optimized(p5, "cyma-2-stationery.jpg")

# Image 3: Branded Apparel & Vehicle Graphics (Page 6)
p6 = load_page(6)
save_optimized(p6, "cyma-3-fleet-apparel.jpg")


# 2. Glazing Memoirs
# Image 1: Illuminated Storefront Signage (Page 7)
p7 = load_page(7)
save_optimized(p7, "glazing-1-signage.jpg")

# Image 2: Food Packaging, Bottles & Standee (Page 8)
p8 = load_page(8)
save_optimized(p8, "glazing-2-packaging.jpg")

# Image 3: Chef Toque & Food Photography (Page 9)
p9 = load_page(9)
save_optimized(p9, "glazing-3-chef-culinary.jpg")


# 3. OAB Foundation
# Image 1: Primary Brand Identity System (Page 10)
p10 = load_page(10)
save_optimized(p10, "oab-1-identity.jpg")

# Image 2: Branded Backpack, Apparel & Calendar (Page 12)
p12 = load_page(12)
save_optimized(p12, "oab-2-apparel-merch.jpg")

# Image 3: Editorial Spread & Rollup Banner (Page 13)
p13 = load_page(13)
save_optimized(p13, "oab-3-editorial-rollup.jpg")


# 4. Tour of Lagos Waterways (TOLW)
# Image 1: Magazine Cover & Destination Spreads (Page 15)
p15 = load_page(15)
save_optimized(p15, "tolw-1-magazine-cover.jpg")

# Image 2: Editorial Magazine Open Spread (Page 16)
p16 = load_page(16)
save_optimized(p16, "tolw-2-editorial-spread.jpg")

# Image 3: 3D Hardcover Bound Edition (Page 17)
p17 = load_page(17)
save_optimized(p17, "tolw-3-bound-book.jpg")

# Image 4: Highway Gantry Billboard (Page 23)
p23 = load_page(23)
save_optimized(p23, "tolw-4-highway-gantry.jpg")


# 5. SkillForge ICT Academy
# Image 1: Highway Billboard (Page 22)
p22 = load_page(22)
save_optimized(p22, "skillforge-1-billboard.jpg")

# Image 2: Tech Skills & Robotics Campaigns (Page 27)
p27 = load_page(27)
save_optimized(p27, "skillforge-2-digital-campaigns.jpg")


# 6. Custom Streetwear Apparel & Merch
# Image 1: CYMA Branded T-Shirts & Baseball Caps (Cropped Page 6)
w, h = p6.size
# Crop left side of page 6 for apparel
apparel_1 = p6.crop((int(w * 0.05), int(h * 0.35), int(w * 0.45), int(h * 0.95)))
save_optimized(apparel_1, "apparel-1-branded-tees.jpg")

# Image 2: OAB Branded Sweatshirt & Apparel (Page 12)
save_optimized(p12, "apparel-2-hoodies-backpacks.jpg")

# Image 3: Glazing Memoirs Apron & Culinary Wear (Page 8)
save_optimized(p8, "apparel-3-custom-aprons.jpg")

print("--- Asset Extraction & Optimization Complete! ---")

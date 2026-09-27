import pymupdf
import os

doc = pymupdf.open("mjr portfolio.pdf")
print(f"Total Pages: {len(doc)}")

for i, page in enumerate(doc):
    text = page.get_text("text").strip().replace("\n", " ")
    images = page.get_images(full=True)
    print(f"Page {i+1:02d} | Images: {len(images):02d} | Text: {text[:80]}")
    for idx, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        w, h = base_image["width"], base_image["height"]
        ext = base_image["ext"]
        size_kb = len(base_image["image"]) / 1024
        if size_kb > 20:  # Only show significant images
            print(f"    - Img {idx+1}: {w}x{h}, {ext}, {size_kb:.1f} KB (xref {xref})")

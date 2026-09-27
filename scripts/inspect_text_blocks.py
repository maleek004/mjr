import pymupdf
import os

doc = pymupdf.open("mjr portfolio.pdf")

# Let's inspect the text or characteristics of every page in detail
for i, page in enumerate(doc):
    text_blocks = page.get_text("blocks")
    lines = [b[4].strip().replace("\n", " ") for b in text_blocks if b[4].strip()]
    print(f"=== PAGE {i+1} ===")
    if lines:
        for l in lines[:5]:
            print(f"  [Text] {l[:100]}")
    else:
        print("  [No text blocks - Vector/Image canvas]")

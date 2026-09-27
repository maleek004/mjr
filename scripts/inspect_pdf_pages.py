import os
import fitz  # PyMuPDF
from PIL import Image

def main():
    doc = fitz.open("mjr portfolio.pdf")
    print(f"Total pages in PDF: {len(doc)}")
    
    os.makedirs("temp_pdf_pages", exist_ok=True)
    os.makedirs("assets/images/portfolio", exist_ok=True)
    
    for i in range(len(doc)):
        page = doc[i]
        pix = page.get_pixmap(dpi=150)
        out_path = f"temp_pdf_pages/page_{i+1:02d}.jpg"
        pix.save(out_path)
        print(f"Rendered Page {i+1:02d} -> {out_path} ({pix.width}x{pix.height})")

if __name__ == "__main__":
    main()

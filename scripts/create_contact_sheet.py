import os

pages = sorted([f for f in os.listdir("temp_pdf_pages") if f.endswith(".jpg")])

html = """<!DOCTYPE html>
<html>
<head>
<title>PDF Page Index</title>
<style>
  body { font-family: sans-serif; background: #1a1a1a; color: #fff; padding: 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px; }
  .card { background: #2a2a2a; border-radius: 8px; overflow: hidden; padding: 10px; }
  .card img { width: 100%; height: auto; display: block; border-radius: 4px; }
  .card h3 { margin: 10px 0 5px 0; font-size: 16px; color: #ff6b00; }
</style>
</head>
<body>
<h1>MJr Portfolio PDF - Page Contact Sheet (33 Pages)</h1>
<div class="grid">
"""

for p in pages:
    html += f"""  <div class="card">
    <h3>{p}</h3>
    <img src="temp_pdf_pages/{p}" alt="{p}">
  </div>
"""

html += """</div>
</body>
</html>"""

with open("pdf_contact_sheet.html", "w") as f:
    f.write(html)

print("Generated pdf_contact_sheet.html with 33 page previews.")

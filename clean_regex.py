import re

file_path = 'app/admin/dashboard/page.tsx'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Pattern: many newlines followed by many spaces
# From my observation: 6-7 newlines and about 48 spaces
pattern = r'\n{4,}\s{20,}'
cleaned = re.sub(pattern, '', content)

# Also remove any redundant double quotes or commas that I might have introduced
cleaned = cleaned.replace(',,', ',')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(cleaned)

print("File cleaned with regex")

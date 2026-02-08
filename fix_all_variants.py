import os
import re

def fix_variants(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Replace variants={itemVariants}
                new_content = re.sub(r'variants=\{itemVariants\}', 'variants={itemVariants as any}', content)
                # Replace variants={containerVariants}
                new_content = re.sub(r'variants=\{containerVariants\}', 'variants={containerVariants as any}', new_content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {path}")

fix_variants('app')

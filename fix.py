import sys
file_path = 'src/app/checkout/success/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_content = content.replace('export default function CheckoutSuccessPage() {', 'function SuccessContent() {')
new_content += '''
export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] bg-pure-white flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
'''
new_content = new_content.replace('import React, { useEffect, useState } from \'react\';', 'import React, { useEffect, useState, Suspense } from \'react\';')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('File updated successfully.')

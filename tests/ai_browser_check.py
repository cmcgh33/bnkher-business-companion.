"""AI UI integration with an injected provider, not a real model evaluation."""
from pathlib import Path
from subprocess import Popen
from urllib.request import urlopen
from time import sleep
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
server=Popen(['node',str(root/'tests/fixture-server.mjs')])
try:
 for _ in range(40):
  try:
   with urlopen('http://127.0.0.1:3017/api/health') as r: break
  except OSError: sleep(.1)
 with sync_playwright() as p:
  b=p.chromium.launch(headless=True)
  page=b.new_page(viewport={'width':1440,'height':1100})
  errors=[]
  page.on('pageerror',lambda e: errors.append(str(e)))
  page.goto('http://127.0.0.1:3017')
  page.wait_for_selector('#ai-live:not([disabled])',state='attached')
  page.locator('#open-assistant').click()
  page.locator('#ai-live').check()
  page.locator('#message').fill('Could I spend eight grand?')
  page.locator('#chat-form button[type=submit]').click()
  page.wait_for_selector('#messages:has-text("Enter the private application access code")',timeout=3000)
  page.locator('#ai-code').fill('wrong-access-code')
  page.locator('#message').fill('Could I spend eight grand?')
  page.locator('#chat-form button[type=submit]').click()
  page.wait_for_selector('#messages:has-text("Enter the private AI access code")')
  page.locator('#ai-code').fill('test-access-code-not-a-real-secret')
  page.locator('#message').fill('Could I spend eight grand?')
  page.locator('#chat-form button[type=submit]').click()
  page.wait_for_selector('#messages:has-text("I interpreted your purchase amount as $8,000")')
  assert '$2,300 below' in page.locator('#messages').inner_text()
  assert 'LIVE AI INTERPRETATION' in page.locator('#assistant-mode').inner_text()
  page.locator('#ai-live').uncheck()
  page.locator('[data-question="Can I buy $8,000 in inventory?"]').click()
  assert 'DEMO ASSISTANT' in page.locator('#assistant-mode').inner_text()
  assert not errors,errors
  b.close()
 print('AI UI PASS (mock provider): unavailable credentials, wrong access code, grounded answer, mode switching, no JavaScript errors.')
finally:
 server.terminate();server.wait(timeout=5)

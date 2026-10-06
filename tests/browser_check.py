"""Local UI integration check. Starts its own server in the same environment."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(QuietHandler,directory=str(root/'web')))
Thread(target=server.serve_forever,daemon=True).start()
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True)
  page=browser.new_page(viewport={'width':1440,'height':1100},device_scale_factor=1)
  errors=[]
  page.on('pageerror',lambda e: errors.append(str(e)))
  page.goto(f'http://127.0.0.1:{server.server_port}')
  page.wait_for_selector('#room:text("$5,700")')
  assert '$7,700' in page.locator('#purchase-result').inner_text()
  page.locator('#income').check()
  assert '$19,700' in page.locator('#purchase-result').inner_text()
  page.locator('#income').uncheck()
  page.locator('#complete').uncheck()
  assert 'Complete your commitments first' in page.locator('#purchase-result').inner_text()
  page.locator('#complete').check()
  page.locator('#open-assistant').click()
  page.locator('[data-question="Can I buy $8,000 in inventory?"]').click()
  assert '$2,300' in page.locator('#messages').inner_text()
  page.locator('#message').fill('Tell me my revenue next year')
  page.locator('#chat-form button[type=submit]').click()
  assert 'cannot answer' in page.locator('#messages').inner_text()
  page.locator('#agent-workflow').check()
  page.locator('[data-question="Can I buy $8,000 in inventory and prepare for warehouse expansion?"]').click()
  page.wait_for_function("document.querySelector('#messages').innerText.includes('document_readiness')")
  assert '$62,000' in page.locator('#messages').inner_text()
  assert 'not a combined affordability assessment' in page.locator('#messages').inner_text()
  page.screenshot(path=str(root/'design/agent-workflow.png'),full_page=False)
  page.locator('#agent-workflow').uncheck()
  page.keyboard.press('Escape')
  page.locator('[data-page=expansion]').click()
  assert '$62,000' in page.locator('#project-summary').inner_text()
  assert '$1,317.32' in page.locator('#payment').inner_text()
  page.locator('[data-doc=debt]').check()
  assert '4 of 6' in page.locator('#docs-count').inner_text()
  page.locator('#budget-inventory').fill('40,000')
  page.locator('#budget-form button').click()
  assert '$67,000' in page.locator('#project-summary').inner_text()
  page.locator('[data-page=insights]').click()
  assert 'Not connected' in page.locator('#insights').inner_text()
  page.locator('#reset').click()
  page.wait_for_selector('#room:text("$5,700")')
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  page.screenshot(path=str(root/'design/desktop.png'),full_page=True)
  page.locator('#open-assistant').click()
  page.locator('[data-question="Can I buy $8,000 in inventory?"]').click()
  page.screenshot(path=str(root/'design/assistant.png'),full_page=False)
  page.keyboard.press('Escape')
  page.set_viewport_size({'width':390,'height':844})
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  page.screenshot(path=str(root/'design/mobile.png'),full_page=True)
  page.locator('#open-assistant').click()
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  page.locator('#close-assistant').click()
  assert not errors, errors
  browser.close()
  print('UI PASS: cash scenarios, incomplete inputs, assistant, budget, checklist, reset, desktop/mobile overflow, no JS errors.')
finally: server.shutdown()

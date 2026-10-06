"""Record the actual fixed-planner demo; no live provider or banking integration."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(QuietHandler,directory=str(root/'web')))
Thread(target=server.serve_forever,daemon=True).start()
try:
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True)
        context=browser.new_context(viewport={'width':1440,'height':1080},record_video_dir=str(root/'design/video-temp'),record_video_size={'width':1440,'height':1080})
        page=context.new_page();page.goto(f'http://127.0.0.1:{server.server_port}')
        page.wait_for_selector('#room:text("$5,700")');page.wait_for_timeout(1500)
        page.locator('#open-assistant').click();page.locator('#agent-workflow').check();page.wait_for_timeout(1500)
        page.locator('[data-question="Can I buy $8,000 in inventory and prepare for warehouse expansion?"]').click()
        page.wait_for_function("document.querySelector('#messages').innerText.includes('document_readiness')")
        page.wait_for_timeout(6500)
        page.keyboard.press('Escape');page.locator('#complete').uncheck();page.wait_for_timeout(2500)
        page.locator('#complete').check();page.locator('[data-page=expansion]').click();page.wait_for_timeout(3500)
        video=page.video;context.close();video.save_as(str(root/'design/demo.webm'))
        browser.close()
        print('Recorded actual demo workflow. Fixed planner; live AI not activated.')
finally:server.shutdown();server.server_close()

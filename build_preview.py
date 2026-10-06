"""Create an offline, self-contained review copy from the source application."""
from pathlib import Path
import base64
root=Path(__file__).resolve().parent
html=(root/'web/index.html').read_text()
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'web/style.css').read_text()+'</style>')
asset=base64.b64encode((root/'web/flame.png').read_bytes()).decode()
html=html.replace('src="flame.png"','src="data:image/png;base64,'+asset+'"')
engine=(root/'web/engine.js').read_text().replace('export ','')
app=(root/'web/app.js').read_text().split('\n',1)[1]
html=html.replace('<script type="module" src="app.js"></script>','<script type="module">'+engine+'\n'+app+'</script>')
(root/'BNKHER-Preview.html').write_text(html)
print('Created BNKHER-Preview.html')

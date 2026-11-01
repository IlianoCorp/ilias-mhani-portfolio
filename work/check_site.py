from pathlib import Path
from html.parser import HTMLParser
import json,re,urllib.parse
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=set();self.keys=[];self.h=[];self.nav=0;self.meta=set()
 def handle_starttag(self,t,attrs):
  d=dict(attrs)
  if d.get('id'):self.ids.add(d['id'])
  if d.get('data-i18n'):self.keys.append(d['data-i18n'])
  if t in ['h1','h2','h3','h4']:self.h.append(int(t[1]))
  if t=='a' and d.get('href'):self.links.append(d['href'])
  if t in ['link','script'] and (d.get('src') or d.get('href')):self.links.append(d.get('src') or d.get('href'))
  if t=='a' and d.get('aria-current')=='page':self.nav+=1
  if t=='meta':self.meta.add(d.get('name'))
r=Path.cwd();files=list(r.glob('*.html'))+list((r/'projects').glob('*.html'));d=json.loads((r/'js/translations.js').read_text().split(' = ',1)[1].rstrip(';\n'));errors=[]
for f in files:
 s=f.read_text();p=Page();p.feed(s)
 assert p.h.count(1)==1,(f,'h1')
 assert p.nav==1,(f,'active navigation')
 assert {'description','viewport','author'}<=p.meta
 assert all(k in d['en'] and k in d['fr'] for k in p.keys)
 assert not re.search(r'lorem ipsum',s,re.I)
 for a,b in zip(p.h,p.h[1:]):assert b<=a+1,(f,'heading skip',a,b)
 for link in p.links:
  u=urllib.parse.urlsplit(link)
  if u.scheme:continue
  dest=(f.parent/u.path).resolve() if u.path else f
  assert dest.is_file(),(f,link)
  if u.fragment:
   q=Page();q.feed(dest.read_text());assert u.fragment in q.ids,(f,link)
print(f'PASS: {len(files)} HTML pages; relative links/assets/anchors; heading hierarchy; metadata; active navigation; {len(d["en"])} bilingual text entries.')

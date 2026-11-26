import re,sys
lines=open('foundations/decisions.md',encoding='utf-8').read().split('\n')
heads=[i+1 for i,l in enumerate(lines) if l.startswith('#')]
out=[]
for a in sys.argv[1:]:
    n=int(a)
    pat=re.compile(r'^### D-0*%d( |$)'%n)
    for i,l in enumerate(lines):
        if pat.match(l):
            start=i+1
            end=next((h-1 for h in heads if h>start),len(lines))
            out.append("D-%d: foundations/decisions.md:%d-%d"%(n,start,end))
            break
    else: out.append("D-%d: NOT FOUND"%n)
print("\n".join(out))

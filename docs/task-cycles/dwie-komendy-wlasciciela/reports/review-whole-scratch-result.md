## empty file | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## empty file | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## no SQLite database | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## no SQLite database | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## SQLite with no schema version | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## SQLite with no schema version | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## SQLite WAL with no schema version | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## SQLite WAL with no schema version | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## damaged past first page | role
exit=1
stdout=""
stderr="{\"failure\":\"account-role\",\"kind\":\"Error\",\"code\":\"ERR_SQLITE_ERROR\",\"errcode\":11,\"place\":\"account-role.change\"}\nThe account database could not be opened or changed. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## damaged past first page | prev
exit=1
stdout=""
stderr="{\"failure\":\"account-previous-save\",\"kind\":\"Error\",\"code\":\"ERR_SQLITE_ERROR\",\"errcode\":11,\"place\":\"account-previous-save.change\"}\nThe account database could not be opened or changed. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## truncated header (first 50 bytes of a db) | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## truncated header (first 50 bytes of a db) | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## newer schema | role
exit=1
stdout=""
stderr="{\"failure\":\"account-role\",\"kind\":\"ReasonedFailure\",\"code\":\"UNSUPPORTED_SCHEMA\",\"place\":\"account-role.change\"}\nThe account database could not be opened or changed. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## newer schema | prev
exit=1
stdout=""
stderr="{\"failure\":\"account-previous-save\",\"kind\":\"ReasonedFailure\",\"code\":\"UNSUPPORTED_SCHEMA\",\"place\":\"account-previous-save.change\"}\nThe account database could not be opened or changed. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## negative schema version | role
exit=1
stdout=""
stderr="{\"failure\":\"account-role\",\"kind\":\"ReasonedFailure\",\"code\":\"UNSUPPORTED_SCHEMA\",\"place\":\"account-role.change\"}\nThe account database could not be opened or changed. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## negative schema version | prev
exit=1
stdout=""
stderr="{\"failure\":\"account-previous-save\",\"kind\":\"ReasonedFailure\",\"code\":\"UNSUPPORTED_SCHEMA\",\"place\":\"account-previous-save.change\"}\nThe account database could not be opened or changed. Nothing changed.\n"
bytesSame=true namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[]

## directory | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[sub] namesAfter=[sub]
leaks=[]

## directory | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[sub] namesAfter=[sub]
leaks=[]

## missing file | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## missing file | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## unset path | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## unset path | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## empty path | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## empty path | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## blank path | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## blank path | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## :memory: | role
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## :memory: | prev
exit=3
stdout=""
stderr="LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.\n"
bytesSame=true namesBefore=[] namesAfter=[]
leaks=[]

## valid server database (success) | role
exit=0
stdout="{\"event\":\"account-owner-granted\",\"accountId\":\"255c3a9a-5d9a-4235-8995-c9cf2911e92b\"}\nMade player@example.test an owner: it can use the owner panel from its next request; its sessions and emailed links stay as they were.\n"
stderr=""
bytesSame=false namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[] (success expected)

## valid server database (success) | prev
exit=0
stdout="{\"event\":\"account-previous-save-granted\",\"accountId\":\"b49ff3ba-4325-4082-bbef-dc62d20a43c1\"}\nGranted the previous-save privilege to player@example.test: it can pull the programs of its previous save and start the game from zero.\n"
stderr=""
bytesSame=false namesBefore=[db.sqlite] namesAfter=[db.sqlite]
leaks=[] (success expected)

## busy | role
exit=1
stdout=""
stderr="{\"failure\":\"account-role\",\"kind\":\"Error\",\"code\":\"ERR_SQLITE_ERROR\",\"errcode\":5,\"place\":\"account-role.change\"}\nThe account database could not be opened or changed while it was busy for longer than the wait allows. Nothing changed; run the command again.\n"

## busy | prev
exit=1
stdout=""
stderr="{\"failure\":\"account-previous-save\",\"kind\":\"Error\",\"code\":\"ERR_SQLITE_ERROR\",\"errcode\":5,\"place\":\"account-previous-save.change\"}\nThe account database could not be opened or changed while it was busy for longer than the wait allows. Nothing changed; run the command again.\n"

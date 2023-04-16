- ZAČÍT S MINIMEM MONŽOSTÍ A V PŘÍPADĚ ZÁJMU PŘIDÁVAT ZA POPLATEK DALŠÍ
- TRIAL / OMEZENÝ POČET PROMPTŮ ? ... BUDE NÁKLADNÉ, API STOJÍ PENÍZE
- Prompt Engineering is a thing
- Pricing:
  a) 5usd + vlastní API key
  b) přiřazeny API key + nějaký money navíc+ omezení tokenů za den?
- pořídím si GPT4 ... DO KDY MÁ DATA?
- threading vynechat v první fázi (půjde pouze single Prompting)

# ÚČEL

    # Prompty:
        - uchovávání promptů
        - verzování (větvení) promptů
        - komentovávní promptů
        - později sdílení promptů
    # Thread management:
        - uchovávání promptů v rámci threadu
        - mazání, verzování, vytváření branches (od daného místa konverzace se bude moci vytvořit kopie (snapshot) konverzace)
        - byl by přidán až později poté, co by se vyřešilo threadování promptů
    # Sdílení promptů:
        - nabízený prompt by obsahovat popis, úkázka výsledku a možnost vyzkoušení

# USE CASES

    1. TUNNING PROMPTU PRO GENEROVÁNÍ OBRÁZKŮ

# DESIGN

    - Svelte / Svelte Kit + Pocket base / MongoDB ?
    - prompty i thready ve stromové diagramové (binary-tree) struktuře
    - verzování formou gitu
    - Zaintegrovat analýzy (návštěvnost, doba návštěvy, ...)

    # UI:
        - Obrazovka bude rozdělená na dvě poloviny: vlevo strom, vpravo workspace
        - workspace půjde přepínat do mezi režimy: a) diagram portů, b) editorem a runnerem promptů
        - expandování jako je u svelte.dev/tutorial (po straně bude div, který bude mít event pro press) (rozměry se pak uloží do cookies) ... inspirovat se z freecodecamp tut, kde řeší eventy pohybu myši
        - rework PromptTree: Strom bude obsahovat folders (TreeFolder) obsahující nodes (TreeNode)

    # Řešení workspace:
        a) komponentami:
            - viz současné řešení
            - ve skriptu by se podle stavu pehodila komponenta pro dany workspace (např CreatePromptWorkspaceComponent, EditPromptWorkspaceComponent, ...)
            - pros: projekt by nebyl zaplavený route adresáři, v url by se nevypisovala cesta route
            - cons: horší loading dat a API routování
        b) routováním?:
            - viz řešení větve "rework-to-pages"
            - takhle je to řešeno například u homepage youtube: postraní panel je stále stejný, ale podle navolené položky se mění oblast konentu
            - pro každý workspace by existovala page
            - page by dědila z layoutu strom v levé části
            - route app by na page.server.ts měla v load fci ošetření autentizace (provedla by se pokaždé po načtení nějakého route)
            - pros: lepší routování, loading dat, atd ...

    # Workspace - režim editace a runneru promptů:
        - rozdělen na 3 části:
            1. Konfigurace promptu: parametrizace
            2. Text promptu ... + tlačítko "run" ?? ... kam umístit?
            3. Výsledek (odpověď) ... + tlačítko "run" ?? ... kam umístit?
        - tlačítko "run/execute" spustí prompt
        - ve spodní části panelu panel bude odpověď od AI + tlačítko, pomomcí kterého půjde přepnout do threadu (otevře se dialog ve kterém bude probíhat thread?) a pokračovat v promptování/konverzaci

        # Parametrizace:
            - bude obsahovat checkbox "parametrize", po navolení se zobrazí tlačítko [ + ] pro přidávání parametrů a        textboxy pro zadání argumentů použitých při "run"
            - do textu s promptem bude poté možné přidávat objekty "parametrů" (hodnota z textboxu se tam pak doplní)

    # Thread managmenet:
        - thread by se dal znovu vystavět skrze prompt, který by obsahoval veškeré prompty které uživatel zadal v rámci daného threadu
        - toto by ale bylo velice nákladné (při dotazu o 34k tokený by tato operace stála 20 Kč (1000 * 20 = 20k))
        - Thread: neposílat veškeré předešlé messages, ale skrze AI vytvořit shrnutí (komprimaci) a poté s touto komprimací pracovat (viz. https://www.lesswrong.com/posts/bNCDexejSZpkuu3yz/you-can-use-gpt-4-to-create-prompt-injections-against-gpt-4)
        - u openai API requestu provést priming skrze messages u chatCompletion.create 

    # Features:
        # Kombinování a řetězení promptů:
            - vytvoří se jaké si "prompt-flow"
            - prompt bude brán jako funkce:
                A. provede se jeden prompt za druhým
                B. výstup promptu se použije v dalším promptu
        # Vytváření souhrnu threadu: klik na odpověď -> uložit do kolekce poznámek/export
        # Sync:
            - provádění synchronizace bude mít v settings 2 možnosti:
                a) after every change
                b) timed
            - Timed:
                - půjde dále nastavit časový interval synchronizace
                - objeví se "sync"/"save" button, pro manuální provedení
            - Ve chvíli provádění synchronizae se zablokuje UI (aby bylo možné bezpečně odbavit veškeré změny)

    # BACKEND:
        # Routing:
            - každá route má ve sveltekit vlastní adresář
            - Route = akce: Route se bude používat pro různé operace (akce, interakce, komunikace se serverem) na backendu. Když budu potřebovat provést nějaký specifický task, zavolám danou route a ta se na serveru splní.
            - Route adresář bude obsahovat veškerou logiku spojenou s danou route
        # Route testing:
            - na express lze snadno (zeptat se chbota), pomocí middleware route, viz. nalezený článek
            - Jak ale řešit na SVELTEkit
        # Uchovávání stromové sturktury:
            - viz řešení větve "develop-storing-prompt-info"
            a) jako JSON: { id: 1, parentId: undefined, childPrompts: [
                id: 11, parentId: 1, childPrompts: []
            ]}
            b) v podobě itemu a relací:
                - každý item by měl id, childrenIds ... případně userId, aby bylo možné vyfiltrovat uzli daného uživatele
                - podle childrenIds by se pak sestavila struktura

# NÁZEV PRODUKTU

PANDA - Prompter for Automated Navigation and Directional Assistance
PMT - Prompt Management Tool
PM - Prompt Manager
rips - root interface prompting solution
PE - Prompting Environment
PEP - prompting entry point
AIPE [ejp] - AI Prompter Environment
AIP [ejp] - AI Prompter - PRIME PROMPT PROFIT

# LOGO

    - minimalistic black and white logo with a little of purple color used. Logo has an ape in it and there will be letters AIPE
    - nechat vygenerovat AI (midjourney, ...)
    - případně vytvoři skicu a podlé ní nechat vytvořit
    - nějaké návrhy jsou již připraveny viz adr. logo

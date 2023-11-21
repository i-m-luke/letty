# NÁZEV PRODUKTU: letty.io ???

    Další návrhy:
        - moth-ai, mothai, mothe
        - PM - Prompt Manager
        - rips - root interface prompting solution
        - PE - Prompting Environment
        - PEP - prompting entry point
        - AIPE [ejp] - AI Prompter Environment
        - AIP [ejp] - AI Prompter - PRIME PROMPT PROFIT

# TODO | PLAN

    0. Nastylovat: najít font, nastudovat tailwind
    0. Vytvořit logo a zaintegrovat jej do AppMainTree
    1. Napijit fetch buttonů stromu na DB
    2. AppMainTree >> folderNode AddButton: Přidat volbu (radio btn v dialogu) pro přepínání mezi vytváření folder / node
    3. AppMainTree
        - Přepracovat strom
        - Root node bude mít název Threads/Prompts
        - Root node nepůjde mazat (nebude mít Remove button) ... Skrze dev-tools však půjde bez problemu tlačítko přidat a zavolat  fetchFci ... Jak se todle dá ošetřit?
    4. ZOD data validation: Přepracovat na parseSafe? Nebude pak způsobovat pád aplikace pokud nastane na server
    5. ... Viz kanban board task

# TERMINOLOGIE

    + Thread: Vlákno chatu
    + Threading: Průběh chatování skrze vlákno
    + Prompt: Entita na základě které je sestaven dotaz pro chatbota; může brát argumenty
    + Prompting: Vytváření promptů

# BUSSINES MODEL

    - TRIAL / OMEZENÝ POČET PROMPTŮ: Neomezený počet promptů by při velkém počtu lidí bylo velice nákladné
    - ZAČÍT S MINIMEM MONŽOSTÍ: V případě zájmu aplikaci posléze rozšiřovat, některé funkce otevřít pouze za poplatek
    - PROMPT ENGINEERING IS "A THING": Prompt engineering je budoucnost; nástroje k tomuto účelu budou (jsou) žádané
    - Možnosti pricingu:
        a) Neomezené tokeny: Subscribtion + Uživatel dodá vlastní API key
        b) Omezené tokeny: Subscribtion v rámci kterého bude uživateli přiřazeny API key
    - Začít s promtingem, poté rozšířit o threading

# ÚČEL

    # Prompty:
        - uchovávání promptů
        - verzování (větvení) promptů
        - komentovávní promptů
        ## use-cases: 1. Tunning promptů pro generování obrázků, 2. ...
    # Thread management:
        - thread = vlákno chatu
        - uchovávání promptů v rámci threadu
        - mazání, verzování, vytváření branches (od daného místa konverzace se bude moci vytvořit kopie (snapshot) konverzace)
        - byl by přidán až později poté, co by se vyřešilo threadování promptů
    # Sdílení promptů:
        - nabízený prompt by obsahovat popis, úkázka výsledku a možnost vyzkoušení

# DESIGN

    # Unit Tests:
        - Půjde plně otestovat na Svelte v5: Runes umožňí maximálně oddělit logiku od komponenty (ViewModel)
        - Jak se řeší UI testing u sveltu?

## Technologie:

    - Svelte Kit
    - Database?: MongoDB --> PocketBase ???
    - Zaintegrovat analýzy (návštěvnost, doba návštěvy, atd ...)

## Frontend:

    - Redirect z buttonů:
        - Každý button, který bude provádět redirect, změní content pro main-panel page
        - Obdobně, jako se teď děje při kliku na uzel stromu
        - Týkat se bude např. Settings btn (sekce Menu)
        - Povede k lepšímu UX: uživatel bude pořád pracovat se stejným layoutem a tím pro něj bude zobrazení UI konzistentní

    - Obrazovka bude rozdělená na tři části:
        a) Menu - nahoře
        b) Left panel - vlevo pod menu,
        c) Main panel - vpravo pod menu

    # Menu:
        - Bude obsahovat tlačítká, která budou provádět redirect celé page: Zůstane alespoň menu? (menu = layout)

    # Main panel:
        - Půjde přepínat do mezi režimy
        - Každý režim bude vlastní route (page)
        - Seznam režimů:
            a) prompt diagram: prohlížení promptů v diagramové struktuře,
            b) prompt editor-runner: úprava promptu a jejich spouštění z jedné obrazovky
            c) thread: chat; do chatu bude přepnito při spuštění prompt
        ## Režim Prompt-editor :
            - Obrazovka rozdělena na 3 části:
                1. Část Konfigurace promptu: Parametrizace, ... ???
                2. Část Text promptu + tlačítko "run": Tlačítko "run/execute" spustí prompt
                3. Část Výsledek provedení promptu:
                    + Ve spodní části panelu panel bude odpověď od AI
                    + Dále v této části bude tlačítko, pomomcí kterého půjde přepnout do threadu: Provede se redirect na thread page
            #### Parametrizace:
                - bude obsahovat checkbox "parametrize", po navolení se zobrazí tlačítko [ + ] pro přidávání parametrů a textboxy pro zadání argumentů použitých při "run"
                - do textu s promptem bude poté možné přidávat objekty "parametrů" (hodnota z textboxu se tam pak doplní)

    # Left panel
        - viz. docs >> img >> tree-left-panel
        - bude obsahovat tlačítka, pomocí kterých půjdou přepínat režimy: a) AppMainTree, b) hledání v historii threadů
        ## AppMainTree:
            - Expandování jako je u svelte.dev/tutorial: po straně bude div, který bude mít event pro press; rozměry se pak uloží do        cookies; inspirovat se z freecodecamp tut, kde řeší eventy pohybu myši
            - Přidání, odebrání, modifikace uzlů AppMainTree: Vracet z fetch kompletní nový strom?; Z DB by se vyčetla aktuální data
                ; náročnější na přenos dat; jaké by mělo přínosy?
            ### future features:
                - v rohu stromu bude "tree manager" btn (ikonka "pastelky"):
                    - při kliku se strom přepne do režimu správy uzlů
                    - po přepnutí budou u uzlů checkboxy: vybrané uzly půjde smazat
                    - zobrazí se delete btn
                    - bude možné uzly přesouvat
                    - viz obr img/tree-manager

    # Loading:
        + Obrazovka se zobrazí při spuštění aplikace
        + Fade-in --> Objeví se logo s textem letty -> Fade-out -> Zobrazí se panely: animace pohybu + opacity?

    # Rezponsivnost:
        - AppMainTree (levý panel) se bude na mobilních zařízeních skrývat (bude se rolovat vlevo)
        - Při skrytí půjde rozbalit pomocí buttonu
        - řešení: a) skrze media-queries, b) svelte if logic blokem
        ## Řešení svelte if blokem
            + Bude existovat globální proměnná "isMobile":
            + Layout se bude přizpůsobovat na základě hodnoty proměnné isMobile
            + isMobile === true:
                + AppMainTree: Skryje se z postranního panelu; zobrazí se ve slotu layoutu (strom se vyrendruje v +page route "app")
                + Zobrazí se tlačítko "show tree", které provede redirect na route "app"

    # Style:
        - layout:
            - left-side-panel: AppMainTree, ...
            - main-panel: threading a prompting
            - upper-panel: menu; settings
        - Color-pallete:
            - 1. bílá, 2. černá: plus gradienty
            - 3. sytě fialová: pro highlight, např. mouse-over
        - "glass-design":
            - částečně průhledné; části UI aplikace (např. AppMainTree) s bude se jemně prolínát s pozadím
            - light mode: požadí bude bílé s tmavým gradientem (šmouhami)
            - dark mode: barva pozadí se invertuje (černé pozadí s bílými šmouhami)
            - tut: https://youtu.be/i59d6MjJLTc?si=N6HfK2KKLQMBEl_a
        - Odkazy a buttony: Po najetí změní na fialovou a velice jemně zazaří (glow ("neon") effect)
        - left-side-panel:
            - viz. docs >> img >> tree-left-panel
            - buttony pro přepínání režimů budou řazeny pod sebou ve sloupci
            - buttony budou kulaté
            - při navolení (toggle) opticky vystoupnou: objeví se stín, decentně se zvětší a posunou se nahoru a doleva (proti směru stínu)

## Backend:

    # Routing:
        - Každá route má ve sveltekit vlastní adresář
        - Pro každou route lze na serveru specifikovat:
            - http metody: get, post, update, ...
            - form actions: akce pro zprácovávání formulářu
        - Route: Používá se pro různé provádění různých operaci na serveru

    # Route testing:
        - Na express lze řešit skrze middleware route
        - Jak se řeší v případě SvelteKit ???

    # Validace typu dat přenášených mezi client-server
        - Zajištěno pomocí ZOD schémat
        - konzistence dat se musí vždy ověřit při jejich převzetí ze sítě
        - tzn. json se vždy musi validovat

## Features:

    - Features jsou seřazeny podle priorit

    # Auto-Save editovaných promptů:
        - V settings půjde povolit jako možnost
        - Po navolení se zadá interval mezi ukládáním
        - Blokování UI při synchronizaci:
            - Z důvodu bezpečného odbavení veškerých změn se ve chvíli ukládání zablokují kontroly UI (všechny kontroly, nebou pouze ty, u kterých bude aktuálně prováděna synch?)
            - Ve stavu aplikace bude ležet objekt "changes": bude obsahovat neodbavené změny na daných kontrolech; např. hodnotu textu promptu
            - postup:
                1. Zablokuje se UI: Aby nebylo možné aktualizovat neodbavené změny; kontroly nezešednou, pouze nebudou v danou chvíli reagovat na eventy; vizálně se zobrazí (progress bar kulatá ikonka), že se provádí sync
                2. naklonují se neodbavené změny
                3. vyprázdní se objekt nedobavených změn
                4. odblokuje se UI
                5. provede se async fce pro nahrání změn na backend

    # Kombinování a řetězení promptů:
        - Vytvoří se jaké si "prompt-flow"
        - K promptu bude přitupováno jako k funkci: Výstup promptu se použije jako argument pro prompt další

    # Využívání promptů při threadingu:
        + V režimu thread půjde ve vlákně používat prompty
        + V tomto případě se ve zprávě pouze výplní parametry
        + výchozí nastavení:  obsah promptu bude skrýván; při navolení půjde prompt zobrazit
        + U threadu bude možné nastavit výchozí prompt: při posílání zprávy bude okamžitě predpripraven prompt (jeho parametry)

    # Další:
        - Vytváření souhrnu threadu/export threadu: Najetí na odpověď/vlákno -> Zobrazí se popup s tlačítkem "export" --> Klik na tlačítko -> uložit do kolekce poznámek/export

## Logic

    # AI API:
        - používat offiko od open ai nebo chagpt (transitive-bullshit/chatgpt)
        - nestudovat repozitár transitive-bullshit/chatgpt:
            - link: https://github.com/transitive-bullshit/chatgpt-api/blob/main/src/chatgpt-api.ts
            - zjistit, jak dělá, aby mohl reagovat na konkrétní messages (pomocí parentMessageId)
            - nejspíš si bokem uchovává odeslané zprávy a přiděluje jim id
            - poté použije chatCompletion (open ai api) a danou zprávu přidá do messages

    # Kontext threadu:
        - ChatGPT při sestavování odpovědí pracuje s celým kontextem, tzn. i předešlé odpovědi
        - Při posílání API requestu není pracováno s kontextem: Platilo dříve, ale platí stále? API určitě prošlo nějakou úpravou --> Nastudovat API
        - Pokud by OpenAI API stále neumělo pracovat s kontextem tak by se, do otázky musel připojit kontext  threadu
        - Přidat však celý thread by ale bylo velice nákladné: Při dotazu o 34k tokený by tato operace stála 20 Kč (1000 * 20 = 20k)
        - Dvě řešení: a) Komprimace threadu, b) Reagování na messages
        # Komprimace threadu:
            - neposílat veškeré předešlé messages, ale skrze AI vytvořit shrnutí (komprimaci) a poté s touto komprimací pracovat
            - viz. https://www.lesswrong.com/posts/bNCDexejSZpkuu3yz/you-can-use-gpt-4-to-create-prompt-injections-against-gpt-4
            - Komprimaci by muselo provádět AI a zaslat spolu s odpovědí i její komprimovanou podobo, jinak by řešení nemělo smysl
        # Reagování na messages:
            - dva způsoby reagování:
                a) U zprávy, na kterou bude chtít uživatel reagovat, klikne na "react" a přidá otázku: Pod danou zprávou se začne provádět thread (jako kdy na FB reaguješ na komentář). Půjde navolt možnost, kdy se při reakci do messages přidají veškeré navazující (předešlé zprávy)
                b) Onznačí se více zpráv na které bude chtít uživatel reagovat: V tomto případě se otevře nové okno
            - u openai API requestu provést priming skrze messages u chatCompletion.create
            - viz img/react-to-messages.jpg

# LOGO

    + viz. docs >> img >> letty.jpg
    + lepší je verianta č. 2 (s textem):
        + tato varianta bude použita s textem i bez textu
        + S textem: bude použito pro loading (intro) page
        + Bez textu:
            + bude umístěno v otvoru v levém horním rohu left-side-panelu (AppMainTree)
            + bude SVG: v otvoru se bude nacházet pouze znak loga vše ostatní bude transparentní

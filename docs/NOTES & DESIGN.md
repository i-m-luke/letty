- ZAČÍT S MINIMEM MONŽOSTÍ A V PŘÍPADĚ ZÁJMU PŘIDÁVAT ZA POPLATEK DALŠÍ
- TRIAL / OMEZENÝ POČET PROMPTŮ ? ... BUDE NÁKLADNÉ, API STOJÍ PENÍZE

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
    - prompty i thready ve stromové diagramové (binary-tree) struktuře
    - verzování formou gitu
    # Thread managmenet:
        - thread by se dal znovu vystavět skrze prompt, který by obsahoval veškeré prompty které uživatel zadal v rámci daného threadu
        - toto by ale bylo velice nákladné (při dotazu o 34k tokený by tato operace stála 20 Kč (1000 * 20 = 20k))
    # Features:
        # Parametrizování a volání promptů:
            - klik na "run" u promptu -> zoprazí se dialog -> dialog bude obsahovat odpověď od AI + možnost přepnout do threadu a pokračovat v promptování
            - pokud nějaký prompt bude brát parametry, tak se v dialogu budou nacházet textboxy pro zadání argumentů
        # Kombinování a řetězení promptů:
            - vytvoří se jaké si "prompt-flow"
            - prompt bude brán jako funkce:
                A. provede se jeden prompt za druhým
                B. výstup promptu se použije v dalším promptu
        # Vytváření souhrnu threadu: klik na odpověď -> uložit do kolekce poznámek/export

# LOGO
    - nechat vygenerovat AI (midjourney, ...)
    - případně vytvoři skicu a podlé ní nechat vytvořit
    - nějaké návrhy jsou již připraveny viz adr. logo

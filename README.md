# Maturaziehung
by [Haschek Solutions](https://haschek.solutions)

## Installation
1. Daten auf einen Webserver laden
2. Eine CSV Datei mit dem Namen `themenpool.csv` in den "data" Ordner kopieren (Wie diese aussehen soll, steht weiter unten)
3. Von einem Webbrowser oder über die Kommandozeile das programm `data/prepare.php` ausführen. Daraufhin wird eine `database.json` Datei erstellt. Diese wird dann von der Ziehungswebseite verwendet


## CSV Layout
Die `themenpool.csv` Datei soll folgendermaßen aussehen:

```csv
Fach/LehrerInnenname;Themenname;Themennummer
```

zB:

```csv
Geschichte/HOF;Politische, gesellschaftliche und kulturelle Entwicklungen in der griechischen Antike;1
;Expansion und Migration in Antike und Mittelalter;2
;Herrrschaft und Zusammenleben in Antike und Mittelalter;3
;Konfessionelle und politische Transformationsprozesse in der Neuzeit;4
Wpf Geschichte/KRÖ;Frühe Hochkulturen;1
;Regionalgeschichte Wiens;2
;Europäische und außereuropäische Entwicklungen im 20. und 21. Jahrhundert;3
;Autoritäre und totalitäre Bewegung;4
```
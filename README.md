<b><h1>Progetto singolo InfoVis A.A. 2024/2025 - Mosche in volo<br>
Visualizzazione di un dataset multivariato con D3.js </b></h1><br>
<h2>Studente: Riccardo Spano (449367)</h2>
<h3> > Live run del progetto ----------------------------------------------------------------</h3>
A questo link: https://progetto-infovis-moschemultivariate.netlify.app/ è possibile visualizzare e provare direttamente il progetto completo in esecuzione.

<h3> > Caricamento del dataset ----------------------------------------------------------------</h3>
Il dataset JSON è volutamente integrato direttamente nel codice (script.js) e non caricato come file esterno ".JSON" in modo che l'apertura dell'applicazione possa essere eseguita scaricando i tre file e aprendo il file "index.html" (via file://) direttamente via browser, senza avere così la necessità di avviare un server web HTTP (es. Live Server in Visual Studio Code).

<h3> > Descrizione del progetto ----------------------------------------------------------------</h3>
Questo progetto realizza, secondo le specifiche assegnate, una visualizzazione interattiva di un dataset multivariato utilizzando D3.js. Il dataset è composto da 10 casi, ciascuno con 6 variabili quantitative positive.
Ogni caso è rappresentato come una piccola mosca stilizzata (solo silhouette) disegnata in SVG. La posizione delle mosche varia in base a coppie di variabili:
<br><br>

  <li>Configurazione iniziale → x = var1, y = var2</li>
  <li>Primo click → x = var3, y = var4</li>
  <li>Secondo click → x = var5, y = var6</li>
  <li>Terzo click → ritorno alla configurazione originale</li>
<br>
Il cambiamento di configurazione avviene con animazioni fluide grazie a D3 transitions. Le scale D3 lineari rimappano automaticamente gli intervalli dei valori del dataset all’area visiva disponibile, garantendo adattabilità a valori arbitrari. Ad ogni coppia di variabili, è associato un colore di mosche che cambia dinamicamente ad ogni passaggio ad una nuova coppia di variabili. Passando il mouse sopra un mosca senza clickcare, compariranno un tooltip con le informazioni della relativa mosca.




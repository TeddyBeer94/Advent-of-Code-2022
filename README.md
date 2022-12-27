Ce dépot contient mes codes pour l'édition 2022 d'Advent of Code.

Jour 1 : Problème assez facile, ma solution de la partie 2 calcule le maximum, le retire du tableau et répete le procédé 3 fois, une façon plus élégante mais plus longue serait de trier le tableau et de récuperer ses 3 premières cases.

Jour 2 : Problème facile, l'utilisation de switch à répétition est un peu lourde, un dictionnaire qui répertorie les combinaisons possibles serait plus simples.

Jour 3 : Je ne connaissait pas la méthode charAt(), et me suis donc débrouillé avec une chaine de caractères avec l'alphabet en minuscule puis majuscule, ou la position d'une lettre est directement liée à sa "valeur".

Jour 4 : Problème très facile.

Jour 5 : Formatage des données assez compliqué, que j'ai réalisé en tatonnant sur l'exemple. Une fois les données formatées correctement (chaque colonne stockée dans un tableau), le problème n'est pas difficile.

Jour 6 : L'utilisation des sets rend le problème très simple pour déterminer la présence ou non de doublons dans les groupes de 4 (ou 14) lettres.

Jour 7 : Problème difficile et ma première utilisation en JavaScript des Dictionnaires :
J'enregistrais pour clé d'un dossier son nom avant de réaliser que plusieurs dossiers à différents emplacements avaient les mêmes noms , j'ai donc utilisé le chemin complet du fichier comme clé. une fois le formatage des données effectué, calculer les tailles des dossiers est assez simple et la partie 2 n'est pas compliquée du tout.

Jour 8 : Problème un peu pénible sur les bords, puisque les élements aux bord du tableau ont des propriétés particulières. J'ai crée une fonction qui traitait une ligne du tableau que j'ai ensuite utilisé sur leur "inverse", sur les colonnes du tableau et leur inverse, pour m'éviter des "if then else" en série.

Jour 10 : Problème facile.

Jour 11 : La première partie est assez facile, la deuxieme demande une petite astuce : les singes s'interessent seulement à la valeur de stress modulo un entier, en prenant le ppcm (ou, pour des nombres premiers, le produit) de ces nombres, et en calculant ces nombres modulo le ppcm, on borne les valeurs de stress sans changer les lancers d'objets des singes.

Jour 12 : J'utilise un algorithme de Dishjkra dans la partie 1 et 2 : Dans la 1), je part de 'S' à la recherche d'un 'E', en "montant" , tandis que dans la 2) , je part de 'E' à la recherche d'un 'a' en "descendant". J'ai réutilisé mon idée du jour 8 pour éviter de gérer les bords de la "carte" lors du formatage.

Jour 13 : La fonction JSON.parse() trivialise le formatage des données, il s'agit ensuite de comparer récursivement les tableaux en traitant exhaustivement tous les cas (listes de tailles différentes, 1 ou 2 listes vides ...). La méthode .sort() rend la partie 2 très facile une fois la partie 1 faite.

Jour 14 : J'ai d'abord réalisé la partie 1 avec un tableau avant que la partie 2, plus difficile, ne me "force" à utiliser un dictionnaire. En dehors des cas exeptionels à gérer (sortie du tableau à droite ou à gauche / atteindre le "sol" de la 2ème partie), le problème est assez simple.

Jour 15 : Pas de problème notable lors de la partie 1, mais de vrai difficultés lors de la partie 2, liée au nombre (16*10^12) de cases à traiter. J'ai finalement utilisé des ensembles d'intervalles pour chaque ligne qui décrivaient les cases ne contenant pas la balise sur cette ligne. La réunion d'intervalle est assez moche à réaliser et rend l'éxecution très longue (3 minutes 30 secondes).

Jour 16 : Le premier d'une série de trois problème demandant de trouver une maximiser son "score" à un "jeu". Après avoir modélisé les trajets possibles minute par minute, je l'ai modélisé balise activée par balise activée. Le nombre de trajets possibles reste gérable pour tous les explorer pour la partie 1, mais explose lors de la partie 2 avec l'ajout de l'éléphant. Néanmoins, le programme de la partie 2 est correct sur l'exemple, mais tourne beaucoup trop longtemps pour le vrai fichier.

Jour 17 : La partie 1 est assez similaire au jour 14, avec le format des différents blocs à gérer en plus. Pour la partie 2 je sais "quoi faire" , à savoir chercher un motif qui se répete, sa hauteur et le nombre de bloc du motif pour éviter d'avoir à calculer les 10^12 chutes de bloc, je ne sais juste pas comment m'y prendre.

Jour 18 : je stocke dans un dictionnaire les cubes pleins avec leurs coordonées x,y,z pour clé, la partie 1 est alors très facile. Pour la 2ème partie, je prend un point à l'exterieur du volume et j'ajoute au dictionnaire tous les cubes connectés à ce point de départ part un chemin ininterrompu par des cubes de proche en proche (en bornant x, y et z pour avoir un nombre fini de point).

Jour 19 : tout comme le Jour 16, explorer toutes les possibilités est trop long, mais je ne vois pas de critère simple pour éliminer des stratégies perdantes. le programme actuel fonctionne pour de grandes valeurs de coût de robots extracteurs d' "ore", mais pas pour des petites, qui génèrent trop de possibilités.

Jour 20 : La principale difficulté de l'exercice est de continuer à "mixer" le tableau en désordre dans l'ordre initial. Pour cela, chaque valeur à un index qui la distingue, et je garde une copie profonde de l'input dont l'ordre des éléments ne change pas, et je retrouve les éléments dans le tableau modifié en cherchant leur index.

Jour 21 : Je stocke, pour chaque singe, son nom, ses fils ou sa valeur et son opération.
La partie 1 est assez facile à faire récursivement. Pour la partie 2, je suppose que la structure est celle d'un arbre binaire (chaque noeud n'a qu'un pere). Je trouve la suite des parents de 'humn', puis je calcule la valeur que chacun doit avoir en fonction de la valeur et de l'opération de son pere et de la valeur de son "frere", pour finalement arriver à la valeur de humn.

Jour 23 : je stocke les positions des elfes dans un dictionnaire. La partie 1 n'est pas très difficile, en dehors du cas ou plusieurs elfes bougent sur la même case. Pour la partie 2, je compte simplement le nombre d'elfe qui bougent à chaque round et je m'arrête quand la valeur renvoyée est nulle. Je pars aussi de l'état "final" de la partie 1, et suppose donc que les elfes ne sont pas immobiles avant au moins 10 étapes.

Jour 24 : Jour assez facile. J'utilise un dictionnaire, même si un tableau aurait probablement été plus simple. Pour gérer la possibilité d'avoir plusieurs blizzards, je garde en mémoire chaque position de blizzard dans untableau en plus de modifier la "carte". Contrairement aux jours 16 et 19, calculer toutes les positions possibles à la minute n+1 à partir de celle possibles à la minute n est faisable car le nombre de position est borné.

Jour 25 : Problème très facile.
Je souhaite créer la maquette complète d’une application web SaaS B2B appelée **AutoMaComm**.

---

# **1. Contexte du produit**

AutoMaComm est une plateforme destinée aux clubs sportifs amateurs.

L’application :

- Génère automatiquement des visuels personnalisés
- Récupère automatiquement les données sportives (résultats, prochains matchs, classements) puis génère automatiquement les visuels en y incorporant ces données là.
- Permet la gestion d’arrière-plans utilisés de manière aléatoire pour renouveler les visuels
- Publie directement ces visuels sur Instagram et Facebook
- Permet aussi la génération manuelle de visuels

L’objectif est de permettre à un club de ne plus créer manuellement ses posts concernant les résultats de l’équipe  et de permettre à tous les clubs en France même ceux qui n’ont pas le temps ou l’expérience ou bien l’argent pour avoir quelqu’un qui s’en occupe à plein temps !

---

# **👥 2. Cible utilisateur**

- Community managers de clubs
- Présidents de club
- Bénévoles
- Utilisateurs non techniques

L’interface doit être :

- Ultra simple
- Très visuelle
- Rapide à comprendre
- Sans besoin de formation
- Orientée action

---

# **🌐 3. Pages publiques**

Créer les pages suivantes :

- Landing page
- Page Pricing
- Page Connexion
- Page Inscription
- Page de contact

---

# **🏠 4. Pages du Dashboard (après connexion)**

Créer une interface SaaS moderne avec une sidebar à gauche contenant :

- Dashboard
- Mes équipes
- Templates
- Génération manuelle
- Planification des publications
- Gestion des arrière-plans
- Mes réseaux
- Paramètres

Design type SaaS moderne 2026, layout en cartes, navigation simple.

---

# **📊 5. Détail des pages**

---

# **🟢 Dashboard principal**

Le dashboard doit être clair, rassurant et orienté visualisation rapide.

Il doit permettre à l’utilisateur de comprendre en quelques secondes :

- Ce qui vient de se passer
- Ce qui va se passer
- Ce qui va être publié prochainement

Interface moderne en cartes, avec hiérarchie visuelle claire.

---

## **🔹 Bloc supérieur — Résumé rapide (4 cartes horizontales)**

### **1️⃣ Carte “Dernier match”**

Contenu :

- Nom de l’équipe
- Adversaire
- Score final
- Date du match

Objectif : voir immédiatement le dernier résultat.

---

### **2️⃣ Carte “Prochain match”**

Contenu :

- Nom de l’équipe
- Adversaire
- Date et heure

Objectif : anticiper la prochaine échéance sportive.

---

### **3️⃣ Carte “Prochaine publication”**

Contenu :

- Type de visuel (Résultat / Affiche / Classement / Calendrier)
- Équipe concernée
- Date et heure prévue de publication
- Réseau concerné (Instagram / Facebook)

Objectif : savoir ce qui sera publié en premier.

---

---

## **🔹 Bloc central — Timeline des prochaines publications**

Section verticale affichant les prochaines publications dans l’ordre chronologique (Pour les 7 prochains jours.)

Chaque ligne contient :

- Date
- Heure
- Équipe
- Type de visuel
- Réseau de publication
- Mini aperçu du visuel (thumbnail) ?

Design simple, lisible, scrollable.

Objectif :

Donner une vision concrète et chronologique de ce qui va être publié.

---

## **🔹 Style du dashboard**

- Layout en cartes modernes
- Espaces aérés
- Design très visuel
- Hiérarchie claire
- Pas de statistiques complexes
- Pas d’alertes techniques
- Interface rassurante et simple

---

## **🟢 Mes équipes**

- Liste des équipes du club
- Nom de l’équipe
- Logo
- Championnat
- Gestion de l’effectif du club ici (possibilité d’ajouté les trombinoscopes des joueurs et modifié, nom prénom etc…)
- Boutons de gestions d’équipe (ajouté, supprimer / modifier…)

---

## **🟢 Templates (avec builder intégré)**

- Grille des templates existants
- Bouton Créer un template
- Bouton Modifier
- Indication du type de visuel (résultat, classement, affiche, calendrier)
- Accès au builder visuel intégré pour modifier le design

---

## **🟢 Génération manuelle**

Objectif : permettre à l’utilisateur de générer un visuel manuellement.

Layout :

- À gauche : preview du visuel en temps réel avec le builder
- À droite : formulaire dynamique avec champs (scores, date, lieu, texte…)

Boutons :

- Générer
- Publier maintenant
- Télécharger

Interface très simple et très visuelle.

---

## **🟢 Planification des publications**

Cette page permet de programmer **quand** chaque visuel (template) doit être publié automatiquement chaque semaine.

Elle ne fonctionne que pour les semaines de match.

### **Principe :**

- L’utilisateur crée d’abord ses templates (où le format Story/Post et le type de contenu sont déjà définis).
- Ensuite, il vient ici pour choisir **le moment de publication** et activer/désactiver l’automatisation.

En haut de page, ajouter un court texte explicatif :

“Choisissez quand vos visuels doivent se publier automatiquement chaque semaine. Le format (Story/Post) est défini dans le template.”

Ajouter également un **filtre global par équipe** au-dessus du tableau :

Filtre :

Afficher →

- Toutes les équipes
- Équipe 1
- Équipe Réserve
- U18
- etc.

---

## **Tableau principal (règles de planification)**

Le tableau contient les colonnes suivantes :

---

### **1.**

### **Nom du visuel**

- Nom du template (ex : “Résultat match”, “Affiche prochain match”, “Classement”)
- Optionnel : petit badge en lecture seule indiquant le format :
    - S (Story)
    - P (Post)

Ce badge est informatif uniquement, non modifiable ici.

---

### **2.**

### **Équipe**

- Affichage sous forme de **tags colorés arrondis**
- Couleurs douces et non agressives
- Chaque équipe possède une couleur propre pour différenciation visuelle

Exemple :

- [ Équipe 1 ]
- [ Réserve ]
- [ U18 ]

Si un visuel concerne plusieurs équipes (ex : carrousel multi-équipes) :

- Afficher plusieurs tags sur la même ligne
    
    ou
    
- Afficher un badge “Multi-équipes” avec tooltip au survol listant les équipes concernées.

---

### **3.**

### **Actif**

- Toggle ON / OFF
- OFF = ce visuel ne sera plus publié automatiquement

Le toggle doit être très visible et facilement actionnable.

---

### **4.**

### **Moment de publication**

### **(une seule liste déroulante)**

Une unique dropdown qui mélange deux types de choix.

**A. Jours fixes de la semaine :**

- Lundi
- Mardi
- Mercredi
- Jeudi
- Vendredi
- Samedi
- Dimanche

**B. Moments relatifs au match :**

- J-4
- J-3
- J-2
- J-1 (veille du match)
- Jour J
- J+1 (lendemain)
- J+2
- J+3
- J+4

L’utilisateur choisit **soit** un jour fixe, **soit** un repère par rapport au match, dans la même liste.

La dropdown doit contenir une séparation visuelle claire entre :

“Jours fixes”

et

“Par rapport au match”

---

### **5.**

### **Heure**

- Sélecteur horaire (format HH:MM)
- Simple et rapide à utiliser

---

## **UX / Design attendu**

- Table simple et très lisible
- Hiérarchie claire
- Espaces aérés
- Tags équipes visuellement distincts mais discrets
- Toggle “Actif” très visible
- Dropdown structurée et intuitive
- Bouton optionnel “Aller au template” (icône crayon ou flèche) sur chaque ligne
- Pas de colonnes modifiables liées au format ou type de publication (déjà définis dans le template)

La page doit ressembler à une gestion simple de règles hebdomadaires, pas à un calendrier complexe.

---

---

## **🟢 Mes réseaux**

Page de gestion des connexions sociales.

Bloc Instagram :

- Statut connecté / non connecté
- Nom du compte connecté (@nom)
- Photo de profil
- Bouton Déconnecter

Bloc Facebook :

- Page connectée
- Nom exact de la page
- Bouton Modifier connexion
- Bouton Déconnecter

Indicateurs visuels clairs si connexion valide ou expirée.

---

# **🎨 🟢 Gestion des arrière-plans**

Cette page contient 3 onglets.

---

## **🟢 Onglet 1 : Vos prochains arrière-plans**

Objectif :

Permettre de visualiser les arrière-plans programmés pour les prochaines publications et permettre leur ajout et attribution.

---

### **Affichage principal**

Affichage en grille (cards visuelles).

Chaque carte affiche :

- Image de l’arrière-plan
- Badge indiquant le type de visuel (résultat, classement, affiche, calendrier)
- Nom de l’équipe concernée
- Date estimée de publication
- Indication du template associé

Les cartes doivent être visuelles, claires et faciles à comprendre.

---

### **Bouton principal en haut de l’onglet**

Bouton :

**Ajouter un arrière-plan**

---

### **Lors du clic sur “Ajouter un arrière-plan”**

Ouverture d’une interface simple (modal ou panneau latéral) contenant :

1️⃣ Zone d’upload

- Upload simple
- Upload multiple
- Drag & drop

2️⃣ Attribution obligatoire à un visuel

Après upload, l’utilisateur doit pouvoir :

- Sélectionner l’équipe concernée (dropdown)
- Sélectionner le template / type de visuel (dropdown)
- Voir un aperçu du visuel concerné

Pour l’UX :

→ Dropdown “Attribuer à un visuel”

---

### **Objectif UX**

Cette section doit :

- Permettre d’ajouter rapidement un arrière-plan
- Permettre de l’affecter immédiatement à un visuel précis
- Mettre à jour automatiquement la grille des “prochains arrière-plans”

L’interface doit rester simple, sans logique technique visible.

---

## **Onglet 2 : Arrière-plans déjà utilisés**

Affichage pêle-mêle de tous les arrière-plans déjà publiés.

- Grille visuelle
- Aucune organisation obligatoire
- Interface minimaliste
- Option hover pour voir la date d’utilisation

But : permettre de repiocher facilement un ancien arrière-plan si besoin.

---

## **Onglet 3 : Réserve aléatoire**

Cette section est une bibliothèque d’images utilisées automatiquement.

En haut, encadré explicatif :

“Les images ajoutées ici seront utilisées automatiquement et aléatoirement pour vos prochaines publications. Le système sélectionne une image différente à chaque nouveau visuel publié.”

Fonctionnalités :

- Upload simple
- Upload multiple
- Drag & drop
- Grille visuelle des images ajoutées

Aucune configuration complexe.

C’est une réserve globale utilisée automatiquement par le système.

---

## **🟢 Paramètres**

Sections :

- Gestion abonnement
- Informations du club
- Gestion des utilisateurs (si multi-utilisateurs)
- Suppression du compte

---

## **🎨 Direction artistique**

Créer un design SaaS moderne et premium (2026), minimaliste et professionnel, avec une identité Sport Tech.

Palette principale à utiliser :

- Bleu profond : **#04346D**
- Beige / blanc chaud : **#F5F3EB**

L’interface doit être élégante, structurée et rassurante, avec une touche sportive sobre.

Le design doit inspirer la confiance, la stabilité et le professionnalisme.

Style attendu :

- Interface moderne en cartes
- Espaces aérés
- Hiérarchie visuelle claire
- Typographie sans-serif contemporaine
- Micro-interactions subtiles
- Badges et éléments visuels harmonieux
- Aucun effet flashy ou agressif

L’ensemble doit dégager une sensation premium, propre et maîtrisée, adaptée à une solution B2B destinée à des clubs sportifs.

---

# **🎯 7. Priorités UX**

- Simplicité maximale
- Visibilité de l’automatisation
- Transparence sur ce qui va être publié
- Aucune complexité technique visible
- Navigation intuitive